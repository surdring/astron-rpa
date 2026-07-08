删除 OAuth 配置

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "success": true,
  "message": "<string>"
}
```

Admin

# 删除 OAuth 配置

复制页面

删除 OAuth 提供商配置（仅管理员）

复制页面

DELETE

/

api

/

auth

/

oauth

/

{provider}

/

config

尝试

删除 OAuth 配置

cURL

```
curl --request DELETE \
  --url https://api.example.com/api/auth/oauth/{provider}/config \
  --header 'Authorization: Bearer <token>'
```

200

```
{
  "success": true,
  "message": "<string>"
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

[​](#parameter-provider)

provider

enum<string>

required

可用选项：

`google`,

`github`,

`discord`,

`linkedin`,

`facebook`,

`instagram`,

`tiktok`,

`apple`,

`x`,

`spotify`,

`microsoft`

#### 响应

200

application/json

配置已删除

[​](#response-success)

success

boolean

[​](#response-message)

message

string

[更新 OAuth 配置](/api-reference/admin/update-oauth-configuration)[列出所有自定义 OAuth 配置](/api-reference/admin/list-all-custom-oauth-configurations)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)