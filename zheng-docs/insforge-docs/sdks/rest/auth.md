## On this page

* [Overview](#overview)
* [Headers](#headers)
* [Register User](#register-user)
  + [Query Parameters](#query-parameters)
  + [Request Body](#request-body)
  + [Example (Web Client)](#example-web-client)
  + [Example (Non-Web Client)](#example-non-web-client)
  + [Response (Web Client)](#response-web-client)
  + [Response (Non-Web Client)](#response-non-web-client)
* [Sign In](#sign-in)
  + [Query Parameters](#query-parameters-2)
  + [Request Body](#request-body-2)
  + [Example (Web Client)](#example-web-client-2)
  + [Example (Non-Web Client)](#example-non-web-client-2)
  + [Response (Web Client)](#response-web-client-2)
  + [Response (Non-Web Client)](#response-non-web-client-2)
* [Refresh Token](#refresh-token)
  + [Query Parameters](#query-parameters-3)
  + [Headers (Web Client)](#headers-web-client)
  + [Request Body (Non-Web Client)](#request-body-non-web-client)
  + [Example (Web Client)](#example-web-client-3)
  + [Example (Non-Web Client)](#example-non-web-client-3)
  + [Response (Web Client)](#response-web-client-3)
  + [Response (Non-Web Client)](#response-non-web-client-3)
* [Logout](#logout)
  + [Example](#example)
  + [Response](#response)
* [Get Current User](#get-current-user)
  + [Example](#example-2)
  + [Response](#response-2)
* [Update Profile](#update-profile)
  + [Request Body](#request-body-3)
  + [Example](#example-3)
  + [Response](#response-3)
* [Get User Profile](#get-user-profile)
  + [Example](#example-4)
  + [Response](#response-4)
* [Email Verification](#email-verification)
  + [Send Verification Email](#send-verification-email)
  + [Request Body](#request-body-4)
  + [Example](#example-5)
  + [Response](#response-5)
  + [Verify Email](#verify-email)
  + [Query Parameters](#query-parameters-4)
  + [Request Body](#request-body-5)
  + [Example (Web Client)](#example-web-client-4)
  + [Example (Non-Web Client)](#example-non-web-client-4)
  + [Response (Web Client)](#response-web-client-4)
  + [Response (Non-Web Client)](#response-non-web-client-4)
* [Password Reset](#password-reset)
  + [Send Reset Email](#send-reset-email)
  + [Request Body](#request-body-6)
  + [Example](#example-6)
  + [Exchange Code for Token (Code Method Only)](#exchange-code-for-token-code-method-only)
  + [Request Body](#request-body-7)
  + [Example](#example-7)
  + [Response](#response-6)
  + [Reset Password](#reset-password)
  + [Request Body](#request-body-8)
  + [Example](#example-8)
  + [Response](#response-7)
* [OAuth Authentication](#oauth-authentication)
  + [Initiate OAuth Flow](#initiate-oauth-flow)
  + [Query Parameters](#query-parameters-5)
  + [Supported Providers](#supported-providers)
  + [Example](#example-9)
  + [Response](#response-8)
  + [OAuth Callback](#oauth-callback)
  + [Exchange Code for Tokens](#exchange-code-for-tokens)
  + [Query Parameters](#query-parameters-6)
  + [Request Body](#request-body-9)
  + [Example](#example-10)
  + [Response](#response-9)
  + [Complete OAuth Flow Example (Non-Web)](#complete-oauth-flow-example-non-web)
* [Public Configuration](#public-configuration)
  + [Example](#example-11)
  + [Response](#response-10)
* [Admin Endpoints](#admin-endpoints)
  + [List All Users](#list-all-users)
  + [Get User by ID](#get-user-by-id)
  + [Delete Users](#delete-users)
  + [Generate Anonymous Token](#generate-anonymous-token)
  + [Get Auth Configuration](#get-auth-configuration)
  + [Example](#example-12)
  + [Response](#response-11)
  + [Update Auth Configuration](#update-auth-configuration)
  + [Request Body](#request-body-10)
  + [Example](#example-13)
  + [Exchange Admin Session](#exchange-admin-session)
  + [Request Body](#request-body-11)
  + [Example](#example-14)
  + [Response](#response-12)
  + [Get Current Admin Session](#get-current-admin-session)
  + [Response](#response-13)
  + [Refresh Admin Session](#refresh-admin-session)
  + [Logout Admin Session](#logout-admin-session)
* [Error Responses](#error-responses)
  + [Invalid Credentials (401)](#invalid-credentials-401)
  + [User Already Exists (409)](#user-already-exists-409)
  + [Email Not Verified (403)](#email-not-verified-403)

REST API

# Authentication API Reference

Copy page

User authentication and session management via REST API

Copy page

## [​](#overview) Overview

The Authentication API provides endpoints for user registration, login, email verification, password reset, and OAuth integration.

## [​](#headers) Headers

For authenticated function invocations:

```
Authorization: Bearer your-jwt-token-or-anon-key
Content-Type: application/json
```

For admin endpoints:

```
Authorization: Bearer admin-jwt-token-Or-API-Key
Content-Type: application/json
```

---

## [​](#register-user) Register User

Create a new user account.

```
POST /api/auth/users
```

### [​](#query-parameters) Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_type` | string | No | Client type: `web` (default), `mobile`, `desktop`, or `server` |

### [​](#request-body) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | User email address |
| `password` | string | Yes | Password (must meet configured requirements) |
| `name` | string | No | User display name |
| `redirectTo` | string | No | Used for link-based email verification. The email link always opens an InsForge backend endpoint first; after the token is verified, InsForge redirects the browser to this URL with the verification result. Required when `verifyEmailMethod` is `link`. This URL must be included in `allowedRedirectUrls`. Recommended: use your app’s sign-in page. |

### [​](#example-web-client) Example (Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/users" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe",
    "redirectTo": "http://localhost:3000/sign-in"
  }'
```

### [​](#example-non-web-client) Example (Non-Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/users?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe",
    "redirectTo": "myapp://sign-in"
  }'
```

### [​](#response-web-client) Response (Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": false,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123...",
  "requireEmailVerification": false
}
```

### [​](#response-non-web-client) Response (Non-Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": false,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "requireEmailVerification": false
}
```

* For **web clients**: A `csrfToken` is returned and the refresh token is stored in an httpOnly cookie.
* For **non-web clients** (`mobile`, `desktop`, `server`): A `refreshToken` is returned directly in the response. Store it securely in your client or server runtime.
* Use **`server`** for trusted server-side callers such as SSR apps, BFFs, or CLIs that cannot rely on browser cookies.
* If `requireEmailVerification` is `true`, `accessToken` and tokens will be `null` and the user must verify their email before logging in.

---

## [​](#sign-in) Sign In

Authenticate user and get access token.

```
POST /api/auth/sessions
```

### [​](#query-parameters-2) Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_type` | string | No | Client type: `web` (default), `mobile`, `desktop`, or `server` |

### [​](#request-body-2) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | User email address |
| `password` | string | Yes | User password |

### [​](#example-web-client-2) Example (Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/sessions" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### [​](#example-non-web-client-2) Example (Non-Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/sessions?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### [​](#response-web-client-2) Response (Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123..."
}
```

### [​](#response-non-web-client-2) Response (Non-Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

* For **web clients**: A `csrfToken` is returned and the refresh token is stored in an httpOnly cookie. Include the `csrfToken` in the `X-CSRF-Token` header when calling `/api/auth/refresh`.
* For **non-web clients** (`mobile`, `desktop`, `server`): A `refreshToken` is returned directly. Store it securely and include it in the request body when calling `/api/auth/refresh`.

---

## [​](#refresh-token) Refresh Token

Refresh access token using refresh token.

```
POST /api/auth/refresh
```

### [​](#query-parameters-3) Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_type` | string | No | Client type: `web` (default), `mobile`, `desktop`, or `server` |

### [​](#headers-web-client) Headers (Web Client)

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `X-CSRF-Token` | string | Yes | CSRF token received from login/register response |

### [​](#request-body-non-web-client) Request Body (Non-Web Client)

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `refreshToken` | string | Yes | Refresh token received from login/register response |

### [​](#example-web-client-3) Example (Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/refresh" \
  -H "X-CSRF-Token: abc123..." \
  --cookie "refresh_token=..."
```

### [​](#example-non-web-client-3) Example (Non-Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/refresh?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }'
```

### [​](#response-web-client-3) Response (Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "def456..."
}
```

### [​](#response-non-web-client-3) Response (Non-Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["email"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

Token rotation is implemented for security:

* **Web clients**: Each refresh returns a new `csrfToken` that must be used for subsequent refresh requests.
* **Non-web clients** (`mobile`, `desktop`, `server`): Each refresh returns a new `refreshToken`. You must persist this new token and use it for the next refresh. Update the `accessToken` in memory.

---

## [​](#logout) Logout

Logout and clear refresh token cookie.

```
POST /api/auth/logout
```

### [​](#example) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/logout"
```

### [​](#response) Response

```
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## [​](#get-current-user) Get Current User

Get the currently authenticated user’s info from JWT token.
This REST endpoint does not refresh expired access tokens by itself.

* For raw REST clients, call `POST /api/auth/refresh` when needed.
* For browser apps using the TypeScript SDK, call `auth.getCurrentUser()` during startup. The SDK will use the httpOnly refresh cookie automatically when it can refresh the session.
* This automatic refresh behavior is browser-only. Server, mobile, and other non-browser clients should refresh explicitly.

```
GET /api/auth/sessions/current
```

### [​](#example-2) Example

```
curl "https://your-app.insforge.app/api/auth/sessions/current" \
  -H "Authorization: Bearer your-jwt-token"
```

### [​](#response-2) Response

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "role": "authenticated"
  }
}
```

---

## [​](#update-profile) Update Profile

Update the current user’s profile.

```
PATCH /api/auth/profiles/current
```

### [​](#request-body-3) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | object | Yes | Profile data (name, avatar\_url, custom fields) |

### [​](#example-3) Example

```
curl -X PATCH "https://your-app.insforge.app/api/auth/profiles/current" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "name": "John Doe",
      "avatar_url": "https://example.com/avatar.jpg"
    }
  }'
```

### [​](#response-3) Response

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "profile": {
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

---

## [​](#get-user-profile) Get User Profile

Get public profile information for a user by ID.

```
GET /api/auth/profiles/{userId}
```

### [​](#example-4) Example

```
curl "https://your-app.insforge.app/api/auth/profiles/123e4567-e89b-12d3-a456-426614174000"
```

### [​](#response-4) Response

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "profile": {
    "name": "John Doe",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

---

## [​](#email-verification) Email Verification

### [​](#send-verification-email) Send Verification Email

```
POST /api/auth/email/send-verification
```

### [​](#request-body-4) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | User email address |
| `redirectTo` | string | No | Used for link-based email verification. The email link always opens an InsForge backend endpoint first; after the token is verified, InsForge redirects the browser to this URL with the verification result. Required when `verifyEmailMethod` is `link`. This URL must be included in `allowedRedirectUrls`. Recommended: use your app’s sign-in page. |

### [​](#example-5) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/email/send-verification" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "redirectTo": "http://localhost:3000/sign-in"
  }'
```

### [​](#response-5) Response

```
{
  "success": true,
  "message": "If your email is registered, we have sent you a verification code/link."
}
```

### [​](#verify-email) Verify Email

```
POST /api/auth/email/verify
```

### [​](#query-parameters-4) Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_type` | string | No | Client type: `web` (default), `mobile`, `desktop`, or `server` |

### [​](#request-body-5) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | User email address |
| `otp` | string | Yes | 6-digit verification code |

For link-based verification, email clicks use:

```
GET /api/auth/email/verify-link?token=...
```

That browser-oriented GET flow verifies the token on the backend and redirects to the stored `redirectTo` URL. `POST /api/auth/email/verify` is the JSON API for 6-digit code submission.
Handle the browser redirect like this:

* Success: `?insforge_status=success&insforge_type=verify_email`
* Error: `?insforge_status=error&insforge_type=verify_email&insforge_error=...`
* `insforge_status`: Result of the browser link flow. For verification, values are `success` or `error`.
* `insforge_type`: Flow identifier. For verification links this is always `verify_email`.
* `insforge_error`: Present only when `insforge_status=error`. Human-readable error message for display or logging.
* Recommended handling: use your sign-in page as `redirectTo`. When `insforge_status=success`, show a confirmation message and ask the user to sign in with their email and password.
* If `redirectTo` is not allowlisted, InsForge returns a `400` error whose message includes the rejected URL and whose `nextActions` tells you to add it to `allowedRedirectUrls`.

### [​](#example-web-client-4) Example (Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/email/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

### [​](#example-non-web-client-4) Example (Non-Web Client)

```
curl -X POST "https://your-app.insforge.app/api/auth/email/verify?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

### [​](#response-web-client-4) Response (Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123..."
}
```

### [​](#response-non-web-client-4) Response (Non-Web Client)

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## [​](#password-reset) Password Reset

### [​](#send-reset-email) Send Reset Email

```
POST /api/auth/email/send-reset-password
```

### [​](#request-body-6) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | User email address |
| `redirectTo` | string | No | Used for link-based password reset. The email link always opens an InsForge backend endpoint first; InsForge then redirects the browser to this URL with the reset `token` in the query string so your app can render its own reset-password page. Required when `resetPasswordMethod` is `link`. This URL must be included in `allowedRedirectUrls`. Recommended: use your app’s dedicated reset-password page. |

### [​](#example-6) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/email/send-reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "redirectTo": "http://localhost:3000/reset-password"
  }'
```

### [​](#exchange-code-for-token-code-method-only) Exchange Code for Token (Code Method Only)

```
POST /api/auth/email/exchange-reset-password-token
```

### [​](#request-body-7) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | User email address |
| `code` | string | Yes | 6-digit code from email |

### [​](#example-7) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/email/exchange-reset-password-token" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "code": "123456"
  }'
```

### [​](#response-6) Response

```
{
  "token": "abc123...",
  "expiresAt": "2024-01-15T11:00:00Z"
}
```

### [​](#reset-password) Reset Password

```
POST /api/auth/email/reset-password
```

For link-based password reset, email clicks use:

```
GET /api/auth/email/reset-password-link?token=...
```

That browser-oriented GET flow validates the token on the backend and redirects to the stored `redirectTo` URL with the reset token in the query string. `POST /api/auth/email/reset-password` remains the JSON API that accepts the new password.
Handle the browser redirect like this:

* Ready to reset: `?token=...&insforge_status=ready&insforge_type=reset_password`
* Error: `?insforge_status=error&insforge_type=reset_password&insforge_error=...`
* `token`: Present only when `insforge_status=ready`. Pass this value to `POST /api/auth/email/reset-password` as `otp`.
* `insforge_status`: Result of the browser link flow. For reset links, values are `ready` or `error`.
* `insforge_type`: Flow identifier. For reset links this is always `reset_password`.
* `insforge_error`: Present only when `insforge_status=error`. Human-readable error message for display or logging.
* Your app should only render the reset-password form when `insforge_status=ready` and `token` is present.

### [​](#request-body-8) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `newPassword` | string | Yes | New password |
| `otp` | string | Yes | Reset token from either the code exchange endpoint or the magic link URL |

### [​](#example-8) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/email/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "newPassword": "newSecurePassword123",
    "otp": "abc123..."
  }'
```

### [​](#response-7) Response

```
{
  "message": "Password reset successfully"
}
```

---

## [​](#oauth-authentication) OAuth Authentication

OAuth authentication now uses the PKCE (Proof Key for Code Exchange) flow for enhanced security. Instead of returning tokens directly in the redirect URL, an authorization code is returned which must be exchanged for tokens.

### [​](#initiate-oauth-flow) Initiate OAuth Flow

```
GET /api/auth/oauth/{provider}
```

For custom providers configured in the dashboard, use:

```
GET /api/auth/oauth/custom/{key}
```

### [​](#query-parameters-5) Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `redirect_uri` | string | Yes | URL to redirect after authentication |
| `code_challenge` | string | Yes | PKCE code challenge (Base64 URL-encoded SHA256 hash of code\_verifier) |
| Other string query params | string | No | Provider-specific OAuth hints, such as Google’s `prompt=select_account` |

Extra query params are forwarded as provider-specific hints only when they do not collide with
server-owned OAuth fields. Do not pass `client_id`, `redirect_uri`, `code_challenge`, `state`,
`response_type`, or `scope`; InsForge/provider-generated values win and colliding client
values are ignored.

### [​](#supported-providers) Supported Providers

* `google`
* `github`
* `discord`
* `linkedin`
* `facebook`
* `apple`
* `microsoft`
* `x`
* `spotify`
* Any custom provider key returned by `GET /api/auth/public-config` in `customOAuthProviders`

### [​](#example-9) Example

```
# Generate code_verifier (random string, 43-128 characters)
CODE_VERIFIER=$(openssl rand -base64 32 | tr -d '=' | tr '/+' '_-')

# Generate code_challenge (SHA256 hash of code_verifier, Base64 URL-encoded)
CODE_CHALLENGE=$(echo -n $CODE_VERIFIER | openssl dgst -sha256 -binary | base64 | tr -d '=' | tr '/+' '_-')

curl "https://your-app.insforge.app/api/auth/oauth/google?redirect_uri=https://myapp.com/callback&code_challenge=$CODE_CHALLENGE&prompt=select_account"
```

```
# Custom provider example
curl "https://your-app.insforge.app/api/auth/oauth/custom/acme?redirect_uri=https://myapp.com/callback&code_challenge=$CODE_CHALLENGE"
```

### [​](#response-8) Response

```
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
}
```

### [​](#oauth-callback) OAuth Callback

After the user authenticates with the provider, they will be redirected to your `redirect_uri` with an authorization code:

```
https://myapp.com/callback?insforge_code=abc123...
```

The `insforge_code` is a temporary authorization code that must be exchanged for tokens using the `/api/auth/oauth/exchange` endpoint.

---

### [​](#exchange-code-for-tokens) Exchange Code for Tokens

Exchange the authorization code for access and refresh tokens.

```
POST /api/auth/oauth/exchange
```

### [​](#query-parameters-6) Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_type` | string | No | Client type: `web` (default), `mobile`, `desktop`, or `server` |

### [​](#request-body-9) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | string | Yes | The `insforge_code` received in the callback |
| `code_verifier` | string | Yes | The original code\_verifier used to generate the code\_challenge |

### [​](#example-10) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/oauth/exchange?client_type=mobile" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "abc123...",
    "code_verifier": "your-original-code-verifier"
  }'
```

### [​](#response-9) Response

```
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "emailVerified": true,
    "providers": ["google"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

* For **web clients**: The `refreshToken` will be `null` and a `csrfToken` is returned instead. The refresh token is stored in an httpOnly cookie.
* For **non-web clients** (`mobile`, `desktop`, `server`): A `refreshToken` is returned directly. Store it securely.

---

### [​](#complete-oauth-flow-example-non-web) Complete OAuth Flow Example (Non-Web)

```
// 1. Generate PKCE code verifier and challenge
let codeVerifier = generateRandomString(length: 43)
let codeChallenge = sha256(codeVerifier).base64URLEncoded()

// 2. Initiate OAuth flow
let authURL = "https://your-app.insforge.app/api/auth/oauth/google" +
    "?redirect_uri=myapp://callback" +
    "&code_challenge=\(codeChallenge)"

// 3. Open browser/WebView and wait for callback
// User completes authentication...

// 4. Handle callback with insforge_code
// myapp://callback?insforge_code=abc123...

// 5. Exchange code for tokens
let response = POST("/api/auth/oauth/exchange?client_type=mobile", body: {
    "code": insforgeCode,
    "code_verifier": codeVerifier
})

// 6. Store tokens
accessToken = response.accessToken
refreshToken = response.refreshToken  // Persist securely
```

---

## [​](#public-configuration) Public Configuration

Get public authentication settings (no auth required).

```
GET /api/auth/public-config
```

### [​](#example-11) Example

```
curl "https://your-app.insforge.app/api/auth/public-config"
```

### [​](#response-10) Response

```
{
  "oAuthProviders": ["google", "github"],
  "customOAuthProviders": ["acme"],
  "requireEmailVerification": true,
  "passwordMinLength": 8,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": false,
  "requireSpecialChar": false,
  "verifyEmailMethod": "code",
  "resetPasswordMethod": "link"
}
```

---

## [​](#admin-endpoints) Admin Endpoints

These endpoints require `project_admin` role.

### [​](#list-all-users) List All Users

```
GET /api/auth/users?offset=0&limit=10&search=john
```

### [​](#get-user-by-id) Get User by ID

```
GET /api/auth/users/{userId}
```

### [​](#delete-users) Delete Users

```
curl -X DELETE "https://your-app.insforge.app/api/auth/users" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{"userIds": ["user-id-1", "user-id-2"]}'
```

### [​](#generate-anonymous-token) Generate Anonymous Token

```
POST /api/auth/tokens/anon
```

### [​](#get-auth-configuration) Get Auth Configuration

Get current authentication settings (admin only).

```
GET /api/auth/config
```

#### [​](#example-12) Example

```
curl "https://your-app.insforge.app/api/auth/config" \
  -H "Authorization: Bearer admin-jwt-token"
```

#### [​](#response-11) Response

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "requireEmailVerification": true,
  "passwordMinLength": 8,
  "requireNumber": true,
  "requireLowercase": true,
  "requireUppercase": false,
  "requireSpecialChar": false,
  "verifyEmailMethod": "code",
  "resetPasswordMethod": "link",
  "allowedRedirectUrls": ["https://myapp.com/dashboard", "https://*.myapp.com"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

`allowedRedirectUrls` entries are matched against the full `redirectTo` value, including scheme, host, optional port, and path.

* Exact entries must match exactly, such as `https://myapp.com/dashboard`.
* Wildcards are supported only in the host portion, such as `https://*.myapp.com/callback`.
* Deep links are allowed when explicitly listed, such as `com.example.app:/oauth2redirect` or `myapp://auth/callback`.
* If `allowedRedirectUrls` is empty, InsForge allows all redirects for developer convenience. This is insecure for production and should be avoided outside local development.

### [​](#update-auth-configuration) Update Auth Configuration

Update authentication settings (admin only).

```
PUT /api/auth/config
```

#### [​](#request-body-10) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `requireEmailVerification` | boolean | No | Whether email verification is required |
| `passwordMinLength` | integer | No | Minimum password length (4-128) |
| `requireNumber` | boolean | No | Require numbers in password |
| `requireLowercase` | boolean | No | Require lowercase in password |
| `requireUppercase` | boolean | No | Require uppercase in password |
| `requireSpecialChar` | boolean | No | Require special characters in password |
| `verifyEmailMethod` | string | No | Email verification method (`code` or `link`) |
| `resetPasswordMethod` | string | No | Password reset method (`code` or `link`) |
| `allowedRedirectUrls` | array | No | List of allowed redirect URLs. Entries are matched against the full `redirectTo` value. Exact URLs must match exactly, host wildcards such as `https://*.domain.com/callback` are supported, and custom deep links such as `com.example.app:/oauth2redirect` are allowed when explicitly listed. If empty, all redirects are allowed, which is insecure for production. |

#### [​](#example-13) Example

```
curl -X PUT "https://your-app.insforge.app/api/auth/config" \
  -H "Authorization: Bearer admin-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "requireEmailVerification": true,
    "passwordMinLength": 10,
    "verifyEmailMethod": "link"
  }'
```

### [​](#exchange-admin-session) Exchange Admin Session

Exchange a cloud provider authorization code for an admin session.

```
POST /api/auth/admin/sessions/exchange
```

#### [​](#request-body-11) Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | string | Yes | Authorization code or JWT from Insforge Cloud |

#### [​](#example-14) Example

```
curl -X POST "https://your-app.insforge.app/api/auth/admin/sessions/exchange" \
  -H "Content-Type: application/json" \
  -d '{"code": "eyJhbGciOiJIUzI1NiIs..."}'
```

#### [​](#response-12) Response

```
{
  "admin": {
    "sub": "cloud:user_123"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "abc123..."
}
```

### [​](#get-current-admin-session) Get Current Admin Session

Get the current dashboard admin session from a project admin access token.

```
GET /api/auth/admin/sessions/current
```

#### [​](#response-13) Response

```
{
  "admin": {
    "sub": "local:admin"
  }
}
```

### [​](#refresh-admin-session) Refresh Admin Session

Refresh a dashboard admin access token. This endpoint uses the dashboard-only
`insforge_admin_refresh_token` httpOnly cookie and does not share the app/user
refresh cookie.

```
POST /api/auth/admin/refresh
```

```
curl -X POST "https://your-app.insforge.app/api/auth/admin/refresh" \
  -H "X-CSRF-Token: abc123..." \
  --cookie "insforge_admin_refresh_token=..."
```

### [​](#logout-admin-session) Logout Admin Session

```
POST /api/auth/admin/logout
```

---

## [​](#error-responses) Error Responses

### [​](#invalid-credentials-401) Invalid Credentials (401)

```
{
  "error": "INVALID_CREDENTIALS",
  "message": "Invalid email or password",
  "statusCode": 401,
  "nextActions": "Check your email and password"
}
```

### [​](#user-already-exists-409) User Already Exists (409)

```
{
  "error": "USER_EXISTS",
  "message": "User with this email already exists",
  "statusCode": 409,
  "nextActions": "Use a different email or sign in"
}
```

### [​](#email-not-verified-403) Email Not Verified (403)

```
{
  "error": "EMAIL_NOT_VERIFIED",
  "message": "Please verify your email before signing in",
  "statusCode": 403,
  "nextActions": "Check your inbox for verification email"
}
```

[Database API Reference](/sdks/rest/database)[Storage API Reference](/sdks/rest/storage)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)