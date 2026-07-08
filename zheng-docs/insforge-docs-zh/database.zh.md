## 本页内容

* [安装](#安装)
  + [Android 初始化](#android-初始化)
* [insert()](#insert)
  + [示例](#示例)
* [update()](#update)
  + [示例](#示例-2)
* [delete()](#delete)
  + [示例](#示例-3)
* [select()](#select)
  + [示例](#示例-4)
* [executeRaw()](#executeraw)
  + [示例](#示例-5)
* [rpc()](#rpc)
  + [签名](#签名)
  + [参数](#参数)
  + [实现细节](#实现细节)
  + [示例](#示例-6)
  + [rpcRaw() 示例](#rpcraw-示例)
* [过滤器](#过滤器)
* [修饰符](#修饰符)

Kotlin

# 数据库 SDK 参考

复制页面

使用 InsForge Kotlin SDK 进行类型安全的数据库操作

复制页面

## [​](#安装) 安装

1. 将 InsForge 依赖添加到您的项目

* Maven Central
* GitHub Packages

build.gradle.kts：

```
repositories {
    mavenLocal() // 用于本地开发
    mavenCentral()
}

dependencies {
    implementation("dev.insforge:insforge-kotlin:0.1.6")
}
```

首先，创建一个 GitHub 个人访问令牌：

* 转到 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
* 选择权限：`read:packages`

然后使用以下方法之一配置您的项目：

选项 A：环境变量

settings.gradle.kts（或 build.gradle.kts）：

```
repositories {
    mavenCentral()
    maven {
        url = uri("https://maven.pkg.github.com/InsForge/insforge-kotlin")
        credentials {
            username = System.getenv("GITHUB_USER") ?: ""
            password = System.getenv("GITHUB_TOKEN") ?: ""
        }
    }
}
```

build.gradle.kts：

```
dependencies {
    implementation("dev.insforge:insforge-kotlin:0.1.6")
}
```

在构建前设置环境变量：

```
export GITHUB_USER="your-github-username"
export GITHUB_TOKEN="your-personal-access-token"
```

选项 B：gradle.properties（本地开发）

将凭据添加到您的全局 Gradle 属性文件：~/.gradle/gradle.properties：

```
gpr.user=your-github-username
gpr.token=ghp_xxxxxxxxxxxx
```

settings.gradle.kts：

```
repositories {
    mavenCentral()
    maven {
        url = uri("https://maven.pkg.github.com/InsForge/insforge-kotlin")
        credentials {
            username = providers.gradleProperty("gpr.user").orNull ?: ""
            password = providers.gradleProperty("gpr.token").orNull ?: ""
        }
    }
}
```

build.gradle.kts：

```
dependencies {
    implementation("dev.insforge:insforge-kotlin:0.1.6")
}
```

`~/.gradle/gradle.properties` 文件存储在项目外部，因此凭据不会意外提交到版本控制。

2. 初始化 InsForge SDK

```
import dev.insforge.createInsforgeClient
import dev.insforge.auth.Auth
import dev.insforge.database.Database
import dev.insforge.storage.Storage
import dev.insforge.functions.Functions
import dev.insforge.realtime.Realtime
import dev.insforge.ai.AI

val client = createInsforgeClient(
    baseUrl = "https://your-app.insforge.app",
    anonKey = "your-api-key"
) {
    install(Auth)
    install(Database)
    install(Storage)
    install(Functions)
    install(Realtime) {
        autoReconnect = true
        reconnectDelay = 5000
    }
    install(AI)
}
```

3. 启用日志记录（可选）

为便于调试，您可以配置 SDK 日志级别：

```
import dev.insforge.InsforgeLogLevel

val client = createInsforgeClient(
    baseUrl = "https://your-app.insforge.app",
    anonKey = "your-api-key"
) {
    // DEBUG：记录请求方法/URL 和响应状态
    // VERBOSE：记录完整标头和请求/响应体
    logLevel = InsforgeLogLevel.DEBUG

    install(Auth)
    install(Database)
    // ... 其他模块
}
```

| 日志级别 | 描述 |
| --- | --- |
| `NONE` | 不记录日志（默认，建议用于生产环境） |
| `ERROR` | 仅记录错误 |
| `WARN` | 警告和错误 |
| `INFO` | 信息性消息 |
| `DEBUG` | 调试信息（请求方法、URL、响应状态） |
| `VERBOSE` | 完整详情（标头、请求/响应体） |

在生产环境中使用 `NONE` 或 `ERROR`，以避免在日志中暴露敏感数据。

### [​](#android-初始化) Android 初始化

1. 将 Chrome Custom Tabs 依赖添加到您的 `build.gradle.kts`：

```
dependencies {
    implementation("androidx.browser:browser:1.9.0")
}
```

2. 初始化 InsForge SDK（使用 Chrome Custom Tabs 和会话存储）

```
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent
import dev.insforge.createInsforgeClient
import dev.insforge.ai.AI
import dev.insforge.auth.Auth
import dev.insforge.auth.BrowserLauncher
import dev.insforge.auth.ClientType
import dev.insforge.auth.SessionStorage
import dev.insforge.database.Database
import dev.insforge.functions.Functions
import dev.insforge.realtime.Realtime
import dev.insforge.storage.Storage

class InsforgeManager(private val context: Context) {

    val client = createInsforgeClient(
        baseUrl = "https://your-app.insforge.app",
        anonKey = "your-anon-key"
    ) {
        install(Auth) {
            // 1. Chrome Custom Tabs - 在应用内打开，类似于 iOS ASWebAuthenticationSession
            browserLauncher = BrowserLauncher { url ->
                val customTabsIntent = CustomTabsIntent.Builder()
                    .setShowTitle(true)
                    .build()
                // 安全处理非 Activity 上下文
                if (context is Activity) {
                    customTabsIntent.launchUrl(context, Uri.parse(url))
                } else {
                    customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    customTabsIntent.launchUrl(context, Uri.parse(url))
                }
            }

            // 2. 启用会话持久化
            persistSession = true

            // 3. 配置 SessionStorage（使用 SharedPreferences）
            sessionStorage = object : SessionStorage {
                private val prefs = context.getSharedPreferences(
                    "insforge_auth",
                    Context.MODE_PRIVATE
                )

                override suspend fun save(key: String, value: String) {
                    prefs.edit().putString(key, value).apply()
                }

                override suspend fun get(key: String): String? {
                    return prefs.getString(key, null)
                }

                override suspend fun remove(key: String) {
                    prefs.edit().remove(key).apply()
                }
            }

            // 4. 设置客户端类型为移动端
            clientType = ClientType.MOBILE
        }
        // 安装 Database 模块
        install(Database)

        // 安装 Realtime 模块用于实时订阅
        install(Realtime) {
            debug = true
        }
        // 安装其他模块
        install(Storage)
        install(Functions)
        install(AI)
    }
}
```

3. 使用 Jetpack DataStore 进行会话存储（可选）

```
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

val Context.authDataStore: DataStore<Preferences> by preferencesDataStore(name = "insforge_auth")

class DataStoreSessionStorage(private val context: Context) : SessionStorage {
    
    override suspend fun save(key: String, value: String) {
        context.authDataStore.edit { prefs ->
            prefs[stringPreferencesKey(key)] = value
        }
    }
    
    override suspend fun get(key: String): String? {
        return context.authDataStore.data.map { prefs ->
            prefs[stringPreferencesKey(key)]
        }.first()
    }
    
    override suspend fun remove(key: String) {
        context.authDataStore.edit { prefs ->
            prefs.remove(stringPreferencesKey(key))
        }
    }
}

// 然后在您的 InsForge 客户端中使用
install(Auth) {
    browserLauncher = ...
    persistSession = true
    sessionStorage = DataStoreSessionStorage(context)
}
```

## [​](#insert) insert()

向表中插入新记录。

### [​](#示例) 示例

```
// 定义您的数据类
@Serializable
data class Post(
    val id: String? = null,
    val title: String,
    val content: String,
    @SerialName("created_at")
    val createdAt: String? = null
)

// 单条插入（必须包装在列表中）
val post = Post(title = "Hello World", content = "我的第一篇帖子！")
val result = insforge.database
    .from("posts")
    .insertTyped(listOf(post))
    .returning()
    .execute<Post>()  // 返回 List<Post>

// 批量插入
val posts = listOf(
    Post(title = "第一篇帖子", content = "大家好！"),
    Post(title = "第二篇帖子", content = "另一条更新。")
)
val result = insforge.database
    .from("posts")
    .insertTyped(posts)
    .returning()
    .execute<Post>()  // 返回 List<Post>
```

---

## [​](#update) update()

更新表中的现有记录。

### [​](#示例-2) 示例

```
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

// 按 ID 更新（使用 JsonPrimitive）
val result = insforge.database
    .from("posts")
    .update(mapOf("title" to JsonPrimitive("已更新的标题")))
    .eq("id", postId)
    .returning()
    .execute<Post>()  // 返回 List<Post>

// 按 ID 更新（使用 buildJsonObject）
val result = insforge.database
    .from("posts")
    .update(buildJsonObject { put("title", "已更新的标题") })
    .eq("id", postId)
    .returning()
    .execute<Post>()  // 返回 List<Post>

// 批量更新
val result = insforge.database
    .from("tasks")
    .update(buildJsonObject { put("status", "completed") })
    .`in`("id", listOf("task-1", "task-2"))
    .returning()
    .execute<Task>()  // 返回 List<Task>
```

---

## [​](#delete) delete()

从表中删除记录。

### [​](#示例-3) 示例

```
// 按 ID 删除
insforge.database
    .from("posts")
    .delete()
    .eq("id", postId)
    .execute()

// 带过滤条件删除
insforge.database
    .from("sessions")
    .delete()
    .lt("expires_at", Date())
    .execute()
```

---

## [​](#select) select()

从表中查询记录。

### [​](#示例-4) 示例

```
// 获取所有帖子
val posts = insforge.database
    .from("posts")
    .select()
    .execute<Post>()  // 返回 List<Post>

// 指定列
val posts = insforge.database
    .from("posts")
    .select("id, title, content")
    .execute<Post>()  // 返回 List<Post>

// 带关联关系（类型化）
@Serializable
data class PostWithComments(
    val id: String,
    val title: String,
    val content: String,
    val comments: List<Comment>
)

val posts = insforge.database
    .from("posts")
    .select("*, comments(id, content)")
    .execute<PostWithComments>()  // 返回 List<PostWithComments>
```

---

## [​](#executeraw) executeRaw()

执行 SELECT 查询并返回原始 JSON 数组。当您需要处理动态/无类型数据时（例如包含嵌套对象的联表查询），使用此方法。

### [​](#示例-5) 示例

```
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

// 带关联关系的查询 - 原始 JSON 访问
val result = insforge.database
    .from("tweets")
    .select("id, content, profiles!tweets_user_id_fkey(username)")
    .executeRaw()  // 返回 JsonArray

result.forEach { element ->
    val obj = element.jsonObject
    val id = obj["id"]?.jsonPrimitive?.content
    val content = obj["content"]?.jsonPrimitive?.content
    val profile = obj["profiles"]?.jsonObject
    val username = profile?.get("username")?.jsonPrimitive?.content

    println("$username 的推文：$content")
}

// 结构未知的动态查询
val rawData = insforge.database
    .from("dynamic_table")
    .select()
    .executeRaw()

// 根据需要处理原始 JSON
rawData.forEach { element ->
    val obj = element.jsonObject
    obj.keys.forEach { key ->
        println("$key：${obj[key]}")
    }
}
```

---

## [​](#rpc) rpc()

调用 PostgreSQL 存储函数（RPC - 远程过程调用）。此方法允许您直接调用数据库中定义的 SQL 函数。

### [​](#签名) 签名

```
// 类型化 RPC 调用 - 将响应反序列化为指定类型
suspend inline fun <reified T> rpc(
    functionName: String,
    args: Map<String, Any?>? = null
): T

// 原始 RPC 调用 - 返回 JsonElement 用于动态处理
suspend fun rpcRaw(
    functionName: String,
    args: Map<String, Any?>? = null
): JsonElement
```

### [​](#参数) 参数

* `functionName` (String) - 要调用的 PostgreSQL 函数名称
* `args` (`Map\<String, Any?\>?`, 可选) - 传递给函数的参数

### [​](#实现细节) 实现细节

* **无参数**：使用 GET 请求到 `/api/database/rpc/{functionName}`
* **有参数**：使用 POST 请求，带 JSON 体到 `/api/database/rpc/{functionName}`

### [​](#示例-6) 示例

```
// 定义响应数据类
@Serializable
data class UserStats(
    val totalPosts: Int,
    val totalLikes: Int,
    val joinedAt: String
)

@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String
)

// 带参数调用函数
val stats = insforge.database.rpc<UserStats>(
    "get_user_stats",
    mapOf("user_id" to 123)
)
println("帖子总数：${stats.totalPosts}")

// 无参数调用函数
val users = insforge.database.rpc<List<User>>("get_all_active_users")
users.forEach { user ->
    println("用户：${user.name}")
}

// 调用返回单个值的函数
val count = insforge.database.rpc<Int>("count_active_posts")
println("活跃帖子数：$count")

// 带多个参数调用函数
val result = insforge.database.rpc<List<Post>>(
    "search_posts",
    mapOf(
        "search_term" to "kotlin",
        "limit" to 10,
        "offset" to 0
    )
)
```

### [​](#rpcraw-示例) rpcRaw() 示例

当返回类型在编译时未知或为动态类型时，使用 `rpcRaw()`。

```
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

// 获取原始 JSON 响应
val result = insforge.database.rpcRaw(
    "some_dynamic_function",
    mapOf("param" to "value")
)

// 根据实际响应结构处理
when (result) {
    is JsonArray -> {
        result.forEach { element ->
            val obj = element.jsonObject
            println("项目：${obj["name"]?.jsonPrimitive?.content}")
        }
    }
    is JsonObject -> {
        println("单个结果：${result["data"]}")
    }
    is JsonPrimitive -> {
        println("值：${result.content}")
    }
}

// 处理复杂嵌套结构
val complexResult = insforge.database.rpcRaw("get_dashboard_data")
val dashboard = complexResult.jsonObject
val userCount = dashboard["user_count"]?.jsonPrimitive?.int
val recentPosts = dashboard["recent_posts"]?.jsonArray
```

---

## [​](#过滤器) 过滤器

| 过滤器 | 描述 | 示例 |
| --- | --- | --- |
| `.eq(column, value)` | 等于 | `.eq("status", "active")` |
| `.neq(column, value)` | 不等于 | `.neq("status", "banned")` |
| `.gt(column, value)` | 大于 | `.gt("age", 18)` |
| `.gte(column, value)` | 大于或等于 | `.gte("price", 100)` |
| `.lt(column, value)` | 小于 | `.lt("stock", 10)` |
| `.lte(column, value)` | 小于或等于 | `.lte("priority", 3)` |
| `.like(column, pattern)` | 区分大小写的模式匹配 | `.like("name", "%Widget%")` |
| `.ilike(column, pattern)` | 不区分大小写的模式匹配 | `.ilike("email", "%@gmail.com")` |
| `.in(column, list)` | 值在列表中 | `.in("status", listOf("pending", "active"))` |
| `.isNull(column)` | 为空 | `.isNull("deleted_at")` |

```
// 链式组合多个过滤器
val products = insforge.database
    .from("products")
    .select()
    .eq("category", "electronics")
    .gte("price", 50)
    .lte("price", 500)
    .execute<Product>()  // 返回 List<Product>
```

---

## [​](#修饰符) 修饰符

| 修饰符 | 描述 | 示例 |
| --- | --- | --- |
| `.order(column, ascending)` | 排序结果 | `.order("created_at", ascending = false)` |
| `.limit(count)` | 限制行数 | `.limit(10)` |
| `.range(from, to)` | 分页 | `.range(0, 9)` |

```
// 带排序的分页
val posts = insforge.database
    .from("posts")
    .select()
    .order("created_at", ascending = false)
    .range(0, 9)
    .limit(10)
    .execute<Post>()  // 返回 List<Post>
```

[Kotlin SDK](/sdks/kotlin/overview)[Authentication SDK Reference](/sdks/kotlin/auth)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)