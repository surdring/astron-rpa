## On this page

* [Installation](#installation)
  + [Android Initialization](#android-initialization)
* [Mental Model](#mental-model)
* [Quick Start](#quick-start)
* [connect()](#connect)
* [subscribe()](#subscribe)
* [publish()](#publish)
* [on()](#on)
* [once()](#once)
* [off()](#off)
* [unsubscribe()](#unsubscribe)
* [disconnect()](#disconnect)
* [getSubscribedChannels()](#getsubscribedchannels)
* [Presence](#presence)

Kotlin

# Realtime SDK Reference

Copy page

Subscribe to channels, publish events, and track presence with the InsForge Kotlin SDK.

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

## [​](#mental-model) Mental Model

The Kotlin SDK connects to InsForge Realtime over Socket.IO. Subscribe to channel names such as `order:123` or `chat:room-1`, then listen for event names published to those channels.
Events are published by database triggers that call `realtime.publish(...)` or by clients that publish to a channel they have already joined. See [Realtime overview](/core-concepts/realtime/overview) for the channel and RLS model.

## [​](#quick-start) Quick Start

```
import dev.insforge.realtime.models.SocketMessage

client.realtime.connect()

val response = client.realtime.subscribe("order:$orderId")

if (!response.ok) {
    println("Subscribe failed: ${response.error?.message}")
    return
}

client.realtime.on<SocketMessage>("status_changed") { message ->
    message?.let {
        println("Status changed: ${it.payload}")
    }
}
```

## [​](#connect) connect()

Establish a realtime connection.

```
client.realtime.connect()

println("Connected: ${client.realtime.isConnected}")
println("Socket ID: ${client.realtime.socketId}")
```

Monitor connection state:

```
client.realtime.connectionState.collect { state ->
    when (state) {
        is Realtime.ConnectionState.Connected -> println("Connected")
        is Realtime.ConnectionState.Connecting -> println("Connecting")
        is Realtime.ConnectionState.Disconnected -> println("Disconnected")
        is Realtime.ConnectionState.Error -> println("Error: ${state.message}")
    }
}
```

## [​](#subscribe) subscribe()

Subscribe to a channel and receive the current presence snapshot.

```
val response = client.realtime.subscribe("chat:room-1")

if (response.ok) {
    println("Subscribed to: ${response.channel}")
    println("Members: ${response.presence?.members}")
} else {
    println("Error: ${response.error?.message}")
}
```

## [​](#publish) publish()

Publish an event to a channel.

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

The client must subscribe to a channel before publishing to that same channel.

If RLS is enabled on `realtime.messages`, publish is also checked against `INSERT` policies.

## [​](#on) on()

Register an event listener.

```
client.realtime.on<SocketMessage>("new_message") { message ->
    message?.let {
        println("Message: ${it.payload}")
    }
}
```

Connection and system events:

| Event | Description |
| --- | --- |
| `presence:join` | A logical member became present in the channel. |
| `presence:leave` | A logical member is no longer present in the channel. |
| `realtime:error` | Subscribe or publish failed. |

## [​](#once) once()

Listen for an event once.

```
client.realtime.once<SocketMessage>("checkout_completed") { message ->
    println("Checkout completed: ${message?.payload}")
}
```

## [​](#off) off()

Remove an event listener.

```
val callback = Realtime.EventCallback<SocketMessage> { message ->
    println("Event received: $message")
}

client.realtime.on("status_changed", callback)
client.realtime.off("status_changed", callback)
```

## [​](#unsubscribe) unsubscribe()

Leave a channel.

```
client.realtime.unsubscribe("chat:room-1")
```

## [​](#disconnect) disconnect()

Close the realtime connection.

```
client.realtime.disconnect()
```

## [​](#getsubscribedchannels) getSubscribedChannels()

Return locally subscribed channels.

```
val channels = client.realtime.getSubscribedChannels()
println(channels)
```

## [​](#presence) Presence

Successful subscriptions return a presence snapshot. Listen for `presence:join` and `presence:leave` to update local online state.
Presence is ephemeral. It is not a durable room membership table.

[Model Gateway](/sdks/kotlin/ai)[REST API](/sdks/rest/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)