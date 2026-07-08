## On this page

* [Overview](#overview)
* [Headers](#headers)
* [Upload Object with upload strategy](#upload-object-with-upload-strategy)
  + [Step 1: Get Upload Strategy](#step-1-get-upload-strategy)
  + [Request Body](#request-body)
  + [Example](#example)
  + [Response (S3 Backend)](#response-s3-backend)
  + [Response (Local Storage)](#response-local-storage)
  + [Step 2: Upload File](#step-2-upload-file)
  + [Step 3: Confirm Presigned Upload (S3 Only)](#step-3-confirm-presigned-upload-s3-only)
  + [Request Body](#request-body-2)
  + [Example](#example-2)
  + [Response](#response)
* [Upload Object (Deprecated)](#upload-object-deprecated)
  + [Path Parameters](#path-parameters)
  + [Request Body](#request-body-3)
  + [Example](#example-3)
  + [Response](#response-2)
* [Upload with Auto-Generated Key (Deprecated)](#upload-with-auto-generated-key-deprecated)
  + [Example](#example-4)
  + [Response](#response-3)
* [Download Object with download strategy](#download-object-with-download-strategy)
  + [Step 1: Get Download Strategy](#step-1-get-download-strategy)
  + [Example](#example-5)
  + [Response (S3 Public Bucket)](#response-s3-public-bucket)
  + [Response (S3 Private Bucket)](#response-s3-private-bucket)
  + [Step 2: Download File](#step-2-download-file)
* [Download Object (Deprecated)](#download-object-deprecated)
  + [Example](#example-6)
  + [Response](#response-4)
* [Delete Object](#delete-object)
  + [Example](#example-7)
  + [Response](#response-5)
* [List Objects in Bucket](#list-objects-in-bucket)
  + [Query Parameters](#query-parameters)
  + [Example](#example-8)
  + [Response](#response-6)
* [Bucket Management (Admin)](#bucket-management-admin)
  + [List All Buckets](#list-all-buckets)
  + [Example](#example-9)
  + [Response](#response-7)
  + [Create Bucket](#create-bucket)
  + [Request Body](#request-body-4)
  + [Example](#example-10)
  + [Response](#response-8)
  + [Update Bucket](#update-bucket)
  + [Request Body](#request-body-5)
  + [Example](#example-11)
  + [Response](#response-9)
  + [Delete Bucket](#delete-bucket)
  + [Example](#example-12)
  + [Response](#response-10)
* [Error Responses](#error-responses)
  + [Bucket Not Found (404)](#bucket-not-found-404)
  + [Object Not Found (404)](#object-not-found-404)
  + [Invalid File (400)](#invalid-file-400)
  + [Bucket Already Exists (409)](#bucket-already-exists-409)

REST API

# Storage API Reference

Copy page

File storage and bucket management via REST API

Copy page

## [​](#overview) Overview

The Storage API provides bucket-based file storage similar to S3. Upload, download, and manage files with support for both local and S3-compatible storage backends.

## [​](#headers) Headers

For authenticated function invocations:

```
Authorization: Bearer your-jwt-token-or-anon-key
Content-Type: application/json
```

For admin endpoints:

```
Authorization: Bearer admin-jwt-token-Or-API-Key
Content-Type: application/json
```

---

## [​](#upload-object-with-upload-strategy) Upload Object with upload strategy

InsForge supports two types of storage backends:

1. **Local Storage**: Files are stored on the local filesystem. Use for development or low-volume production.
2. **S3-Compatible**: Files are stored on S3-compatible object storage. Use for high-volume production.

The steps to upload a file are:

1. Get upload strategy
2. Upload file
3. Confirm upload (S3 only)

---

### [​](#step-1-get-upload-strategy) Step 1: Get Upload Strategy

Get the optimal upload strategy (direct or presigned URL) based on storage backend.
The upload strategy API returns the optimal upload method based on the storage backend:

* **Local Storage**: Direct upload to InsForge API
* **S3-Compatible**: Presigned URL for direct upload to S3

```
POST /api/storage/buckets/{bucketName}/upload-strategy
```

#### [​](#request-body) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `filename` | string | Yes | Original filename |
| `contentType` | string | No | MIME type of the file |
| `size` | integer | No | File size in bytes |

#### [​](#example) Example

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets/avatars/upload-strategy" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "profile-photo.jpg",
    "contentType": "image/jpeg",
    "size": 102400
  }'
```

#### [​](#response-s3-backend) Response (S3 Backend)

```
{
  "method": "presigned",
  "uploadUrl": "https://s3-bucket.amazonaws.com/",
  "fields": {
    "bucket": "my-s3-bucket",
    "key": "app-key/avatars/profile-photo-1234567890-abc123.jpg",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "...",
    "Policy": "...",
    "X-Amz-Signature": "..."
  },
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": true,
  "confirmUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg/confirm-upload",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

#### [​](#response-local-storage) Response (Local Storage)

```
{
  "method": "direct",
  "uploadUrl": "/api/storage/buckets/avatars/objects/profile-photo-1234567890-abc123.jpg",
  "key": "profile-photo-1234567890-abc123.jpg",
  "confirmRequired": false
}
```

---

### [​](#step-2-upload-file) Step 2: Upload File

Upload the file to the specified URL using the provided method.

* **Local Storage**: Use a PUT request to `uploadUrl` with `multipart/form-data` and a `file` field.
* **S3-Compatible**: Use a POST request to `uploadUrl` with `multipart/form-data` and a `file` field. Include all fields from the `fields` object in the request.

### [​](#step-3-confirm-presigned-upload-s3-only) Step 3: Confirm Presigned Upload (S3 Only)

Confirm that a file was successfully uploaded to S3 using presigned URL.

```
POST /api/storage/buckets/{bucketName}/objects/{objectKey}/confirm-upload
```

#### [​](#request-body-2) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `size` | integer | Yes | File size in bytes |
| `contentType` | string | No | MIME type of the file |
| `etag` | string | No | S3 ETag of the uploaded object |

#### [​](#example-2) Example

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets/avatars/objects/profile-photo-123.jpg/confirm-upload" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "size": 102400,
    "contentType": "image/jpeg"
  }'
```

#### [​](#response) Response

```
{
  "bucket": "avatars",
  "key": "profile-photo-123.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/profile-photo-123.jpg"
}
```

---

## [​](#upload-object-deprecated) Upload Object (Deprecated)

Upload a file to a bucket with a specific key.

```
PUT /api/storage/buckets/{bucketName}/objects/{objectKey}
```

### [​](#path-parameters) Path Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `bucketName` | string | Name of the bucket |
| `objectKey` | string | Object key (can include `/` for pseudo-folders) |

### [​](#request-body-3) Request Body

`multipart/form-data` with a `file` field.

### [​](#example-3) Example

```
curl -X PUT "https://your-app.insforge.app/api/storage/buckets/avatars/objects/users/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token" \
  -F "file=@/path/to/image.jpg"
```

### [​](#response-2) Response

```
{
  "bucket": "avatars",
  "key": "users/profile.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-15T10:30:00Z",
  "url": "/api/storage/buckets/avatars/objects/users/profile.jpg"
}
```

---

## [​](#upload-with-auto-generated-key-deprecated) Upload with Auto-Generated Key (Deprecated)

Upload a file with an auto-generated unique key.

```
POST /api/storage/buckets/{bucketName}/objects
```

### [​](#example-4) Example

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets/uploads/objects" \
  -H "Authorization: Bearer your-jwt-token" \
  -F "file=@/path/to/document.pdf"
```

### [​](#response-3) Response

```
{
  "bucket": "uploads",
  "key": "document-1737546841234-a3f2b1.pdf",
  "size": 204800,
  "mimeType": "application/pdf",
  "uploadedAt": "2024-01-21T10:30:00Z",
  "url": "/api/storage/buckets/uploads/objects/document-1737546841234-a3f2b1.pdf"
}
```

---

## [​](#download-object-with-download-strategy) Download Object with download strategy

InsForge supports two types of storage backends:

1. **Local Storage**: Files are stored on the local filesystem. Use for development or low-volume production.
2. **S3-Compatible**: Files are stored on S3-compatible object storage. Use for high-volume production.

The steps to download a file are:

1. Get download strategy
2. Download file from returned URL

### [​](#step-1-get-download-strategy) Step 1: Get Download Strategy

Get the optimal download strategy (direct URL or presigned URL) based on storage backend and bucket visibility.
The download strategy API returns the optimal download method based on the storage backend and bucket visibility:

* **Local Storage**: Direct download from InsForge API
* **S3-Compatible**: Presigned URL for S3.

```
GET /api/storage/buckets/{bucketName}/download-strategy/objects/{objectKey}
```

Expiry (for presigned URLs) is auto-calculated server-side from bucket
visibility. The endpoint takes no request body. `objectKey` may contain
`/` (pseudo-folders) — do not percent-encode the separators.`POST /api/storage/buckets/{bucketName}/objects/{objectKey}/download-strategy`
is retained as a deprecated alias at the original path for older SDK
releases and will be removed in a future major version. Migrate to `GET`.

#### [​](#example-5) Example

```
curl "https://your-app.insforge.app/api/storage/buckets/avatars/download-strategy/objects/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token"
```

#### [​](#response-s3-public-bucket) Response (S3 Public Bucket)

```
{
  "method": "direct",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/avatars/profile.jpg"
}
```

#### [​](#response-s3-private-bucket) Response (S3 Private Bucket)

```
{
  "method": "presigned",
  "url": "https://s3-bucket.s3.us-east-2.amazonaws.com/app-key/avatars/profile.jpg?X-Amz-Algorithm=...",
  "expiresAt": "2025-09-05T01:00:00Z"
}
```

### [​](#step-2-download-file) Step 2: Download File

Download the file from the returned URL, using the appropriate method.

---

## [​](#download-object-deprecated) Download Object (Deprecated)

Download a file from a bucket.

```
GET /api/storage/buckets/{bucketName}/objects/{objectKey}
```

### [​](#example-6) Example

```
curl "https://your-app.insforge.app/api/storage/buckets/avatars/objects/users/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token" \
  -o profile.jpg
```

### [​](#response-4) Response

Binary file content with appropriate `Content-Type` and `Content-Length` headers.

---

## [​](#delete-object) Delete Object

Delete a file from a bucket.

```
DELETE /api/storage/buckets/{bucketName}/objects/{objectKey}
```

### [​](#example-7) Example

```
curl -X DELETE "https://your-app.insforge.app/api/storage/buckets/avatars/objects/users/profile.jpg" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-5) Response

```
{
  "message": "Object deleted successfully"
}
```

---

## [​](#list-objects-in-bucket) List Objects in Bucket

List all objects in a bucket with optional filtering.

```
GET /api/storage/buckets/{bucketName}/objects
```

### [​](#query-parameters) Query Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `prefix` | string | Filter by key prefix (e.g., `users/`) |
| `search` | string | Search objects by key (partial match) |
| `limit` | integer | Maximum objects to return (1-1000, default: 100) |
| `offset` | integer | Number of objects to skip |

### [​](#example-8) Example

```
# Filter by prefix
curl "https://your-app.insforge.app/api/storage/buckets/avatars/objects?prefix=users/&limit=50" \
  -H "Authorization: Bearer your-jwt-token"

# Search by key
curl "https://your-app.insforge.app/api/storage/buckets/avatars/objects?search=profile" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-6) Response

```
{
  "data": [
    {
      "bucket": "avatars",
      "key": "users/user123.jpg",
      "size": 102400,
      "mimeType": "image/jpeg",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user123.jpg"
    },
    {
      "bucket": "avatars",
      "key": "users/user456.png",
      "size": 204800,
      "mimeType": "image/png",
      "uploadedAt": "2024-01-16T11:00:00Z",
      "url": "/api/storage/buckets/avatars/objects/users/user456.png"
    }
  ],
  "pagination": {
    "offset": 0,
    "limit": 100,
    "total": 2
  }
}
```

---

## [​](#bucket-management-admin) Bucket Management (Admin)

### [​](#list-all-buckets) List All Buckets

```
GET /api/storage/buckets
```

### [​](#example-9) Example

```
curl "https://your-app.insforge.app/api/storage/buckets" \
  -H "Authorization: Bearer admin-jwt-token"
```

### [​](#response-7) Response

```
{
  "buckets": ["avatars", "documents", "uploads", "public"]
}
```

### [​](#create-bucket) Create Bucket

```
POST /api/storage/buckets
```

### [​](#request-body-4) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucketName` | string | Yes | Bucket name (alphanumeric, underscore, hyphen) |
| `isPublic` | boolean | No | Whether bucket is publicly accessible (default: true) |

### [​](#example-10) Example

```
curl -X POST "https://your-app.insforge.app/api/storage/buckets" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "bucketName": "user-uploads",
    "isPublic": false
  }'
```

### [​](#response-8) Response

```
{
  "message": "Bucket created successfully",
  "bucket": "user-uploads"
}
```

### [​](#update-bucket) Update Bucket

```
PATCH /api/storage/buckets/{bucketName}
```

### [​](#request-body-5) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isPublic` | boolean | Yes | Whether bucket is publicly accessible |

### [​](#example-11) Example

```
curl -X PATCH "https://your-app.insforge.app/api/storage/buckets/user-uploads" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"isPublic": true}'
```

### [​](#response-9) Response

```
{
  "message": "Bucket visibility updated",
  "bucket": "user-uploads",
  "isPublic": true
}
```

### [​](#delete-bucket) Delete Bucket

```
DELETE /api/storage/buckets/{bucketName}
```

### [​](#example-12) Example

```
curl -X DELETE "https://your-app.insforge.app/api/storage/buckets/old-uploads" \
  -H "Authorization: Bearer admin-jwt-token"
```

### [​](#response-10) Response

```
{
  "message": "Bucket deleted successfully"
}
```

---

## [​](#error-responses) Error Responses

### [​](#bucket-not-found-404) Bucket Not Found (404)

```
{
  "error": "BUCKET_NOT_FOUND",
  "message": "Bucket 'nonexistent' does not exist",
  "statusCode": 404,
  "nextActions": "Create the bucket first"
}
```

### [​](#object-not-found-404) Object Not Found (404)

```
{
  "error": "OBJECT_NOT_FOUND",
  "message": "Object 'missing.jpg' not found in bucket 'avatars'",
  "statusCode": 404,
  "nextActions": "Check the bucket and key combination"
}
```

### [​](#invalid-file-400) Invalid File (400)

```
{
  "error": "INVALID_FILE",
  "message": "No file provided in the request",
  "statusCode": 400,
  "nextActions": "Include a file in the multipart form data"
}
```

### [​](#bucket-already-exists-409) Bucket Already Exists (409)

```
{
  "error": "BUCKET_EXISTS",
  "message": "Bucket 'avatars' already exists",
  "statusCode": 409,
  "nextActions": "Choose a different bucket name"
}
```

[Authentication API Reference](/sdks/rest/auth)[Functions API Reference](/sdks/rest/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)