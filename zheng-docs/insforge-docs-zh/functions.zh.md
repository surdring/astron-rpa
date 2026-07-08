## 本页内容

* [安装](#安装)
  + [Android 初始化](#android-初始化)
* [invoke()](#invoke)
  + [参数](#参数)
  + [返回值](#返回值)
  + [示例](#示例)
  + [带类型化请求的示例](#带类型化请求的示例)
* [invokeRaw()](#invokeraw)
  + [示例](#示例-2)
* [管理函数](#管理函数)
  + [listFunctions()](#listfunctions)
  + [getFunction()](#getfunction)
  + [createFunction()](#createfunction)
  + [updateFunction()](#updatefunction)
  + [deleteFunction()](#deletefunction)
* [错误处理](#错误处理)
* [模型参考](#模型参考)
  + [FunctionMetadata](#functionmetadata)
  + [FunctionDetails](#functiondetails)

Kotlin

# 函数 SDK 参考

复制页面

使用 InsForge Kotlin SDK 调用无服务器函数

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

---

## [​](#invoke) invoke()

通过 slug 调用无服务器函数。

### [​](#参数) 参数

* `slug` (String) - 函数 slug 标识符
* `body` (Any?, 可选) - 请求体（将被 JSON 序列化）

### [​](#返回值) 返回值

```
T // 类型化响应（具体化的泛型）
```

### [​](#示例) 示例

```
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

// 定义响应数据类
@Serializable
data class HelloResponse(
    val message: String,
    val timestamp: String
)

// 调用函数并获取类型化响应
val response = client.functions.invoke<HelloResponse>(
    slug = "hello-world",
    body = mapOf("name" to "World")
)

println(response.message)  // "Hello, World!"
```

### [​](#带类型化请求的示例) 示例（带类型化请求）

```
@Serializable
data class GreetingRequest(
    val name: String,
    val greeting: String
)

@Serializable
data class GreetingResponse(
    val message: String,
    val timestamp: String
)

val response = client.functions.invoke<GreetingResponse>(
    slug = "hello-world",
    body = GreetingRequest(name = "Kotlin", greeting = "Hello")
)
```

---

## [​](#invokeraw) invokeRaw()

调用函数并获取原始 HTTP 响应。

### [​](#示例-2) 示例

```
val response = client.functions.invokeRaw(
    slug = "generate-pdf",
    body = mapOf("documentId" to "doc-123")
)

// 访问原始响应
val bytes = response.readBytes()
val contentType = response.contentType()
```

---

## [​](#管理函数) 管理函数

以下方法需要管理员/服务角色认证。

这些方法要求客户端使用**服务角色密钥**而非匿名密钥进行初始化。服务角色密钥具有提升的权限，应仅在安全的服务器端环境中使用，绝不能在客户端代码中使用。

```
// 使用服务角色密钥初始化客户端以进行管理操作
val adminClient = createInsforgeClient(
    baseUrl = "https://your-app.insforge.app",
    anonKey = "your-service-role-key"  // 使用服务角色密钥或 API 密钥，而非匿名密钥
) {
    install(Functions)
}
```

### [​](#listfunctions) listFunctions()

列出所有函数。

```
val functions = client.functions.listFunctions()

functions.forEach { fn ->
    println("${fn.name} (${fn.slug}) - ${fn.status}")
}
```

### [​](#getfunction) getFunction()

获取特定函数的详细信息。

```
val details = client.functions.getFunction("hello-world")

println("名称：${details.name}")
println("Slug：${details.slug}")
println("状态：${details.status}")
println("代码：${details.code}")
```

### [​](#createfunction) createFunction()

目前，InsForge 仅支持在 Deno 环境中运行的 JavaScript/TypeScript 函数。

创建新函数。

```
val result = client.functions.createFunction(
    name = "Hello World",
    code = """
        export default async function(req) {
            const body = await req.json()
            return new Response(JSON.stringify({
                message: `Hello, ${'$'}{body.name}!`,
                timestamp: new Date().toISOString()
            }), {
                headers: { "Content-Type": "application/json" }
            })
        }
    """.trimIndent(),
    slug = "hello-world",  // 可选，未提供时从名称自动生成
    description = "一个简单的问候函数",
    status = "active"  // "draft" 或 "active"
)

println("已创建函数：${result.slug}")
```

### [​](#updatefunction) updateFunction()

更新现有函数。

```
val result = client.functions.updateFunction(
    slug = "hello-world",
    name = "Hello World v2",
    code = """
        export default async function(req) {
            const body = await req.json()
            return new Response(JSON.stringify({
                message: `Hello, ${'$'}{body.name}! Welcome to v2.`,
                version: 2
            }), {
                headers: { "Content-Type": "application/json" }
            })
        }
    """.trimIndent(),
    status = "active"
)
```

### [​](#deletefunction) deleteFunction()

删除函数。

```
client.functions.deleteFunction("old-function")
```

---

## [​](#错误处理) 错误处理

```
import dev.insforge.exceptions.InsforgeHttpException

try {
    val response = client.functions.invoke<MyResponse>("my-function")
    println("成功：$response")
} catch (e: InsforgeHttpException) {
    println("HTTP 错误 ${e.statusCode}：${e.message}")
    println("错误码：${e.error}")
    e.nextActions?.let { actions ->
        println("建议操作：$actions")
    }
} catch (e: Exception) {
    println("意外错误：${e.message}")
}
```

---

## [​](#模型参考) 模型参考

### [​](#functionmetadata) FunctionMetadata

```
@Serializable
data class FunctionMetadata(
    val id: String,
    val slug: String,
    val name: String,
    val description: String? = null,
    val status: String,  // "draft", "active", "error"
    @SerialName("created_at") val createdAt: String? = null,
    @SerialName("updated_at") val updatedAt: String? = null,
    @SerialName("deployed_at") val deployedAt: String? = null
)
```

### [​](#functiondetails) FunctionDetails

```
@Serializable
data class FunctionDetails(
    val id: String,
    val slug: String,
    val name: String,
    val description: String? = null,
    val code: String,
    val status: String,  // "draft", "active", "error"
    @SerialName("created_at") val createdAt: String,
    @SerialName("updated_at") val updatedAt: String? = null,
    @SerialName("deployed_at") val deployedAt: String? = null
)
```

[Storage SDK Reference](/sdks/kotlin/storage)[Model Gateway](/sdks/kotlin/ai)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)