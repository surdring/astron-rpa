## On this page

* [Concepts](#concepts)
* [Usage](#usage)
* [Limits](#limits)
* [More resources](#more-resources)

Storage

# S3-compatible gateway

Copy page

Use any AWS SigV4 client against InsForge Storage

Copy page

InsForge Storage speaks the [AWS S3 protocol](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) at `/storage/v1/s3`. Cloud projects only.

## [​](#concepts) Concepts

Long-lived access keys signed with SigV4. Project-admin scope across every bucket, path-style URLs only. S3 uploads appear immediately in the REST API and Dashboard. Generate keys in **Storage → Settings → S3 Configuration**.

## [​](#usage) Usage

Fetch endpoint and region from the Dashboard or `GET /api/storage/s3/config`.

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

In code, set `forcePathStyle: true` and point `endpoint` at `/storage/v1/s3`.

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

## [​](#limits) Limits

`PutObject` caps at 5 GB, multipart at 5 TB. 50 keys per project, 15-minute clock skew. Secret keys show once on creation.
Not supported: presigned URLs (use `POST /api/storage/buckets/:bucket/upload-strategy`), session tokens, virtual-hosted URLs. Versioning, SSE-C/KMS, ACLs, object lock, tagging, lifecycle, and CORS return `501 NotImplemented`.

## [​](#more-resources) More resources

* [Storage overview](/core-concepts/storage/overview) for the gateway internals.
* [TypeScript storage SDK](/sdks/typescript/storage) for browser uploads.
* [AWS SigV4 reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html) for signing details.

[Overview](/core-concepts/storage/overview)[Overview](/core-concepts/realtime/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)