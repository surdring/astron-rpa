## On this page

* [Installation](#installation)
  + [Enable Logging (Optional)](#enable-logging-optional)
* [from()](#from)
  + [Example](#example)
* [Bucket Operations](#bucket-operations)
  + [createBucket()](#createbucket)
  + [listBuckets()](#listbuckets)
  + [updateBucket()](#updatebucket)
  + [deleteBucket()](#deletebucket)
* [upload()](#upload)
  + [Parameters](#parameters)
  + [Examples](#examples)
* [download()](#download)
  + [Example](#example-2)
* [list()](#list)
  + [Parameters](#parameters-2)
  + [Examples](#examples-2)
* [delete()](#delete)
  + [Example](#example-3)
* [getPublicURL()](#getpublicurl)
  + [Example](#example-4)
* [Upload Strategy](#upload-strategy)
  + [getUploadStrategy()](#getuploadstrategy)
  + [confirmUpload()](#confirmupload)
* [Download Strategy](#download-strategy)
  + [getDownloadStrategy()](#getdownloadstrategy)
* [Options Reference](#options-reference)
  + [FileOptions](#fileoptions)
  + [BucketOptions](#bucketoptions)
  + [ListOptions](#listoptions)
* [StoredFile Model](#storedfile-model)

Swift

# Storage SDK Reference

Copy page

File upload, download, and management with the InsForge Swift SDK

Copy page

## [​](#installation) Installation

Add InsForge to your Swift Package Manager dependencies:

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

### [​](#enable-logging-optional) Enable Logging (Optional)

For debugging, you can configure the SDK log level and destination:

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

**Log Levels:**

| Level | Description |
| --- | --- |
| `.trace` | Most verbose, includes all internal details |
| `.debug` | Detailed information for debugging |
| `.info` | General operational information (default) |
| `.warning` | Warnings that don’t prevent operation |
| `.error` | Errors that affect functionality |
| `.critical` | Critical failures |

**Log Destinations:**

| Destination | Description |
| --- | --- |
| `.console` | Standard output (print) |
| `.osLog` | Apple’s unified logging system (recommended for iOS/macOS) |
| `.none` | Disable logging |
| `.custom` | Provide your own LogHandler factory |

Use `.info` or `.error` in production to avoid exposing sensitive data in logs.

## [​](#from) from()

Get a file API reference for a bucket.

### [​](#example) Example

```
let bucket = insforge.storage.from("images")
```

---

## [​](#bucket-operations) Bucket Operations

### [​](#createbucket) createBucket()

Creates a new storage bucket.

```
// Create a public bucket
try await insforge.storage.createBucket("avatars")

// Create a private bucket
try await insforge.storage.createBucket(
    "documents",
    options: BucketOptions(isPublic: false)
)
```

### [​](#listbuckets) listBuckets()

List all bucket names.

```
let buckets = try await insforge.storage.listBuckets()
// ["avatars", "documents", "uploads"]
```

### [​](#updatebucket) updateBucket()

Update a bucket’s visibility.

```
try await insforge.storage.updateBucket(
    "documents",
    options: BucketOptions(isPublic: true)
)
```

### [​](#deletebucket) deleteBucket()

Delete a bucket.

```
try await insforge.storage.deleteBucket("old-bucket")
```

---

## [​](#upload) upload()

Upload a file to the bucket.

### [​](#parameters) Parameters

* `path` (String) - The object key/path for the file
* `data` (Data) - File data to upload
* `options` (FileOptions, optional) - Upload options including contentType

### [​](#examples) Examples

```
// Upload with specific path
let imageData = UIImage(named: "photo")?.jpegData(compressionQuality: 0.8)
let file = try await insforge.storage
    .from("images")
    .upload(
        path: "posts/post-123/cover.jpg",
        data: imageData!,
        options: FileOptions(contentType: "image/jpeg")
    )

print("Uploaded: \(file.url)")
print("Key: \(file.key)")

// Upload from file URL
let fileURL = URL(fileURLWithPath: "/path/to/document.pdf")
let file = try await insforge.storage
    .from("documents")
    .upload(
        path: "reports/annual-2024.pdf",
        fileURL: fileURL
    )

// Upload with auto-generated key
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

Download a file as Data.

### [​](#example-2) Example

```
// Download file
let data = try await insforge.storage
    .from("images")
    .download(path: "posts/post-123/cover.jpg")

// Convert to UIImage
if let image = UIImage(data: data) {
    imageView.image = image
}
```

---

## [​](#list) list()

List files in a bucket.

### [​](#parameters-2) Parameters

* `options` (ListOptions, optional) - Options including prefix, limit, offset

### [​](#examples-2) Examples

```
// List all files
let files = try await insforge.storage
    .from("images")
    .list()

// List with prefix filter
let userFiles = try await insforge.storage
    .from("images")
    .list(options: ListOptions(prefix: "users/", limit: 50))

// Shorthand with prefix
let files = try await insforge.storage
    .from("images")
    .list(prefix: "posts/", limit: 20, offset: 0)

// Iterate results
for file in files {
    print("Key: \(file.key), Size: \(file.size)")
}
```

---

## [​](#delete) delete()

Delete a file from storage.

### [​](#example-3) Example

```
// Delete a file
try await insforge.storage
    .from("images")
    .delete(path: "posts/post-123/cover.jpg")

// Delete with database cleanup
let posts: [Post] = try await insforge.database
    .from("posts")
    .select("id, image_key")
    .eq("id", value: "post-123")
    .execute()

if let post = posts.first, let imageKey = post.imageKey {
    // Delete from storage
    try await insforge.storage
        .from("images")
        .delete(path: imageKey)

    // Clear database reference
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

Get a public URL for a file in a public bucket.

### [​](#example-4) Example

```
let url = insforge.storage
    .from("images")
    .getPublicURL(path: "posts/post-123/cover.jpg")

print("Public URL: \(url)")
```

---

## [​](#upload-strategy) Upload Strategy

Get upload strategy for large files (direct or presigned URL).

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
    // Upload directly to S3 using presigned URL
    print("Upload URL: \(strategy.uploadUrl)")
    print("Key: \(strategy.key)")

    // After uploading to presigned URL, confirm the upload
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

Confirm a presigned upload after uploading directly to S3.

```
let file = try await insforge.storage
    .from("videos")
    .confirmUpload(
        path: "videos/large-video.mp4",
        size: 104857600,
        contentType: "video/mp4",
        etag: "\"abc123\""  // Optional S3 ETag
    )
```

---

## [​](#download-strategy) Download Strategy

Get download strategy for private files (direct or presigned URL).

### [​](#getdownloadstrategy) getDownloadStrategy()

```
let strategy = try await insforge.storage
    .from("documents")
    .getDownloadStrategy(
        path: "private/confidential.pdf",
        expiresIn: 3600  // URL expires in 1 hour
    )

if strategy.method == "presigned" {
    // Use presigned URL to download
    print("Download URL: \(strategy.url)")
    print("Expires: \(strategy.expiresAt ?? "N/A")")
}
```

---

## [​](#options-reference) Options Reference

### [​](#fileoptions) FileOptions

Options for file upload operations.

```
public struct FileOptions {
    /// The Content-Type header value (auto-inferred if not specified)
    var contentType: String?

    /// Optional extra headers for the request
    var headers: [String: String]?
}
```

### [​](#bucketoptions) BucketOptions

Options for bucket creation/update.

```
public struct BucketOptions {
    /// Whether the bucket is publicly accessible (default: true)
    var isPublic: Bool
}
```

### [​](#listoptions) ListOptions

Options for listing files.

```
public struct ListOptions {
    /// Filter objects by key prefix
    var prefix: String?

    /// Maximum number of results (1-1000, default: 100)
    var limit: Int

    /// Offset for pagination (default: 0)
    var offset: Int
}
```

---

## [​](#storedfile-model) StoredFile Model

The response model for storage operations.

```
public struct StoredFile {
    let bucket: String      // Bucket name
    let key: String         // Object key/path
    let size: Int           // File size in bytes
    let mimeType: String?   // MIME type
    let uploadedAt: Date    // Upload timestamp
    let url: String         // Public or signed URL
}
```

[Authentication SDK Reference](/sdks/swift/auth)[Functions SDK Reference](/sdks/swift/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)