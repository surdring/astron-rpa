## 本页内容

* [安装](#installation)
* [insert()](#insert)
  + [参数](#parameters)
  + [返回值](#returns)
  + [示例](#examples)
  + [输出示例](#output-example)
* [update()](#update)
  + [参数](#parameters-2)
  + [返回值](#returns-2)
  + [示例](#examples-2)
  + [输出示例](#output-example-2)
* [delete()](#delete)
  + [参数](#parameters-3)
  + [返回值](#returns-3)
  + [示例](#examples-3)
  + [输出示例](#output-example-3)
* [select()](#select)
  + [参数](#parameters-4)
  + [返回值](#returns-4)
  + [示例](#examples-4)
  + [输出示例](#output-example-4)
* [rpc()](#rpc)
  + [参数](#parameters-5)
  + [返回值](#returns-5)
  + [示例](#examples-5)
* [过滤器](#filters)
* [修饰符](#modifiers)
* [常见模式](#common-patterns)
  + [带计数的分页](#pagination-with-count)
  + [过滤搜索](#filtered-search)
  + [与认证钩子结合使用](#using-with-authentication-hooks)

TypeScript

# 数据库 SDK 参考

复制页面

使用 InsForge TypeScript SDK 进行类型安全的数据库操作

复制页面

## [​](#installation) 安装

npm

yarn

pnpm

```
npm install @insforge/sdk@latest
```

```
import { createClient } from '@insforge/sdk';

const insforge = createClient({
  baseUrl: 'https://your-app.insforge.app',
  anonKey: 'your-anon-key'  // 可选：用于公共/未认证请求
});
```

## [​](#insert) insert()

向表中插入新记录。

### [​](#parameters) 参数

* `values` (object | Array, 必填) - 要插入的数据。单个对象或数组用于批量插入
* `options.count` ('exact' | 'planned' | 'estimated', 可选) - 包含插入行数

### [​](#returns) 返回值

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

在 `.insert()` 后链式调用 `.select()` 以返回插入的数据

### [​](#examples) 示例

单条插入

批量插入

```
const { data, error } = await insforge.database
  .from('posts')
  .insert({ title: 'Hello World', content: 'My first post!' })
  .select()
```

### [​](#output-example) 输出示例

```
{
  "data": [
    { "id": "789", "title": "Hello World", "content": "My first post!", "created_at": "2024-01-15T10:30:00Z" }
  ],
  "error": null
}
```

---

## [​](#update) update()

更新表中的现有记录。必须使用过滤器定位特定行。

### [​](#parameters-2) 参数

* `values` (object, 必填) - 要更新的字段
* `options.count` ('exact' | 'planned' | 'estimated', 可选) - 包含更新行数

### [​](#returns-2) 返回值

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

始终使用 `.eq()` 或 `.in()` 等过滤器指定要更新的行

### [​](#examples-2) 示例

按 ID 更新

更新多条

```
const { data, error } = await insforge.database
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId)
  .select()
```

### [​](#output-example-2) 输出示例

```
{
  "data": [
    { "id": "123", "title": "Updated Title", "content": "My first post!", "updated_at": "2024-01-15T11:00:00Z" }
  ],
  "error": null
}
```

---

## [​](#delete) delete()

从表中删除记录。必须使用过滤器定位特定行。

### [​](#parameters-3) 参数

* `options.count` ('exact' | 'planned' | 'estimated', 可选) - 包含删除行数

### [​](#returns-3) 返回值

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

始终使用过滤器指定要删除的行

### [​](#examples-3) 示例

按 ID 删除

带过滤条件删除

```
const { error } = await insforge.database
  .from('posts')
  .delete()
  .eq('id', postId)
```

### [​](#output-example-3) 输出示例

```
{
  "data": null,
  "error": null
}
```

---

## [​](#select) select()

从表或视图中查询记录。

### [​](#parameters-4) 参数

* `columns` (string, 可选) - 逗号分隔的列名。使用 `*` 表示所有列
* `options.count` ('exact' | 'planned' | 'estimated', 可选) - 包含总行数
* `options.head` (boolean, 可选) - 仅返回计数，不返回数据

### [​](#returns-4) 返回值

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

### [​](#examples-4) 示例

查询全部

指定列

带关联关系

```
const { data, error } = await insforge.database
  .from('posts')
  .select()
```

### [​](#output-example-4) 输出示例

```
{
  "data": [
    { "id": "123", "title": "Hello World", "content": "My first post!" },
    { "id": "456", "title": "Second Post", "content": "Another update." }
  ],
  "error": null
}
```

---

## [​](#rpc) rpc()

调用 PostgreSQL 存储函数（RPC - 远程过程调用）。

### [​](#parameters-5) 参数

* `functionName` (string, 必填) - 要调用的 PostgreSQL 函数名称
* `args` (object, 可选) - 传递给函数的参数

### [​](#returns-5) 返回值

```
{
  data: T | T[] | null,
  error: Error | null
}
```

### [​](#examples-5) 示例

带参数

不带参数

```
const { data, error } = await insforge.database
  .rpc('get_user_stats', { user_id: '123' })
```

---

## [​](#filters) 过滤器

链式调用过滤器以缩小查询结果范围。所有过滤器都接受 `(column, value)` 作为参数。

| 过滤器 | 描述 | 示例 |
| --- | --- | --- |
| `.eq(column, value)` | 等于 | `.eq('status', 'active')` |
| `.neq(column, value)` | 不等于 | `.neq('status', 'banned')` |
| `.gt(column, value)` | 大于 | `.gt('age', 18)` |
| `.gte(column, value)` | 大于或等于 | `.gte('price', 100)` |
| `.lt(column, value)` | 小于 | `.lt('stock', 10)` |
| `.lte(column, value)` | 小于或等于 | `.lte('priority', 3)` |
| `.like(column, pattern)` | 区分大小写的模式匹配（使用 `%` 通配符） | `.like('name', '%Widget%')` |
| `.ilike(column, pattern)` | 不区分大小写的模式匹配（使用 `%` 通配符） | `.ilike('email', '%@gmail.com')` |
| `.in(column, array)` | 值在数组中 | `.in('status', ['pending', 'active'])` |
| `.is(column, value)` | 精确等于（用于 null 检查） | `.is('deleted_at', null)` |

```
// 示例：链式调用多个过滤器
const { data } = await insforge.database
  .from('products')
  .select()
  .eq('category', 'electronics')
  .gte('price', 50)
  .lte('price', 500)
  .is('in_stock', true)
```

---

## [​](#modifiers) 修饰符

控制查询结果的返回方式。

| 修饰符 | 描述 | 示例 |
| --- | --- | --- |
| `.order(column, options)` | 排序结果。选项：`{ ascending: true/false, nullsFirst: true/false }` | `.order('created_at', { ascending: false })` |
| `.limit(count)` | 限制行数 | `.limit(10)` |
| `.range(from, to)` | 获取指定索引范围的行（分页） | `.range(0, 9)` |
| `.single()` | 返回对象而非数组（多条时抛出异常） | `.single()` |
| `.maybeSingle()` | 返回对象或 null（不报错） | `.maybeSingle()` |

```
// 示例：带排序的分页
const { data } = await insforge.database
  .from('posts')
  .select()
  .order('created_at', { ascending: false })
  .range(0, 9)
```

---

## [​](#common-patterns) 常见模式

### [​](#pagination-with-count) 带计数的分页

```
const page = 1;
const pageSize = 10;
const from = (page - 1) * pageSize;
const to = from + pageSize - 1;

const { data, count } = await insforge.database
  .from('posts')
  .select('*', { count: 'exact' })
  .range(from, to)
  .order('created_at', { ascending: false })

console.log(`第 ${page} 页：共 ${count} 条，显示 ${data.length} 条`)
```

**输出：**

```
{
  "data": [
    { "id": "1", "title": "Post 1", "created_at": "2024-01-15T10:00:00Z" },
    { "id": "2", "title": "Post 2", "created_at": "2024-01-14T10:00:00Z" }
  ],
  "count": 50,
  "error": null
}
```

### [​](#filtered-search) 过滤搜索

```
const { data } = await insforge.database
  .from('products')
  .select('id, name, price, category')
  .eq('category', 'electronics')
  .gte('price', 50)
  .lte('price', 500)
  .order('price', { ascending: true })
  .limit(20)
```

**输出：**

```
{
  "data": [
    { "id": "101", "name": "USB Cable", "price": 59.99, "category": "electronics" },
    { "id": "102", "name": "Keyboard", "price": 89.99, "category": "electronics" }
  ],
  "error": null
}
```

### [​](#using-with-authentication-hooks) 与认证钩子结合使用

将数据库查询与 `useUser()` 或 `useAuth()` 钩子结合以获取特定用户的数据：

```
import { useUser } from '@insforge/react'; // 或 '@insforge/react-router'
import { insforge } from './lib/insforge';
import { useEffect, useState } from 'react';

function MyProfile() {
  const { user, isLoaded } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      // 从数据库获取用户的帖子
      insforge.database
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .then(({ data }) => setPosts(data));
    }
  }, [user]);

  if (!isLoaded) return <div>加载中...</div>;
  if (!user) return <div>未登录</div>;

  return (
    <div>
      <h1>{user.profile?.name}</h1>
      <p>{user.email}</p>
      <h2>我的帖子：{posts.length}</h2>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**要点：**

* 使用 `user.id` 过滤已认证用户的数据
* 在访问 `user` 之前检查 `isLoaded` 以避免竞态条件
* 检查 `!user` 以处理未认证状态

[TypeScript SDK](/sdks/typescript/overview)[认证 SDK 参考](/sdks/typescript/auth)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)