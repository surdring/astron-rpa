Receive Razorpay Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/razorpay/{environment} \
  --header 'Content-Type: application/json' \
  --header 'x-razorpay-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true
}
```

Payment Webhooks

# Receive Razorpay Webhook

Copy page

Receive Razorpay events for one environment. The request body must be the raw Razorpay JSON body and must include the Razorpay signature header.

Copy page

POST

/

api

/

webhooks

/

razorpay

/

{environment}

Try it

Receive Razorpay Webhook

cURL

```
curl --request POST \
  --url https://api.example.com/api/webhooks/razorpay/{environment} \
  --header 'Content-Type: application/json' \
  --header 'x-razorpay-signature: <api-key>' \
  --data '{}'
```

200

400

401

500

```
{
  "received": true,
  "handled": true
}
```

#### Authorizations

[​](#authorization-x-razorpay-signature)

x-razorpay-signature

string

header

required

#### Path Parameters

[​](#parameter-environment)

environment

enum<string>

required

Payment provider environment.

Available options:

`test`,

`live`

#### Body

application/json

The body is of type `object`.

#### Response

200

application/json

Webhook received

[​](#response-received)

received

boolean

required

[​](#response-handled)

handled

boolean

required

[Receive Stripe Webhook](/api-reference/payment-webhooks/receive-stripe-webhook)[List all secrets](/api-reference/admin/list-all-secrets)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)