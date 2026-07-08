提供者特定 OAuth 回调 (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/{provider}/callback \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'state=<string>' \
  --data 'code=<string>' \
  --data 'id_token=<string>'
```

Client

# 提供者特定 OAuth 回调 (POST)

复制页面

用于使用 POST 方法的提供者的 OAuth 回调端点（例如，使用 form\_post 响应模式的 Apple）。

响应根据原始的 OAuth 发起方式而有所不同：

* 带 code\_challenge (PKCE)：用 `insforge_code` 重定向到交换端点
* 不带 code\_challenge (web)：用 `access_token` 重定向并设置 httpOnly cookie

复制页面

POST

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

提供者特定 OAuth 回调 (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/api/auth/oauth/{provider}/callback \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'state=<string>' \
  --data 'code=<string>' \
  --data 'id_token=<string>'
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

#### 请求体

application/x-www-form-urlencoded

[​](#body-state)

state

string

必需

包含重定向 URI 和可选 code\_challenge 的 JWT 状态

[​](#body-code)

code

string

来自 OAuth 提供者的授权码

[​](#body-id-token)

id\_token

string

ID 令牌（用于 Apple Sign In）

#### 响应

302

重定向到应用。

* PKCE 流程：redirect\_uri?insforge\_code={code}&user\_id={id}&email={email}&name={name}
* Web 流程：redirect\_uri?access\_token={token}&user\_id={id}&email={email}&name={name}&csrf\_token={csrf}

[提供者特定 OAuth 回调 (GET)](/api-reference/client/provider-specific-oauth-callback-get)[发起自定义 OAuth 流程 (PKCE)](/api-reference/client/initiate-custom-oauth-flow-pkce)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)