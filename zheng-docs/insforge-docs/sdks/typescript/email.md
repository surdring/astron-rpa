## On this page

* [emails.send()](#emails-send)
  + [Parameters](#parameters)
  + [Returns](#returns)
  + [Example](#example)

TypeScript

# Email SDK Reference

Copy page

Send custom transactional emails with the InsForge SDK

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
  anonKey: 'your-anon-key'  // Optional: for public/unauthenticated requests
});
```

## [​](#emails-send) emails.send()

Send custom HTML emails to one or more recipients.

### [​](#parameters) Parameters

* `to` (string | string[], required) - Recipient email(s), max 50 recipients
* `subject` (string, required) - Email subject line, max 500 characters
* `html` (string, required) - HTML content of the email
* `cc` (string | string[], optional) - CC recipient(s), max 50 recipients
* `bcc` (string | string[], optional) - BCC recipient(s), max 50 recipients
* `from` (string, optional) - Custom sender name, max 100 characters
* `replyTo` (string, optional) - Reply-to email address, must be a valid email address

When [Custom SMTP](/core-concepts/messaging/custom-smtp) is enabled for your project, the `from` field is ignored. The sender name and email are always taken from your SMTP configuration to prevent spoofing through your server.

### [​](#returns) Returns

```
{
  data: {} | null,  // Empty object on success
  error: Error | null
}
```

### [​](#example) Example

```
const { data, error } = await insforge.emails.send({
  to: ['user1@example.com', 'user2@example.com'],
  cc: 'manager@example.com',
  from: 'Acme Support Team',
  subject: 'Team Update',
  html: '<h1>Weekly Update</h1><p>Here are this week\'s highlights...</p>',
  replyTo: 'support@example.com'
});

if (error) {
  console.error('Failed to send email:', error.message);
  return;
}

console.log('Email sent successfully');
```

[Realtime SDK Reference](/sdks/typescript/realtime)[Payments](/sdks/typescript/payments)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)