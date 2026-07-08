## On this page

* [安装](#installation)
  + [启用日志记录（可选）](#enable-logging-optional)
* [from()](#from)
  + [示例](#example)
* [存储桶操作](#bucket-operations)
  + [createBucket()](#createbucket)
  + [listBuckets()](#listbuckets)
  + [updateBucket()](#updatebucket)
  + [deleteBucket()](#deletebucket)
* [upload()](#upload)
  + [参数](#parameters)
  + [示例](#examples)
* [download()](#download)
  + [示例](#example-2)
* [list()](#list)
  + [参数](#parameters-2)
  + [示例](#examples-2)
* [delete()](#delete)
  + [示例](#example-3)
* [getPublicURL()](#getpublicurl)
  + [示例](#example-4)
* [上传策略](#upload-strategy)
  + [getUploadStrategy()](#getuploadstrategy)
  + [confirmUpload()](#confirmupload)
* [下载策略](#download-strategy)
  + [getDownloadStrategy()](#getdownloadstrategy)
* [选项参考](#options-reference)
  + [FileOptions](#fileoptions)
  + [BucketOptions](#bucketoptions)
  + [ListOptions](#listoptions)
* [StoredFile 模型](#storedfile-model)

Swift

# 存储 SDK 参考

Copy page

使用 InsForge Swift SDK 进行文件上传、下载和管理

Copy page

## [​](#installation) 安装

将 InsForge 添加到您的 Swift Package Manager 依赖中：

```
dependencies: [
    .package(url: "https://github.com/insforge/insforge-swift.git", from: "0.0.9")
]
```

```
import InsForge

let insforge = InsForgeClient(
    baseURL: URL(string: "https://your-app.insforge.app")!,
    anonKey: "your-anon-key"
)
```

### [​](#enable-logging-optional) 启用日志记录（可选）

为了调试，您可以配置 SDK 日志级别和输出目标：

```
let options = InsForgeClientOptions(
    global: .init(
        logLevel: .debug,
        logDestination: .osLog,
        logSubsystem: "com.example.MyApp"
    )
)

let insforge = InsForgeClient(
    baseURL: URL(string: "https://your-app.insforge.app")!,
    anonKey: "your-anon-key",
    options: options
)
```

**日志级别：**

| 级别 | 描述 |
| --- | --- |
| `.trace` | 最详细，包含所有内部细节 |
| `.debug` | 用于调试的详细信息 |
| `.info` | 一般操作信息（默认） |
| `.warning` | 不影响操作的警告 |
| `.error` | 影响功能的错误 |
| `.critical` | 严重故障 |

**日志输出目标：**

| 目标 | 描述 |
| --- | --- |
| `.console` | 标准输出（print） |
| `.osLog` | Apple 统一日志系统（推荐用于 iOS/macOS） |
| `.none` | 禁用日志记录 |
| `.custom` | 提供您自己的 LogHandler 工厂 |

在生产环境中使用 `.info` 或 `.error`，以避免在日志中暴露敏感数据。

## [​](#from) from()

获取存储桶的文件 API 引用。

### [​](#example) 示例

```
let bucket = insforge.storage.from("images")
```

---

## [​](#bucket-operations) 存储桶操作

### [​](#createbucket) createBucket()

创建新的存储桶。

```
// 创建公共存储桶
try await insforge.storage.createBucket("avatars")

// 创建私有存储桶
try await insforge.storage.createBucket(
    "documents",
    options: BucketOptions(isPublic: false)
)
```

### [​](#listbuckets) listBuckets()

列出所有存储桶名称。

```
let buckets = try await insforge.storage.listBuckets()
// ["avatars", "documents", "uploads"]
```

### [​](#updatebucket) updateBucket()

更新存储桶的可见性。

```
try await insforge.storage.updateBucket(
    "documents",
    options: BucketOptions(isPublic: true)
)
```

### [​](#deletebucket) deleteBucket()

删除存储桶。

```
try await insforge.storage.deleteBucket("old-bucket")
```

---

## [​](#upload) upload()

上传文件到存储桶。

### [​](#parameters) 参数

* `path` (String) - 文件的对象键/路径
* `data` (Data) - 要上传的文件数据
* `options` (FileOptions, 可选) - 上传选项，包括 contentType

### [​](#examples) 示例

```
// 使用指定路径上传
let imageData = UIImage(named: "photo")?.jpegData(compressionQuality: 0.8)
let file = try await insforge.storage
    .from("images")
    .upload(
        path: "posts/post-123/cover.jpg",
        data: imageData!,
        options: FileOptions(contentType: "image/jpeg")
    )

print("已上传：\(file.url)")
print("键：\(file.key)")

// 从文件 URL 上传
let fileURL = URL(fileURLWithPath: "/path/to/document.pdf")
let file = try await insforge.storage
    .from("documents")
    .upload(
        path: "reports/annual-2024.pdf",
        fileURL: fileURL
    )

// 使用自动生成的键上传
let file = try await insforge.storage
    .from("uploads")
    .upload(
        data: imageData!,
        fileName: "profile.jpg",
        options: FileOptions(contentType: "image/jpeg")
    )
```

---

## [​](#download) download()

将文件下载为 Data。

### [​](#example-2) 示例

```
// 下载文件
let data = try await insforge.storage
    .from("images")
    .download(path: "posts/post-123/cover.jpg")

// 转换为 UIImage
if let image = UIImage(data: data) {
    imageView.image = image
}
```

---

## [​](#list) list()

列出存储桶中的文件。

### [​](#parameters-2) 参数

* `options` (ListOptions, 可选) - 选项，包括 prefix、limit、offset

### [​](#examples-2) 示例

```
// 列出所有文件
let files = try await insforge.storage
    .from("images")
    .list()

// 使用前缀过滤
let userFiles = try await insforge.storage
    .from("images")
    .list(options: ListOptions(prefix: "users/", limit: 50))

// 使用前缀的简写
let files = try await insforge.storage
    .from("images")
    .list(prefix: "posts/", limit: 20, offset: 0)

// 遍历结果
for file in files {
    print("键：\(file.key), 大小：\(file.size)")
}
```

---

## [​](#delete) delete()

从存储中删除文件。

### [​](#example-3) 示例

```
// 删除文件
try await insforge.storage
    .from("images")
    .delete(path: "posts/post-123/cover.jpg")

// 带数据库清理的删除
let posts: [Post] = try await insforge.database
    .from("posts")
    .select("id, image_key")
    .eq("id", value: "post-123")
    .execute()

if let post = posts.first, let imageKey = post.imageKey {
    // 从存储中删除
    try await insforge.storage
        .from("images")
        .delete(path: imageKey)

    // 清除数据库引用
    struct PostUpdate: Codable {
        let imageUrl: String?
        let imageKey: String?
    }

    let _: [Post] = try await insforge.database
        .from("posts")
        .eq("id", value: "post-123")
        .update(PostUpdate(imageUrl: nil, imageKey: nil))
}
```

---

## [​](#getpublicurl) getPublicURL()

获取公共存储桶中文件的公共 URL。

### [​](#example-4) 示例

```
let url = insforge.storage
    .from("images")
    .getPublicURL(path: "posts/post-123/cover.jpg")

print("公共 URL：\(url)")
```

---

## [​](#upload-strategy) 上传策略

获取大文件的上传策略（直接上传或预签名 URL）。

### [​](#getuploadstrategy) getUploadStrategy()

```
let strategy = try await insforge.storage
    .from("videos")
    .getUploadStrategy(
        filename: "large-video.mp4",
        contentType: "video/mp4",
        size: 104857600  // 100MB
    )

if strategy.method == "presigned" {
    // 使用预签名 URL 直接上传到 S3
    print("上传 URL：\(strategy.uploadUrl)")
    print("键：\(strategy.key)")

    // 上传到预签名 URL 后，确认上传
    if strategy.confirmRequired {
        let file = try await insforge.storage
            .from("videos")
            .confirmUpload(
                path: strategy.key,
                size: 104857600,
                contentType: "video/mp4"
            )
    }
}
```

### [​](#confirmupload) confirmUpload()

直接上传到 S3 后确认预签名上传。

```
let file = try await insforge.storage
    .from("videos")
    .confirmUpload(
        path: "videos/large-video.mp4",
        size: 104857600,
        contentType: "video/mp4",
        etag: "\"abc123\""  // 可选的 S3 ETag
    )
```

---

## [​](#download-strategy) 下载策略

获取私有文件的下载策略（直接下载或预签名 URL）。

### [​](#getdownloadstrategy) getDownloadStrategy()

```
let strategy = try await insforge.storage
    .from("documents")
    .getDownloadStrategy(
        path: "private/confidential.pdf",
        expiresIn: 3600  // URL 1 小时后过期
    )

if strategy.method == "presigned" {
    // 使用预签名 URL 下载
    print("下载 URL：\(strategy.url)")
    print("过期时间：\(strategy.expiresAt ?? "N/A")")
}
```

---

## [​](#options-reference) 选项参考

### [​](#fileoptions) FileOptions

文件上传操作的选项。

```
public struct FileOptions {
    /// Content-Type 请求头值（未指定时自动推断）
    var contentType: String?

    /// 请求的可选额外请求头
    var headers: [String: String]?
}
```

### [​](#bucketoptions) BucketOptions

存储桶创建/更新的选项。

```
public struct BucketOptions {
    /// 存储桶是否可公开访问（默认：true）
    var isPublic: Bool
}
```

### [​](#listoptions) ListOptions

列出文件的选项。

```
public struct ListOptions {
    /// 按键前缀过滤对象
    var prefix: String?

    /// 最大结果数（1-1000，默认：100）
    var limit: Int

    /// 分页偏移量（默认：0）
    var offset: Int
}
```

---

## [​](#storedfile-model) StoredFile 模型

存储操作的响应模型。

```
public struct StoredFile {
    let bucket: String      // 存储桶名称
    let key: String         // 对象键/路径
    let size: Int           // 文件大小（字节）
    let mimeType: String?   // MIME 类型
    let uploadedAt: Date    // 上传时间戳
    let url: String         // 公共或签名的 URL
}
```

[认证 SDK 参考](/sdks/swift/auth)[函数 SDK 参考](/sdks/swift/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)