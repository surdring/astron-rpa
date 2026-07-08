执行函数 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/functions/{slug}
```

200

404

502

```
{
  "message": "Hello, World!"
}
```

Client

# 执行函数 (GET)

复制页面

使用 GET 方法执行函数。代理到 Deno 运行时。

复制页面

GET

/

functions

/

{slug}

尝试

执行函数 (GET)

cURL

```
curl --request GET \
  --url https://api.example.com/functions/{slug}
```

200

404

502

```
{
  "message": "Hello, World!"
}
```

#### 路径参数

[​](#parameter-slug)

slug

string

必需

函数 slug 标识符

格式：`^[a-zA-Z0-9_-]+$`

#### 响应

200

\*/\*

函数执行成功

响应类型为 `object`。

[删除函数](/api-reference/admin/delete-function)[执行函数 (PUT)](/api-reference/client/execute-function-put)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)