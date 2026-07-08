## On this page

* [Installation](#installation)
  + [Android Initialization](#android-initialization)
* [signUp()](#signup)
  + [Parameters](#parameters)
  + [Returns](#returns)
  + [SignUpResponse](#signupresponse)
  + [Example (Complete Flow with Verification)](#example-complete-flow-with-verification)
  + [Email Verification](#email-verification)
  + [Related Methods](#related-methods)
* [signIn()](#signin)
  + [Example](#example)
  + [Email Verification](#email-verification-2)
* [signOut()](#signout)
  + [Example](#example-2)
* [signInWithOAuthPage()](#signinwithoauthpage)
  + [Supported Providers](#supported-providers)
  + [Parameters](#parameters-2)
  + [Returns](#returns-2)
  + [Example](#example-3)
* [getCurrentUser()](#getcurrentuser)
  + [Returns](#returns-3)
  + [Example](#example-4)
* [updateProfile()](#updateprofile)
  + [Parameters](#parameters-3)
  + [Returns](#returns-4)
  + [Example](#example-5)
* [Password Reset](#password-reset)
  + [sendPasswordReset()](#sendpasswordreset)
  + [Parameters](#parameters-4)
  + [Example](#example-6)
  + [exchangeResetPasswordToken()](#exchangeresetpasswordtoken)
  + [Parameters](#parameters-5)
  + [Returns](#returns-5)
  + [ResetTokenResponse](#resettokenresponse)
  + [Example](#example-7)
  + [resetPassword()](#resetpassword)
  + [Parameters](#parameters-6)
  + [Example](#example-8)
* [Error Handling](#error-handling)
  + [Common Error Codes](#common-error-codes)

Kotlin

# Authentication SDK Reference

Copy page

User authentication and profile management with the InsForge Kotlin SDK

Copy page

## [​](#installation) Installation

1. Add InsForge dependencies to your project

* Maven Central
* GitHub Packages

build.gradle.kts:

```
repositories {
    mavenLocal() // For local development
    mavenCentral()
}

dependencies {
    implementation("dev.insforge:insforge-kotlin:0.1.6")
}
```

First, create a GitHub Personal Access Token:

* Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
* Select permission: `read:packages`

Then configure your project using one of the following methods:

Option A: Environment Variables

settings.gradle.kts (or build.gradle.kts):

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

build.gradle.kts:

```
dependencies {
    implementation("dev.insforge:insforge-kotlin:0.1.6")
}
```

Set environment variables before building:

```
export GITHUB_USER="your-github-username"
export GITHUB_TOKEN="your-personal-access-token"
```

Option B: gradle.properties (Local Development)

Add credentials to your global Gradle properties file:~/.gradle/gradle.properties:

```
gpr.user=your-github-username
gpr.token=ghp_xxxxxxxxxxxx
```

settings.gradle.kts:

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

build.gradle.kts:

```
dependencies {
    implementation("dev.insforge:insforge-kotlin:0.1.6")
}
```

The `~/.gradle/gradle.properties` file is stored outside your project, so credentials won’t be accidentally committed to version control.

2. Initialize InsForge SDK

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

3. Enable Logging (Optional)

For debugging, you can configure the SDK log level:

```
import dev.insforge.InsforgeLogLevel

val client = createInsforgeClient(
    baseUrl = "https://your-app.insforge.app",
    anonKey = "your-api-key"
) {
    // DEBUG: logs request method/URL and response status
    // VERBOSE: logs full headers and request/response bodies
    logLevel = InsforgeLogLevel.DEBUG

    install(Auth)
    install(Database)
    // ... other modules
}
```

| Log Level | Description |
| --- | --- |
| `NONE` | No logging (default, recommended for production) |
| `ERROR` | Only errors |
| `WARN` | Warnings and errors |
| `INFO` | Informational messages |
| `DEBUG` | Debug info (request method, URL, response status) |
| `VERBOSE` | Full details (headers, request/response bodies) |

Use `NONE` or `ERROR` in production to avoid exposing sensitive data in logs.

### [​](#android-initialization) Android Initialization

1. Add Chrome Custom Tabs dependency to your `build.gradle.kts`:

```
dependencies {
    implementation("androidx.browser:browser:1.9.0")
}
```

2. Initialize InsForge SDK (With Chrome Custom Tabs and Session Storage)

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
            // 1. Chrome Custom Tabs - opens in-app, similar to iOS ASWebAuthenticationSession
            browserLauncher = BrowserLauncher { url ->
                val customTabsIntent = CustomTabsIntent.Builder()
                    .setShowTitle(true)
                    .build()
                // Handle non-Activity context safely
                if (context is Activity) {
                    customTabsIntent.launchUrl(context, Uri.parse(url))
                } else {
                    customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    customTabsIntent.launchUrl(context, Uri.parse(url))
                }
            }

            // 2. enable session persistence
            persistSession = true

            // 3. config SessionStorage (use SharedPreferences)
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

            // 4. set client type for mobile
            clientType = ClientType.MOBILE
        }
        // Install Database module
        install(Database)

        // Install Realtime module for real-time subscriptions
        install(Realtime) {
            debug = true
        }
        // Install other modules
        install(Storage)
        install(Functions)
        install(AI)
    }
}
```

3. Use Jetpack DataStore for Session Storage (Optional)

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

// Then use it in your InsForge client
install(Auth) {
    browserLauncher = ...
    persistSession = true
    sessionStorage = DataStoreSessionStorage(context)
}
```

## [​](#signup) signUp()

Create a new user account with email and password.

### [​](#parameters) Parameters

* `email` (String) - User’s email address
* `password` (String) - User’s password
* `name` (String?, optional) - User’s display name

### [​](#returns) Returns

```
SignUpResponse
```

### [​](#signupresponse) SignUpResponse

```
data class SignUpResponse(
    /** User object (null when email verification is required) */
    val user: User? = null,
    /** Access token (null when email verification is required) */
    val accessToken: String? = null,
    /** Indicates if email verification is required before sign-in */
    val requireEmailVerification: Boolean = false,
    /** Redirect URL (if applicable) */
    val redirectTo: String? = null,
    /** CSRF token (if applicable) */
    val csrfToken: String? = null,
    /** Refresh token (null when email verification is required) */
    val refreshToken: String? = null
)
```

### [​](#example-complete-flow-with-verification) Example (Complete Flow with Verification)

```
class AuthViewModel : ViewModel() {

    // Sign up and handle verification requirement
    suspend fun signUp(email: String, password: String, name: String?) {
        try {
            val result = client.auth.signUp(
                email = email,
                password = password,
                name = name
            )

            if (result.requireEmailVerification) {
                // Show verification code input screen
                // User will receive a 6-digit code via email
                _uiState.value = AuthUiState.RequiresVerification(email)
            } else if (result.accessToken != null) {
                // Registration complete, user is signed in
                _uiState.value = AuthUiState.Authenticated
            }
        } catch (e: InsforgeHttpException) {
            _uiState.value = AuthUiState.Error(e.message ?: "Sign up failed")
        }
    }

    // Verify email with 6-digit code
    suspend fun verifyEmail(email: String, code: String) {
        try {
            client.auth.verifyEmail(email = email, code = code)
            // Verification successful, user can now sign in
            _uiState.value = AuthUiState.VerificationSuccess
        } catch (e: InsforgeHttpException) {
            _uiState.value = AuthUiState.Error("Invalid verification code")
        }
    }

    // Resend verification email
    suspend fun resendVerificationEmail(email: String) {
        try {
            client.auth.resendVerificationEmail(email = email)
            // Show success message
        } catch (e: InsforgeHttpException) {
            _uiState.value = AuthUiState.Error("Failed to resend verification email")
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

### [​](#email-verification) Email Verification

For users who register with email, the InsForge backend provides three options:

1. **No email verification** - Users can sign in immediately after registration. `SignUpResponse` will have `accessToken != null`.
2. **Link-based verification** - Users must open their email and click the verification link before they can sign in.
3. **Code-based verification** - The InsForge backend sends a 6-digit verification code to the user’s email. The client app needs to display a verification screen where users can enter the code, then call `verifyEmail(email, code)` to complete verification. Only after this can users sign in with email + password.

When `requireEmailVerification` is `true`, the response will have:

* `accessToken = null`
* `user = null`
* `requireEmailVerification = true`

This indicates that verification via option 2 or 3 is required before the user can sign in.

### [​](#related-methods) Related Methods

| Method | Description |
| --- | --- |
| `verifyEmail(email, code)` | Verify email with 6-digit code |
| `resendVerificationEmail(email)` | Resend verification email |

---

## [​](#signin) signIn()

Sign in an existing user with email and password.

### [​](#example) Example

```
try {
    val result = client.auth.signIn(
        email = "user@example.com",
        password = "secure_password123"
    )

    result.user?.let { user ->
        Log.d("Auth", "Welcome back, ${user.profile?.name ?: user.email}")
    }
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "Sign in failed: ${e.message}")
}
```

### [​](#email-verification-2) Email Verification

If the sign in response is:

```
{"error":"FORBIDDEN","message":"Email verification required","statusCode":403,"nextActions":"Please verify your email address before logging in"}
```

This indicates that verification via option 2 or 3 (link or code, see [signUp()](#email-verification)) is required before the user can sign in.

---

## [​](#signout) signOut()

Sign out the current user.

### [​](#example-2) Example

```
try {
    client.auth.signOut()
    Log.d("Auth", "User signed out")
} catch (e: InsforgeException) {
    Log.e("Auth", "Sign out failed: ${e.message}")
}
```

---

## [​](#signinwithoauthpage) signInWithOAuthPage()

Sign in directly with a specific OAuth provider. This method opens the OAuth provider’s authentication page directly in the system browser.

### [​](#supported-providers) Supported Providers

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

### [​](#parameters-2) Parameters

* `provider` (`OAuthProvider`) - The OAuth provider to authenticate with
* `redirectUri` (`String`) - Callback URL where InsForge will redirect after authentication

### [​](#returns-2) Returns

```
String  // The OAuth authorization URL (also opens in browser automatically)
```

### [​](#example-3) Example

1. Configure BrowserLauncher

When creating the InsForge client, configure the `browserLauncher` to handle opening URLs:

```
val client = createInsforgeClient(baseURL, anonKey) {
    install(Auth) {
        browserLauncher = BrowserLauncher { url ->
            val customTabsIntent = CustomTabsIntent.Builder()
                .setShowTitle(true)
                .build()
            // Handle non-Activity context safely
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

2. Configure App Link / Deep Link Callback

Configure your callback Activity in AndroidManifest.xml:

* Option A: Custom URL Scheme (for Development)

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

* Option B: App Links (for Production)

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

3. Initiate OAuth Login with Specific Provider

```
// Start OAuth flow with Google
fun startGoogleLogin() {
    lifecycleScope.launch {
        val authUrl = client.auth.signInWithOAuthPage(
            OAuthProvider.GOOGLE,
            "yourapp://auth/callback"
        )
        // Browser opens automatically via browserLauncher
    }
}
```

4. Handle OAuth Callback

```
class AuthCallbackActivity : AppCompatActivity() {
    // Example: read the shared InsForge client from your Application class.
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
                        "Success: ${result.email}",
                        Toast.LENGTH_SHORT
                    ).show()

                    startActivity(Intent(this@AuthCallbackActivity, MainActivity::class.java))
                    finish()
                } catch (e: Exception) {
                    Toast.makeText(
                        this@AuthCallbackActivity,
                        "Failed: ${e.message}",
                        Toast.LENGTH_LONG
                    ).show()
                    finish()
                }
            }
        }
    }
}
```

`client` should come from the same shared InsForge client instance you use elsewhere in the app, such as an `Application` singleton or your DI container.

---

## [​](#getcurrentuser) getCurrentUser()

Fetch the current authenticated user from the server. This is a suspend function that makes a network request.

### [​](#returns-3) Returns

```
CurrentUserResponse  // Contains user data from server
```

### [​](#example-4) Example

```
try {
    val response = client.auth.getCurrentUser()
    Log.d("Auth", "Email: ${response.email}")
    Log.d("Auth", "Name: ${response.profile?.name ?: "N/A"}")
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "Failed to get user: ${e.message}")
}
```

This method makes a network request to fetch user data. For accessing locally cached user state, use `currentUser` StateFlow instead.

---

## [​](#updateprofile) updateProfile()

Update current user’s profile.

### [​](#parameters-3) Parameters

* `profile` (`Map\<String, Any\>`) - Profile fields to update

### [​](#returns-4) Returns

```
ProfileResponse  // Updated profile data
```

### [​](#example-5) Example

```
try {
    val result = client.auth.updateProfile(
        mapOf(
            "name" to "JohnDev",
            "bio" to "Android Developer",
            "avatar_url" to "https://example.com/avatar.jpg"
        )
    )
    Log.d("Auth", "Profile updated: ${result.name}")
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "Update failed: ${e.message}")
}
```

---

## [​](#password-reset) Password Reset

InsForge supports two password reset methods, configured in the backend:

* **Code method**: User receives a 6-digit code via email, verifies it to get a reset token, then resets password
* **Link method**: User receives a magic link via email containing the reset token, then resets password directly

### [​](#sendpasswordreset) sendPasswordReset()

Send a password reset email to the user. The email will contain either a 6-digit code or a magic link depending on the backend configuration.

#### [​](#parameters-4) Parameters

* `email` (String) - User’s email address

#### [​](#example-6) Example

```
try {
    client.auth.sendPasswordReset(email = "user@example.com")
    // Show message to check email
    showMessage("If your email is registered, you will receive a password reset email.")
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "Failed to send reset email: ${e.message}")
}
```

---

### [​](#exchangeresetpasswordtoken) exchangeResetPasswordToken()

Exchange a 6-digit reset code for a reset token. **This method is only used with the code-based reset flow.**

#### [​](#parameters-5) Parameters

* `email` (String) - User’s email address
* `code` (String) - 6-digit numeric code received via email

#### [​](#returns-5) Returns

```
ResetTokenResponse
```

#### [​](#resettokenresponse) ResetTokenResponse

```
data class ResetTokenResponse(
    /** Reset token to use with resetPassword() */
    val token: String,
    /** Token expiration timestamp */
    val expiresAt: String?
)
```

#### [​](#example-7) Example

```
try {
    val response = client.auth.exchangeResetPasswordToken(
        email = "user@example.com",
        code = "123456"
    )
    // Store the token and proceed to password reset screen
    val resetToken = response.token
    showPasswordResetScreen(token = resetToken)
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "Invalid or expired code: ${e.message}")
}
```

---

### [​](#resetpassword) resetPassword()

Reset the user’s password using a reset token.

#### [​](#parameters-6) Parameters

* `newPassword` (String) - New password meeting the configured requirements
* `otp` (String) - Reset token (from `exchangeResetPasswordToken()` for code flow, or from magic link URL for link flow)

#### [​](#example-8) Example

```
try {
    client.auth.resetPassword(
        newPassword = "newSecurePassword123",
        otp = resetToken
    )
    // Password reset successful
    showMessage("Password reset successfully. You can now sign in.")
    navigateToSignIn()
} catch (e: InsforgeHttpException) {
    Log.e("Auth", "Password reset failed: ${e.message}")
}
```

---

## [​](#error-handling) Error Handling

```
import dev.insforge.exceptions.InsforgeHttpException
import dev.insforge.exceptions.InsforgeException

try {
    val result = client.auth.signIn(email, password)
} catch (e: InsforgeHttpException) {
    // HTTP errors from API with error codes
    when (e.error) {
        "INVALID_CREDENTIALS" -> showError("Invalid email or password")
        "USER_NOT_FOUND" -> showError("User not found")
        "EMAIL_NOT_VERIFIED" -> showError("Please verify your email")
        "INVALID_EMAIL" -> showError("Invalid email format")
        "WEAK_PASSWORD" -> showError("Password is too weak")
        else -> showError("Error: ${e.message}")
    }
} catch (e: InsforgeException) {
    // Other SDK errors (network, parsing, etc.)
    showError("Error: ${e.message}")
}
```

### [​](#common-error-codes) Common Error Codes

| Error Code | Description |
| --- | --- |
| `INVALID_CREDENTIALS` | Email or password is incorrect |
| `USER_NOT_FOUND` | No user with this email exists |
| `EMAIL_NOT_VERIFIED` | Email verification required |
| `INVALID_EMAIL` | Email format is invalid |
| `WEAK_PASSWORD` | Password doesn’t meet requirements |
| `USER_ALREADY_EXISTS` | Email is already registered |
| `SESSION_EXPIRED` | Session has expired, re-login required |

[Database SDK Reference](/sdks/kotlin/database)[Storage SDK Reference](/sdks/kotlin/storage)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)