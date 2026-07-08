清除日志

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "message": "Logs cleared successfully",
  "deleted_count": 150
}
```

Admin

# 清除日志

复制页面

复制页面

DELETE

/

api

/

logs

尝试

清除日志

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/logs \
  --header 'Authorization: Bearer <token>'
```

200

400

```
{
  "message": "Logs cleared successfully",
  "deleted_count": 150
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 查询参数

[​](#parameter-before)

before

string<date-time>

#### 响应

200

application/json

日志已清除

[​](#response-message)

message

string

[​](#response-deleted-count)

deleted\_count

integer

[列出活动日志](/api-reference/admin/list-activity-logs)[获取日志统计信息](/api-reference/admin/get-logs-statistics)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)