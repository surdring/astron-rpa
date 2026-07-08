## On this page

* [Installation](#installation)
  + [Android Initialization](#android-initialization)
* [Features](#features)
* [Platform Support](#platform-support)
* [SDK Reference](#sdk-reference)

Kotlin

# Kotlin SDK

Copy page

Official Kotlin SDK for InsForge - Android and Kotlin Multiplatform

Copy page

The InsForge Kotlin SDK provides a native Kotlin client for interacting with InsForge services from Android applications and Kotlin Multiplatform projects.

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

## [​](#features) Features

* **Database** - Type-safe CRUD operations with Kotlin Serialization
* **Authentication** - Email/password and OAuth authentication
* **Storage** - File upload, download, and management
* **AI** - Chat completions and image generation
* **Realtime** - WebSocket-based pub/sub messaging
* **Coroutines** - Full Kotlin Coroutines support
* **Jetpack Compose** - Composable functions and state management

## [​](#platform-support) Platform Support

| Platform | Support |
| --- | --- |
| Android | 5.0+ (API 21+) |
| JVM | Java 11+ |
| Kotlin Multiplatform (coming soon) | iOS, macOS, JS (experimental) |

## [​](#sdk-reference) SDK Reference

## Database

CRUD operations with Kotlin data classes

## Authentication

Sign up, sign in, OAuth, and user management

## Storage

File upload, download, and management

## AI

Chat completions and image generation

## Realtime

WebSocket pub/sub messaging

[Realtime SDK Reference](/sdks/swift/realtime)[Database SDK Reference](/sdks/kotlin/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)