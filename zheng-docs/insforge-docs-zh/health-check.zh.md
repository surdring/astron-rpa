健康检查

cURL

```
curl --request GET \
  --url https://api.example.com/api/health
```

200

```
{
  "status": "ok",
  "service": "Insforge Backend",
  "timestamp": "2025-01-21T03:45:22.194Z"
}
```

Client

# 健康检查

复制页面

检查 API 是否正在运行且健康

复制页面

GET

/

api

/

health

尝试

健康检查

cURL

```
curl --request GET \
  --url https://api.example.com/api/health
```

200

```
{
  "status": "ok",
  "service": "Insforge Backend",
  "timestamp": "2025-01-21T03:45:22.194Z"
}
```

#### 响应

200 - application/json

API 运行正常

[​](#response-status)

status

string

示例：

`"ok"`

[​](#response-service)

service

string

示例：

`"Insforge Backend"`

[​](#response-timestamp)

timestamp

string<date-time>

示例：

`"2025-01-21T03:45:22.194Z"`

[获取 anon 密钥](/api-reference/admin/get-anon-key)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)