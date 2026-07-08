## On this page

* [安装](#installation)
* [from()](#from)
  + [参数](#parameters)
  + [返回值](#returns)
  + [示例](#example)
* [upload()](#upload)
  + [参数](#parameters-2)
  + [返回值](#returns-2)
  + [示例](#example-2)
  + [输出](#output)
* [uploadAuto()](#uploadauto)
  + [参数](#parameters-3)
  + [返回值](#returns-3)
  + [示例](#example-3)
  + [输出](#output-2)
* [download()](#download)
  + [参数](#parameters-4)
  + [返回值](#returns-4)
  + [示例](#example-4)
  + [输出](#output-3)
* [remove()](#remove)
  + [参数](#parameters-5)
  + [返回值](#returns-5)
  + [示例](#example-5)
  + [输出](#output-4)

TypeScript

# Storage SDK 参考

Copy page

使用 InsForge TypeScript SDK 进行文件上传、下载和管理

Copy page

## [​](#installation) 安装

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
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#from) from()

获取用于文件操作的存储桶实例。

### [​](#parameters) 参数

* `bucketName` (string, 必填) - 存储桶的名称

### [​](#returns) 返回值

```
StorageBucket // 包含 upload、uploadAuto、download、remove 方法的实例
```

### [​](#example) 示例

```
const bucket = insforge.storage.from('images')
```

---

## [​](#upload) upload()

使用指定的路径/键上传文件。

### [​](#parameters-2) 参数

* `path` (string, 必填) - 文件的对象键/路径
* `file` (File | Blob, 必填) - 要上传的 File 或 Blob

### [​](#returns-2) 返回值

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

如果存在相同键的文件，后端会自动重命名。始终使用返回的 `key` 和 `url`。

### [​](#example-2) 示例

```
const { data, error } = await insforge.storage
  .from('images')
  .upload('posts/post-123/cover.jpg', fileObject)

// 将 url 和 key 都保存到数据库
await insforge.database
  .from('posts')
  .update({
    image_url: data.url,
    image_key: data.key  // 保存 key 用于下载/删除操作
  })
  .eq('id', 'post-123')
```

### [​](#output) 输出

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

使用自动生成的唯一键上传文件。

### [​](#parameters-3) 参数

* `file` (File | Blob, 必填) - 要上传的 File 或 Blob

### [​](#returns-3) 返回值

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

### [​](#example-3) 示例

```
const { data, error } = await insforge.storage
  .from('uploads')
  .uploadAuto(fileObject)

// 将 url 和 key 保存到数据库
await insforge.database
  .from('posts')
  .insert([{
    image_url: data.url,
    image_key: data.key,  // 保存 key 用于下载/删除操作
    user_id: userId
  }])
```

### [​](#output-2) 输出

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

将文件下载为 Blob。

### [​](#parameters-4) 参数

* `path` (string, 必填) - 要下载的对象键/路径

### [​](#returns-4) 返回值

```
{
  data: Blob | null,
  error: Error | null
}
```

### [​](#example-4) 示例

```
// 1. 从数据库获取文件键
const { data: post, error: dbError } = await insforge.database
  .from('posts')
  .select('image_key')
  .eq('id', 'post-123')
  .single()

// 2. 使用键下载文件
const { data: blob, error } = await insforge.storage
  .from('images')
  .download(post.image_key)

// 3. 创建下载链接或显示图片
const url = URL.createObjectURL(blob)
const img = document.querySelector('img')
img.src = url
```

### [​](#output-3) 输出

```
{
  "data": "Blob { size: 45678, type: 'image/jpeg' }",
  "error": null
}
```

---

## [​](#remove) remove()

从存储中删除文件。

### [​](#parameters-5) 参数

* `path` (string, 必填) - 要删除的对象键/路径

### [​](#returns-5) 返回值

```
{
  data: { message: string } | null,
  error: Error | null
}
```

### [​](#example-5) 示例

```
// 1. 从数据库获取文件键
const { data: post, error: dbError } = await insforge.database
  .from('posts')
  .select('image_key')
  .eq('id', 'post-123')
  .single()

// 2. 从存储中删除文件
const { data, error } = await insforge.storage
  .from('images')
  .remove(post.image_key)

// 3. 清除数据库引用
await insforge.database
  .from('posts')
  .update({ image_url: null, image_key: null })
  .eq('id', 'post-123')
```

### [​](#output-4) 输出

```
{
  "data": {
    "message": "对象已成功删除"
  },
  "error": null
}
```

[认证 SDK 参考](/sdks/typescript/auth)[函数 SDK 参考](/sdks/typescript/functions)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)