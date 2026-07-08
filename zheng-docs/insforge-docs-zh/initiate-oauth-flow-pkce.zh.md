发起 OAuth 流程 (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}
```

200

```
{
  "authUrl": "<string>"
}
```

Client

# 发起 OAuth 流程 (PKCE)

复制页面

为任何支持的提供者生成使用 PKCE 流程的 OAuth 授权 URL。

对于使用 PKCE 的移动端/桌面端/服务端客户端：

1. 生成 code\_verifier（随机字符串，43-128 个字符）
2. 生成 code\_challenge = Base64URL(SHA256(code\_verifier))
3. 使用 code\_challenge 调用此端点
4. OAuth 回调后，使用 code\_verifier 调用 /api/auth/oauth/exchange

复制页面

GET

/

api

/

auth

/

oauth

/

{provider}

尝试

发起 OAuth 流程 (PKCE)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}
```

200

```
{
  "authUrl": "<string>"
}
```

#### 路径参数

[​](#parameter-provider)

provider

enum<string>

必需

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

#### 查询参数

[​](#parameter-redirect-uri)

redirect\_uri

string<uri>

必需

认证后重定向的 URL（接收 insforge\_code 参数）

[​](#parameter-code-challenge)

code\_challenge

string

用于移动端/桌面端/服务端客户端的 PKCE 代码质询。使用 Base64URL(SHA256(code\_verifier)) 生成。在本机应用或可信服务端客户端中进行安全令牌交换时需要。

#### 响应

200

application/json

OAuth 授权 URL

[​](#response-auth-url)

authUrl

string<uri>

用于将用户重定向到 OAuth 提供者登录页面的 URL

[使用令牌重置密码](/api-reference/client/reset-password-with-token)[交换 OAuth 代码以获取令牌 (PKCE)](/api-reference/client/exchange-oauth-code-for-tokens-pkce)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)