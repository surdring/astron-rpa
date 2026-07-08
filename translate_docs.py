#!/usr/bin/env python3
"""
Translate API reference .md files to Chinese (.zh.md).
Keeps all markdown, code blocks, links, front matter, and JSON data intact.
Only translates human-readable text (titles, descriptions, labels, etc.)
"""

import os
import re
import glob as glob_module

# Base directory
BASE_DIR = r"D:\develop\astron-rpa\zheng-docs\insforge-docs\api-reference"

# Subdirectories to process (excluding admin and client)
TARGET_DIRS = [
    "channels",
    "configuration",
    "messages",
    "payment-webhooks",
    "permissions",
    "razorpay-payments",
    "s3-access-keys",
    "s3-protocol",
    "stripe-payments",
]

# Translation dictionary for common terms
TRANSLATIONS = {
    # Category labels (appear as standalone text)
    "Channels": "频道",
    "Configuration": "配置",
    "Messages": "消息",
    "Payment Webhooks": "支付 Webhook",
    "Permissions": "权限",
    "Razorpay Payments": "Razorpay 支付",
    "S3 Access Keys": "S3 访问密钥",
    "S3 Protocol": "S3 协议",
    "Stripe Payments": "Stripe 支付",
    
    # Common UI elements
    "Copy page": "复制页面",
    "Try it": "尝试",
    "cURL": "cURL",
    
    # HTTP methods
    "GET": "GET",
    "POST": "POST",
    "PUT": "PUT",
    "DELETE": "DELETE",
    "PATCH": "PATCH",
    "HEAD": "HEAD",
    
    # Common field labels
    "required": "必需",
    "optional": "可选",
    "default:": "默认值:",
    "default:true": "默认值:true",
    "default:false": "默认值:false",
    "default:50": "默认值:50",
    "default:100": "默认值:100",
    "write-only": "只写",
    
    # Authorizations
    "#### Authorizations": "#### 授权",
    "Authorization": "授权",
    "bearerAuthapiKeybearerAuthapiKey": "bearerAuthapiKeybearerAuthapiKey",
    
    # Common descriptions
    "Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.": "Bearer 认证头部，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。",
    
    # Section headers
    "#### Body": "#### 请求体",
    "#### Path Parameters": "#### 路径参数",
    "#### Query Parameters": "#### 查询参数",
    "#### Response": "#### 响应",
    "application/json": "application/json",
    
    # Enum labels
    "Available options:": "可用选项:",
    "Example:": "示例:",
    
    # String constraints
    "Minimum string length:": "最小字符串长度:",
    "Maximum string length:": "最大字符串长度:",
    "Required string length:": "所需字符串长度:",
    "Required range:": "所需范围:",
    
    # Show child attributes
    "Show child attributes": "显示子属性",
    
    # True/False
    "true": "true",
    "false": "false",
    
    # Common boilerplate in descriptions
    "Unique identifier for the": "唯一标识符",
    "Timestamp when the": "时间戳",
    
    # Environment options
    "Payment provider environment.": "支付提供商环境。",
    
    # Body / response descriptions
    "The body is of type `object`.": "请求体类型为 `object`。",
}

# Regex patterns for JSON-like content (code blocks)
CODE_BLOCK_PATTERN = re.compile(r'```[\s\S]*?```')

def is_code_block_line(line):
    """Check if a line is inside a code block"""
    stripped = line.strip()
    return stripped.startswith('```') or stripped.startswith('{') or stripped.startswith('[') or stripped == ''

def translate_line(line, file_context=""):
    """Translate a single line of text, preserving markdown syntax"""
    stripped = line.strip()
    
    # Skip empty lines
    if not stripped:
        return line
    
    # Skip code blocks
    if stripped.startswith('```') or stripped.startswith('{') or stripped.startswith('['):
        return line
    
    # Skip lines that are purely URLs or technical
    if stripped.startswith('http://') or stripped.startswith('https://'):
        return line
    
    # Skip lines that look like JSON/code
    if re.match(r'^[\s]*["\w]+:', stripped) and not stripped.startswith('#'):
        return line
    
    # Don't translate lines that are purely numeric or technical identifiers
    if re.match(r'^[\d\s]+$', stripped):
        return line
    
    # Check if line is inside a code block by checking if it looks like code
    if re.match(r'^\s*["[{]', stripped):
        return line
    
    # Check for standalone title text (e.g. "Create Channel" on line 1)
    if stripped in TITLE_TRANSLATIONS:
        indent = line[:len(line) - len(line.lstrip())]
        return indent + TITLE_TRANSLATIONS[stripped]
    
    # Check for direct translation matches
    if stripped in TRANSLATIONS:
        indent = line[:len(line) - len(line.lstrip())]
        return indent + TRANSLATIONS[stripped]
    
    # Check for partial matches (prefix-based)
    for eng, cn in [
        ("Minimum string length: ", "最小字符串长度: "),
        ("Maximum string length: ", "最大字符串长度: "),
        ("Required string length: ", "所需字符串长度: "),
        ("Required range: ", "所需范围: "),
        ("default:", "默认值:"),
    ]:
        if stripped.startswith(eng):
            indent = line[:len(line) - len(line.lstrip())]
            rest = stripped[len(eng):]
            return indent + cn + rest
    
    return None  # Signal that this line needs more complex handling


def should_skip_line(stripped):
    """Check if a line should be skipped (not translated)"""
    # Skip empty
    if not stripped:
        return True
    # Skip code blocks markers
    if stripped.startswith('```'):
        return True
    # Skip URLs
    if stripped.startswith('http://') or stripped.startswith('https://'):
        return True
    # Skip JSON/code-like content
    if stripped.startswith('{') or stripped.startswith('['):
        return True
    # Skip markdown links that are pure navigation
    if stripped.startswith('[') and '](/api-reference/' in stripped:
        return True
    # Skip lines that are just numbers
    if re.match(r'^\d+$', stripped):
        return True
    # Skip social links
    if stripped.startswith('[x](') or stripped.startswith('[github](') or stripped.startswith('[linkedin]('):
        return True
    if stripped.startswith('⌘I'):
        return True
    return False


def process_file(filepath):
    """Process a single .md file and create its .zh.md translation"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    result_lines = []
    
    inside_code_block = False
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            inside_code_block = not inside_code_block
            result_lines.append(line)
            i += 1
            continue
        
        # Don't translate inside code blocks
        if inside_code_block:
            result_lines.append(line)
            i += 1
            continue
        
        # Don't translate certain patterns
        if should_skip_line(stripped):
            result_lines.append(line)
            i += 1
            continue
        
        # Try direct translation
        translated = translate_line(line)
        if translated is not None:
            result_lines.append(translated)
            i += 1
            continue
        
        # Handle multi-line patterns
        # Check for some specific patterns
        indent = line[:len(line) - len(line.lstrip())]
        
        # Translate title headings # Some Title, ## Some Title
        title_match = re.match(r'^(#{1,6})\s+(.+)$', stripped)
        if title_match:
            level = title_match.group(1)
            text = title_match.group(2)
            cn_text = translate_title(text)
            result_lines.append(f"{indent}{level} {cn_text}")
            i += 1
            continue
        
        # Translate plain text descriptions (the main body text)
        # These are the human-readable descriptions
        if is_english_text(stripped):
            cn = translate_english_text(stripped)
            if cn:
                result_lines.append(f"{indent}{cn}\n")
                i += 1
                continue
        
        # If nothing matched, keep the original
        result_lines.append(line)
        i += 1
    
    # Write the .zh.md file
    zh_filepath = filepath.replace('.md', '.zh.md')
    with open(zh_filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(result_lines))
    
    print(f"Created: {zh_filepath}")


def is_english_text(text):
    """Check if text is primarily English prose (not code/data)"""
    # Skip if contains code markers
    if '`' in text:
        return False
    # Skip markdown links
    if '[' in text and '](' in text:
        return False
    # Check if it has English words
    has_alpha = bool(re.search(r'[a-zA-Z]{3,}', text))
    # Should not be primarily numbers or symbols
    alpha_ratio = sum(1 for c in text if c.isalpha()) / max(len(text), 1)
    return has_alpha and alpha_ratio > 0.3


# Comprehensive title translations
TITLE_TRANSLATIONS = {
    "Create Channel": "创建频道",
    "Delete Channel": "删除频道",
    "Get Channel by ID": "根据 ID 获取频道",
    "List All Channels": "列出所有频道",
    "Update Channel": "更新频道",
    "Get Realtime Config": "获取实时配置",
    "Update Realtime Config": "更新实时配置",
    "Clear Messages": "清除消息",
    "Get Message Statistics": "获取消息统计",
    "List Messages": "列出消息",
    "Receive Razorpay Webhook": "接收 Razorpay Webhook",
    "Receive Stripe Webhook": "接收 Stripe Webhook",
    "Get Realtime Permissions": "获取实时权限",
    "Create S3 Access Key": "创建 S3 访问密钥",
    "Get S3 Gateway Config": "获取 S3 网关配置",
    "List S3 Access Keys": "列出 S3 访问密钥",
    "Revoke S3 Access Key": "撤销 S3 访问密钥",
    "S3 protocol (DELETE)": "S3 协议 (DELETE)",
    "S3 protocol (GET)": "S3 协议 (GET)",
    "S3 protocol (HEAD)": "S3 协议 (HEAD)",
    "S3 protocol (POST)": "S3 协议 (POST)",
    "S3 protocol (PUT)": "S3 协议 (PUT)",
    "Cancel Razorpay Subscription": "取消 Razorpay 订阅",
    "Configure Razorpay Keys": "配置 Razorpay 密钥",
    "Create Razorpay Item": "创建 Razorpay 项目",
    "Create Razorpay Order": "创建 Razorpay 订单",
    "Create Razorpay Plan": "创建 Razorpay 计划",
    "Create Razorpay Subscription": "创建 Razorpay 订阅",
    "Get Razorpay Key Configuration": "获取 Razorpay 密钥配置",
    "Get Razorpay Payments Status": "获取 Razorpay 支付状态",
    "Get Razorpay Webhook Setup Values": "获取 Razorpay Webhook 设置值",
    "List Razorpay Customers": "列出 Razorpay 客户",
    "List Razorpay Payment Catalog": "列出 Razorpay 支付目录",
    "List Razorpay Subscriptions": "列出 Razorpay 订阅",
    "List Razorpay Transactions": "列出 Razorpay 交易",
    "Pause Razorpay Subscription": "暂停 Razorpay 订阅",
    "Remove Razorpay Keys": "移除 Razorpay 密钥",
    "Resume Razorpay Subscription": "恢复 Razorpay 订阅",
    "Rotate Razorpay Webhook Secret": "轮换 Razorpay Webhook 密钥",
    "Sync Razorpay Payments State": "同步 Razorpay 支付状态",
    "Sync Razorpay Payments State For One Environment": "同步单个环境的 Razorpay 支付状态",
    "Update Razorpay Item": "更新 Razorpay 项目",
    "Verify Razorpay Order Payment": "验证 Razorpay 订单支付",
    "Verify Razorpay Subscription Authorization": "验证 Razorpay 订阅授权",
    "Archive Stripe Price": "归档 Stripe 价格",
    "Configure Managed Stripe Webhook": "配置托管 Stripe Webhook",
    "Configure Stripe Secret Key": "配置 Stripe 密钥",
    "Create Stripe Checkout Session": "创建 Stripe 结账会话",
    "Create Stripe Customer Portal Session": "创建 Stripe 客户门户会话",
    "Create Stripe Price": "创建 Stripe 价格",
    "Create Stripe Product": "创建 Stripe 产品",
    "Delete Stripe Product": "删除 Stripe 产品",
    "Get Stripe Key Configuration": "获取 Stripe 密钥配置",
    "Get Stripe Payments Status": "获取 Stripe 支付状态",
    "Get Stripe Price": "获取 Stripe 价格",
    "Get Stripe Product": "获取 Stripe 产品",
    "List Stripe Catalog": "列出 Stripe 目录",
    "List Stripe Customers": "列出 Stripe 客户",
    "List Stripe Prices": "列出 Stripe 价格",
    "List Stripe Products": "列出 Stripe 产品",
    "List Stripe Subscriptions": "列出 Stripe 订阅",
    "List Stripe Transactions": "列出 Stripe 交易",
    "Remove Stripe Secret Key": "移除 Stripe 密钥",
    "Sync Stripe Payments State": "同步 Stripe 支付状态",
    "Sync Stripe Payments State For One Environment": "同步单个环境的 Stripe 支付状态",
    "Update Stripe Price": "更新 Stripe 价格",
    "Update Stripe Product": "更新 Stripe 产品",
}


def translate_title(text):
    """Translate title text"""
    if text in TITLE_TRANSLATIONS:
        return TITLE_TRANSLATIONS[text]
    return text


# Description translations
DESCRIPTION_TRANSLATIONS = {
    "Create a new realtime channel with a pattern for subscription matching": 
        "创建一个新的实时频道，包含用于订阅匹配的模式",
    "Delete a channel definition. Existing message history is preserved with null channelId values.": 
        "删除频道定义。现有消息历史将以 null 的 channelId 值保留。",
    "Retrieve a specific channel by its UUID": 
        "根据 UUID 获取特定频道",
    "Retrieve all configured realtime channels": 
        "获取所有已配置的实时频道",
    "Update an existing channel's configuration": 
        "更新现有频道的配置",
    "Retrieve realtime message retention configuration": 
        "获取实时消息保留配置",
    "Update realtime message retention configuration": 
        "更新实时消息保留配置",
    "Permanently delete all stored realtime messages": 
        "永久删除所有存储的实时消息",
    "Retrieve aggregated statistics about messages": 
        "获取消息的聚合统计信息",
    "Retrieve message history with optional filters": 
        "获取消息历史记录，支持可选筛选条件",
    "Receive Razorpay events for one environment. The request body must be the raw Razorpay JSON body and must include the Razorpay signature header.": 
        "接收单个环境的 Razorpay 事件。请求体必须是原始的 Razorpay JSON 体，并且必须包含 Razorpay 签名头部。",
    "Receive Stripe events for one environment. The request body must be the raw Stripe JSON body and must include the Stripe signature header.": 
        "接收单个环境的 Stripe 事件。请求体必须是原始的 Stripe JSON 体，并且必须包含 Stripe 签名头部。",
    "Retrieve RLS policies for subscribe (channels) and publish (messages) operations": 
        "获取订阅（频道）和发布（消息）操作的 RLS 策略",
    "Mint a new S3 credential pair usable against the `/storage/v1/s3` protocol gateway.": 
        "创建一个新的 S3 凭证对，可用于 `/storage/v1/s3` 协议网关。",
    "The plaintext `secretAccessKey` in the response is returned **exactly once** — it is encrypted at rest and can never be retrieved again. If you lose it, revoke and re-create.": 
        "响应中的明文 `secretAccessKey` **仅返回一次**——它在存储时已加密，且无法再次获取。如果丢失，请撤销并重新创建。",
    "Limits:": "限制：",
    "* 50 keys per project (hard cap, enforced transactionally).": 
        "* 每个项目 50 个密钥（硬限制，事务性强制执行）。",
    "* Rate-limited to 20 management requests per 15 min per IP.": 
        "* 每个 IP 每 15 分钟限制 20 个管理请求。",
    "Return the externally-reachable endpoint URL and the SigV4 signing region for the S3 protocol gateway.": 
        "返回 S3 协议网关的外部可达端点 URL 和 SigV4 签名区域。",
    "The endpoint is assembled from the server's `VITE_API_BASE_URL` env var plus `/storage/v1/s3`, and the region is `AWS_REGION` (default `us-east-2`).": 
        "端点由服务器的 `VITE_API_BASE_URL` 环境变量加上 `/storage/v1/s3` 组成，区域为 `AWS_REGION`（默认为 `us-east-2`）。",
    "Intended for Dashboard display so the UI doesn't make any backend-topology assumptions client-side.": 
        "旨在用于仪表盘显示，使 UI 不在客户端做任何后端拓扑假设。",
    "Return every S3 access key configured for this project. Plaintext secrets are **never** returned here — the secret is only shown once in the response of `POST /api/storage/s3/access-keys`.": 
        "返回为此项目配置的每个 S3 访问密钥。明文密钥**绝不会**在此返回——密钥仅在 `POST /api/storage/s3/access-keys` 的响应中显示一次。",
    "Revoke an S3 access key by its id.": 
        "根据 ID 撤销 S3 访问密钥。",
    "The in-memory LRU cache is invalidated synchronously so subsequent S3 protocol requests with this credential return `403 InvalidAccessKeyId`.": 
        "内存中的 LRU 缓存会同步失效，因此后续使用此凭证的 S3 协议请求将返回 `403 InvalidAccessKeyId`。",
    "Dispatched to DeleteObject / DeleteBucket / AbortMultipartUpload based on path and query.": 
        "根据路径和查询分发到 DeleteObject / DeleteBucket / AbortMultipartUpload。",
    "Dispatched to ListBuckets / ListObjectsV2 / GetObject / HeadObject / ListParts / GetBucketLocation / GetBucketVersioning based on path shape and query.": 
        "根据路径形状和查询分发到 ListBuckets / ListObjectsV2 / GetObject / HeadObject / ListParts / GetBucketLocation / GetBucketVersioning。",
    "Dispatched to HeadBucket / HeadObject based on path shape.": 
        "根据路径形状分发到 HeadBucket / HeadObject。",
    "Dispatched to CreateMultipartUpload / CompleteMultipartUpload / DeleteObjects based on query.": 
        "根据查询分发到 CreateMultipartUpload / CompleteMultipartUpload / DeleteObjects。",
    "Dispatched to PutObject / UploadPart / CopyObject / CreateBucket based on path shape, query, and headers.": 
        "根据路径形状、查询和头部信息分发到 PutObject / UploadPart / CopyObject / CreateBucket。",
    "Standard path-style S3 path, e.g. `my-bucket/object-key`, `my-bucket` (bucket-level ops), or empty for ListBuckets.": 
        "标准路径风格的 S3 路径，例如 `my-bucket/object-key`、`my-bucket`（存储桶级操作），或为空表示 ListBuckets。",
    "Cancel a Razorpay subscription after evaluating the caller's UPDATE policy on payments.razorpay_subscriptions.": 
        "在评估调用者对 payments.razorpay_subscriptions 的 UPDATE 策略后取消 Razorpay 订阅。",
    "Validate and store Razorpay API keys for one environment. A webhook secret is generated automatically when one does not already exist.": 
        "验证并存储单个环境的 Razorpay API 密钥。当 webhook 密钥不存在时，会自动生成一个。",
    "Create a Razorpay Item, then mirror it locally after Razorpay succeeds.": 
        "创建 Razorpay 项目，然后在 Razorpay 成功后将其镜像到本地。",
    "Create a local Razorpay Order record with the caller's user context, create a Razorpay Order, and return Checkout options for the client-side Razorpay Checkout script.": 
        "使用调用者的用户上下文创建本地 Razorpay 订单记录，创建 Razorpay 订单，并返回客户端 Razorpay Checkout 脚本的结账选项。",
    "Create a Razorpay Plan with its amount-bearing item definition, then mirror it locally after Razorpay succeeds.": 
        "使用带金额的项目定义创建 Razorpay 计划，然后在 Razorpay 成功后将其镜像到本地。",
    "Create a Razorpay Subscription and mirror it locally, then return Checkout options for authorization.": 
        "创建 Razorpay 订阅并在本地镜像，然后返回用于授权的结账选项。",
    "The backend first evaluates the caller's INSERT policy on payments.razorpay_subscriptions so apps can restrict which subjects can start subscriptions.": 
        "后端首先评估调用者对 payments.razorpay_subscriptions 的 INSERT 策略，以便应用可以限制哪些主体可以开始订阅。",
    "Return masked Razorpay key configuration for test and live environments.": 
        "返回测试和生产环境的掩码 Razorpay 密钥配置。",
    "Return Razorpay connection and sync status for each environment.": 
        "返回每个环境的 Razorpay 连接和同步状态。",
    "Return the Razorpay webhook URL and signing secret that must be copied into the Razorpay Dashboard for manual webhook setup.": 
        "返回必须复制到 Razorpay 仪表盘以进行手动 webhook 设置的 Razorpay webhook URL 和签名密钥。",
    "Admin/debug read for mirrored Razorpay customers. This is a display mirror only and should not replace app-owned billing tables.": 
        "镜像 Razorpay 客户的管理/调试读取。仅用于显示镜像，不应替代应用拥有的计费表。",
    "Return mirrored Razorpay items and plans for one environment.": 
        "返回单个环境的镜像 Razorpay 项目和计划。",
    "Admin/debug read for mirrored Razorpay subscriptions. Use app-owned tables with RLS for end-user payment state.": 
        "镜像 Razorpay 订阅的管理/调试读取。使用带有 RLS 的应用自有表来存储最终用户支付状态。",
    "Admin/debug read for InsForge's Razorpay transaction projection. Use app-owned fulfillment tables with RLS for end-user order, credit, or entitlement state.": 
        "InsForge Razorpay 交易投影的管理/调试读取。使用带有 RLS 的应用自有履行表来存储最终用户订单、信用或权益状态。",
    "Pause a Razorpay subscription immediately after evaluating the caller's UPDATE policy on payments.razorpay_subscriptions.": 
        "在评估调用者对 payments.razorpay_subscriptions 的 UPDATE 策略后立即暂停 Razorpay 订阅。",
    "Remove the configured Razorpay keys for one environment.": 
        "移除单个环境的已配置 Razorpay 密钥。",
    "Resume a paused Razorpay subscription immediately after evaluating the caller's UPDATE policy on payments.razorpay_subscriptions.": 
        "在评估调用者对 payments.razorpay_subscriptions 的 UPDATE 策略后立即恢复已暂停的 Razorpay 订阅。",
    "Generate a new Razorpay webhook signing secret. Update the webhook secret in the Razorpay Dashboard after calling this endpoint.": 
        "生成新的 Razorpay webhook 签名密钥。调用此端点后，在 Razorpay 仪表盘中更新 webhook 密钥。",
    "Sync items, plans, customers, subscriptions, invoices, and payments for every configured Razorpay environment. Razorpay remains the source of truth.": 
        "同步每个已配置 Razorpay 环境的项目、计划、客户、订阅、发票和支付。Razorpay 仍然是数据源。",
    "Sync items, plans, customers, subscriptions, invoices, and payments for one Razorpay environment. Razorpay remains the source of truth.": 
        "同步单个 Razorpay 环境的项目、计划、客户、订阅、发票和支付。Razorpay 仍然是数据源。",
    "Update mutable Razorpay Item fields, then mirror the item locally after Razorpay succeeds.": 
        "更新可变的 Razorpay 项目字段，然后在 Razorpay 成功后将其镜像到本地。",
    "Verify the Razorpay Checkout signature for an order payment before recording the verified payment ID locally.": 
        "在本地记录已验证的支付 ID 之前，验证订单支付的 Razorpay Checkout 签名。",
    "Verify the Razorpay Checkout signature for the subscription authorization payment before recording the authorization payment ID locally.": 
        "在本地记录授权支付 ID 之前，验证订阅授权支付的 Razorpay Checkout 签名。",
    "Archive a Stripe price in one environment, then mirror the archived state locally.": 
        "归档单个环境中的 Stripe 价格，然后在本地镜像归档状态。",
    "Create or recreate the InsForge-managed Stripe webhook endpoint for one environment.": 
        "创建或重新创建单个环境的 InsForge 托管 Stripe webhook 端点。",
    "Validate and store a Stripe secret key. New Stripe accounts attempt managed webhook setup and then run a unified sync.": 
        "验证并存储 Stripe 密钥。新 Stripe 账户尝试托管 webhook 设置，然后运行统一同步。",
    "Create a local checkout attempt with the caller's user context and then create a Stripe Checkout Session. Subscription mode requires a billing subject.": 
        "使用调用者的用户上下文创建本地结账尝试，然后创建 Stripe 结账会话。订阅模式需要计费主体。",
    "Create a Stripe Billing Portal Session for an authenticated user's mapped billing subject.": 
        "为已验证用户的映射计费主体创建 Stripe 计费门户会话。",
    "Create a Stripe price in the requested environment, then mirror it locally after Stripe succeeds.": 
        "在请求的环境中创建 Stripe 价格，然后在 Stripe 成功后将其镜像到本地。",
    "Create a Stripe product in the requested environment, then mirror it locally after Stripe succeeds.": 
        "在请求的环境中创建 Stripe 产品，然后在 Stripe 成功后将其镜像到本地。",
    "Delete a Stripe product from one environment, then remove it from the local mirror.": 
        "从单个环境中删除 Stripe 产品，然后从本地镜像中移除。",
    "Return masked Stripe key configuration for test and live environments.": 
        "返回测试和生产环境的掩码 Stripe 密钥配置。",
    "Return Stripe connection, sync, and managed webhook status for each environment.": 
        "返回每个环境的 Stripe 连接、同步和托管 webhook 状态。",
    "Get one mirrored Stripe price.": 
        "获取一个镜像的 Stripe 价格。",
    "Get one mirrored Stripe product and its associated prices.": 
        "获取一个镜像的 Stripe 产品及其关联的价格。",
    "Return mirrored Stripe products and prices for one environment.": 
        "返回单个环境的镜像 Stripe 产品和价格。",
    "Admin/debug read for mirrored Stripe customers. This is a display mirror only and should not replace app-owned billing tables.": 
        "镜像 Stripe 客户的管理/调试读取。仅用于显示镜像，不应替代应用拥有的计费表。",
    "List mirrored Stripe prices for one environment, optionally filtered by product.": 
        "列出单个环境的镜像 Stripe 价格，可按产品筛选。",
    "List mirrored Stripe products for one environment.": 
        "列出单个环境的镜像 Stripe 产品。",
    "Admin/debug read for mirrored Stripe subscriptions. Use app-owned tables with RLS for end-user payment state.": 
        "镜像 Stripe 订阅的管理/调试读取。使用带有 RLS 的应用自有表来存储最终用户支付状态。",
    "Admin/debug read for InsForge's Stripe transaction projection. Use app-owned fulfillment tables with RLS for end-user order, credit, or entitlement state.": 
        "InsForge Stripe 交易投影的管理/调试读取。使用带有 RLS 的应用自有履行表来存储最终用户订单、信用或权益状态。",
    "Remove the configured Stripe secret key for one environment and best-effort remove managed webhook endpoints.": 
        "移除单个环境的已配置 Stripe 密钥，并尽力移除托管的 webhook 端点。",
    "Sync products, prices, customers, and subscriptions for every configured Stripe environment. Stripe remains the source of truth.": 
        "同步每个已配置 Stripe 环境的产品、价格、客户和订阅。Stripe 仍然是数据源。",
    "Sync products, prices, customers, and subscriptions for one Stripe environment. Stripe remains the source of truth.": 
        "同步单个 Stripe 环境的产品、价格、客户和订阅。Stripe 仍然是数据源。",
    "Update mutable Stripe price fields, then mirror the price locally after Stripe succeeds.": 
        "更新可变的 Stripe 价格字段，然后在 Stripe 成功后将其镜像到本地。",
    "Update a Stripe product, then mirror it locally after Stripe succeeds.": 
        "更新 Stripe 产品，然后在 Stripe 成功后将其镜像到本地。",
    
    # Field-level descriptions
    "Channel pattern for subscription matching. Uses SQL LIKE wildcards, for example \"order:%\".": 
        "用于订阅匹配的频道模式。使用 SQL LIKE 通配符，例如 \"order:%\"。",
    "Human-readable description of the channel": 
        "频道的可读描述",
    "URLs to receive webhook notifications": 
        "接收 webhook 通知的 URL",
    "Whether the channel should be active upon creation": 
        "频道创建后是否立即激活",
    "Whether the channel is currently active": 
        "频道当前是否激活",
    "Number of days messages are retained. Null means messages are kept indefinitely.": 
        "消息保留的天数。Null 表示消息无限期保留。",
    "Number of realtime messages deleted": 
        "已删除的实时消息数量",
    "Filter stats by channel ID": 
        "按频道 ID 筛选统计",
    "Filter stats since this timestamp": 
        "筛选自此时间戳以来的统计",
    "Total number of messages": 
        "消息总数",
    "Webhook delivery success rate (0-1)": 
        "Webhook 投递成功率 (0-1)",
    "Most frequent event types": 
        "最频繁的事件类型",
    "Filter messages by channel ID": 
        "按频道 ID 筛选消息",
    "Filter messages by event name": 
        "按事件名称筛选消息",
    "Maximum number of messages to return": 
        "返回的最大消息数",
    "Number of messages to skip": 
        "跳过的消息数量",
    "Unique identifier for the message": 
        "消息的唯一标识符",
    "Name of the event": 
        "事件名称",
    "Resolved channel name (instance of the pattern)": 
        "解析后的频道名称（模式的实例）",
    "Message payload data": 
        "消息负载数据",
    "Type of sender that published the message": 
        "发布消息的发送者类型",
    "Number of WebSocket clients who received the message": 
        "接收到消息的 WebSocket 客户端数量",
    "Number of webhooks that should receive the message": 
        "应接收消息的 webhook 数量",
    "Number of webhooks that successfully received the message": 
        "成功接收消息的 webhook 数量",
    "Timestamp when the message was created": 
        "消息创建时的时间戳",
    "ID of the channel this message belongs to": 
        "此消息所属频道的 ID",
    "ID of the user who sent the message (null for system messages)": 
        "发送消息的用户 ID（系统消息为 null）",
    "Updated channel pattern": 
        "更新后的频道模式",
    "Updated description": 
        "更新后的描述",
    "Updated webhook URLs": 
        "更新后的 webhook URL",
    "Updated enabled status": 
        "更新后的启用状态",
    "Channel created successfully": 
        "频道创建成功",
    "Channel deleted successfully": 
        "频道删除成功",
    "Channel details": 
        "频道详情",
    "Channel updated successfully": 
        "频道更新成功",
    "Realtime configuration": 
        "实时配置",
    "Realtime configuration updated": 
        "实时配置已更新",
    "Messages cleared": 
        "消息已清除",
    "Message statistics": 
        "消息统计",
    "List of messages": 
        "消息列表",
    "List of channels": 
        "频道列表",
    "Webhook received": 
        "Webhook 已接收",
    "Realtime RLS permissions": 
        "实时 RLS 权限",
    "Access key created": 
        "访问密钥已创建",
    "An S3 access key record (without the plaintext secret).": 
        "S3 访问密钥记录（不含明文密钥）。",
    "Gateway config": 
        "网关配置",
    "Read-only config of the S3 protocol gateway.": 
        "S3 协议网关的只读配置。",
    "List of access keys (without secrets)": 
        "访问密钥列表（不含密钥）",
    "Access key revoked": 
        "访问密钥已撤销",
    "UUID of the access key to revoke (from the create/list response)": 
        "要撤销的访问密钥的 UUID（来自创建/列表响应）",
    "Success": 
        "成功",
    "Razorpay subscription cancelled": 
        "Razorpay 订阅已取消",
    "Razorpay subscription ID.": 
        "Razorpay 订阅 ID。",
    "When true, cancels at the end of the current billing cycle. Defaults to immediate cancellation.": 
        "当为 true 时，在当前计费周期结束时取消。默认为立即取消。",
    "Updated Razorpay key configuration": 
        "更新后的 Razorpay 密钥配置",
    "Razorpay item created": 
        "Razorpay 项目已创建",
    "Razorpay Order created": 
        "Razorpay 订单已创建",
    "Notes keys starting with insforge_ are reserved and rejected.": 
        "以 insforge_ 开头的备注键被保留且会被拒绝。",
    "Native Razorpay notes. Use stable app identifiers such as `order_id` for webhook fulfillment triggers.": 
        "原生 Razorpay 备注。使用稳定的应用标识符（如 `order_id`）作为 webhook 履行触发器。",
    "Razorpay plan created": 
        "Razorpay 计划已创建",
    "Razorpay subscription created": 
        "Razorpay 订阅已创建",
    "Native Razorpay subscription notes, available in webhook payloads.": 
        "原生 Razorpay 订阅备注，可在 webhook 负载中使用。",
    "Razorpay key configuration": 
        "Razorpay 密钥配置",
    "Razorpay payments status": 
        "Razorpay 支付状态",
    "Razorpay webhook setup values": 
        "Razorpay webhook 设置值",
    "Webhook endpoint URL to copy into the Razorpay Dashboard.": 
        "要复制到 Razorpay 仪表盘的 Webhook 端点 URL。",
    "Raw signing secret to copy into the Razorpay Dashboard.": 
        "要复制到 Razorpay 仪表盘的原始签名密钥。",
    "Razorpay customers": 
        "Razorpay 客户",
    "Maximum rows to return.": 
        "最大返回行数。",
    "Synced Razorpay items and plans": 
        "已同步的 Razorpay 项目和计划",
    "Razorpay subscriptions": 
        "Razorpay 订阅",
    "Billing subject type. Must be provided together with subjectId.": 
        "计费主体类型。必须与 subjectId 一起提供。",
    "Billing subject ID. Must be provided together with subjectType.": 
        "计费主体 ID。必须与 subjectType 一起提供。",
    "Razorpay transactions": 
        "Razorpay 交易",
    "Razorpay subscription paused": 
        "Razorpay 订阅已暂停",
    "Razorpay subscription resumed": 
        "Razorpay 订阅已恢复",
    "Razorpay webhook setup values with the rotated secret": 
        "带有轮换后密钥的 Razorpay webhook 设置值",
    "Sync result for configured Razorpay environments": 
        "已配置 Razorpay 环境的同步结果",
    "Sync result for the requested Razorpay environment": 
        "请求的 Razorpay 环境的同步结果",
    "Razorpay item updated": 
        "Razorpay 项目已更新",
    "Razorpay order payment verified": 
        "Razorpay 订单支付已验证",
    "Razorpay subscription authorization verified": 
        "Razorpay 订阅授权已验证",
    "Price archived": 
        "价格已归档",
    "Managed webhook configuration result": 
        "托管 webhook 配置结果",
    "Updated Stripe key configuration": 
        "更新后的 Stripe 密钥配置",
    "Checkout Session created": 
        "结账会话已创建",
    "Metadata keys starting with insforge_ are reserved and rejected.": 
        "以 insforge_ 开头的元数据键被保留且会被拒绝。",
    "Customer Portal Session created": 
        "客户门户会话已创建",
    "Price created": 
        "价格已创建",
    "Product created": 
        "产品已创建",
    "Product deleted": 
        "产品已删除",
    "Stripe key configuration": 
        "Stripe 密钥配置",
    "Stripe payments status": 
        "Stripe 支付状态",
    "Price": 
        "价格",
    "Product and prices": 
        "产品与价格",
    "Synced Stripe products and prices": 
        "已同步的 Stripe 产品和价格",
    "Stripe customers": 
        "Stripe 客户",
    "Stripe prices": 
        "Stripe 价格",
    "Filter prices by Stripe product ID.": 
        "按 Stripe 产品 ID 筛选价格。",
    "Stripe products": 
        "Stripe 产品",
    "Stripe subscriptions": 
        "Stripe 订阅",
    "Stripe transactions": 
        "Stripe 交易",
    "Updated Stripe key configuration": 
        "更新后的 Stripe 密钥配置",
    "Sync result for configured environments": 
        "已配置环境的同步结果",
    "Sync result for the requested environment": 
        "请求的环境的同步结果",
    "Price updated": 
        "价格已更新",
    "Product updated": 
        "产品已更新",
    
    # Parameter field descriptions
    "Optional label to help you identify the key later": 
        "可选的标签，帮助您以后识别密钥",
    "Stripe price ID.": 
        "Stripe 价格 ID。",
    "Stripe product ID.": 
        "Stripe 产品 ID。",
    "Razorpay item ID.": 
        "Razorpay 项目 ID。",
    "Filter prices by product": 
        "按产品筛选价格",
    "Razorpay order ID.": 
        "Razorpay 订单 ID。",
    "Razorpay payment ID.": 
        "Razorpay 支付 ID。",
    
    # Subscription field descriptions
    "Either totalCount or endAt is required.": 
        "totalCount 或 endAt 为必填。",
    "Unix timestamp in seconds.": 
        "Unix 时间戳（秒）。",
}

# Response short descriptions
SHORT_RESPONSE_TRANSLATIONS = {
    "Razorpay item": "Razorpay 项目",
    "Razorpay items": "Razorpay 项目",
    "Razorpay plan": "Razorpay 计划",
    "Razorpay plans": "Razorpay 计划",
    "Stripe product": "Stripe 产品",
    "Stripe products": "Stripe 产品",
    "Stripe price": "Stripe 价格",
    "Stripe prices": "Stripe 价格",
    "Razorpay subscription": "Razorpay 订阅",
    "Razorpay subscriptions": "Razorpay 订阅",
    "Razorpay customer": "Razorpay 客户",
    "Razorpay customers": "Razorpay 客户",
    "Razorpay transaction": "Razorpay 交易",
    "Razorpay transactions": "Razorpay 交易",
    "Stripe subscription": "Stripe 订阅",
    "Stripe subscriptions": "Stripe 订阅",
    "Stripe customer": "Stripe 客户",
    "Stripe customers": "Stripe 客户",
    "Stripe transaction": "Stripe 交易",
    "Stripe transactions": "Stripe 交易",
    "Checkout Session": "结账会话",
    "Customer Portal Session": "客户门户会话",
}


def translate_english_text(text):
    """Translate an English text string"""
    if text in DESCRIPTION_TRANSLATIONS:
        return DESCRIPTION_TRANSLATIONS[text]
    
    # Try to find key -> strip trailing period
    text_no_period = text.rstrip('.')
    if text_no_period in DESCRIPTION_TRANSLATIONS:
        return DESCRIPTION_TRANSLATIONS[text_no_period] + '.'
    
    # Check short response translations
    if text in SHORT_RESPONSE_TRANSLATIONS:
        return SHORT_RESPONSE_TRANSLATIONS[text]
    
    # Handle specific patterns
    # "Updated X" -> "更新后的X"
    updated_match = re.match(r'^Updated (.+)$', text)
    if updated_match:
        item = updated_match.group(1)
        cn_item = translate_english_text(item) or item
        return f"更新后的{cn_item}"
    
    # "X created" / "X deleted" / "X updated" / "X paused" / "X resumed"
    for suffix, cn_suffix in [
        (" created", "已创建"),
        (" deleted", "已删除"),
        (" updated", "已更新"),
        (" paused", "已暂停"),
        (" resumed", "已恢复"),
        (" cancelled", "已取消"),
        (" archived", "已归档"),
        (" verified", "已验证"),
        (" cleared", "已清除"),
    ]:
        if text.endswith(suffix):
            item = text[:-len(suffix)]
            cn_item = translate_english_text(item) or item
            return f"{cn_item}{cn_suffix}"
    
    # "List of X" -> "X列表"
    list_match = re.match(r'^List of (.+)$', text)
    if list_match:
        item = list_match.group(1)
        cn_item = translate_english_text(item) or item
        return f"{cn_item}列表"
    
    return None


def main():
    for dirname in TARGET_DIRS:
        dirpath = os.path.join(BASE_DIR, dirname)
        if not os.path.isdir(dirpath):
            print(f"Warning: Directory not found: {dirpath}")
            continue
        
        pattern = os.path.join(dirpath, "*.md")
        files = glob_module.glob(pattern)
        
        for filepath in sorted(files):
            # Skip existing .zh.md files
            if filepath.endswith('.zh.md'):
                continue
            process_file(filepath)
    
    print("\nAll translations completed!")


if __name__ == "__main__":
    main()