#!/usr/bin/env bash
# ==============================================================================
# AstronRPA 服务端启动 + 验证自动化脚本
# 执行环境：172.16.100.211（远程服务器，Linux）
# 用途：启动保留服务 → 检查 Edge Functions → 迁移数据 → 验证
# 使用方法：
#   chmod +x scripts/server-setup.sh
#   sudo bash scripts/server-setup.sh              # 全流程
#   sudo bash scripts/server-setup.sh --step docker  # 仅执行指定步骤
#   bash scripts/server-setup.sh --dry-run          # 仅打印命令，不执行
# ==============================================================================

set -euo pipefail

# ── 配置 ─────────────────────────────────────────────────────────────────────
DOCKER_DIR="/home/zhengxueen/github-project/astron-rpa/docker"
PROJECT_DIR="/home/zhengxueen/github-project/astron-rpa"

# MySQL 连接（Docker 内部）
MYSQL_HOST="127.0.0.1"
MYSQL_PORT=3306
MYSQL_USER="root"
MYSQL_PASS="rpa123456"
MYSQL_DB="rpa"

# PostgreSQL 连接（InsForge 已运行）
PG_HOST="127.0.0.1"
PG_PORT=5432
PG_USER="postgres"
PG_PASS="xqxatcdj"
PG_DB="insforge"

# 端口检查清单
declare -A PORTS=(
  ["32742"]="AstronRPA 网关（OpenResty Nginx）"
  ["7130"]="InsForge API"
  ["7133"]="Deno Edge Functions"
  ["5432"]="PostgreSQL"
  ["8000"]="Casdoor"
)

# ── 颜色 ─────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ── 辅助函数 ─────────────────────────────────────────────────────────────────
info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
err()   { echo -e "${RED}[ERROR]${NC} $*"; }
step()  { echo -e "\n${BLUE}══════════════════════════════════════════════════${NC}"; echo -e "${BLUE}  $*${NC}"; echo -e "${BLUE}══════════════════════════════════════════════════${NC}\n"; }

# 命令执行函数（支持 dry-run）
run_cmd() {
  if [ "${DRY_RUN:-false}" = "true" ]; then
    echo -e "${YELLOW}[DRY-RUN]${NC} $*"
  else
    eval "$*"
  fi
}

# 检查端口是否可达
check_port() {
  local host="$1" port="$2" label="$3"
  if timeout 3 bash -c "echo > /dev/tcp/$host/$port" 2>/dev/null; then
    ok "$label ($host:$port) ✅ 可达"
    return 0
  else
    warn "$label ($host:$port) ❌ 不可达"
    return 1
  fi
}

# 等待端口可用（最多重试 N 次，间隔 5 秒）
wait_for_port() {
  local host="$1" port="$2" label="$3" retries="${4:-12}" interval=5
  info "等待 $label ($host:$port) 就绪，最长 $((retries * interval)) 秒..."
  for i in $(seq 1 "$retries"); do
    if timeout 3 bash -c "echo > /dev/tcp/$host/$port" 2>/dev/null; then
      ok "$label 已就绪（第 ${i} 次检测）"
      return 0
    fi
    sleep "$interval"
  done
  err "$label 未就绪（已等待 $((retries * interval)) 秒）"
  return 1
}

# ── 步骤选择 ─────────────────────────────────────────────────────────────────
# 解析 --step 参数
STEP=""
DRY_RUN=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --step) STEP="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    --help|-h)
      echo "用法: $0 [--step docker|deno|pgloader|validate] [--dry-run]"
      echo ""
      echo "步骤说明:"
      echo "  无参数      — 执行全流程（docker → deno → pgloader → validate）"
      echo "  --step docker   — 仅启动 Docker 服务"
      echo "  --step deno     — 仅检查 Deno Edge Functions"
      echo "  --step pgloader — 仅执行数据迁移"
      echo "  --step validate — 仅运行验证"
      echo "  --dry-run       — 仅打印命令，不实际执行"
      exit 0
      ;;
    *) echo "未知参数: $1"; exit 1 ;;
  esac
done

# ── S1: 启动 AstronRPA 保留服务 ────────────────────────────────────────────
s1_start_docker() {
  step "[S1] 启动 AstronRPA 保留服务（Docker Compose）"

  # 1.1 检查 Docker
  info "检查 Docker 环境..."
  if ! command -v docker &>/dev/null; then
    err "Docker 未安装！请先安装 Docker"
    return 1
  fi
  ok "Docker 已安装: $(docker --version)"

  if ! docker compose version &>/dev/null; then
    err "Docker Compose 不可用"
    return 1
  fi
  ok "Docker Compose 已安装: $(docker compose version)"

  # 1.2 检查项目目录是否存在
  if [ ! -d "$DOCKER_DIR" ]; then
    err "Docker 目录不存在: $DOCKER_DIR"
    info "请确认项目路径是否正确，或修改脚本顶部的 DOCKER_DIR 变量"
    return 1
  fi
  ok "Docker 目录存在: $DOCKER_DIR"

  # 1.3 检查 .env 文件
  if [ ! -f "$DOCKER_DIR/.env" ]; then
    warn ".env 文件不存在，从 .env.example 复制..."
    run_cmd cp "$DOCKER_DIR/.env.example" "$DOCKER_DIR/.env"
    ok ".env 文件已创建"
  else
    ok ".env 文件已存在"
  fi

  # 1.4 检查端口 32742 是否已被占用
  if timeout 2 bash -c "echo > /dev/tcp/127.0.0.1/32742" 2>/dev/null; then
    warn "端口 32742 已被占用，跳过 Docker 启动"
    return 0
  fi

  # 1.5 启动 Docker Compose
  info "启动 Docker Compose 服务..."
  info "注意：首次启动需要拉取镜像，可能耗时较长（取决于网络）"
  run_cmd cd "$DOCKER_DIR"
  run_cmd "docker compose up -d 2>&1"
  ok "Docker Compose 启动命令已执行"

  # 1.6 等待服务就绪
  info "等待服务就绪（Nginx 网关、MySQL、各微服务）..."
  info "此过程约需 30-60 秒（MySQL 初始化 + 数据表创建）"

  sleep 10

  # 检查容器状态
  run_cmd "docker compose ps --format 'table {{.Name}}\t{{.Status}}\t{{.Ports}}' 2>&1 || true"

  # 等待 Nginx 网关
  wait_for_port "127.0.0.1" "32742" "AstronRPA Nginx 网关" 20 || return 1

  # 1.7 验证 API
  info "验证 API 是否就绪..."
  local api_check
  api_check=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://127.0.0.1:32742/api/robot/robots" 2>/dev/null || echo "000")
  if [ "$api_check" = "200" ]; then
    ok "AstronRPA API 响应 200 ✅"
  elif [ "$api_check" = "000" ]; then
    warn "API 未响应（网络/超时），但容器可能仍在启动中"
    warn "稍后可用以下命令检查: curl http://127.0.0.1:32742/api/robot/robots"
  else
    warn "API 响应状态码: $api_check（可能还在初始化）"
  fi

  # 1.8 显示所有容器状态
  echo ""
  info "当前容器状态："
  run_cmd "docker compose ps --format 'table {{.Name}}\t{{.Status}}' 2>&1 || true"
}

# ── S2: 检查 Deno Edge Functions ─────────────────────────────────────────────
s2_check_deno() {
  step "[S2] 检查 Deno Edge Functions 端口 7133"

  info "检查 Deno Edge Functions 状态（多种方式探测）..."

  # 2.1 检查 InsForge systemd 服务
  if command -v systemctl &>/dev/null; then
    if systemctl is-active --quiet insforge.service 2>/dev/null; then
      ok "InsForge systemd 服务运行中"
    else
      warn "InsForge systemd 服务未运行或不存在"
    fi
  fi

  # 2.2 检查 Docker 容器中是否有 Deno
  if command -v docker &>/dev/null; then
    local deno_container
    deno_container=$(docker ps --format '{{.Names}}' 2>/dev/null | grep -i deno || true)
    if [ -n "$deno_container" ]; then
      ok "Deno 容器运行中: $deno_container"
    fi
  fi

  # 2.3 直接检查端口 7133
  if check_port "127.0.0.1" "7133" "Deno Edge Functions（本地）"; then
    # 尝试调用 Edge Function
    local fn_check
    fn_check=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "http://127.0.0.1:7133/functions/v1/notify" 2>/dev/null || echo "000")
    if [ "$fn_check" != "000" ]; then
      ok "Edge Functions 端点响应状态码: $fn_check"
    fi
  fi

  # 2.4 尝试通过 InsForge API 代理访问
  if check_port "127.0.0.1" "7130" "InsForge API"; then
    local proxy_check
    proxy_check=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "http://127.0.0.1:7130/functions/v1/notify" 2>/dev/null || echo "000")
    if [ "$proxy_check" != "000" ]; then
      ok "通过 InsForge API 代理调用 Edge Functions 响应: $proxy_check"
    fi
  fi

  # 2.5 如果端口 7133 不可达，给出建议
  if ! timeout 2 bash -c "echo > /dev/tcp/127.0.0.1/7133" 2>/dev/null; then
    echo ""
    warn "Deno 端口 7133 不可达，请检查："
    echo "  1. InsForge Docker Compose 中 deno 服务是否已启动："
    echo "     cd /home/zhengxueen/github-project/InsForge"
    echo "     docker compose ps | grep deno"
    echo ""
    echo "  2. 如果 Deno 容器已运行但端口未暴露，修改 docker-compose.yml："
    echo "     deno:"
    echo "       ports:"
    echo "         - \"7133:7133\""
    echo ""
    echo "  3. 重启后验证："
    echo "     curl http://127.0.0.1:7133/functions/v1/notify"
  fi
}

# ── S3: PostgreSQL 数据迁移 ──────────────────────────────────────────────────
s3_run_pgloader() {
  step "[S3] PostgreSQL 数据迁移（MySQL → PostgreSQL）"

  # 3.1 检查 pgloader 是否安装
  if ! command -v pgloader &>/dev/null; then
    warn "pgloader 未安装，准备安装..."
    if command -v apt-get &>/dev/null; then
      run_cmd "apt-get update -qq && apt-get install -y -qq pgloader 2>&1 | tail -5"
    elif command -v brew &>/dev/null; then
      run_cmd "brew install pgloader 2>&1 | tail -5"
    else
      err "无法自动安装 pgloader，请手动安装："
      err "  Ubuntu/Debian: sudo apt-get install pgloader"
      err "  macOS: brew install pgloader"
      err "  https://pgloader.io/"
      return 1
    fi
  fi
  ok "pgloader 已安装: $(pgloader --version 2>&1 | head -1)"

  # 3.2 检查 MySQL 是否可达（通过 Docker 或直接）
  info "检查 MySQL 连接..."
  if timeout 3 bash -c "echo > /dev/tcp/$MYSQL_HOST/$MYSQL_PORT" 2>/dev/null; then
    ok "MySQL ($MYSQL_HOST:$MYSQL_PORT) 可达"
  else
    warn "MySQL ($MYSQL_HOST:$MYSQL_PORT) 不可达"
    warn "尝试通过 Docker 容器名连接..."
    MYSQL_HOST="rpa-opensource-mysql"
    if timeout 3 bash -c "echo > /dev/tcp/$MYSQL_HOST/$MYSQL_PORT" 2>/dev/null; then
      ok "MySQL (容器名: $MYSQL_HOST) 可达"
    else
      err "MySQL 无法连接，请确认 Docker 服务已启动"
      return 1
    fi
  fi

  # 3.3 检查 PostgreSQL 是否可达
  info "检查 PostgreSQL 连接..."
  if timeout 3 bash -c "echo > /dev/tcp/$PG_HOST/$PG_PORT" 2>/dev/null; then
    ok "PostgreSQL ($PG_HOST:$PG_PORT) 可达"
  else
    err "PostgreSQL 无法连接，请确认 InsForge 服务运行中"
    err "检查: systemctl status insforge.service"
    return 1
  fi

  # 3.4 创建 pgloader 迁移配置文件
  local PGLOADER_DIR="/tmp/pgloader-migration"
  run_cmd "mkdir -p $PGLOADER_DIR"

  local LOAD_FILE="$PGLOADER_DIR/astron_rpa_to_pg.load"

  info "生成 pgloader 迁移配置..."
  run_cmd "cat > $LOAD_FILE << 'PGEOF'
-- pgloader 迁移脚本: AstronRPA MySQL → InsForge PostgreSQL
--
-- 使用方法:
--   pgloader $LOAD_FILE
--
-- 注意：需在 MySQL 服务运行（docker compose up -d）且 PostgreSQL 可达时执行
--

LOAD DATABASE
     FROM mysql://$MYSQL_USER:$MYSQL_PASS@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DB
     INTO postgresql://$PG_USER:$PG_PASS@$PG_HOST:$PG_PORT/$PG_DB

WITH
     -- 迁移策略
     create no tables,          -- 不建表（表结构已通过 InsForge migration 创建）
     drop indexes,              -- 重建索引确保一致性
     reset sequences,           -- 重置序列
     foreign keys,              -- 保留外键
     batch concurrency = 1,     -- 单并发，避免死锁
     batch size = 50000,        -- 每批 5 万行
     prefetch rows = 50000      -- 预取行数

SET
     maintenance_work_mem = '128MB',
     work_mem = '64MB'

-- 只迁移 AstronRPA 需要的表（排除 InsForge 系统表）
-- 如需迁移全部表，移除 EXCLUDING TABLE NAMES MATCHING 部分
EXCLUDING TABLE NAMES MATCHING
     'knex_migrations',
     'knex_migrations_lock',
     'migrations',
     'insforge_%',
     'auth_%'

BEFORE LOAD DO
     -- 关闭目标表触发器，避免外键冲突
     \$\$ SET session_replication_role = 'replica'; \$\$,
     -- 清空目标表（如果已有数据）
     \$\$ TRUNCATE TABLE c_atom_meta_new CASCADE; \$\$

AFTER LOAD DO
     -- 恢复触发器
     \$\$ SET session_replication_role = 'origin'; \$\$,
     -- 更新序列
     \$\$ SELECT setval('c_atom_meta_new_id_seq', COALESCE((SELECT MAX(id) FROM c_atom_meta_new), 1)); \$\$;
PGEOF"
  ok "迁移配置文件已生成: $LOAD_FILE"

  # 3.5 执行迁移
  info "开始执行数据迁移..."
  info "迁移的表：c_atom_meta_new 等 AstronRPA 业务表"
  info "预计耗时：视数据量而定（几秒到几分钟）"
  echo ""

  if run_cmd "pgloader $LOAD_FILE 2>&1"; then
    ok "pgloader 迁移命令已执行"
  else
    err "迁移命令执行失败，请查看上方错误信息"
    warn "常见问题："
    warn "  1. 目标表在 PostgreSQL 中不存在 —— 需先执行 InsForge migration"
    warn "  2. 数据类型不兼容 —— pgloader 会自动转换大多数类型"
    warn "  3. 外键冲突 —— 试调整迁移顺序或使用 BEFORE LOAD 清空数据"
    return 1
  fi

  # 3.6 迁移后验证
  info "迁移完成，验证数据..."
  echo ""

  # 验证 MySQL 和 PostgreSQL 的行数一致性
  local tables=(
    "c_atom_meta_new"
    "c_project"
    "c_robot"
    "c_task"
    "c_record"
    "c_component"
    "c_atom_like"
    "c_market_app"
    "c_team"
  )

  echo "表名                          MySQL    PostgreSQL  差异"
  echo "────────────────────────────────────────────────────────"
  for table in "${tables[@]}"; do
    local mysql_count="N/A"
    local pg_count="N/A"

    # MySQL 行数
    if timeout 5 bash -c "echo > /dev/tcp/$MYSQL_HOST/$MYSQL_PORT" 2>/dev/null; then
      mysql_count=$(mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASS" "$MYSQL_DB" -e "SELECT COUNT(*) FROM $table;" -N 2>/dev/null || echo "N/A")
    fi

    # PostgreSQL 行数
    if timeout 5 bash -c "echo > /dev/tcp/$PG_HOST/$PG_PORT" 2>/dev/null; then
      export PGPASSWORD="$PG_PASS"
      pg_count=$(psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" -t -c "SELECT COUNT(*) FROM $table;" 2>/dev/null || echo "N/A")
    fi

    printf "%-30s %-10s %-10s" "$table" "$mysql_count" "$pg_count"
    if [ "$mysql_count" != "N/A" ] && [ "$pg_count" != "N/A" ] && [ "$mysql_count" = "$pg_count" ]; then
      echo -e "  ${GREEN}✓${NC}"
    elif [ "$mysql_count" = "N/A" ] || [ "$pg_count" = "N/A" ]; then
      echo -e "  ${YELLOW}?${NC}（无法查询）"
    else
      echo -e "  ${RED}✗${NC}（MySQL: $mysql_count, PG: $pg_count）"
    fi
  done
  echo ""

  ok "数据迁移验证完成"
}

# ── V: 全量验证 ──────────────────────────────────────────────────────────────
s4_validate_all() {
  step "[V] 全量验证"

  # V1: 端口检查
  echo ""
  info "【V1】端口可达性检查"
  echo "────────────────────────────────────────"
  for port in "${!PORTS[@]}"; do
    check_port "127.0.0.1" "$port" "${PORTS[$port]}"
  done

  # V2: API 健康检查
  echo ""
  info "【V2】API 健康检查"
  echo "────────────────────────────────────────"

  # InsForge API
  if timeout 3 bash -c "echo > /dev/tcp/127.0.0.1/7130" 2>/dev/null; then
    local insforge_health
    insforge_health=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "http://127.0.0.1:7130/api/health" 2>/dev/null || echo "000")
    if [ "$insforge_health" = "200" ]; then
      ok "InsForge API 健康检查: 200 ✅"
    else
      warn "InsForge API 健康检查响应: $insforge_health"
    fi
  fi

  # AstronRPA Gateway
  if timeout 3 bash -c "echo > /dev/tcp/127.0.0.1/32742" 2>/dev/null; then
    local gateway_health
    gateway_health=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://127.0.0.1:32742/api/robot/robots" 2>/dev/null || echo "000")
    if [ "$gateway_health" = "200" ]; then
      ok "AstronRPA Gateway 响应 200 ✅"
    else
      warn "AstronRPA Gateway 响应: $gateway_health"
    fi
  fi

  # V3: 数据库连接检查
  echo ""
  info "【V3】数据库连接检查"
  echo "────────────────────────────────────────"
  if command -v psql &>/dev/null; then
    export PGPASSWORD="$PG_PASS"
    if psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" -c "SELECT 1 AS ping;" -t 2>/dev/null | grep -q 1; then
      ok "PostgreSQL 连接正常 ✅"
    else
      warn "PostgreSQL 连接失败"
    fi
  else
    warn "psql 未安装，跳过 PostgreSQL 连接检查"
  fi

  if command -v mysql &>/dev/null; then
    if mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASS" "$MYSQL_DB" -e "SELECT 1 AS ping;" -N 2>/dev/null | grep -q 1; then
      ok "MySQL 连接正常 ✅"
    else
      warn "MySQL 连接失败"
    fi
  else
    warn "mysql 客户端未安装，跳过 MySQL 连接检查"
  fi

  # V4: crudApi 可查询验证（通过 insforge-sdk 测试）
  echo ""
  info "【V4】SDK CRUD API 可查询验证"
  echo "────────────────────────────────────────"
  info "需要用浏览器或 Node.js 环境执行以下 JS 代码："
  echo ""
  echo "  import { createClient } from '@insforge/sdk'"
  echo ""
  echo "  const insforge = createClient({"
  echo "    baseUrl: 'http://172.16.100.211:7130',"
  echo "    anonKey: 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f',"
  echo "  })"
  echo ""
  echo "  // 验证列表查询"
  echo "  const { data, error } = await insforge.database"
  echo "    .from('c_atom_meta_new')"
  echo "    .select('*')"
  echo "    .limit(5)"
  echo "  console.log('atomMeta list:', { data, error })"
  echo ""
  echo "  // 验证单条查询"
  echo "  const { data: one, error: err1 } = await insforge.database"
  echo "    .from('c_atom_meta_new')"
  echo "    .select('*')"
  echo "    .eq('id', 1)"
  echo "    .single()"
  echo "  console.log('atomMeta get(1):', { data: one, error: err1 })"
  echo ""

  # V5: 容器资源概览
  echo ""
  info "【V5】容器资源概览"
  echo "────────────────────────────────────────"
  if command -v docker &>/dev/null; then
    run_cmd "docker stats --no-stream --format 'table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}' 2>&1 || true"
  else
    warn "Docker 不可用，跳过容器概览"
  fi

  echo ""
  ok "全量验证完成"
  echo ""
  info "如需完整检查 crudApi，请在浏览器控制台执行上述【V4】代码"
}

# ── 主流程 ────────────────────────────────────────────────────────────────────
main() {
  echo -e "${BLUE}"
  echo "  ┌─────────────────────────────────────────────┐"
  echo "  │       AstronRPA 服务端启动 + 验证脚本        │"
  echo "  └─────────────────────────────────────────────┘"
  echo -e "${NC}"
  date "+  开始时间: %Y-%m-%d %H:%M:%S"
  if [ "$DRY_RUN" = "true" ]; then
    echo -e "  模式: ${YELLOW}DRY-RUN（仅打印，不执行）${NC}"
  fi
  echo ""

  case "${STEP:-all}" in
    all)
      s1_start_docker
      echo ""
      s2_check_deno
      echo ""
      s3_run_pgloader
      echo ""
      s4_validate_all
      ;;
    docker)
      s1_start_docker
      ;;
    deno)
      s2_check_deno
      ;;
    pgloader)
      s3_run_pgloader
      ;;
    validate)
      s4_validate_all
      ;;
    *)
      err "未知步骤: $STEP"
      echo "可用步骤: docker, deno, pgloader, validate"
      exit 1
      ;;
  esac

  echo ""
  echo -e "${BLUE}══════════════════════════════════════════════════${NC}"
  if [ "$DRY_RUN" = "true" ]; then
    echo -e "${YELLOW}  DRY-RUN 完成！以上命令未实际执行。${NC}"
  else
    echo -e "${GREEN}  脚本执行完成！${NC}"
  fi
  date "+  结束时间: %Y-%m-%d %H:%M:%S"
  echo -e "${BLUE}══════════════════════════════════════════════════${NC}"
  echo ""
  echo "后续手动操作提示："
  echo "  1. 前端启动验证: cd frontend && pnpm dev:web"
  echo "  2. 登录验证: F12 → console → signInWithPassword()"
  echo "  3. 页面回归: 逐个打开迁移页面确认数据展示"
}

# ── 执行 ──────────────────────────────────────────────────────────────────────
main "$@"