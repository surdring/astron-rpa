## On this page

* [Base URL](#base-url)
* [Authentication](#authentication)
  + [Bearer Token](#bearer-token)
* [Quick Start](#quick-start)
* [Response Format](#response-format)
  + [Success Response](#success-response)
  + [Error Response](#error-response)
* [Common HTTP Status Codes](#common-http-status-codes)
* [Features](#features)
* [API Reference](#api-reference)

REST API

# REST API

Copy page

Direct HTTP API access to InsForge services

Copy page

The InsForge REST API provides direct HTTP access to all InsForge services. Use this when you need to integrate with languages or platforms without an official SDK.

## [​](#base-url) Base URL

```
https://your-app.insforge.app
```

## [​](#authentication) Authentication

All API requests require authentication via the `Authorization` header:

### [​](#bearer-token) Bearer Token

```
Authorization: Bearer your-jwt-token-or-anon-key
```

## [​](#quick-start) Quick Start

```
# Register a new user
curl -X POST https://your-app.insforge.app/api/auth/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword123"}'

# Sign in and get token
curl -X POST https://your-app.insforge.app/api/auth/sessions \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword123"}'

# Use the token for authenticated requests
curl https://your-app.insforge.app/api/database/records/posts \
  -H "Authorization: Bearer your-jwt-token"
```

## [​](#response-format) Response Format

### [​](#success-response) Success Response

Data is returned directly in the response body:

```
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### [​](#error-response) Error Response

```
{
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "statusCode": 400,
  "nextActions": "Suggested action to resolve the error"
}
```

## [​](#common-http-status-codes) Common HTTP Status Codes

| Status | Description |
| --- | --- |
| `200` | Success |
| `201` | Created |
| `204` | No Content (for DELETE) |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid or missing token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found |
| `409` | Conflict - Resource already exists |
| `500` | Internal Server Error |

## [​](#features) Features

* **Database** - PostgREST-style CRUD operations
* **Authentication** - Email/password and OAuth authentication
* **Storage** - File upload, download, and management
* **Functions** - Invoke serverless edge functions
* **AI** - Chat completions and image generation
* **Realtime** - Channel management and message history (WebSocket for real-time)

## [​](#api-reference) API Reference

## Database

CRUD operations, filters, and queries

## Authentication

Sign up, sign in, OAuth, and user management

## Storage

File upload, download, and management

## Functions

Invoke serverless edge functions

## AI

Chat completions and image generation

## Realtime

Channel management and message history

[Realtime SDK Reference](/sdks/kotlin/realtime)[Database API Reference](/sdks/rest/database)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)