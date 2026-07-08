## On this page

* [Overview](#overview)
* [Partnership Models](#partnership-models)
* [Partnership Benefits](#partnership-benefits)
* [Getting Started](#getting-started)
* [Features by Partnership Type](#features-by-partnership-type)
  + [Co-Branded Features](#co-branded-features)
  + [White-Label Features](#white-label-features)
* [API Reference](#api-reference)
* [Integration Examples](#integration-examples)
  + [Co-Branded Integration Flow](#co-branded-integration-flow)
  + [White-Label Integration Flow](#white-label-integration-flow)
* [Parameter and Response Reference](#parameter-and-response-reference)
  + [Project Region Values](#project-region-values)
  + [Project Instance Type Values](#project-instance-type-values)
  + [Project Status Values](#project-status-values)
* [Error Handling](#error-handling)
* [Next Steps](#next-steps)

Partnership

# Partner Integration

Copy page

Learn how to integrate InsForge as a partner platform through co-branded or white-label partnerships

Copy page

## [​](#overview) Overview

InsForge provides two partnership models that enable seamless integration of our Backend-as-a-Service platform into your applications. Whether you’re looking for a co-branded solution or a fully white-labeled experience, we have the right partnership model for you.

## [​](#partnership-models) Partnership Models

## Co-Branded Partnership

Perfect for platforms that want to offer InsForge alongside their services.
The integration process is remarkably simple - developers can connect to the InsForge platform with just one click, without complicated OAuth flows.

## White-Label Partnership

Ideal for platforms seeking complete control over the user experience.
Offers full project lifecycle management, including project dashboard integration. Developers can complete all operations without ever leaving your partner platform.

## [​](#partnership-benefits) Partnership Benefits

## Scalable Infrastructure

Leverage our robust backend infrastructure without the overhead of maintenance and scaling

## Flexible Integration

Choose from multiple integration options that best suit your application needs

## Revenue Sharing

Benefit from our competitive revenue sharing model for partner applications

## Technical Support

Get dedicated technical support and resources to ensure smooth integration

## [​](#getting-started) Getting Started

1

Apply for Partnership

Submit your partnership application through our [partner email](mailto:partnerships@insforge.dev).
Specify whether you’re interested in co-branded or white-label partnership.

2

Receive Partner Credentials

Once approved, you’ll receive:

* **Partner ID**: Your unique partner identifier
* **Secret Key**: Your authentication key for API access
* Integration documentation and support

3

Configure Authentication

All API requests must include your secret key for authentication:

```
curl -X POST https://api.insforge.dev/partnership/v1/YOUR_PARTNER_ID/endpoint \
  -H "Content-Type: application/json" \
  -H "X-Partnership-Secret: YOUR_SECRET_KEY"
```

4

Start Integration

Begin integrating based on your partnership model using our API endpoints.

## [​](#features-by-partnership-type) Features by Partnership Type

### [​](#co-branded-features) Co-Branded Features

In co-branded mode, developers explicitly know they are InsForge platform users (linked through the same email address). After logging into the InsForge platform, developers have full management rights for projects created through partners and need to pay according to InsForge’s billing plans.
Partner platforms can:

* Sync user accounts (name, email) with InsForge
* Sync projects to InsForge
* Query project connection information to leverage the completed backend capabilities.

### [​](#white-label-features) White-Label Features

In white-label mode, developers are not aware of InsForge’s existence and cannot see partner-created projects on the InsForge platform.
Partner platforms can:

* Create embedded projects
* Query project metadata to leverage the completed backend capabilities.
* Pause projects
* Restore projects
* Delete projects
* Get project’s authorization token for access
* Get project’s usage
* Get aggregated usage across all partnership projects (for billing)

## [​](#api-reference) API Reference

* Co-Branded APIs
* White-Label APIs

### [​](#connect-user-account) Connect User Account

Synchronize user account information with InsForge.

```
POST /partnership/v1/:partnerId/connect-user
```

**Request Body:**

```
{
  "name": "John Doe",      // required
  "email": "john@example.com" // required
}
```

**Response:**

```
{
  "account": {
    "id": "uuid-string"
  }
}
```

### [​](#sync-project) Sync Project

Create or synchronize a project for a specific user.

```
POST /partnership/v1/:partnerId/:userId/sync-project
```

**Request Body:**

```
{
  "project_name": "my-project",  // required
  "region": "us-east",         // optional, "us-east", "us-west", "ap-southeast", "eu-central", default: "us-east"
  "instance_type": "nano"      // optional, "nano", "micro", "small", "medium", "large", "xl", "2xl", "4xl", "8xl", "16xl", default: "nano"
}
```

**Response:**

```
{
  "success": true,
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "status": "active"
  }
}
```

#### [​](#handling-project-limits) Handling Project Limits

Note: Due to project limits on the InsForge free plan, project synchronization from partner platforms may fail. In such cases, the response will be:

```
{
  "success": false,
  "message": "Free plan allows up to 2 active projects. Please upgrade your plan to create more projects.",
  "candidate_projects": [
    {
      "id": "uuid-string",
      "access_host": "https://project2.us-east.insforge.app",
      "api_key": "project-api-key",
      "status": "active"
    }
  ]
}
```

Partners can guide users to select existing projects for connection rather than always creating new ones.

### [​](#get-project-metadata) Get Project Metadata

Retrieve connection information for a specific project.

```
GET /partnership/v1/:partnerId/:userId/:projectId/metadata
```

**Response:**

```
{
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "status": "active"
  }
}
```

### [​](#sync-embedded-project) Sync Embedded Project

Create an embedded project for white-label partners.

```
POST /partnership/v1/:partnerId/sync-embedded-project
```

**Request Body:**

```
{
  "project_name": "embedded-project",  // required
  "region": "us-east",               // optional, "us-east", "us-west", "ap-southeast", "eu-central", default: "us-east"
  "instance_type": "nano"            // optional, "nano", "micro", "small", "medium", "large", "xl", "2xl", "4xl", "8xl", "16xl", default: "nano"
}
```

**Response:**

```
{
  "success": true,
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "status": "active"
  }
}
```

### [​](#get-project-metadata-2) Get Project Metadata

Retrieve metadata for a specific project.

```
GET /partnership/v1/:partnerId/:projectId/metadata
```

**Response:**

```
{
  "project": {
    "id": "uuid-string",
    "access_host": "https://project.us-east.insforge.app",
    "api_key": "project-api-key",
    "region": "us-east",
    "instance_type": "nano",
    "last_activity_at": "2025-01-21T10:30:00Z",
    "status": "active"
  }
}
```

### [​](#pause-project) Pause Project

Pause an active project to save resources.

```
POST /partnership/v1/:partnerId/:projectId/pause
```

**Request Body:**

```
{
  "wait_for_completion": true  // optional
}
```

**Response:**

```
{
  "project": {
    "id": "uuid-string",
    "status": "paused"
  }
}
```

### [​](#restore-project) Restore Project

Restore a paused project back to active state.

```
POST /partnership/v1/:partnerId/:projectId/restore
```

**Request Body:**

```
{
  "wait_for_completion": true  // optional
}
```

**Response:**

```
{
  "project": {
    "id": "uuid-string",
    "status": "active"
  }
}
```

### [​](#delete-project) Delete Project

Permanently delete a project. This operation cannot be undone.

```
DELETE /partnership/v1/:partnerId/:projectId
```

**Response (200 OK):**

```
{
  "message": "Project deleted successfully",
  "requestId": "xhiahif-fehfe-feae"
}
```

### [​](#generate-project-authorization) Generate Project Authorization

Generate a short-lived asymmetric JWT token for project access. The token is signed with RSA private key and can be verified using the public JWKS endpoint. Token expires in 10 minutes.

```
POST /partnership/v1/:partnerId/:projectId/authorization
```

**Response:**

```
{
  "code": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imluc2ZvcmdlLWtleS0yMDI1LTA4LTEzIn0...",
  "expires_in": 600,
  "type": "Bearer"
}
```

### [​](#get-project-usage) Get Project Usage

Retrieve usage metrics for a specific project over a date range. Returns both summary statistics and daily breakdown of usage metrics. If dates are not specified, returns data for the last 7 days.

```
GET /partnership/v1/:partnerId/:projectId/usage?start_date=2025-11-10&end_date=2025-11-18
```

**Query Parameters:**

* `start_date` (optional): Start date in YYYY-MM-DD format (defaults to 7 days ago)
* `end_date` (optional): End date in YYYY-MM-DD format (defaults to today)

**Response:**

```
{
  "project": {
    "id": "uuid-string",
    "name": "project-name",
    "status": "active",
    "last_activity_at": "2025-11-18T10:30:00Z"
  },
  "period": {
    "start": "2025-11-10T00:00:00Z",
    "end": "2025-11-18T23:59:59Z"
  },
  "summary": {
    "max_database_size_bytes": 1048576,
    "max_file_storage_bytes": 5242880,
    "total_ai_tokens": 15000,
    "total_mcp_calls": 120,
    "total_egress_bytes": 2097152,
    "total_ai_credits": 1.5,
    "total_email_requests": 50,
    "total_function_calls": 300,
    "total_ec2_compute": 3600
  },
  "daily_usage": [
    {
      "usage_date": "2025-11-10",
      "database_size_bytes": 1048576,
      "file_storage_bytes": 5242880,
      "ai_tokens": 1500,
      "mcp_calls": 12,
      "egress_bytes": 204800,
      "ai_credits": 0.15,
      "email_requests": 5,
      "function_calls": 30,
      "ec2_compute": 3600
    }
  ]
}
```

### [​](#get-partnership-total-usage) Get Partnership Total Usage

Retrieve aggregated usage metrics across all projects under your partnership for a date range. This endpoint is designed for billing and reporting purposes, providing a consolidated view of resource consumption.

```
GET /partnership/v1/:partnerId/usage?start_date=2025-11-01&end_date=2025-11-30
```

**Query Parameters:**

* `start_date` (optional): Start date in YYYY-MM-DD format (defaults to 7 days ago)
* `end_date` (optional): End date in YYYY-MM-DD format (defaults to today)

**Response:**

```
{
  "partnership": {
    "id": "ps_abc123xyz",
    "name": "Partner Name"
  },
  "period": {
    "start": "2025-11-01T00:00:00Z",
    "end": "2025-11-30T23:59:59Z"
  },
  "summary": {
    "database_bytes": 10485760,
    "storage_bytes": 52428800,
    "ai_tokens": 150000,
    "mcp_calls": 1200,
    "egress_bytes": 20971520,
    "ai_credits": 15.5,
    "email_requests": 500,
    "function_calls": 3000,
    "ec2_compute": 36000
  }
}
```

**Usage Metric Types:**

| Metric | Type | Description |
| --- | --- | --- |
| `database_bytes` | Peak | Peak total database footprint (sum per day, max across days) |
| `storage_bytes` | Peak | Peak total storage footprint (sum per day, max across days) |
| `ai_tokens` | Cumulative | Total AI tokens consumed |
| `mcp_calls` | Cumulative | Total MCP/tool calls made |
| `egress_bytes` | Cumulative | Total data transfer (origin + CDN) |
| `ai_credits` | Cumulative | Total AI credits consumed |
| `email_requests` | Cumulative | Total emails sent |
| `function_calls` | Cumulative | Total serverless function invocations |
| `ec2_compute` | Cumulative | Total compute seconds used |

This endpoint includes usage from deleted projects within the specified date range, ensuring complete billing accuracy.

## [​](#integration-examples) Integration Examples

### [​](#co-branded-integration-flow) Co-Branded Integration Flow

The following sequence diagram illustrates the integration flow for co-branded partnerships:

```
// 1. Connect user account
const connectUser = async (name: string, email: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/connect-user`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    }
  );

  const { account } = await response.json();
  return account.id;
};

// 2. Create project for user
const createProject = async (userId: string, projectName: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${userId}/sync-project`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        region: 'us-east',
        instance_type: 'nano'
      })
    }
  );

  const data = await response.json();
  if (data.success) {
    return data.project;
  }
  throw new Error(data.message);
};

// 3. Use project credentials
console.log(project.access_host);
console.log(project.api_key);
```

### [​](#white-label-integration-flow) White-Label Integration Flow

The following sequence diagram illustrates the integration flow for white-label partnerships:

```
// 1. Create embedded project
const createEmbeddedProject = async (projectName: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/sync-embedded-project`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project_name: projectName,
        region: 'eu-west',
        instance_type: 'small'
      })
    }
  );

  const data = await response.json();
  if (data.success) {
    return data.project;
  }
  throw new Error(data.message);
};

// 2. Manage project lifecycle
const pauseProject = async (projectId: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${projectId}/pause`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wait_for_completion: true
      })
    }
  );

  const { project } = await response.json();
  console.log(`Project ${project.id} status: ${project.status}`);
};

const restoreProject = async (projectId: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${projectId}/restore`,
    {
      method: 'POST',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wait_for_completion: true
      })
    }
  );

  const { project } = await response.json();
  console.log(`Project ${project.id} status: ${project.status}`);
};

// 3. Delete project
const deleteProject = async (projectId: string) => {
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/${projectId}`,
    {
      method: 'DELETE',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`
      }
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(data.message); // "Project deleted successfully"
    console.log(`Request ID: ${data.requestId}`);
  } else {
    throw new Error(`Failed to delete project: ${response.status}`);
  }
};

// 4. Get partnership total usage (for billing)
const getPartnershipUsage = async (startDate: string, endDate: string) => {
  const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
  const response = await fetch(
    `https://api.insforge.dev/partnership/v1/${PARTNER_ID}/usage?${params}`,
    {
      method: 'GET',
      headers: {
        'X-Partnership-Secret': `${SECRET_KEY}`
      }
    }
  );

  const data = await response.json();
  console.log(`Period: ${data.period.start} to ${data.period.end}`);
  console.log(`Database: ${data.summary.database_bytes} bytes (peak)`);
  console.log(`Storage: ${data.summary.storage_bytes} bytes (peak)`);
  console.log(`AI Credits: ${data.summary.ai_credits}`);
  console.log(`Egress: ${data.summary.egress_bytes} bytes`);
  return data;
};
```

## [​](#parameter-and-response-reference) Parameter and Response Reference

### [​](#project-region-values) Project Region Values

InsForge provides global deployment capabilities. Each project can be deployed to different regions:

* `us-east` - United States East Coast
* `us-west` - United States West Coast
* `ap-southeast` - Asia Pacific Southeast
* `eu-central` - Europe Central

Additional regions will be added based on demand.

### [​](#project-instance-type-values) Project Instance Type Values

Based on your project’s business requirements, InsForge offers the following resource types:

* `nano` - Minimal resources for development
* `micro` - Basic resources for testing and development
* `small` - Light workloads
* `medium` - Standard applications
* `large` - Production workloads
* `xl` - High-performance applications
* `2xl` - Enterprise applications
* `4xl` - Large-scale operations
* `8xl` - Mission-critical systems
* `16xl` - Maximum performance

### [​](#project-status-values) Project Status Values

Projects can have the following status values:

* **active**: Project is running and accessible
* **paused**: Project is paused (white-label only)

## [​](#error-handling) Error Handling

All API endpoints return consistent error responses:

```
{
  "success": false,
  "message": "Detailed error message describing what went wrong"
}
```

Common error scenarios:

* Invalid authentication credentials
* Project not found
* Insufficient permissions for requested operation
* Invalid request parameters

## [​](#next-steps) Next Steps

* Schedule a [technical review](https://calendly.com/tony-chang-insforge/45min) with our team

[Branching](/agent-native/branching)[OAuth Server](/oauth-server)

⌘I

[x](https://x.com/InsForge_dev)[github](https://github.com/InsForge/InsForge)[linkedin](https://linkedin.com/company/insforge)