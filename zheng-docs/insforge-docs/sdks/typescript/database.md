## On this page

* [Installation](#installation)
* [insert()](#insert)
  + [Parameters](#parameters)
  + [Returns](#returns)
  + [Examples](#examples)
  + [Output Example](#output-example)
* [update()](#update)
  + [Parameters](#parameters-2)
  + [Returns](#returns-2)
  + [Examples](#examples-2)
  + [Output Example](#output-example-2)
* [delete()](#delete)
  + [Parameters](#parameters-3)
  + [Returns](#returns-3)
  + [Examples](#examples-3)
  + [Output Example](#output-example-3)
* [select()](#select)
  + [Parameters](#parameters-4)
  + [Returns](#returns-4)
  + [Examples](#examples-4)
  + [Output Example](#output-example-4)
* [rpc()](#rpc)
  + [Parameters](#parameters-5)
  + [Returns](#returns-5)
  + [Examples](#examples-5)
* [Filters](#filters)
* [Modifiers](#modifiers)
* [Common Patterns](#common-patterns)
  + [Pagination with Count](#pagination-with-count)
  + [Filtered Search](#filtered-search)
  + [Using with Authentication Hooks](#using-with-authentication-hooks)

TypeScript

# Database SDK Reference

Copy page

Type-safe database operations using the InsForge TypeScript SDK

Copy page

## [​](#installation) Installation

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
  anonKey: 'your-anon-key'  // Optional: for public/unauthenticated requests
});
```

## [​](#insert) insert()

Insert new records into a table.

### [​](#parameters) Parameters

* `values` (object | Array, required) - Data to insert. Single object or array for bulk insert
* `options.count` (‘exact’ | ‘planned’ | ‘estimated’, optional) - Include count of inserted rows

### [​](#returns) Returns

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

Chain `.select()` after `.insert()` to return the inserted data

### [​](#examples) Examples

Single insert

Bulk insert

```
const { data, error } = await insforge.database
  .from('posts')
  .insert({ title: 'Hello World', content: 'My first post!' })
  .select()
```

### [​](#output-example) Output Example

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

Update existing records in a table. Must use filters to target specific rows.

### [​](#parameters-2) Parameters

* `values` (object, required) - Fields to update
* `options.count` (‘exact’ | ‘planned’ | ‘estimated’, optional) - Include count of updated rows

### [​](#returns-2) Returns

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

Always use filters like `.eq()` or `.in()` to specify which rows to update

### [​](#examples-2) Examples

Update by ID

Update multiple

```
const { data, error } = await insforge.database
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId)
  .select()
```

### [​](#output-example-2) Output Example

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

Delete records from a table. Must use filters to target specific rows.

### [​](#parameters-3) Parameters

* `options.count` (‘exact’ | ‘planned’ | ‘estimated’, optional) - Include count of deleted rows

### [​](#returns-3) Returns

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

Always use filters to specify which rows to delete

### [​](#examples-3) Examples

Delete by ID

Delete with filter

```
const { error } = await insforge.database
  .from('posts')
  .delete()
  .eq('id', postId)
```

### [​](#output-example-3) Output Example

```
{
  "data": null,
  "error": null
}
```

---

## [​](#select) select()

Query records from a table or view.

### [​](#parameters-4) Parameters

* `columns` (string, optional) - Comma-separated column names. Use `*` for all columns
* `options.count` (‘exact’ | ‘planned’ | ‘estimated’, optional) - Include total row count
* `options.head` (boolean, optional) - Return only count, no data

### [​](#returns-4) Returns

```
{
  data: Array<object> | null,
  error: Error | null,
  count?: number
}
```

### [​](#examples-4) Examples

Get all

Specific columns

With relationships

```
const { data, error } = await insforge.database
  .from('posts')
  .select()
```

### [​](#output-example-4) Output Example

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

Call PostgreSQL stored functions (RPC - Remote Procedure Call).

### [​](#parameters-5) Parameters

* `functionName` (string, required) - Name of the PostgreSQL function to call
* `args` (object, optional) - Arguments to pass to the function

### [​](#returns-5) Returns

```
{
  data: T | T[] | null,
  error: Error | null
}
```

### [​](#examples-5) Examples

With parameters

Without parameters

```
const { data, error } = await insforge.database
  .rpc('get_user_stats', { user_id: '123' })
```

---

## [​](#filters) Filters

Chain filters to narrow down query results. All filters take `(column, value)` as parameters.

| Filter | Description | Example |
| --- | --- | --- |
| `.eq(column, value)` | Equals | `.eq('status', 'active')` |
| `.neq(column, value)` | Not equals | `.neq('status', 'banned')` |
| `.gt(column, value)` | Greater than | `.gt('age', 18)` |
| `.gte(column, value)` | Greater than or equal | `.gte('price', 100)` |
| `.lt(column, value)` | Less than | `.lt('stock', 10)` |
| `.lte(column, value)` | Less than or equal | `.lte('priority', 3)` |
| `.like(column, pattern)` | Case-sensitive pattern (use `%` wildcard) | `.like('name', '%Widget%')` |
| `.ilike(column, pattern)` | Case-insensitive pattern (use `%` wildcard) | `.ilike('email', '%@gmail.com')` |
| `.in(column, array)` | Value in array | `.in('status', ['pending', 'active'])` |
| `.is(column, value)` | Exactly equals (for null checks) | `.is('deleted_at', null)` |

```
// Example: Chain multiple filters
const { data } = await insforge.database
  .from('products')
  .select()
  .eq('category', 'electronics')
  .gte('price', 50)
  .lte('price', 500)
  .is('in_stock', true)
```

---

## [​](#modifiers) Modifiers

Control how query results are returned.

| Modifier | Description | Example |
| --- | --- | --- |
| `.order(column, options)` | Sort results. Options: `{ ascending: true/false, nullsFirst: true/false }` | `.order('created_at', { ascending: false })` |
| `.limit(count)` | Limit number of rows | `.limit(10)` |
| `.range(from, to)` | Get rows between indices (pagination) | `.range(0, 9)` |
| `.single()` | Return object instead of array (throws if multiple) | `.single()` |
| `.maybeSingle()` | Return object or null (no error) | `.maybeSingle()` |

```
// Example: Pagination with sorting
const { data } = await insforge.database
  .from('posts')
  .select()
  .order('created_at', { ascending: false })
  .range(0, 9)
```

---

## [​](#common-patterns) Common Patterns

### [​](#pagination-with-count) Pagination with Count

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

console.log(`Page ${page}: ${data.length} of ${count} total`)
```

**Output:**

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

### [​](#filtered-search) Filtered Search

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

**Output:**

```
{
  "data": [
    { "id": "101", "name": "USB Cable", "price": 59.99, "category": "electronics" },
    { "id": "102", "name": "Keyboard", "price": 89.99, "category": "electronics" }
  ],
  "error": null
}
```

### [​](#using-with-authentication-hooks) Using with Authentication Hooks

Combine database queries with `useUser()` or `useAuth()` hooks to fetch user-specific data:

```
import { useUser } from '@insforge/react'; // or '@insforge/react-router'
import { insforge } from './lib/insforge';
import { useEffect, useState } from 'react';

function MyProfile() {
  const { user, isLoaded } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch user's posts from database
      insforge.database
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .then(({ data }) => setPosts(data));
    }
  }, [user]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not signed in</div>;

  return (
    <div>
      <h1>{user.profile?.name}</h1>
      <p>{user.email}</p>
      <h2>My Posts: {posts.length}</h2>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**Key points:**

* Use `user.id` to filter data for the authenticated user
* Check `isLoaded` before accessing `user` to avoid race conditions
* Check `!user` to handle unauthenticated state

[TypeScript SDK](/sdks/typescript/overview)[Authentication SDK Reference](/sdks/typescript/auth)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)