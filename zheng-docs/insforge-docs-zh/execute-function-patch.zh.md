执行函数 (PATCH)

cURL

```
curl --request PATCH \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '{}'
```

200

502

```
{}
```

Client

# 执行函数 (PATCH)

复制页面

使用 PATCH 方法执行函数。代理到 Deno 运行时。

复制页面

PATCH

/

functions

/

{slug}

尝试

执行函数 (PATCH)

cURL

```
curl --request PATCH \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '{}'
```

200

502

```
{}
```

#### 路径参数

[​](#parameter-slug)

slug

string

必需

函数 slug 标识符

格式：`^[a-zA-Z0-9_-]+$`

#### 请求体

application/json

请求体类型为 `object`。

#### 响应

200

\*/\*

函数执行成功

响应类型为 `object`。

[执行函数 (DELETE)](/api-reference/client/execute-function-delete)[列出所有频道](/api-reference/channels/list-all-channels)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)