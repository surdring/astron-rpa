共享 OAuth 回调处理器

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/shared/callback/{state}
```

Client

# 共享 OAuth 回调处理器

复制页面

处理来自 InsForge Cloud 共享 OAuth 的回调

复制页面

GET

/

api

/

auth

/

oauth

/

shared

/

callback

/

{state}

尝试

共享 OAuth 回调处理器

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/shared/callback/{state}
```

#### 路径参数

[​](#parameter-state)

state

string

必需

JWT 状态参数

#### 查询参数

[​](#parameter-success)

success

string

成功标志

[​](#parameter-error)

error

string

错误消息

[​](#parameter-payload)

payload

string

Base64 编码的用户负载

#### 响应

302

重定向到带有访问令牌或错误信息的应用

[交换 OAuth 代码以获取令牌 (PKCE)](/api-reference/client/exchange-oauth-code-for-tokens-pkce)[提供者特定 OAuth 回调 (GET)](/api-reference/client/provider-specific-oauth-callback-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)