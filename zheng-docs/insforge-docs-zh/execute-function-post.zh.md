执行函数 (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "John",
  "age": 30
}
'
```

200

404

502

```
{
  "message": "Hello, John!"
}
```

Client

# 执行函数 (POST)

复制页面

使用 POST 方法执行函数，附带 JSON 请求体。代理到 Deno 运行时。

复制页面

POST

/

functions

/

{slug}

尝试

执行函数 (POST)

cURL

```
curl --request POST \
  --url https://api.example.com/functions/{slug} \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "John",
  "age": 30
}
'
```

200

404

502

```
{
  "message": "Hello, John!"
}
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

[执行函数 (PUT)](/api-reference/client/execute-function-put)[执行函数 (DELETE)](/api-reference/client/execute-function-delete)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)