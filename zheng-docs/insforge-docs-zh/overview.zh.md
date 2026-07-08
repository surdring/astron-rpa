## 本页内容

* [安装](#安装)
  + [Android 初始化](#android-初始化)
* [功能特性](#功能特性)
* [平台支持](#平台支持)
* [SDK 参考](#sdk-参考)

Kotlin

# Kotlin SDK

复制页面

InsForge 官方 Kotlin SDK - Android 和 Kotlin 多平台

复制页面

InsForge Kotlin SDK 为 Android 应用和 Kotlin 多平台项目提供了与 InsForge 服务交互的原生 Kotlin 客户端。

## [​](#安装) 安装

1. 将 InsForge 依赖添加到您的项目

* Maven Central
* GitHub Packages

build.gradle.kts:

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

## [​](#功能特性) 功能特性

* **数据库** - 使用 Kotlin 序列化进行类型安全的 CRUD 操作
* **认证** - 邮箱/密码和 OAuth 认证
* **存储** - 文件上传、下载和管理
* **AI** - 聊天补全和图像生成
* **实时** - 基于 WebSocket 的发布/订阅消息
* **协程** - 完整的 Kotlin 协程支持
* **Jetpack Compose** - 可组合函数和状态管理

## [​](#平台支持) 平台支持

| 平台 | 支持 |
| --- | --- |
| Android | 5.0+（API 21+） |
| JVM | Java 11+ |
| Kotlin 多平台（即将推出） | iOS、macOS、JS（实验性） |

## [​](#sdk-参考) SDK 参考

## 数据库

使用 Kotlin 数据类进行 CRUD 操作

## 认证

注册、登录、OAuth 和用户管理

## 存储

文件上传、下载和管理

## AI

聊天补全和图像生成

## 实时

WebSocket 发布/订阅消息

[Realtime SDK Reference](/sdks/swift/realtime)[Database SDK Reference](/sdks/kotlin/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)