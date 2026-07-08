根据 ID 获取用户资料

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/profiles/{userId}
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

# 根据 ID 获取用户资料

复制页面

通过用户 ID 获取用户的公共资料信息（公共端点）

复制页面

GET

/

api

/

auth

/

profiles

/

{userId}

尝试

根据 ID 获取用户资料

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/profiles/{userId}
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

#### 路径参数

[​](#parameter-user-id)

userId

string<uuid>

必需

用户 ID

#### 响应

200

application/json

用户资料

[​](#response-id)

id

string<uuid>

用户 ID

[​](#response-profile-one-of-0)

profile

object | null

用户资料数据（可包含自定义字段）

显示子属性

[更新当前用户资料](/api-reference/client/update-current-users-profile)[注册新用户](/api-reference/client/register-new-user)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)