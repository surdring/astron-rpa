## On this page

* [Installation](#installation)
  + [Android Initialization](#android-initialization)
* [from()](#from)
  + [Example](#example)
* [upload()](#upload)
  + [Parameters](#parameters)
  + [UploadOptions](#uploadoptions)
  + [Example](#example-2)
  + [Upload from Android Uri](#upload-from-android-uri)
* [uploadWithAutoKey()](#uploadwithautokey)
  + [Parameters](#parameters-2)
  + [Example](#example-3)
* [download()](#download)
  + [Example](#example-4)
* [delete()](#delete)
  + [Example](#example-5)
* [createSignedUrl()](#createsignedurl)
  + [Parameters](#parameters-3)
  + [Example](#example-6)
* [getDownloadUrl()](#getdownloadurl)
  + [Example](#example-7)
* [list()](#list)
  + [BucketListFilter Options](#bucketlistfilter-options)
  + [Example](#example-8)
* [Bucket Management](#bucket-management)
  + [listBuckets()](#listbuckets)
  + [createBucket()](#createbucket)
  + [updateBucket()](#updatebucket)
  + [deleteBucket()](#deletebucket)
* [Advanced Upload](#advanced-upload)
  + [getUploadStrategy()](#getuploadstrategy)
  + [confirmUpload()](#confirmupload)

Kotlin

# Storage SDK Reference

Copy page

File upload, download, and management with the InsForge Kotlin SDK

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

## [​](#from) from()

Get a bucket instance for file operations.

### [​](#example) Example

```
val bucket = insforge.storage.from("images")
```

---

## [​](#upload) upload()

Upload a file with a specific path/key.

### [​](#parameters) Parameters

* `path` (String) - File path/key in the bucket
* `data` (ByteArray) - File content as bytes
* `options` (DSL block, optional) - Upload options

### [​](#uploadoptions) UploadOptions

| Option | Type | Description |
| --- | --- | --- |
| `contentType` | String? | MIME type (e.g., “image/jpeg”) |
| `upsert` | Boolean | Overwrite if file exists (default: false) |
| `metadata` | `Map\<String, String\>?` | Custom metadata |

### [​](#example-2) Example

```
// Basic upload
val imageData = bitmap.toByteArray()
val result = insforge.storage
    .from("images")
    .upload("posts/post-123/cover.jpg", imageData)

Log.d("Storage", "Uploaded: ${result.url}")

// Upload with options
val result = insforge.storage
    .from("images")
    .upload("posts/post-123/cover.jpg", imageData) {
        contentType = "image/jpeg"
        upsert = true  // Overwrite if exists
        metadata = mapOf("userId" to "123")
    }

// Using bracket syntax
val result = insforge.storage["images"]
    .upload("avatars/user-123.jpg", imageData) {
        contentType = "image/jpeg"
    }
```

### [​](#upload-from-android-uri) Upload from Android Uri

Developers can use the following function to upload files from an Android Uri:

```
// Android Uri Upload sample:
suspend fun uploadFromUri(
    bucket: BucketApi,
    uri: Uri,
    context: Context,
    path: String
): FileUploadResponse {
    val data = context.contentResolver.openInputStream(uri)?.use {
        it.readBytes()
    } ?: throw IllegalArgumentException("Cannot read Uri")

    val contentType = context.contentResolver.getType(uri)

    return bucket.upload(path, data) {
        this.contentType = contentType
    }
}
```

---

## [​](#uploadwithautokey) uploadWithAutoKey()

Upload a file with auto-generated unique key.

### [​](#parameters-2) Parameters

* `filename` (String) - Original filename (used for extension detection)
* `data` (ByteArray) - File content as bytes
* `options` (DSL block, optional) - Upload options

### [​](#example-3) Example

```
val imageData = bitmap.toByteArray()
val result = insforge.storage
    .from("uploads")
    .uploadWithAutoKey("photo.jpg", imageData) {
        contentType = "image/jpeg"
    }

Log.d("Storage", "Auto-generated key: ${result.key}")
Log.d("Storage", "URL: ${result.url}")

// Save to database
insforge.database
    .from("posts")
    .insertTyped(listOf(
        Post(
            imageUrl = result.url,
            imageKey = result.key,
            userId = userId
        )
    ))
    .returning()
    .execute<Post>()
```

---

## [​](#download) download()

Download a file as ByteArray.

### [​](#example-4) Example

```
// Download file
val data = insforge.storage
    .from("images")
    .download(path = "posts/post-123/cover.jpg")

// Convert to Bitmap
val bitmap = BitmapFactory.decodeByteArray(data, 0, data.size)
imageView.setImageBitmap(bitmap)
```

---

## [​](#delete) delete()

Delete a file from storage.

### [​](#example-5) Example

```
// Get the file key from database
val posts = insforge.database
    .from("posts")
    .select("image_key")
    .eq("id", "post-123")
    .execute<Post>()  // Returns List<Post>

val post = posts.firstOrNull() ?: return

// Delete from storage
insforge.storage
    .from("images")
    .delete(post.imageKey)

// Clear database reference
insforge.database
    .from("posts")
    .update(buildJsonObject {
        put("image_url", JsonNull)
        put("image_key", JsonNull)
    })
    .eq("id", "post-123")
    .execute<Post>()
```

---

## [​](#createsignedurl) createSignedUrl()

Create a signed URL for temporary access to a file.

### [​](#parameters-3) Parameters

* `path` (String) - File path in the bucket
* `expiresIn` (Int) - Expiration time in seconds

### [​](#example-6) Example

```
// Create a signed URL (expires in 1 hour)
val url = insforge.storage
    .from("images")
    .createSignedUrl("posts/post-123/cover.jpg", expiresIn = 3600)

Log.d("Storage", "Signed URL: $url")
```

---

## [​](#getdownloadurl) getDownloadUrl()

Get a download URL for a file.

### [​](#example-7) Example

```
val strategy = insforge.storage
    .from("images")
    .getDownloadUrl("posts/post-123/cover.jpg")

Log.d("Storage", "Download URL: ${strategy.url}")
```

---

## [​](#list) list()

List files in a bucket with optional filtering.

### [​](#bucketlistfilter-options) BucketListFilter Options

| Option | Type | Description |
| --- | --- | --- |
| `prefix` | String? | Filter by path prefix |
| `limit` | Int | Maximum results (default: 100) |
| `offset` | Int | Pagination offset (default: 0) |
| `sortBy` | String? | Sort field |
| `sortOrder` | SortOrder | ASC or DESC (default: ASC) |

### [​](#example-8) Example

```
// List all files in bucket
val files = insforge.storage
    .from("images")
    .list()

files.forEach { file ->
    Log.d("Storage", "File: ${file.name}, Size: ${file.metadata?.size}")
}

// List with filters
val files = insforge.storage
    .from("images")
    .list {
        prefix = "posts/"
        limit = 50
        offset = 0
        sortBy = "created_at"
        sortOrder = SortOrder.DESC
    }
```

---

## [​](#bucket-management) Bucket Management

### [​](#listbuckets) listBuckets()

List all storage buckets.

```
val buckets = insforge.storage.listBuckets()

buckets.forEach { bucket ->
    Log.d("Storage", "Bucket: ${bucket.id}, Public: ${bucket.isPublic}")
}
```

### [​](#createbucket) createBucket()

Create a new storage bucket.

```
val bucket = insforge.storage.createBucket("my-bucket") {
    isPublic = true
}

Log.d("Storage", "Created bucket: ${bucket.id}")
```

### [​](#updatebucket) updateBucket()

Update bucket settings.

```
insforge.storage.updateBucket("my-bucket") {
    isPublic = false
}
```

### [​](#deletebucket) deleteBucket()

Delete a storage bucket.

```
insforge.storage.deleteBucket("my-bucket")
```

---

## [​](#advanced-upload) Advanced Upload

### [​](#getuploadstrategy) getUploadStrategy()

Get upload strategy for large files or resumable uploads.

```
val strategy = insforge.storage
    .from("videos")
    .getUploadStrategy("videos/large-file.mp4", fileSize = 100_000_000)

// Use strategy.url for upload
Log.d("Storage", "Upload URL: ${strategy.url}")
```

### [​](#confirmupload) confirmUpload()

Confirm a completed upload.

```
insforge.storage
    .from("videos")
    .confirmUpload("videos/large-file.mp4")
```

[Authentication SDK Reference](/sdks/kotlin/auth)[Functions SDK Reference](/sdks/kotlin/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)