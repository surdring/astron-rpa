获取日志统计信息

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs/stats \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "actionStats": [
    {
      "action": "INSERT",
      "count": 245
    },
    {
      "action": "UPDATE",
      "count": 189
    },
    {
      "action": "DELETE",
      "count": 34
    },
    {
      "action": "LOGIN",
      "count": 567
    }
  ],
  "tableStats": [
    {
      "table_name": "posts",
      "count": 156
    },
    {
      "table_name": "comments",
      "count": 223
    }
  ],
  "recentActivity": 47,
  "totalLogs": 1035
}
```

Admin

# 获取日志统计信息

复制页面

复制页面

GET

/

api

/

logs

/

stats

尝试

获取日志统计信息

cURL

```
curl --request GET \
  --url https://api.example.com/api/logs/stats \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "actionStats": [
    {
      "action": "INSERT",
      "count": 245
    },
    {
      "action": "UPDATE",
      "count": 189
    },
    {
      "action": "DELETE",
      "count": 34
    },
    {
      "action": "LOGIN",
      "count": 567
    }
  ],
  "tableStats": [
    {
      "table_name": "posts",
      "count": 156
    },
    {
      "table_name": "comments",
      "count": 223
    }
  ],
  "recentActivity": 47,
  "totalLogs": 1035
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 响应

200 - application/json

日志统计信息

[​](#response-action-stats)

actionStats

object[]

显示子属性

[​](#response-table-stats)

tableStats

object[]

显示子属性

[​](#response-recent-activity)

recentActivity

integer

最近 24 小时的日志数量

[​](#response-total-logs)

totalLogs

integer

日志总数

[清除日志](/api-reference/admin/clear-logs)[获取应用元数据](/api-reference/admin/get-app-metadata)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)