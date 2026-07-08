## 本页内容

* [安装](#安装)
  + [Android 初始化](#android-初始化)
* [signUp()](#signup)
  + [参数](#参数)
  + [返回值](#返回值)
  + [SignUpResponse](#signupresponse)
  + [示例（含验证的完整流程）](#示例含验证的完整流程)
  + [邮箱验证](#邮箱验证)
  + [相关方法](#相关方法)
* [signIn()](#signin)
  + [示例](#示例)
  + [邮箱验证](#邮箱验证-2)
* [signOut()](#signout)
  + [示例](#示例-2)
* [signInWithOAuthPage()](#signinwithoauthpage)
  + [支持的提供商](#支持的提供商)
  + [参数](#参数-2)
  + [返回值](#返回值-2)
  + [示例](#示例-3)
* [getCurrentUser()](#getcurrentuser)
  + [返回值](#返回值-3)
  + [示例](#示例-4)
* [updateProfile()](#updateprofile)
  + [参数](#参数-3)
  + [返回值](#返回值-4)
  + [示例](#示例-5)
* [密码重置](#密码重置)
  + [sendPasswordReset()](#sendpasswordreset)
  + [参数](#参数-4)
  + [示例](#示例-6)
  + [exchangeResetPasswordToken()](#exchangeresetpasswordtoken)
  + [参数](#参数-5)
  + [返回值](#返回值-5)
  + [ResetTokenResponse](#resettokenresponse)
  + [示例](#示例-7)
  + [resetPassword()](#resetpassword)
  + [参数](#参数-6)
  + [示例](#示例-8)
* [错误处理](#错误处理)
  + [常见错误码](#常见错误码)

Kotlin

# 认证 SDK 参考

复制页面

使用 InsForge Kotlin SDK 进行用户认证和资料管理

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

## [​](#signup) signUp()

使用邮箱和密码创建新用户账户。

### [​](#参数) 参数

* `email` (String) - 用户的邮箱地址
* `password` (String) - 用户的密码
* `name` (String?, 可选) - 用户的显示名称

### [​](#返回值) 返回值

```
SignUpResponse
```

### [​](#signupresponse) SignUpResponse

```
data class SignUpResponse(
    /** 用户对象（需要邮箱验证时为 null） */
    val user: User? = null,
    /** 访问令牌（需要邮箱验证时为 null） */
    val accessToken: String? = null,
    /** 指示登录前是否需要邮箱验证 */
    val requireEmailVerification: Boolean = false,
    /** 重定向 URL（如适用） */
    val redirectTo: String? = null,
    /** CSRF 令牌（如适用） */
    val csrfToken: String? = null,
    /** 刷新令牌（需要邮箱验证时为 null） */
    val refreshToken: String? = null
)
```

### [​](#示例含验证的完整流程) 示例（含验证的完整流程）

```
class AuthViewModel : ViewModel() {

    // 注册并处理验证要求
    suspend fun signUp(email: String, password: String, name: String?) {
        try {
            val result = client.auth.signUp(
                email = email,
                password = password,
                name = name
            )

            if (result.requireEmailVerification) {
                // 显示验证码输入界面
                // 用户将通过邮箱收到 6 位验证码
                _uiState.value = AuthUiState.RequiresVerification(email)
            } else if (result.accessToken != null) {
                // 注册完成，用户已登录
                _uiState.value = AuthUiState.Authenticated
            }
        } catch (e: InsforgeHttpException) {
            _uiState.value = AuthUiState.Error(e.message ?: "注册失败")
        }
    }

    // 使用 6 位验证码验证邮箱
    suspend fun verifyEmail(email: String, code: String) {
        try {
            client.auth.verifyEmail(email = email, code = code)
            // 验证成功，用户现在可以登录
            _uiState.value = AuthUiState.VerificationSuccess
        } catch (e: InsforgeHttpException) {
            _uiState.value = AuthUiState.Error("无效的验证码")
        }
    }

    // 重新发送验证邮件
    suspend fun resendVerificationEmail(email: String) {
        try {
            client.auth.resendVerificationEmail(email = email)
            // 显示成功消息
        } catch (e: InsforgeHttpException) {
            _uiState.value = AuthUiState.Error("重新发送验证邮件失败")
        }
    }
}

sealed class AuthUiState {
    object Initial : AuthUiState()
    object Authenticated : AuthUiState()
    object VerificationSuccess : AuthUiState()
    data class RequiresVerification(val email: String) : AuthUiState()
    data class Error(val message: String) : AuthUiState()
}
```

### [​](#邮箱验证) 邮箱验证

对于使用邮箱注册的用户，InsForge 后端提供三个选项：

1. **无需邮箱验证** - 注册后用户可以立即登录。`SignUpResponse` 将包含 `accessToken != null`。
2. **基于链接的验证** - 用户必须打开邮箱并点击验证链接后才能登录。
3. **基于验证码的验证** - InsForge 后端向用户的邮箱发送 6 位验证码。客户端应用需要显示一个验证界面，让用户输入验证码，然后调用 `verifyEmail(email, code)` 完成验证。完成后用户才能使用邮箱+密码登录。

当 `requireEmailVerification` 为 `true` 时，响应将包含：

* `accessToken = null`
* `user = null`
* `requireEmailVerification = true`

这表明在用户登录前需要通过选项 2 或 3 进行验证。

### [​](#相关方法) 相关方法

| 方法 | 描述 |
| --- | --- |
| `verifyEmail(email, code)` | 使用 6 位验证码验证邮箱 |
| `resendVerificationEmail(email)` | 重新发送验证邮件 |

---

## [​](#signin) signIn()

使用邮箱和密码登录现有用户。

### [​](#示例) 示例

```
try {
    val result = client.auth.signIn(
        email = "user@example.com",
        password = "secure_password123"
    )

    result.user?.let { user ->
        Log.d("Auth", "欢迎回来，${user.profile?.name ?: user.email}")
    }
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "登录失败：${e.message}")
}
```

### [​](#邮箱验证-2) 邮箱验证

如果登录响应为：

```
{"error":"FORBIDDEN","message":"需要邮箱验证","statusCode":403,"nextActions":"请在登录前验证您的邮箱地址"}
```

这表明用户登录前需要通过选项 2 或 3（链接或验证码，参见 [signUp()](#邮箱验证)）进行验证。

---

## [​](#signout) signOut()

退出当前用户。

### [​](#示例-2) 示例

```
try {
    client.auth.signOut()
    Log.d("Auth", "用户已退出")
} catch (e: InsforgeException) {
    Log.e("Auth", "退出失败：${e.message}")
}
```

---

## [​](#signinwithoauthpage) signInWithOAuthPage()

通过特定的 OAuth 提供商直接登录。此方法直接在系统浏览器中打开 OAuth 提供商的认证页面。

### [​](#支持的提供商) 支持的提供商

```
enum class OAuthProvider(val value: String) {
    GOOGLE("google"),
    GITHUB("github"),
    DISCORD("discord"),
    LINKEDIN("linkedin"),
    FACEBOOK("facebook"),
    INSTAGRAM("instagram"),
    TIKTOK("tiktok"),
    APPLE("apple"),
    X("x"),
    SPOTIFY("spotify"),
    MICROSOFT("microsoft")
}
```

### [​](#参数-2) 参数

* `provider` (`OAuthProvider`) - 用于认证的 OAuth 提供商
* `redirectUri` (`String`) - InsForge 认证后重定向的回调 URL

### [​](#返回值-2) 返回值

```
String  // OAuth 授权 URL（也会自动在浏览器中打开）
```

### [​](#示例-3) 示例

1. 配置 BrowserLauncher

创建 InsForge 客户端时，配置 `browserLauncher` 以处理打开 URL：

```
val client = createInsforgeClient(baseURL, anonKey) {
    install(Auth) {
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
        persistSession = true
        sessionStorage = mySessionStorage
    }
}
```

2. 配置应用链接/深度链接回调

在 AndroidManifest.xml 中配置您的回调 Activity：

* 选项 A：自定义 URL Scheme（用于开发）

```
<activity
    android:name=".AuthCallbackActivity"
    android:launchMode="singleTask"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="yourapp" android:host="auth" android:path="/callback" />
    </intent-filter>
</activity>
```

* 选项 B：App Links（用于生产环境）

```
<activity
    android:name=".AuthCallbackActivity"
    android:launchMode="singleTask"
    android:exported="true">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="yourdomain.com" android:path="/auth/callback" />
    </intent-filter>
</activity>
```

3. 使用特定提供商发起 OAuth 登录

```
// 使用 Google 启动 OAuth 流程
fun startGoogleLogin() {
    lifecycleScope.launch {
        val authUrl = client.auth.signInWithOAuthPage(
            OAuthProvider.GOOGLE,
            "yourapp://auth/callback"
        )
        // 浏览器通过 browserLauncher 自动打开
    }
}
```

4. 处理 OAuth 回调

```
class AuthCallbackActivity : AppCompatActivity() {
    // 示例：从 Application 类读取共享的 InsForge 客户端
    private val client by lazy { (application as MyApp).insforgeClient }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        intent?.let { handleIntent(it) }
    }

    private fun handleIntent(intent: Intent) {
        intent.data?.let { uri ->
            lifecycleScope.launch {
                try {
                    val result = client.auth.handleAuthCallback(uri.toString())

                    Toast.makeText(
                        this@AuthCallbackActivity,
                        "成功：${result.email}",
                        Toast.LENGTH_SHORT
                    ).show()

                    startActivity(Intent(this@AuthCallbackActivity, MainActivity::class.java))
                    finish()
                } catch (e: Exception) {
                    Toast.makeText(
                        this@AuthCallbackActivity,
                        "失败：${e.message}",
                        Toast.LENGTH_LONG
                    ).show()
                    finish()
                }
            }
        }
    }
}
```

`client` 应来自您在应用其他地方使用的同一个共享 InsForge 客户端实例，例如 `Application` 单例或您的 DI 容器。

---

## [​](#getcurrentuser) getCurrentUser()

从服务器获取当前已认证用户。这是一个挂起函数，会发起网络请求。

### [​](#返回值-3) 返回值

```
CurrentUserResponse  // 包含来自服务器的用户数据
```

### [​](#示例-4) 示例

```
try {
    val response = client.auth.getCurrentUser()
    Log.d("Auth", "邮箱：${response.email}")
    Log.d("Auth", "名称：${response.profile?.name ?: "N/A"}")
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "获取用户失败：${e.message}")
}
```

此方法发起网络请求以获取用户数据。如需访问本地缓存的用户状态，请改用 `currentUser` StateFlow。

---

## [​](#updateprofile) updateProfile()

更新当前用户的资料。

### [​](#参数-3) 参数

* `profile` (`Map\<String, Any\>`) - 要更新的资料字段

### [​](#返回值-4) 返回值

```
ProfileResponse  // 更新后的资料数据
```

### [​](#示例-5) 示例

```
try {
    val result = client.auth.updateProfile(
        mapOf(
            "name" to "JohnDev",
            "bio" to "Android 开发者",
            "avatar_url" to "https://example.com/avatar.jpg"
        )
    )
    Log.d("Auth", "资料已更新：${result.name}")
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "更新失败：${e.message}")
}
```

---

## [​](#密码重置) 密码重置

InsForge 支持两种密码重置方法，在后端配置：

* **验证码方法**：用户通过邮箱接收 6 位验证码，验证后获取重置令牌，然后重置密码
* **链接方法**：用户通过邮箱接收包含重置令牌的魔法链接，然后直接重置密码

### [​](#sendpasswordreset) sendPasswordReset()

向用户发送密码重置邮件。邮件将包含 6 位验证码或魔法链接，具体取决于后端配置。

#### [​](#参数-4) 参数

* `email` (String) - 用户的邮箱地址

#### [​](#示例-6) 示例

```
try {
    client.auth.sendPasswordReset(email = "user@example.com")
    // 显示查看邮箱的消息
    showMessage("如果您的邮箱已注册，您将收到一封密码重置邮件。")
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "发送重置邮件失败：${e.message}")
}
```

---

### [​](#exchangeresetpasswordtoken) exchangeResetPasswordToken()

将 6 位重置码兑换为重置令牌。**此方法仅用于基于验证码的重置流程。**

#### [​](#参数-5) 参数

* `email` (String) - 用户的邮箱地址
* `code` (String) - 通过邮箱收到的 6 位数字验证码

#### [​](#返回值-5) 返回值

```
ResetTokenResponse
```

#### [​](#resettokenresponse) ResetTokenResponse

```
data class ResetTokenResponse(
    /** 与 resetPassword() 一起使用的重置令牌 */
    val token: String,
    /** 令牌过期时间戳 */
    val expiresAt: String?
)
```

#### [​](#示例-7) 示例

```
try {
    val response = client.auth.exchangeResetPasswordToken(
        email = "user@example.com",
        code = "123456"
    )
    // 存储令牌并跳转到密码重置界面
    val resetToken = response.token
    showPasswordResetScreen(token = resetToken)
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "验证码无效或已过期：${e.message}")
}
```

---

### [​](#resetpassword) resetPassword()

使用重置令牌重置用户密码。

#### [​](#参数-6) 参数

* `newPassword` (String) - 符合配置要求的新密码
* `otp` (String) - 重置令牌（验证码流程来自 `exchangeResetPasswordToken()`，链接流程来自魔法链接 URL）

#### [​](#示例-8) 示例

```
try {
    client.auth.resetPassword(
        newPassword = "newSecurePassword123",
        otp = resetToken
    )
    // 密码重置成功
    showMessage("密码重置成功。您现在可以登录。")
    navigateToSignIn()
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "密码重置失败：${e.message}")
}
```

---

## [​](#错误处理) 错误处理

```
import dev.insforge.exceptions.InsforgeHttpException
import dev.insforge.exceptions.InsforgeException

try {
    val result = client.auth.signIn(email, password)
} catch (e: InsforgeHttpException) {
    // 来自 API 的 HTTP 错误，带有错误码
    when (e.error) {
        "INVALID_CREDENTIALS" -> showError("邮箱或密码无效")
        "USER_NOT_FOUND" -> showError("未找到用户")
        "EMAIL_NOT_VERIFIED" -> showError("请验证您的邮箱")
        "INVALID_EMAIL" -> showError("邮箱格式无效")
        "WEAK_PASSWORD" -> showError("密码强度不足")
        else -> showError("错误：${e.message}")
    }
} catch (e: InsforgeException) {
    // 其他 SDK 错误（网络、解析等）
    showError("错误：${e.message}")
}
```

### [​](#常见错误码) 常见错误码

| 错误码 | 描述 |
| --- | --- |
| `INVALID_CREDENTIALS` | 邮箱或密码错误 |
| `USER_NOT_FOUND` | 不存在使用此邮箱的用户 |
| `EMAIL_NOT_VERIFIED` | 需要邮箱验证 |
| `INVALID_EMAIL` | 邮箱格式无效 |
| `WEAK_PASSWORD` | 密码不符合要求 |
| `USER_ALREADY_EXISTS` | 邮箱已注册 |
| `SESSION_EXPIRED` | 会话已过期，需要重新登录 |

[Database SDK Reference](/sdks/kotlin/database)[Storage SDK Reference](/sdks/kotlin/storage)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)