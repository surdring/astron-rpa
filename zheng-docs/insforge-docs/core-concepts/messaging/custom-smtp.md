## On this page

* [Concepts](#concepts)
* [Usage](#usage)
* [Email templates](#email-templates)
* [Considerations](#considerations)
* [More resources](#more-resources)

Messaging

# Custom SMTP

Copy page

Route every outgoing email through your own SMTP server

Copy page

When enabled, every email (auth flows and `emails.send()` calls) routes through your SMTP server. Toggle off to revert; credentials are preserved.

## [​](#concepts) Concepts

Provider is resolved on every send, so saves take effect on the next request. InsForge runs `transporter.verify()` before saving, so a persisted config always works. Passwords are encrypted at rest with AES-256-GCM and never returned by the API.

## [​](#usage) Usage

Configure SMTP under **Authentication → Email**.

1

Enable custom SMTP

Flip the switch on the **SMTP Provider** card.

2

Enter credentials

Host, port (`25`, `465`, `587`, `2525`), username, password, sender email, sender name. Private IPs and self-signed certs are rejected.

3

Save

InsForge runs an SMTP handshake before persisting. Bad credentials fail fast.

4

Edit templates (optional)

The **Email Templates** card unlocks the four auth templates.

The `From:` header is always your configured sender. SDK callers cannot spoof it.

## [​](#email-templates) Email templates

Templates render locally from `email.templates`. Variables use `{{ variable }}` and are HTML-escaped.

| Template | When it sends |
| --- | --- |
| `email-verification-code` | New-user verification with a 6-digit code |
| `email-verification-link` | New-user verification with a clickable link |
| `reset-password-code` | Password reset with a 6-digit code |
| `reset-password-link` | Password reset with a clickable link |

Variables: `{{ token }}` (code templates), `{{ link }}` (link templates, must start with `http://` or `https://`), `{{ name }}` and `{{ email }}` (all templates).

## [​](#considerations) Considerations

* **Rate limiting.** **Min interval (seconds)** caps per-recipient frequency. Sends within the cooldown return HTTP `429`. Defaults to `60`; `0` disables.
* **SSRF protection.** Private, loopback, link-local, and carrier-NAT ranges are rejected.
* **Audit log.** Config saves log `UPDATE_SMTP_CONFIG`; template edits log `UPDATE_EMAIL_TEMPLATE`.

## [​](#more-resources) More resources

* [Messaging overview](/core-concepts/messaging/overview) for the routing model.
* [nodemailer SMTP transport](https://nodemailer.com/smtp/) for connection options.
* [Authentication overview](/core-concepts/authentication/overview) for the flows that emit these emails.

[Overview](/core-concepts/messaging/overview)[Overview](/core-concepts/payments/overview)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)