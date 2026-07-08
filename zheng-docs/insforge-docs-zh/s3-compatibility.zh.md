## 本页内容

* [概念](#concepts)
* [使用方法](#usage)
* [限制](#limits)
* [更多资源](#more-resources)

存储

# S3 兼容网关

复制页面

对 InsForge Storage 使用任何 AWS SigV4 客户端

复制页面

InsForge Storage 在 `/storage/v1/s3` 上使用 [AWS S3 协议](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)。仅限云项目。

## [​](#concepts) 概念

使用 SigV4 签名的长期访问密钥。项目管理员范围涵盖所有存储桶，仅支持路径样式 URL。S3 上传会立即出现在 REST API 和仪表盘中。在**存储 → 设置 → S3 配置**中生成密钥。

## [​](#usage) 使用方法

从仪表盘或 `GET /api/storage/s3/config` 获取端点和区域。

```
# ~/.aws/credentials
[insforge]
aws_access_key_id = your_access_key_id
aws_secret_access_key = your_secret_access_key

# ~/.aws/config
[profile insforge]
region = us-east-2
endpoint_url = https://project_ref.region.insforge.app/storage/v1/s3
s3 =
  addressing_style = path
```

```
aws --profile insforge s3 cp ./photo.jpg s3://my-bucket/photo.jpg
aws --profile insforge s3 sync ./dist s3://my-bucket/dist
```

在代码中，设置 `forcePathStyle: true` 并将 `endpoint` 指向 `/storage/v1/s3`。

```
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  forcePathStyle: true,
  region: 'us-east-2',
  endpoint: 'https://project_ref.region.insforge.app/storage/v1/s3',
  credentials: { accessKeyId: '...', secretAccessKey: '...' },
});

await client.send(new PutObjectCommand({ Bucket: 'my-bucket', Key: 'hello.txt', Body: 'hello' }));
```

## [​](#limits) 限制

`PutObject` 上限为 5 GB，分片上传上限为 5 TB。每个项目 50 个密钥，15 分钟时钟偏差。密钥在创建时仅显示一次。
不支持：预签名 URL（使用 `POST /api/storage/buckets/:bucket/upload-strategy`）、会话 token、虚拟主机样式 URL。版本控制、SSE-C/KMS、ACL、对象锁定、标签、生命周期和 CORS 返回 `501 NotImplemented`。

## [​](#more-resources) 更多资源

* [存储概览](/core-concepts/storage/overview) 了解网关内部机制。
* [TypeScript 存储 SDK](/sdks/typescript/storage) 了解浏览器上传。
* [AWS SigV4 参考](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html) 了解签名详情。

[概览](/core-concepts/storage/overview)[概览](/core-concepts/realtime/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)