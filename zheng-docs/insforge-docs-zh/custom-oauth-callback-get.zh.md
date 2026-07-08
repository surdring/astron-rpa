自定义 OAuth 回调 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/callback
```

Client

# 自定义 OAuth 回调 (GET)

复制页面

用于自定义 OAuth 提供者的回调端点

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

/

callback

尝试

自定义 OAuth 回调 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/api/auth/oauth/custom/{key}/callback
```

#### 路径参数

[​](#parameter-key)

key

string

必需

#### 查询参数

[​](#parameter-code)

code

string

必需

来自自定义 OAuth 提供者的授权码

[​](#parameter-state)

state

string

必需

签名的 OAuth 状态负载

#### 响应

302

自定义 OAuth 完成后重定向到应用

[发起自定义 OAuth 流程 (PKCE)](/api-reference/client/initiate-custom-oauth-flow-pkce)[获取认证配置](/api-reference/admin/get-authentication-configuration)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)