创建 S3 访问密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "description": "backup-script"
}
'
```

201

400

401

429

```
{
  "data": {
    "id": "11111111-1111-1111-1111-111111111111",
    "accessKeyId": "INSFABC123DEF456GH78",
    "secretAccessKey": "x7K2-a_pL9qRs4N8vYzWcE1fH5gJ3mUtBoD6ViXk",
    "description": "backup-script",
    "createdAt": "2026-04-22T00:00:00Z",
    "lastUsedAt": null
  }
}
```

S3 访问密钥

# 创建 S3 访问密钥

复制页面

Mint a new S3 credential pair usable against the `/storage/v1/s3`
protocol gateway. The plaintext `secretAccessKey` in the response
is returned **exactly once** — it is encrypted at rest and can
never be retrieved again. If you lose it, revoke and re-create.

Limits:

* 每个项目 50 个密钥（硬限制，事务性强制执行）。

* 每个 IP 每 15 分钟限制 20 个管理请求。


复制页面

POST

/

api

/

storage

/

s3

/

access-keys

尝试

创建 S3 访问密钥

cURL

```
curl --request POST \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: <api-key>' \
  --data '
{
  "description": "backup-script"
}
'
```

201

400

401

429

```
{
  "data": {
    "id": "11111111-1111-1111-1111-111111111111",
    "accessKeyId": "INSFABC123DEF456GH78",
    "secretAccessKey": "x7K2-a_pL9qRs4N8vYzWcE1fH5gJ3mUtBoD6ViXk",
    "description": "backup-script",
    "createdAt": "2026-04-22T00:00:00Z",
    "lastUsedAt": null
  }
}
```

#### 授权

[​](#authorization-x-api-key)

x-api-key

string

header

必需

#### 请求体

application/json

[​](#body-description)

description

string

可选的标签，帮助您以后识别密钥


最大字符串长度: `200`

Example:

`"backup-script"`

#### 响应

201

application/json

访问密钥已创建


[​](#response-data)

data

object

S3 访问密钥记录（不含明文密钥）。


显示子属性

[List S3 Access Keys](/api-reference/s3-access-keys/list-s3-access-keys)[Revoke S3 Access Key](/api-reference/s3-access-keys/revoke-s3-access-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)