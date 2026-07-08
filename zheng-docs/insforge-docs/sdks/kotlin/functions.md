## On this page

* [Installation](#installation)
  + [Android Initialization](#android-initialization)
* [invoke()](#invoke)
  + [Parameters](#parameters)
  + [Returns](#returns)
  + [Examples](#examples)
  + [Example with Typed Request](#example-with-typed-request)
* [invokeRaw()](#invokeraw)
  + [Example](#example)
* [Admin Functions](#admin-functions)
  + [listFunctions()](#listfunctions)
  + [getFunction()](#getfunction)
  + [createFunction()](#createfunction)
  + [updateFunction()](#updatefunction)
  + [deleteFunction()](#deletefunction)
* [Error Handling](#error-handling)
* [Models Reference](#models-reference)
  + [FunctionMetadata](#functionmetadata)
  + [FunctionDetails](#functiondetails)

Kotlin

# Functions SDK Reference

Copy page

Invoke serverless functions with the InsForge Kotlin SDK

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

---

## [​](#invoke) invoke()

Invoke a serverless function by slug.

### [​](#parameters) Parameters

* `slug` (String) - Function slug identifier
* `body` (Any?, optional) - Request body (will be JSON serialized)

### [​](#returns) Returns

```
T // Typed response (reified generic)
```

### [​](#examples) Examples

```
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

// Define response data class
@Serializable
data class HelloResponse(
    val message: String,
    val timestamp: String
)

// Invoke function with typed response
val response = client.functions.invoke<HelloResponse>(
    slug = "hello-world",
    body = mapOf("name" to "World")
)

println(response.message)  // "Hello, World!"
```

### [​](#example-with-typed-request) Example with Typed Request

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

Invoke a function and get the raw HTTP response.

### [​](#example) Example

```
val response = client.functions.invokeRaw(
    slug = "generate-pdf",
    body = mapOf("documentId" to "doc-123")
)

// Access raw response
val bytes = response.readBytes()
val contentType = response.contentType()
```

---

## [​](#admin-functions) Admin Functions

The following methods require admin/service role authentication.

These methods require the client to be initialized with a **service role key** instead of the anon key. Service role keys have elevated privileges and should only be used in secure server-side environments, never in client-side code.

```
// Initialize client with service role key for admin operations
val adminClient = createInsforgeClient(
    baseUrl = "https://your-app.insforge.app",
    anonKey = "your-service-role-key"  // Use service role key or api key, not anon key
) {
    install(Functions)
}
```

### [​](#listfunctions) listFunctions()

List all functions.

```
val functions = client.functions.listFunctions()

functions.forEach { fn ->
    println("${fn.name} (${fn.slug}) - ${fn.status}")
}
```

### [​](#getfunction) getFunction()

Get specific function details.

```
val details = client.functions.getFunction("hello-world")

println("Name: ${details.name}")
println("Slug: ${details.slug}")
println("Status: ${details.status}")
println("Code: ${details.code}")
```

### [​](#createfunction) createFunction()

Currently, InsForge only supports JavaScript/TypeScript functions running in a Deno environment.

Create a new function.

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
    slug = "hello-world",  // Optional, auto-generated from name if not provided
    description = "A simple greeting function",
    status = "active"  // "draft" or "active"
)

println("Created function: ${result.slug}")
```

### [​](#updatefunction) updateFunction()

Update an existing function.

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

Delete a function.

```
client.functions.deleteFunction("old-function")
```

---

## [​](#error-handling) Error Handling

```
import dev.insforge.exceptions.InsforgeHttpException

try {
    val response = client.functions.invoke<MyResponse>("my-function")
    println("Success: $response")
} catch (e: InsforgeHttpException) {
    println("HTTP Error ${e.statusCode}: ${e.message}")
    println("Error code: ${e.error}")
    e.nextActions?.let { actions ->
        println("Suggested actions: $actions")
    }
} catch (e: Exception) {
    println("Unexpected error: ${e.message}")
}
```

---

## [​](#models-reference) Models Reference

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