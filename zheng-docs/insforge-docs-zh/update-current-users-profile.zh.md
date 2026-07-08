更新当前用户资料

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/auth/profiles/current \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
```

Client

# 更新当前用户资料

复制页面

更新当前已认证用户的资料

复制页面

PATCH

/

api

/

auth

/

profiles

/

current

尝试

更新当前用户资料

cURL

```
curl --request PATCH \
  --url https://api.example.com/api/auth/profiles/current \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
'
```

200

```
{
  "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "profile": {
    "name": "<string>",
    "avatar_url": "<string>"
  }
}
```

#### 认证

[​](#authorization-authorization)

Authorization

string

header

必需

Bearer 认证请求头，格式为 `Bearer <token>`，其中 `<token>` 是您的认证令牌。

#### 请求体

application/json

[​](#body-profile)

profile

object

必需

资料数据（name、avatar\_url 以及任何自定义字段）

显示子属性

#### 响应

200

application/json

资料更新成功

[​](#response-id)

id

string<uuid>

用户 ID

[​](#response-profile-one-of-0)

profile

object | null

用户资料数据（可包含自定义字段）

显示子属性

[获取公共认证配置](/api-reference/client/get-public-authentication-configuration)[根据 ID 获取用户资料](/api-reference/client/get-user-profile-by-id)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)