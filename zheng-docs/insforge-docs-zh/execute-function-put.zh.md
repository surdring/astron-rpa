执行函数 (PUT)

cURL

```
curl --request PUT \
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

# 执行函数 (PUT)

复制页面

使用 PUT 方法执行函数。代理到 Deno 运行时。

复制页面

PUT

/

functions

/

{slug}

尝试

执行函数 (PUT)

cURL

```
curl --request PUT \
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

[执行函数 (GET)](/api-reference/client/execute-function-get)[执行函数 (POST)](/api-reference/client/execute-function-post)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)