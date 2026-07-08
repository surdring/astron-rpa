## On this page

* [Installation](#installation)
* [from()](#from)
  + [Parameters](#parameters)
  + [Returns](#returns)
  + [Example](#example)
* [upload()](#upload)
  + [Parameters](#parameters-2)
  + [Returns](#returns-2)
  + [Example](#example-2)
  + [Output](#output)
* [uploadAuto()](#uploadauto)
  + [Parameters](#parameters-3)
  + [Returns](#returns-3)
  + [Example](#example-3)
  + [Output](#output-2)
* [download()](#download)
  + [Parameters](#parameters-4)
  + [Returns](#returns-4)
  + [Example](#example-4)
  + [Output](#output-3)
* [remove()](#remove)
  + [Parameters](#parameters-5)
  + [Returns](#returns-5)
  + [Example](#example-5)
  + [Output](#output-4)

TypeScript

# Storage SDK Reference

Copy page

File upload, download, and management with the InsForge TypeScript SDK

Copy page

## [​](#installation) Installation

npm

yarn

pnpm

```
npm install @insforge/sdk@latest
```

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // Optional: for public/unauthenticated requests
});
```

## [​](#from) from()

Get a bucket instance for file operations.

### [​](#parameters) Parameters

* `bucketName` (string, required) - Name of the storage bucket

### [​](#returns) Returns

```
StorageBucket // Instance with upload, uploadAuto, download, remove methods
```

### [​](#example) Example

```
const bucket = insforge.storage.from('images')
```

---

## [​](#upload) upload()

Upload a file with a specific path/key.

### [​](#parameters-2) Parameters

* `path` (string, required) - The object key/path for the file
* `file` (File | Blob, required) - File or Blob to upload

### [​](#returns-2) Returns

```
{
  data: {
    bucket: string,
    key: string,
    size: number,
    mimeType: string,
    uploadedAt: string,
    url: string
  } | null,
  error: Error | null
}
```

If a file with the same key exists, backend auto-renames it. Always use the returned `key` and `url`.

### [​](#example-2) Example

```
const { data, error } = await insforge.storage
  .from('images')
  .upload('posts/post-123/cover.jpg', fileObject)

// Save BOTH url and key to database
await insforge.database
  .from('posts')
  .update({
    image_url: data.url,
    image_key: data.key  // Save key for download/delete operations
  })
  .eq('id', 'post-123')
```

### [​](#output) Output

```
{
  "data": {
    "bucket": "images",
    "key": "posts/post-123/cover.jpg",
    "size": 45678,
    "mimeType": "image/jpeg",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "url": "https://your-app.region.insforge.app/api/storage/buckets/images/objects/posts%2Fpost-123%2Fcover.jpg"
  },
  "error": null
}
```

---

## [​](#uploadauto) uploadAuto()

Upload a file with auto-generated unique key.

### [​](#parameters-3) Parameters

* `file` (File | Blob, required) - File or Blob to upload

### [​](#returns-3) Returns

```
{
  data: {
    bucket: string,
    key: string,
    size: number,
    mimeType: string,
    uploadedAt: string,
    url: string
  } | null,
  error: Error | null
}
```

### [​](#example-3) Example

```
const { data, error } = await insforge.storage
  .from('uploads')
  .uploadAuto(fileObject)

// Save url and key to database
await insforge.database
  .from('posts')
  .insert([{
    image_url: data.url,
    image_key: data.key,  // Save key for download/delete operations
    user_id: userId
  }])
```

### [​](#output-2) Output

```
{
  "data": {
    "bucket": "uploads",
    "key": "myfile-1705315200000-abc123.jpg",
    "size": 45678,
    "mimeType": "image/jpeg",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "url": "https://your-app.region.insforge.app/api/storage/buckets/uploads/objects/myfile-1705315200000-abc123.jpg"
  },
  "error": null
}
```

---

## [​](#download) download()

Download a file as Blob.

### [​](#parameters-4) Parameters

* `path` (string, required) - The object key/path to download

### [​](#returns-4) Returns

```
{
  data: Blob | null,
  error: Error | null
}
```

### [​](#example-4) Example

```
// 1. Get the file key from your database
const { data: post, error: dbError } = await insforge.database
  .from('posts')
  .select('image_key')
  .eq('id', 'post-123')
  .single()

// 2. Download the file using the key
const { data: blob, error } = await insforge.storage
  .from('images')
  .download(post.image_key)

// 3. Create download link or display image
const url = URL.createObjectURL(blob)
const img = document.querySelector('img')
img.src = url
```

### [​](#output-3) Output

```
{
  "data": "Blob { size: 45678, type: 'image/jpeg' }",
  "error": null
}
```

---

## [​](#remove) remove()

Delete a file from storage.

### [​](#parameters-5) Parameters

* `path` (string, required) - The object key/path to delete

### [​](#returns-5) Returns

```
{
  data: { message: string } | null,
  error: Error | null
}
```

### [​](#example-5) Example

```
// 1. Get the file key from your database
const { data: post, error: dbError } = await insforge.database
  .from('posts')
  .select('image_key')
  .eq('id', 'post-123')
  .single()

// 2. Delete the file from storage
const { data, error } = await insforge.storage
  .from('images')
  .remove(post.image_key)

// 3. Clear the database reference
await insforge.database
  .from('posts')
  .update({ image_url: null, image_key: null })
  .eq('id', 'post-123')
```

### [​](#output-4) Output

```
{
  "data": {
    "message": "Object deleted successfully"
  },
  "error": null
}
```

[Authentication SDK Reference](/sdks/typescript/auth)[Functions SDK Reference](/sdks/typescript/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)