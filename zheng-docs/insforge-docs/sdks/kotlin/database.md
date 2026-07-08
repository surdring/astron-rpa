## On this page

* [Installation](#installation)
  + [Android Initialization](#android-initialization)
* [insert()](#insert)
  + [Examples](#examples)
* [update()](#update)
  + [Examples](#examples-2)
* [delete()](#delete)
  + [Examples](#examples-3)
* [select()](#select)
  + [Examples](#examples-4)
* [executeRaw()](#executeraw)
  + [Examples](#examples-5)
* [rpc()](#rpc)
  + [Signature](#signature)
  + [Parameters](#parameters)
  + [Implementation Details](#implementation-details)
  + [Examples](#examples-6)
  + [rpcRaw() Examples](#rpcraw-examples)
* [Filters](#filters)
* [Modifiers](#modifiers)

Kotlin

# Database SDK Reference

Copy page

Type-safe database operations using the InsForge Kotlin SDK

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

## [​](#insert) insert()

Insert new records into a table.

### [​](#examples) Examples

```
// Define your data class
@Serializable
data class Post(
    val id: String? = null,
    val title: String,
    val content: String,
    @SerialName("created_at")
    val createdAt: String? = null
)

// Single insert (must wrap in list)
val post = Post(title = "Hello World", content = "My first post!")
val result = insforge.database
    .from("posts")
    .insertTyped(listOf(post))
    .returning()
    .execute<Post>()  // Returns List<Post>

// Bulk insert
val posts = listOf(
    Post(title = "First Post", content = "Hello everyone!"),
    Post(title = "Second Post", content = "Another update.")
)
val result = insforge.database
    .from("posts")
    .insertTyped(posts)
    .returning()
    .execute<Post>()  // Returns List<Post>
```

---

## [​](#update) update()

Update existing records in a table.

### [​](#examples-2) Examples

```
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

// Update by ID (using JsonPrimitive)
val result = insforge.database
    .from("posts")
    .update(mapOf("title" to JsonPrimitive("Updated Title")))
    .eq("id", postId)
    .returning()
    .execute<Post>()  // Returns List<Post>

// Update by ID (using buildJsonObject)
val result = insforge.database
    .from("posts")
    .update(buildJsonObject { put("title", "Updated Title") })
    .eq("id", postId)
    .returning()
    .execute<Post>()  // Returns List<Post>

// Update multiple
val result = insforge.database
    .from("tasks")
    .update(buildJsonObject { put("status", "completed") })
    .`in`("id", listOf("task-1", "task-2"))
    .returning()
    .execute<Task>()  // Returns List<Task>
```

---

## [​](#delete) delete()

Delete records from a table.

### [​](#examples-3) Examples

```
// Delete by ID
insforge.database
    .from("posts")
    .delete()
    .eq("id", postId)
    .execute()

// Delete with filter
insforge.database
    .from("sessions")
    .delete()
    .lt("expires_at", Date())
    .execute()
```

---

## [​](#select) select()

Query records from a table.

### [​](#examples-4) Examples

```
// Get all posts
val posts = insforge.database
    .from("posts")
    .select()
    .execute<Post>()  // Returns List<Post>

// Specific columns
val posts = insforge.database
    .from("posts")
    .select("id, title, content")
    .execute<Post>()  // Returns List<Post>

// With relationships (typed)
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
    .execute<PostWithComments>()  // Returns List<PostWithComments>
```

---

## [​](#executeraw) executeRaw()

Execute SELECT query and return raw JSON array. Use this method when you need to work with dynamic/untyped data, such as queries with joins that return nested objects.

### [​](#examples-5) Examples

```
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

// Query with relationships - raw JSON access
val result = insforge.database
    .from("tweets")
    .select("id, content, profiles!tweets_user_id_fkey(username)")
    .executeRaw()  // Returns JsonArray

result.forEach { element ->
    val obj = element.jsonObject
    val id = obj["id"]?.jsonPrimitive?.content
    val content = obj["content"]?.jsonPrimitive?.content
    val profile = obj["profiles"]?.jsonObject
    val username = profile?.get("username")?.jsonPrimitive?.content

    println("Tweet by $username: $content")
}

// Dynamic queries where structure is unknown
val rawData = insforge.database
    .from("dynamic_table")
    .select()
    .executeRaw()

// Process raw JSON as needed
rawData.forEach { element ->
    val obj = element.jsonObject
    obj.keys.forEach { key ->
        println("$key: ${obj[key]}")
    }
}
```

---

## [​](#rpc) rpc()

Call PostgreSQL stored functions (RPC - Remote Procedure Call). This method allows you to directly invoke SQL functions defined in your database.

### [​](#signature) Signature

```
// Typed RPC call - deserializes response to specified type
suspend inline fun <reified T> rpc(
    functionName: String,
    args: Map<String, Any?>? = null
): T

// Raw RPC call - returns JsonElement for dynamic processing
suspend fun rpcRaw(
    functionName: String,
    args: Map<String, Any?>? = null
): JsonElement
```

### [​](#parameters) Parameters

* `functionName` (String) - Name of the PostgreSQL function to call
* `args` (`Map\<String, Any?\>?`, optional) - Arguments to pass to the function

### [​](#implementation-details) Implementation Details

* **No arguments**: Uses GET request to `/api/database/rpc/{functionName}`
* **With arguments**: Uses POST request with JSON body to `/api/database/rpc/{functionName}`

### [​](#examples-6) Examples

```
// Define response data classes
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

// Call function with parameters
val stats = insforge.database.rpc<UserStats>(
    "get_user_stats",
    mapOf("user_id" to 123)
)
println("Total posts: ${stats.totalPosts}")

// Call function without parameters
val users = insforge.database.rpc<List<User>>("get_all_active_users")
users.forEach { user ->
    println("User: ${user.name}")
}

// Call function returning a single value
val count = insforge.database.rpc<Int>("count_active_posts")
println("Active posts: $count")

// Call function with multiple parameters
val result = insforge.database.rpc<List<Post>>(
    "search_posts",
    mapOf(
        "search_term" to "kotlin",
        "limit" to 10,
        "offset" to 0
    )
)
```

### [​](#rpcraw-examples) rpcRaw() Examples

Use `rpcRaw()` when the return type is dynamic or unknown at compile time.

```
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

// Get raw JSON response
val result = insforge.database.rpcRaw(
    "some_dynamic_function",
    mapOf("param" to "value")
)

// Process based on actual response structure
when (result) {
    is JsonArray -> {
        result.forEach { element ->
            val obj = element.jsonObject
            println("Item: ${obj["name"]?.jsonPrimitive?.content}")
        }
    }
    is JsonObject -> {
        println("Single result: ${result["data"]}")
    }
    is JsonPrimitive -> {
        println("Value: ${result.content}")
    }
}

// Handle complex nested structures
val complexResult = insforge.database.rpcRaw("get_dashboard_data")
val dashboard = complexResult.jsonObject
val userCount = dashboard["user_count"]?.jsonPrimitive?.int
val recentPosts = dashboard["recent_posts"]?.jsonArray
```

---

## [​](#filters) Filters

| Filter | Description | Example |
| --- | --- | --- |
| `.eq(column, value)` | Equals | `.eq("status", "active")` |
| `.neq(column, value)` | Not equals | `.neq("status", "banned")` |
| `.gt(column, value)` | Greater than | `.gt("age", 18)` |
| `.gte(column, value)` | Greater than or equal | `.gte("price", 100)` |
| `.lt(column, value)` | Less than | `.lt("stock", 10)` |
| `.lte(column, value)` | Less than or equal | `.lte("priority", 3)` |
| `.like(column, pattern)` | Case-sensitive pattern | `.like("name", "%Widget%")` |
| `.ilike(column, pattern)` | Case-insensitive pattern | `.ilike("email", "%@gmail.com")` |
| `.in(column, list)` | Value in list | `.in("status", listOf("pending", "active"))` |
| `.isNull(column)` | Is null | `.isNull("deleted_at")` |

```
// Chain multiple filters
val products = insforge.database
    .from("products")
    .select()
    .eq("category", "electronics")
    .gte("price", 50)
    .lte("price", 500)
    .execute<Product>()  // Returns List<Product>
```

---

## [​](#modifiers) Modifiers

| Modifier | Description | Example |
| --- | --- | --- |
| `.order(column, ascending)` | Sort results | `.order("created_at", ascending = false)` |
| `.limit(count)` | Limit rows | `.limit(10)` |
| `.range(from, to)` | Pagination | `.range(0, 9)` |

```
// Pagination with sorting
val posts = insforge.database
    .from("posts")
    .select()
    .order("created_at", ascending = false)
    .range(0, 9)
    .limit(10)
    .execute<Post>()  // Returns List<Post>
```

[Kotlin SDK](/sdks/kotlin/overview)[Authentication SDK Reference](/sdks/kotlin/auth)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)