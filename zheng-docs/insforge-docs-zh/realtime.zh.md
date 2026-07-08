## 本页内容

* [安装](#安装)
  + [Android 初始化](#android-初始化)
* [心智模型](#心智模型)
* [快速开始](#快速开始)
* [connect()](#connect)
* [subscribe()](#subscribe)
* [publish()](#publish)
* [on()](#on)
* [once()](#once)
* [off()](#off)
* [unsubscribe()](#unsubscribe)
* [disconnect()](#disconnect)
* [getSubscribedChannels()](#getsubscribedchannels)
* [在线状态](#在线状态)

Kotlin

# 实时 SDK 参考

复制页面

使用 InsForge Kotlin SDK 订阅频道、发布事件和跟踪在线状态

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

## [​](#心智模型) 心智模型

Kotlin SDK 通过 Socket.IO 连接到 InsForge Realtime。订阅频道名称如 `order:123` 或 `chat:room-1`，然后监听发布到这些频道的事件名称。
事件由数据库触发器调用 `realtime.publish(...)` 或由已加入频道的客户端发布。请参阅 [Realtime 概述](/core-concepts/realtime/overview) 了解频道和 RLS 模型。

## [​](#快速开始) 快速开始

```
import dev.insforge.realtime.models.SocketMessage

client.realtime.connect()

val response = client.realtime.subscribe("order:$orderId")

if (!response.ok) {
    println("订阅失败：${response.error?.message}")
    return
}

client.realtime.on<SocketMessage>("status_changed") { message ->
    message?.let {
        println("状态已更改：${it.payload}")
    }
}
```

## [​](#connect) connect()

建立实时连接。

```
client.realtime.connect()

println("已连接：${client.realtime.isConnected}")
println("Socket ID：${client.realtime.socketId}")
```

监控连接状态：

```
client.realtime.connectionState.collect { state ->
    when (state) {
        is Realtime.ConnectionState.Connected -> println("已连接")
        is Realtime.ConnectionState.Connecting -> println("连接中")
        is Realtime.ConnectionState.Disconnected -> println("已断开")
        is Realtime.ConnectionState.Error -> println("错误：${state.message}")
    }
}
```

## [​](#subscribe) subscribe()

订阅频道并接收当前在线状态快照。

```
val response = client.realtime.subscribe("chat:room-1")

if (response.ok) {
    println("已订阅：${response.channel}")
    println("成员：${response.presence?.members}")
} else {
    println("错误：${response.error?.message}")
}
```

## [​](#publish) publish()

向频道发布事件。

```
client.realtime.publish(
    channel = "chat:room-1",
    event = "new_message",
    payload = mapOf(
        "text" to "Hello from Kotlin",
        "sentAt" to System.currentTimeMillis()
    )
)
```

客户端必须先订阅频道，然后才能向同一频道发布。

如果在 `realtime.messages` 上启用了 RLS，则发布也会根据 `INSERT` 策略进行检查。

## [​](#on) on()

注册事件监听器。

```
client.realtime.on<SocketMessage>("new_message") { message ->
    message?.let {
        println("消息：${it.payload}")
    }
}
```

连接和系统事件：

| 事件 | 描述 |
| --- | --- |
| `presence:join` | 一个逻辑成员出现在频道中。 |
| `presence:leave` | 一个逻辑成员不再出现在频道中。 |
| `realtime:error` | 订阅或发布失败。 |

## [​](#once) once()

仅监听一次事件。

```
client.realtime.once<SocketMessage>("checkout_completed") { message ->
    println("结账完成：${message?.payload}")
}
```

## [​](#off) off()

移除事件监听器。

```
val callback = Realtime.EventCallback<SocketMessage> { message ->
    println("收到事件：$message")
}

client.realtime.on("status_changed", callback)
client.realtime.off("status_changed", callback)
```

## [​](#unsubscribe) unsubscribe()

离开频道。

```
client.realtime.unsubscribe("chat:room-1")
```

## [​](#disconnect) disconnect()

关闭实时连接。

```
client.realtime.disconnect()
```

## [​](#getsubscribedchannels) getSubscribedChannels()

返回本地已订阅的频道。

```
val channels = client.realtime.getSubscribedChannels()
println(channels)
```

## [​](#在线状态) 在线状态

成功订阅会返回一个在线状态快照。监听 `presence:join` 和 `presence:leave` 以更新本地在线状态。
在线状态是临时的。它不是一个持久的房间成员表。

[Model Gateway](/sdks/kotlin/ai)[REST API](/sdks/rest/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)