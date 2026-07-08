删除函数

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>'
```

200

404

500

```
{
  "success": true,
  "message": "Function hello-world deleted successfully"
}
```

Admin

# 删除函数

复制页面

永久删除一个函数

复制页面

DELETE

/

api

/

functions

/

{slug}

尝试

删除函数

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/functions/{slug} \
  --header 'Authorization: Bearer <token>'
```

200

404

500

```
{
  "success": true,
  "message": "Function hello-world deleted successfully"
}
```

#### 授权

[​](#authorization-authorization)

Authorization

string

header

required

Bearer 认证头，格式为 `Bearer <token>`，其中 `<token>` 是你的认证令牌。

#### 路径参数

[​](#parameter-slug)

slug

string

required

函数 slug 标识符

模式：`^[a-zA-Z0-9_-]+$`

#### 响应

200

application/json

函数删除成功

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[更新函数](/api-reference/admin/update-function)[执行函数（GET）](/api-reference/client/execute-function-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)