## On this page

* [安装](#installation)
  + [启用日志记录（可选）](#enable-logging-optional)
* [定义模型](#define-models)
* [insert()](#insert)
  + [参数](#parameters)
  + [示例](#examples)
* [update()](#update)
  + [示例](#examples-2)
* [delete()](#delete)
  + [示例](#examples-3)
* [select()](#select)
  + [示例](#examples-4)
* [rpc()](#rpc)
  + [参数](#parameters-2)
  + [示例](#examples-5)
  + [实现细节](#implementation-details)
* [过滤器](#filters)
* [修饰符](#modifiers)

Swift

# 数据库 SDK 参考

Copy page

使用 InsForge Swift SDK 进行类型安全的数据库操作

Copy page

## [​](#installation) 安装

将 InsForge 添加到您的 Swift Package Manager 依赖中：

```
dependencies: [
    .package(url: "https://github.com/insforge/insforge-swift.git", from: "0.0.9")
]
```

```
import InsForge

let insforge = InsForgeClient(
    baseURL: URL(string: "https://your-app.insforge.app")!,
    anonKey: "your-anon-key"
)
```

### [​](#enable-logging-optional) 启用日志记录（可选）

为了调试，您可以配置 SDK 日志级别和输出目标：

```
let options = InsForgeClientOptions(
    global: .init(
        logLevel: .debug,
        logDestination: .osLog,
        logSubsystem: "com.example.MyApp"
    )
)

let insforge = InsForgeClient(
    baseURL: URL(string: "https://your-app.insforge.app")!,
    anonKey: "your-anon-key",
    options: options
)
```

**日志级别：**

| 级别 | 描述 |
| --- | --- |
| `.trace` | 最详细，包含所有内部细节 |
| `.debug` | 用于调试的详细信息 |
| `.info` | 一般操作信息（默认） |
| `.warning` | 不影响操作的警告 |
| `.error` | 影响功能的错误 |
| `.critical` | 严重故障 |

**日志输出目标：**

| 目标 | 描述 |
| --- | --- |
| `.console` | 标准输出（print） |
| `.osLog` | Apple 统一日志系统（推荐用于 iOS/macOS） |
| `.none` | 禁用日志记录 |
| `.custom` | 提供您自己的 LogHandler 工厂 |

在生产环境中使用 `.info` 或 `.error`，以避免在日志中暴露敏感数据。

## [​](#define-models) 定义模型

使用 Swift 的 `Codable` 协议定义数据模型：

```
struct Post: Codable {
    let id: String?
    let title: String
    let content: String
    let userId: String
    let createdAt: Date?
}
```

---

## [​](#insert) insert()

向表中插入新记录。

### [​](#parameters) 参数

* `values` - 要插入的单个 Codable 对象或对象数组

### [​](#examples) 示例

```
// 单条插入
let post = Post(
    id: nil,
    title: "Hello World",
    content: "My first post!",
    userId: currentUserId,
    createdAt: nil
)
let inserted = try await insforge.database
    .from("posts")
    .insert(post)

// 批量插入
let posts = [
    Post(id: nil, title: "First Post", content: "Hello everyone!", userId: currentUserId, createdAt: nil),
    Post(id: nil, title: "Second Post", content: "Another update.", userId: currentUserId, createdAt: nil)
]
let inserted = try await insforge.database
    .from("posts")
    .insert(posts)
```

---

## [​](#update) update()

更新表中的现有记录。

### [​](#examples-2) 示例

```
// 定义更新模型
struct PostUpdate: Codable {
    let title: String
}

// 按 ID 更新
let updated: [Post] = try await insforge.database
    .from("posts")
    .eq("id", value: postId)
    .update(PostUpdate(title: "Updated Title"))

// 更新多条记录
struct TaskUpdate: Codable {
    let status: String
}

let updated: [Task] = try await insforge.database
    .from("tasks")
    .in("id", values: ["task-1", "task-2"])
    .update(TaskUpdate(status: "completed"))
```

---

## [​](#delete) delete()

从表中删除记录。

### [​](#examples-3) 示例

```
// 按 ID 删除
try await insforge.database
    .from("posts")
    .eq("id", value: postId)
    .delete()

// 带过滤条件删除
try await insforge.database
    .from("sessions")
    .lt("expires_at", value: Date())
    .delete()
```

---

## [​](#select) select()

从表中查询记录。

### [​](#examples-4) 示例

```
// 获取所有帖子
let posts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .execute()

// 过滤和排序
let recentPosts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .eq("userId", value: currentUserId)
    .order("createdAt", ascending: false)
    .limit(20)
    .execute()

// 多个过滤条件
let activePosts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .eq("userId", value: currentUserId)
    .eq("status", value: "published")
    .execute()

// 指定列
let posts = try await insforge.database
    .from("posts")
    .select("id, title, content")
    .execute()

// 关联查询
let posts = try await insforge.database
    .from("posts")
    .select("*, comments(id, content)")
    .execute()
```

---

## [​](#rpc) rpc()

调用 PostgreSQL 存储函数（RPC - 远程过程调用）。此方法允许您直接调用数据库中定义的 SQL 函数。

### [​](#parameters-2) 参数

* `functionName` (String) - 要调用的 PostgreSQL 函数名称
* `args` ([String: Any]?, 可选) - 传递给函数的参数

### [​](#examples-5) 示例

```
// 定义响应模型
struct UserStats: Decodable {
    let totalPosts: Int
    let totalComments: Int
}

struct User: Decodable {
    let id: String
    let name: String
    let email: String
}

// 带参数调用函数，返回数组
let stats: [UserStats] = try await insforge.database
    .rpc("get_user_stats", args: ["user_id": "123"])
    .execute()

// 带参数调用函数，返回单个结果
let stat: UserStats = try await insforge.database
    .rpc("get_user_stats", args: ["user_id": "123"])
    .executeSingle()

// 不带参数调用函数
let users: [User] = try await insforge.database
    .rpc("get_all_active_users")
    .execute()

// 带多个参数调用函数
let results: [Post] = try await insforge.database
    .rpc("search_posts", args: [
        "search_term": "swift",
        "limit": 10,
        "offset": 0
    ])
    .execute()

// 调用无返回值的函数（void 函数）
try await insforge.database
    .rpc("cleanup_old_records", args: ["days": 30])
    .execute()

// 调用返回单个原始值的函数
let count: Int = try await insforge.database
    .rpc("count_active_posts")
    .executeSingle()
```

### [​](#implementation-details) 实现细节

* **无参数**：使用 GET 请求到 `/api/database/rpc/{functionName}`
* **有参数**：使用带 JSON 体的 POST 请求到 `/api/database/rpc/{functionName}`
* 使用 `execute()` 用于返回数组或 void 的函数
* 使用 `executeSingle()` 用于返回单个对象或值的函数

---

## [​](#filters) 过滤器

| 过滤器 | 描述 | 示例 |
| --- | --- | --- |
| `.eq(column, value:)` | 等于 | `.eq("status", value: "active")` |
| `.neq(column, value:)` | 不等于 | `.neq("status", value: "banned")` |
| `.gt(column, value:)` | 大于 | `.gt("age", value: 18)` |
| `.gte(column, value:)` | 大于等于 | `.gte("price", value: 100)` |
| `.lt(column, value:)` | 小于 | `.lt("stock", value: 10)` |
| `.lte(column, value:)` | 小于等于 | `.lte("priority", value: 3)` |
| `.like(column, pattern:)` | 区分大小写的模式匹配 | `.like("name", pattern: "%Widget%")` |
| `.ilike(column, pattern:)` | 不区分大小写的模式匹配 | `.ilike("email", pattern: "%@gmail.com")` |
| `.in(column, values:)` | 值在数组中 | `.in("status", values: ["pending", "active"])` |
| `.is(column, value:)` | 精确等于（用于 nil/boolean） | `.is("deleted_at", value: nil)` |

```
// 链式多个过滤器
let products: [Product] = try await insforge.database
    .from("products")
    .select()
    .eq("category", value: "electronics")
    .gte("price", value: 50)
    .lte("price", value: 500)
    .execute()

// 模式匹配
let posts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .ilike("title", pattern: "%swift%")
    .execute()

// 按多个值过滤
let tasks: [Task] = try await insforge.database
    .from("tasks")
    .select()
    .in("status", values: ["pending", "in_progress"])
    .execute()

// 检查 null 或 boolean
let activePosts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .is("deleted_at", value: nil)
    .is("published", value: true)
    .execute()
```

---

## [​](#modifiers) 修饰符

| 修饰符 | 描述 | 示例 |
| --- | --- | --- |
| `.order(column, ascending:)` | 排序结果 | `.order("createdAt", ascending: false)` |
| `.limit(count)` | 限制行数 | `.limit(10)` |
| `.offset(count)` | 跳过行数 | `.offset(20)` |
| `.range(from:, to:)` | 范围分页 | `.range(from: 0, to: 9)` |

```
// 排序加分页
let posts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .order("createdAt", ascending: false)
    .limit(10)
    .offset(20)
    .execute()

// 范围分页（获取第 10-19 条）
let posts: [Post] = try await insforge.database
    .from("posts")
    .select()
    .range(from: 10, to: 19)
    .execute()
```

[Swift SDK](/sdks/swift/overview)[认证 SDK 参考](/sdks/swift/auth)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)