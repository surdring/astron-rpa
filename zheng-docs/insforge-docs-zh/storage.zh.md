## 本页内容

* [安装](#安装)
  + [Android 初始化](#android-初始化)
* [from()](#from)
  + [示例](#示例)
* [upload()](#upload)
  + [参数](#参数)
  + [UploadOptions](#uploadoptions)
  + [示例](#示例-2)
  + [从 Android Uri 上传](#从-android-uri-上传)
* [uploadWithAutoKey()](#uploadwithautokey)
  + [参数](#参数-2)
  + [示例](#示例-3)
* [download()](#download)
  + [示例](#示例-4)
* [delete()](#delete)
  + [示例](#示例-5)
* [createSignedUrl()](#createsignedurl)
  + [参数](#参数-3)
  + [示例](#示例-6)
* [getDownloadUrl()](#getdownloadurl)
  + [示例](#示例-7)
* [list()](#list)
  + [BucketListFilter 选项](#bucketlistfilter-选项)
  + [示例](#示例-8)
* [存储桶管理](#存储桶管理)
  + [listBuckets()](#listbuckets)
  + [createBucket()](#createbucket)
  + [updateBucket()](#updatebucket)
  + [deleteBucket()](#deletebucket)
* [高级上传](#高级上传)
  + [getUploadStrategy()](#getuploadstrategy)
  + [confirmUpload()](#confirmupload)

Kotlin

# 存储 SDK 参考

复制页面

使用 InsForge Kotlin SDK 进行文件上传、下载和管理

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

## [​](#from) from()

获取用于文件操作的存储桶实例。

### [​](#示例) 示例

```
val bucket = insforge.storage.from("images")
```

---

## [​](#upload) upload()

使用特定路径/键上传文件。

### [​](#参数) 参数

* `path` (String) - 存储桶中的文件路径/键
* `data` (ByteArray) - 以字节为单位的文件内容
* `options` (DSL 块, 可选) - 上传选项

### [​](#uploadoptions) UploadOptions

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `contentType` | String? | MIME 类型（例如 "image/jpeg"） |
| `upsert` | Boolean | 文件存在时覆盖（默认：false） |
| `metadata` | `Map\<String, String\>?` | 自定义元数据 |

### [​](#示例-2) 示例

```
// 基本上传
val imageData = bitmap.toByteArray()
val result = insforge.storage
    .from("images")
    .upload("posts/post-123/cover.jpg", imageData)

Log.d("Storage", "已上传：${result.url}")

// 带选项的上传
val result = insforge.storage
    .from("images")
    .upload("posts/post-123/cover.jpg", imageData) {
        contentType = "image/jpeg"
        upsert = true  // 存在时覆盖
        metadata = mapOf("userId" to "123")
    }

// 使用中括号语法
val result = insforge.storage["images"]
    .upload("avatars/user-123.jpg", imageData) {
        contentType = "image/jpeg"
    }
```

### [​](#从-android-uri-上传) 从 Android Uri 上传

开发者可以使用以下函数从 Android Uri 上传文件：

```
// Android Uri 上传示例：
suspend fun uploadFromUri(
    bucket: BucketApi,
    uri: Uri,
    context: Context,
    path: String
): FileUploadResponse {
    val data = context.contentResolver.openInputStream(uri)?.use {
        it.readBytes()
    } ?: throw IllegalArgumentException("无法读取 Uri")

    val contentType = context.contentResolver.getType(uri)

    return bucket.upload(path, data) {
        this.contentType = contentType
    }
}
```

---

## [​](#uploadwithautokey) uploadWithAutoKey()

使用自动生成的唯一键上传文件。

### [​](#参数-2) 参数

* `filename` (String) - 原始文件名（用于扩展名检测）
* `data` (ByteArray) - 以字节为单位的文件内容
* `options` (DSL 块, 可选) - 上传选项

### [​](#示例-3) 示例

```
val imageData = bitmap.toByteArray()
val result = insforge.storage
    .from("uploads")
    .uploadWithAutoKey("photo.jpg", imageData) {
        contentType = "image/jpeg"
    }

Log.d("Storage", "自动生成的键：${result.key}")
Log.d("Storage", "URL：${result.url}")

// 保存到数据库
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

以 ByteArray 形式下载文件。

### [​](#示例-4) 示例

```
// 下载文件
val data = insforge.storage
    .from("images")
    .download(path = "posts/post-123/cover.jpg")

// 转换为 Bitmap
val bitmap = BitmapFactory.decodeByteArray(data, 0, data.size)
imageView.setImageBitmap(bitmap)
```

---

## [​](#delete) delete()

从存储中删除文件。

### [​](#示例-5) 示例

```
// 从数据库获取文件键
val posts = insforge.database
    .from("posts")
    .select("image_key")
    .eq("id", "post-123")
    .execute<Post>()  // 返回 List<Post>

val post = posts.firstOrNull() ?: return

// 从存储中删除
insforge.storage
    .from("images")
    .delete(post.imageKey)

// 清除数据库引用
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

创建用于临时访问文件的签名 URL。

### [​](#参数-3) 参数

* `path` (String) - 存储桶中的文件路径
* `expiresIn` (Int) - 过期时间（秒）

### [​](#示例-6) 示例

```
// 创建签名 URL（1 小时后过期）
val url = insforge.storage
    .from("images")
    .createSignedUrl("posts/post-123/cover.jpg", expiresIn = 3600)

Log.d("Storage", "签名 URL：$url")
```

---

## [​](#getdownloadurl) getDownloadUrl()

获取文件的下载 URL。

### [​](#示例-7) 示例

```
val strategy = insforge.storage
    .from("images")
    .getDownloadUrl("posts/post-123/cover.jpg")

Log.d("Storage", "下载 URL：${strategy.url}")
```

---

## [​](#list) list()

列出存储桶中的文件，支持可选的过滤条件。

### [​](#bucketlistfilter-选项) BucketListFilter 选项

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `prefix` | String? | 按路径前缀过滤 |
| `limit` | Int | 最大结果数（默认：100） |
| `offset` | Int | 分页偏移量（默认：0） |
| `sortBy` | String? | 排序字段 |
| `sortOrder` | SortOrder | ASC 或 DESC（默认：ASC） |

### [​](#示例-8) 示例

```
// 列出存储桶中的所有文件
val files = insforge.storage
    .from("images")
    .list()

files.forEach { file ->
    Log.d("Storage", "文件：${file.name}, 大小：${file.metadata?.size}")
}

// 带过滤条件列出
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

## [​](#存储桶管理) 存储桶管理

### [​](#listbuckets) listBuckets()

列出所有存储桶。

```
val buckets = insforge.storage.listBuckets()

buckets.forEach { bucket ->
    Log.d("Storage", "存储桶：${bucket.id}, 公开：${bucket.isPublic}")
}
```

### [​](#createbucket) createBucket()

创建新的存储桶。

```
val bucket = insforge.storage.createBucket("my-bucket") {
    isPublic = true
}

Log.d("Storage", "已创建存储桶：${bucket.id}")
```

### [​](#updatebucket) updateBucket()

更新存储桶设置。

```
insforge.storage.updateBucket("my-bucket") {
    isPublic = false
}
```

### [​](#deletebucket) deleteBucket()

删除存储桶。

```
insforge.storage.deleteBucket("my-bucket")
```

---

## [​](#高级上传) 高级上传

### [​](#getuploadstrategy) getUploadStrategy()

获取大文件或可恢复上传的上传策略。

```
val strategy = insforge.storage
    .from("videos")
    .getUploadStrategy("videos/large-file.mp4", fileSize = 100_000_000)

// 使用 strategy.url 进行上传
Log.d("Storage", "上传 URL：${strategy.url}")
```

### [​](#confirmupload) confirmUpload()

确认已完成的上传。

```
insforge.storage
    .from("videos")
    .confirmUpload("videos/large-file.mp4")
```

[Authentication SDK Reference](/sdks/kotlin/auth)[Functions SDK Reference](/sdks/kotlin/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)