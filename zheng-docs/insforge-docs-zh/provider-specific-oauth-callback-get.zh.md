提供者特定 OAuth 回调 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/callback
```

Client

# 提供者特定 OAuth 回调 (GET)

复制页面

用于提供者特定流程的 OAuth 回调端点（大多数提供者使用 GET）。

响应根据原始的 OAuth 发起方式而有所不同：

* 带 code\_challenge (PKCE)：用 `insforge_code` 重定向到交换端点
* 不带 code\_challenge (web)：用 `access_token` 重定向并设置 httpOnly cookie

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

/

callback

尝试

提供者特定 OAuth 回调 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/{provider}/callback
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

[​](#parameter-code)

code

string

来自 OAuth 提供者的授权码

[​](#parameter-state)

state

string

必需

包含重定向 URI 和可选 code\_challenge 的 JWT 状态

[​](#parameter-token)

token

string

直接 ID 令牌（用于某些提供者）

#### 响应

302

重定向到应用。

* PKCE 流程：redirect\_uri?insforge\_code={code}&user\_id={id}&email={email}&name={name}
* Web 流程：redirect\_uri?access\_token={token}&user\_id={id}&email={email}&name={name}&csrf\_token={csrf}

[共享 OAuth 回调处理器](/api-reference/client/shared-oauth-callback-handler)[提供者特定 OAuth 回调 (POST)](/api-reference/client/provider-specific-oauth-callback-post)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)