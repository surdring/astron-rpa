## 本页内容

* [功能特性](#features)
  + [S3 兼容 API](#s3-compatible-api)
  + [签名 URL](#signed-urls)
  + [行级安全](#row-level-security)
  + [存储桶](#buckets)
  + [直接上传](#direct-uploads)
* [概念](#concepts)
* [构建应用](#build-with-it)
* [后续步骤](#next-steps)

存储

# 存储

复制页面

存储和提供大型二进制文件。

复制页面

使用 InsForge 存储和提供大型二进制文件：图片、视频、PDF、音频、备份——任何你不会放在数据库行中的内容。每个项目都有一个 S3 兼容的存储桶。文件通过签名 URL 提供，访问策略遵循与数据库相同的行级安全模型，S3 API 可与 rclone、AWS CLI、Terraform 和任何语言的 SDK 配合使用。

![InsForge 仪表盘存储浏览器，展示 photos 存储桶和文件列表](https://mintcdn.com/insforge-468ccf39/BaXMFYmXPQFuLF7H/images/storage-browser.png?fit=max&auto=format&n=BaXMFYmXPQFuLF7H&q=85&s=8113415cee880fdaae0d315427c411fa)

**需要结构化数据？** 使用 [Database](/core-concepts/database/overview) 处理行、关系和查询。存储保存对象；数据库保存行。将文件元数据（所有者、名称、大小、内容类型）保存在数据库表中，将字节保存在存储中。

## [​](#features) 功能特性

### [​](#s3-compatible-api) S3 兼容 API

将任何 S3 客户端指向你项目的存储桶。原生 AWS 凭据、原生分片上传、原生预签名 URL。参见 [S3 兼容性](/core-concepts/storage/s3-compatibility)。

### [​](#signed-urls) 签名 URL

生成有时限的 URL 以共享私有对象，无需暴露你的凭据。SDK 和 REST API 都会签发用于上传和下载的签名 URL。

### [​](#row-level-security) 行级安全

存储策略读取与数据库查询相同的 auth JWT。能够 `SELECT` 某行的用户也可以 `GET` 该行引用的文件，因此你无需维护一套独立的存储权限。

### [​](#buckets) 存储桶

将对象分组到具有独立访问策略的存储桶中。公共存储桶通过 HTTPS 直接提供文件；私有存储桶需要签名 URL 或已认证的请求。

### [​](#direct-uploads) 直接上传

浏览器和移动客户端使用预签名 URL 直接上传到存储。后端不会代理字节。

## [​](#concepts) 概念

## S3 兼容性

使用原生凭据将任何 S3 客户端指向你项目的存储桶。

## [​](#build-with-it) 构建应用

## TypeScript SDK

从 Node、浏览器和边缘运行时上传、下载、列出和管理对象。

## Swift SDK

适用于 iOS 和 macOS 的原生 Swift 存储客户端。

## Kotlin SDK

适用于 Android 和 JVM 的协程优先存储客户端。

## REST API

纯 HTTP 存储端点，可从任何语言调用。

## [​](#next-steps) 后续步骤

* 设置 [CLI](/quickstart) 以关联你的项目（推荐方式）。
* 浏览 [TypeScript SDK 参考](/sdks/typescript/storage) 了解上传和下载。

[概览](/core-concepts/authentication/overview)[S3 兼容网关](/core-concepts/storage/s3-compatibility)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)