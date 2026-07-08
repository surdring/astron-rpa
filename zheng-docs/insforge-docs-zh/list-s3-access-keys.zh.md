列出 S3 访问密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'x-api-key: <api-key>'
```

200

401

429

```
{
  "data": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "accessKeyId": "INSFABC123DEF456GH78",
      "description": "backup-script",
      "createdAt": "2026-04-22T00:00:00Z",
      "lastUsedAt": null
    }
  ]
}
```

S3 访问密钥

# 列出 S3 访问密钥

复制页面

Return every S3 access key configured for this project. Plaintext
secrets are **never** returned here — the secret is only shown once
in the response of `POST /api/storage/s3/access-keys`.

复制页面

GET

/

api

/

storage

/

s3

/

access-keys

尝试

列出 S3 访问密钥

cURL

```
curl --request GET \
  --url https://api.example.com/api/storage/s3/access-keys \
  --header 'x-api-key: <api-key>'
```

200

401

429

```
{
  "data": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "accessKeyId": "INSFABC123DEF456GH78",
      "description": "backup-script",
      "createdAt": "2026-04-22T00:00:00Z",
      "lastUsedAt": null
    }
  ]
}
```

#### 授权

[​](#authorization-x-api-key)

x-api-key

string

header

必需

#### 响应

200

application/json

访问密钥列表（不含密钥）


[​](#response-data)

data

object[]

显示子属性

[Get S3 Gateway Config](/api-reference/s3-access-keys/get-s3-gateway-config)[Create S3 Access Key](/api-reference/s3-access-keys/create-s3-access-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)