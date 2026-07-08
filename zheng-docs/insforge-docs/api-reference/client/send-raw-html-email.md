Send raw HTML email

cURL

```
curl --request POST \
  --url https://api.example.com/api/email/send-raw \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "to": "user@example.com",
  "subject": "Welcome to our platform",
  "html": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
  "cc": "jsmith@example.com",
  "bcc": "jsmith@example.com",
  "from": "My App",
  "replyTo": "support@example.com"
}
'
```

200

400

401

403

500

```
{}
```

Client

# Send raw HTML email

Copy page

Send a custom HTML email to one or more recipients. Requires user authentication.

Copy page

POST

/

api

/

email

/

send-raw

Try it

Send raw HTML email

cURL

```
curl --request POST \
  --url https://api.example.com/api/email/send-raw \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "to": "user@example.com",
  "subject": "Welcome to our platform",
  "html": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
  "cc": "jsmith@example.com",
  "bcc": "jsmith@example.com",
  "from": "My App",
  "replyTo": "support@example.com"
}
'
```

200

400

401

403

500

```
{}
```

#### Authorizations

[​](#authorization-authorization)

Authorization

string

header

required

Bearer authentication header of the form `Bearer <token>`, where `<token>` is your auth token.

#### Body

application/json

[​](#body-to-one-of-0)

to

string<email>string<email>[]string<email>string<email>[]

required

Recipient email address(es) - maximum 50 recipients

Example:

`"user@example.com"`

[​](#body-subject)

subject

string

required

Email subject line

Required string length: `1 - 500`

Example:

`"Welcome to our platform"`

[​](#body-html)

html

string

required

HTML content of the email body

Minimum string length: `1`

Example:

`"<h1>Welcome!</h1><p>Thank you for joining us.</p>"`

[​](#body-cc-one-of-0)

cc

string<email>string<email>[]string<email>string<email>[]

Carbon copy recipient(s) - maximum 50 recipients

[​](#body-bcc-one-of-0)

bcc

string<email>string<email>[]string<email>string<email>[]

Blind carbon copy recipient(s) - maximum 50 recipients

[​](#body-from)

from

string

Custom sender name (uses default if not provided)

Maximum string length: `100`

Example:

`"My App"`

[​](#body-reply-to)

replyTo

string<email>

Reply-to email address

Example:

`"support@example.com"`

#### Response

200

application/json

Email sent successfully

Empty object on success - extend with optional fields later if needed

[Update Realtime Config](/api-reference/configuration/update-realtime-config)[Create Stripe Checkout Session](/api-reference/stripe-payments/create-stripe-checkout-session)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)