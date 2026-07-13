// Edge Function: Notification Sending
// Adapted for InsForge Worker Runtime (exports handler, no Deno.serve)
// Uses InsForge SDK for database access
//
// Required env vars (set via InsForge secrets):
//   INSFORGE_BASE_URL, ANON_KEY

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;
const MAX_CONTENT_LENGTH = 10000;
const MAX_SUBJECT_LENGTH = 200;
const MAX_RECIPIENT_LENGTH = 320;

interface NotifyRequest {
  type: 'email' | 'sms' | 'in_app';
  recipient: string;
  subject?: string;
  content: string;
  template_id?: string;
  params?: Record<string, string>;
}

interface NotifyResponse {
  success: boolean;
  message: string;
  type: string;
  notification_id?: string;
}

const INSFORGE_BASE_URL = Deno.env.get('INSFORGE_BASE_URL') || 'http://172.16.100.211:7130';
const ANON_KEY = Deno.env.get('ANON_KEY') || '';

function validateRequest(body: NotifyRequest): string[] {
  const errors: string[] = [];

  if (!body.type || !body.recipient || !body.content) {
    errors.push('Missing required fields: type, recipient, content');
    return errors;
  }

  const validTypes = ['email', 'sms', 'in_app'];
  if (!validTypes.includes(body.type)) {
    errors.push(`Invalid notification type: ${body.type}. Must be one of: ${validTypes.join(', ')}`);
  }

  if (body.recipient.length > MAX_RECIPIENT_LENGTH) {
    errors.push(`Recipient exceeds maximum length of ${MAX_RECIPIENT_LENGTH} characters`);
  }

  if (body.type === 'email' && !EMAIL_REGEX.test(body.recipient)) {
    errors.push(`Invalid email format: ${body.recipient}`);
  }

  if (body.type === 'sms' && !PHONE_REGEX.test(body.recipient)) {
    errors.push(`Invalid phone number format: ${body.recipient}. Use E.164 format (e.g. +1234567890)`);
  }

  if (body.content.length > MAX_CONTENT_LENGTH) {
    errors.push(`Content exceeds maximum length of ${MAX_CONTENT_LENGTH} characters`);
  }

  if (body.subject && body.subject.length > MAX_SUBJECT_LENGTH) {
    errors.push(`Subject exceeds maximum length of ${MAX_SUBJECT_LENGTH} characters`);
  }

  if (body.template_id && typeof body.template_id !== 'string') {
    errors.push('template_id must be a string');
  }

  return errors;
}

async function logNotification(
  client: ReturnType<typeof createClient>,
  record: {
    type: string;
    recipient: string;
    subject: string | null;
    content_preview: string;
    status: string;
    error_message?: string;
  },
): Promise<void> {
  const { error } = await client.database
    .from('notification_logs')
    .insert([{
      type: record.type,
      recipient: record.recipient,
      subject: record.subject,
      content_preview: record.content_preview,
      status: record.status,
      error_message: record.error_message || null,
      created_at: new Date().toISOString(),
    }]);

  if (error) {
    console.error('[NOTIFY] Failed to log notification:', error);
  }
}

async function sendEmail(
  recipient: string,
  subject: string | undefined,
  content: string,
): Promise<{ success: boolean; message: string }> {
  const smtpHost = Deno.env.get('SMTP_HOST');

  if (!smtpHost) {
    console.log(`[NOTIFY] Email to ${recipient}: ${subject || content.substring(0, 50)}`);
    return { success: true, message: 'Email logged (SMTP not configured)' };
  }

  // TODO: Integrate with actual SMTP/SendGrid/Resend service
  console.log(`[NOTIFY] Email sent to ${recipient}: ${subject || content.substring(0, 50)}`);
  return { success: true, message: 'Email sent successfully' };
}

async function sendSms(
  recipient: string,
  content: string,
): Promise<{ success: boolean; message: string }> {
  const smsProvider = Deno.env.get('SMS_PROVIDER');
  const smsApiKey = Deno.env.get('SMS_API_KEY');

  if (!smsProvider || !smsApiKey) {
    console.log(`[NOTIFY] SMS to ${recipient}: ${content.substring(0, 50)}`);
    return { success: true, message: 'SMS logged (SMS provider not configured)' };
  }

  // TODO: Integrate with actual SMS service (Twilio, Aliyun SMS, etc.)
  console.log(`[NOTIFY] SMS sent to ${recipient}: ${content.substring(0, 50)}`);
  return { success: true, message: 'SMS sent successfully' };
}

async function sendInApp(
  client: ReturnType<typeof createClient>,
  recipient: string,
  content: string,
): Promise<{ success: boolean; message: string; notification_id?: string }> {
  const { data, error } = await client.database
    .from('in_app_notifications')
    .insert([{
      user_id: recipient,
      content: content,
      is_read: false,
      created_at: new Date().toISOString(),
    }])
    .select();

  if (error) {
    console.error(`[NOTIFY] Failed to store in-app notification:`, error);
    return { success: false, message: `Failed to store notification: ${error.message}` };
  }

  const notificationId = Array.isArray(data) && data[0]?.id ? String(data[0].id) : undefined;
  return { success: true, message: 'In-app notification stored', notification_id: notificationId };
}

// Handler function - called by InsForge Worker Runtime
module.exports = async function notifyHandler(req: Request): Promise<Response> {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Extract user token for authenticated SDK access
  const authHeader = req.headers.get('Authorization');
  const userToken = authHeader ? authHeader.replace('Bearer ', '') : null;

  // Create SDK client — use edgeFunctionToken for authenticated access
  const client = createClient({
    baseUrl: INSFORGE_BASE_URL,
    anonKey: ANON_KEY,
    ...(userToken ? { edgeFunctionToken: userToken } : {}),
  });

  let body: NotifyRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const validationErrors = validateRequest(body);
  if (validationErrors.length > 0) {
    return new Response(JSON.stringify({
      success: false,
      message: validationErrors.join('; '),
      type: body.type || 'unknown',
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const contentPreview = body.content.substring(0, 100);
  let result: NotifyResponse;

  try {
    switch (body.type) {
      case 'email': {
        const emailResult = await sendEmail(body.recipient, body.subject, body.content);
        result = { ...emailResult, type: 'email' };
        break;
      }
      case 'sms': {
        const smsResult = await sendSms(body.recipient, body.content);
        result = { ...smsResult, type: 'sms' };
        break;
      }
      case 'in_app': {
        const inAppResult = await sendInApp(client, body.recipient, body.content);
        result = { ...inAppResult, type: 'in_app' };
        break;
      }
      default:
        result = { success: false, message: 'Unknown notification type', type: body.type };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    result = { success: false, message: errorMessage, type: body.type };
  }

  // Log notification using SDK
  await logNotification(client, {
    type: body.type,
    recipient: body.recipient,
    subject: body.subject || null,
    content_preview: contentPreview,
    status: result.success ? 'sent' : 'failed',
    error_message: result.success ? undefined : result.message,
  });

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
};