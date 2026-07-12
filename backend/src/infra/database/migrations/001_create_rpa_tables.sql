-- ============================================
-- AstronRPA 核心业务表迁移
-- 放置在 backend/src/infra/database/migrations/
-- ============================================

-- 1. 机器人（Agent）表
CREATE TABLE IF NOT EXISTS public.robots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    agent_key VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'offline',
    host_name VARCHAR(255),
    ip_address VARCHAR(45),
    os_version VARCHAR(100),
    version VARCHAR(50),
    last_heartbeat TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 2. 项目表
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 3. 流程（Workflow）表
CREATE TABLE IF NOT EXISTS public.workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_id UUID REFERENCES public.projects(id),
    workflow_data JSONB,
    version INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 4. 任务表
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    workflow_id UUID REFERENCES public.workflows(id),
    robot_id UUID REFERENCES public.robots(id),
    trigger_type VARCHAR(50) DEFAULT 'manual',
    cron_expression VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    priority INTEGER DEFAULT 0,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 5. 执行记录表
CREATE TABLE IF NOT EXISTS public.executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES public.tasks(id),
    robot_id UUID REFERENCES public.robots(id),
    workflow_id UUID REFERENCES public.workflows(id),
    status VARCHAR(50) DEFAULT 'running',
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    duration_ms INTEGER,
    result JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 6. 执行日志表
CREATE TABLE IF NOT EXISTS public.execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES public.executions(id),
    level VARCHAR(20) DEFAULT 'info',
    message TEXT,
    component_name VARCHAR(100),
    logged_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 7. 组件市场表
CREATE TABLE IF NOT EXISTS public.market_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    version VARCHAR(50),
    package_name VARCHAR(255),
    is_public BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 8. 触发器表
CREATE TABLE IF NOT EXISTS public.triggers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    config JSONB,
    task_id UUID REFERENCES public.tasks(id),
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- 9. Astron Agent 认证表
CREATE TABLE IF NOT EXISTS public.astron_agent_auth (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key VARCHAR(512) NOT NULL,
    api_secret VARCHAR(512) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================
-- RLS 行级安全策略
-- ============================================
ALTER TABLE public.robots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.astron_agent_auth ENABLE ROW LEVEL SECURITY;

-- 通用 RLS：用户只能看自己的数据
DROP POLICY IF EXISTS "Users can only access their own data" ON public.robots;
CREATE POLICY "Users can only access their own data" ON public.robots
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.projects;
CREATE POLICY "Users can only access their own data" ON public.projects
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.workflows;
CREATE POLICY "Users can only access their own data" ON public.workflows
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.tasks;
CREATE POLICY "Users can only access their own data" ON public.tasks
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.executions;
CREATE POLICY "Users can only access their own data" ON public.executions
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.execution_logs;
CREATE POLICY "Users can only access their own data" ON public.execution_logs
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.market_components;
CREATE POLICY "Users can only access their own data" ON public.market_components
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.triggers;
CREATE POLICY "Users can only access their own data" ON public.triggers
    FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can only access their own data" ON public.astron_agent_auth;
CREATE POLICY "Users can only access their own data" ON public.astron_agent_auth
    FOR ALL USING (auth.uid() = user_id);

-- 组件市场公开数据可被所有用户查看
DROP POLICY IF EXISTS "Public components are viewable by all" ON public.market_components;
CREATE POLICY "Public components are viewable by all" ON public.market_components
    FOR SELECT USING (is_public = true);

-- ============================================
-- 索引
-- ============================================
CREATE INDEX IF NOT EXISTS idx_robots_user_id ON public.robots(user_id);
CREATE INDEX IF NOT EXISTS idx_robots_status ON public.robots(status);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_project_id ON public.workflows(project_id);
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON public.workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_workflow_id ON public.tasks(workflow_id);
CREATE INDEX IF NOT EXISTS idx_tasks_robot_id ON public.tasks(robot_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_executions_task_id ON public.executions(task_id);
CREATE INDEX IF NOT EXISTS idx_executions_robot_id ON public.executions(robot_id);
CREATE INDEX IF NOT EXISTS idx_executions_user_id ON public.executions(user_id);
CREATE INDEX IF NOT EXISTS idx_execution_logs_execution_id ON public.execution_logs(execution_id);
CREATE INDEX IF NOT EXISTS idx_market_components_user_id ON public.market_components(user_id);
CREATE INDEX IF NOT EXISTS idx_triggers_task_id ON public.triggers(task_id);
CREATE INDEX IF NOT EXISTS idx_triggers_user_id ON public.triggers(user_id);
CREATE INDEX IF NOT EXISTS idx_astron_agent_auth_user_id ON public.astron_agent_auth(user_id);

-- ============================================
-- 实时通知触发器（PostgreSQL LISTEN/NOTIFY）
-- ============================================
CREATE OR REPLACE FUNCTION public.notify_execution_change()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('realtime_message', json_build_object(
        'table', TG_TABLE_NAME,
        'schema', TG_TABLE_SCHEMA,
        'event', TG_OP,
        'id', NEW.id
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS execution_change_trigger ON public.executions;
CREATE TRIGGER execution_change_trigger
    AFTER INSERT OR UPDATE ON public.executions
    FOR EACH ROW EXECUTE FUNCTION public.notify_execution_change();

-- ============================================
-- RLS 自动设置 user_id 触发器
-- 确保 INSERT 时 user_id 自动填充为当前用户
-- ============================================
CREATE OR REPLACE FUNCTION public.set_user_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.user_id = auth.uid();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有 RPA 业务表添加 BEFORE INSERT 触发器
DROP TRIGGER IF EXISTS trg_robots_set_user_id ON public.robots;
CREATE TRIGGER trg_robots_set_user_id
    BEFORE INSERT ON public.robots
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_projects_set_user_id ON public.projects;
CREATE TRIGGER trg_projects_set_user_id
    BEFORE INSERT ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_workflows_set_user_id ON public.workflows;
CREATE TRIGGER trg_workflows_set_user_id
    BEFORE INSERT ON public.workflows
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_tasks_set_user_id ON public.tasks;
CREATE TRIGGER trg_tasks_set_user_id
    BEFORE INSERT ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_executions_set_user_id ON public.executions;
CREATE TRIGGER trg_executions_set_user_id
    BEFORE INSERT ON public.executions
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_execution_logs_set_user_id ON public.execution_logs;
CREATE TRIGGER trg_execution_logs_set_user_id
    BEFORE INSERT ON public.execution_logs
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_market_components_set_user_id ON public.market_components;
CREATE TRIGGER trg_market_components_set_user_id
    BEFORE INSERT ON public.market_components
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_triggers_set_user_id ON public.triggers;
CREATE TRIGGER trg_triggers_set_user_id
    BEFORE INSERT ON public.triggers
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

DROP TRIGGER IF EXISTS trg_astron_agent_auth_set_user_id ON public.astron_agent_auth;
CREATE TRIGGER trg_astron_agent_auth_set_user_id
    BEFORE INSERT ON public.astron_agent_auth
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

-- 10. 共享文件表
CREATE TABLE IF NOT EXISTS public.shared_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    file_size BIGINT DEFAULT 0,
    file_type VARCHAR(100),
    storage_bucket VARCHAR(100) DEFAULT 'rpa-shared',
    tags JSONB DEFAULT '[]'::jsonb,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

ALTER TABLE public.shared_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access their project's shared files" ON public.shared_files;
CREATE POLICY "Users can access their project's shared files" ON public.shared_files
    FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_shared_files_project_id ON public.shared_files(project_id);
CREATE INDEX IF NOT EXISTS idx_shared_files_user_id ON public.shared_files(user_id);

DROP TRIGGER IF EXISTS trg_shared_files_set_user_id ON public.shared_files;
CREATE TRIGGER trg_shared_files_set_user_id
    BEFORE INSERT ON public.shared_files
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();

-- 11. 共享变量表
CREATE TABLE IF NOT EXISTS public.shared_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id),
    var_name VARCHAR(255) NOT NULL,
    var_key VARCHAR(255) NOT NULL UNIQUE,
    var_value TEXT,
    encrypt BOOLEAN DEFAULT false,
    sub_vars JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

ALTER TABLE public.shared_variables ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access their project's shared variables" ON public.shared_variables;
CREATE POLICY "Users can access their project's shared variables" ON public.shared_variables
    FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_shared_variables_project_id ON public.shared_variables(project_id);
CREATE INDEX IF NOT EXISTS idx_shared_variables_var_key ON public.shared_variables(var_key);
CREATE INDEX IF NOT EXISTS idx_shared_variables_user_id ON public.shared_variables(user_id);

DROP TRIGGER IF EXISTS trg_shared_variables_set_user_id ON public.shared_variables;
CREATE TRIGGER trg_shared_variables_set_user_id
    BEFORE INSERT ON public.shared_variables
    FOR EACH ROW EXECUTE FUNCTION public.set_user_id();