## On this page

* [Features](#features)
  + [S3-compatible API](#s3-compatible-api)
  + [Signed URLs](#signed-urls)
  + [Row-level security](#row-level-security)
  + [Buckets](#buckets)
  + [Direct uploads](#direct-uploads)
* [Concepts](#concepts)
* [Build with it](#build-with-it)
* [Next steps](#next-steps)

Storage

# Storage

Copy page

Store and serve large binary files.

Copy page

Use InsForge to store and serve large binary files: images, videos, PDFs, audio, backups, anything you would not put in a database row. Every project gets an S3-compatible bucket. Files are served behind signed URLs, access policies follow the same row-level security model as the database, and the S3 API works with rclone, the AWS CLI, Terraform, and SDKs in any language.

![InsForge dashboard storage browser showing a photos bucket and the file listing](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/storage-browser.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=8113415cee880fdaae0d315427c411fa)

**Looking for structured data?** Use [Database](/core-concepts/database/overview) for rows, relations, and queries. Storage holds objects; the database holds rows. Keep file metadata (owner, name, size, content type) in a database table and the bytes in storage.

## [​](#features) Features

### [​](#s3-compatible-api) S3-compatible API

Point any S3 client at your project’s bucket. Native AWS credentials, native multipart uploads, native presigned URLs. See [S3 compatibility](/core-concepts/storage/s3-compatibility).

### [​](#signed-urls) Signed URLs

Generate time-limited URLs to share private objects without exposing your credentials. The SDK and REST API both issue signed URLs for upload and download.

### [​](#row-level-security) Row-level security

Storage policies read the same auth JWT as database queries. The same user who can `SELECT` a row can `GET` the file the row references, so you never maintain a separate set of storage permissions.

### [​](#buckets) Buckets

Group objects into buckets with separate access policies. Public buckets serve files directly over HTTPS; private buckets require a signed URL or an authenticated request.

### [​](#direct-uploads) Direct uploads

Browser and mobile clients upload straight to storage with a presigned URL. The backend never proxies bytes.

## [​](#concepts) Concepts

## S3 compatibility

Point any S3 client at your project’s bucket with native credentials.

## [​](#build-with-it) Build with it

## TypeScript SDK

Upload, download, list, and manage objects from Node, browser, and edge.

## Swift SDK

Native Swift storage client for iOS and macOS.

## Kotlin SDK

Coroutines-first storage client for Android and JVM.

## REST API

Plain HTTP storage endpoints, callable from any language.

## [​](#next-steps) Next steps

* Set up the [CLI](/quickstart) to link your project (the recommended path).
* Browse the [TypeScript SDK reference](/sdks/typescript/storage) for uploads and downloads.

[Overview](/core-concepts/authentication/overview)[S3-compatible gateway](/core-concepts/storage/s3-compatibility)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)