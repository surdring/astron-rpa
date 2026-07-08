## On this page

* [emails.send()](#emails-send)
  + [参数](#parameters)
  + [返回值](#returns)
  + [示例](#example)

TypeScript

# 邮件 SDK 参考

Copy page

使用 InsForge SDK 发送自定义事务邮件

Copy page

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

## [​](#emails-send) emails.send()

向一个或多个收件人发送自定义 HTML 邮件。

### [​](#parameters) 参数

* `to` (string | string[], 必填) - 收件人邮箱，最多 50 个收件人
* `subject` (string, 必填) - 邮件主题行，最多 500 个字符
* `html` (string, 必填) - 邮件的 HTML 内容
* `cc` (string | string[], 可选) - 抄送收件人，最多 50 个收件人
* `bcc` (string | string[], 可选) - 密送收件人，最多 50 个收件人
* `from` (string, 可选) - 自定义发件人名称，最多 100 个字符
* `replyTo` (string, 可选) - 回复邮箱地址，必须是有效的邮箱地址

当为您的项目启用 [自定义 SMTP](/core-concepts/messaging/custom-smtp) 时，`from` 字段将被忽略。发件人名称和邮箱始终从您的 SMTP 配置中获取，以防止通过您的服务器进行伪造。

### [​](#returns) 返回值

```
{
  data: {} | null,  // 成功时返回空对象
  error: Error | null
}
```

### [​](#example) 示例

```
const { data, error } = await insforge.emails.send({
  to: ['user1@example.com', 'user2@example.com'],
  cc: 'manager@example.com',
  from: 'Acme 支持团队',
  subject: '团队更新',
  html: '<h1>每周更新</h1><p>以下是本周的亮点...</p>',
  replyTo: 'support@example.com'
});

if (error) {
  console.error('发送邮件失败:', error.message);
  return;
}

console.log('邮件发送成功');
```

[Realtime SDK 参考](/sdks/typescript/realtime)[支付](/sdks/typescript/payments)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)