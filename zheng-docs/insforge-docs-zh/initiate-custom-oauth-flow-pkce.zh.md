发起自定义 OAuth 流程 (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}
```

200

```
{
  "authUrl": "<string>"
}
```

Client

# 发起自定义 OAuth 流程 (PKCE)

复制页面

为已配置的自定义 OAuth 提供者生成使用 PKCE 流程的 OAuth 授权 URL

复制页面

GET

/

api

/

auth

/

oauth

/

custom

/

{key}

尝试

发起自定义 OAuth 流程 (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}
```

200

```
{
  "authUrl": "<string>"
}
```

#### 路径参数

[​](#parameter-key)

key

string

必需

#### 查询参数

[​](#parameter-redirect-uri)

redirect\_uri

string<uri>

必需

认证后重定向的 URL（接收 insforge\_code 参数）

[​](#parameter-code-challenge)

code\_challenge

string

用于移动端/桌面端/服务端客户端的 PKCE 代码质询

#### 响应

200

application/json

OAuth 授权 URL

[​](#response-auth-url)

authUrl

string<uri>

[提供者特定 OAuth 回调 (POST)](/api-reference/client/provider-specific-oauth-callback-post)[自定义 OAuth 回调 (GET)](/api-reference/client/custom-oauth-callback-get)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)