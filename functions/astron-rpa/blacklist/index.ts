// Edge Function: Blacklist Checking
// Adapted for InsForge Worker Runtime (exports handler, no Deno.serve)
// Uses InsForge SDK for database access
//
// Required env vars (set via InsForge secrets):
//   INSFORGE_BASE_URL, ANON_KEY

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IP_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
const MAX_CHECK_ITEMS = 10;

const INSFORGE_BASE_URL = Deno.env.get('INSFORGE_BASE_URL') || 'http://172.16.100.211:7130';
const ANON_KEY = Deno.env.get('ANON_KEY') || '';

interface BlacklistCheckRequest {
  user_id?: string;
  email?: string;
  ip_address?: string;
}

interface BlacklistCheckResponse {
  blacklisted: boolean;
  details: Record<string, boolean>;
  errors?: string[];
}

function validateRequest(body: BlacklistCheckRequest): string[] {
  const errors: string[] = [];

  if (!body.user_id && !body.email && !body.ip_address) {
    errors.push('At least one of user_id, email, or ip_address is required');
    return errors;
  }

  const checkCount = [body.user_id, body.email, body.ip_address].filter(Boolean).length;
  if (checkCount > MAX_CHECK_ITEMS) {
    errors.push(`Maximum ${MAX_CHECK_ITEMS} check items allowed`);
  }

  if (body.email && !EMAIL_REGEX.test(body.email)) {
    errors.push(`Invalid email format: ${body.email}`);
  }

  if (body.ip_address && !IP_REGEX.test(body.ip_address)) {
    errors.push(`Invalid IP address format: ${body.ip_address}`);
  }

  if (body.user_id && typeof body.user_id !== 'string') {
    errors.push('user_id must be a string');
  }

  return errors;
}

async function checkBlacklist(
  client: ReturnType<typeof createClient>,
  field: string,
  value: string,
): Promise<boolean> {
  const { data, error } = await client.database
    .from('blacklist')
    .select('id')
    .eq(field, value)
    .limit(1);

  if (error) {
    console.error(`[BLACKLIST] Query failed for ${field}=${value}:`, error);
    return false;
  }

  return Array.isArray(data) && data.length > 0;
}

// Handler function - called by InsForge Worker Runtime
module.exports = async function blacklistHandler(req: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(req.url);

  // Health check endpoint
  if (req.method === 'GET' && url.pathname === '/status') {
    return new Response(JSON.stringify({
      checks: ['user_id', 'email', 'ip_address'],
      max_items_per_check: MAX_CHECK_ITEMS,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Create SDK client with anon key (blacklist check is a public operation)
  const client = createClient({
    baseUrl: INSFORGE_BASE_URL,
    anonKey: ANON_KEY,
  });

  let body: BlacklistCheckRequest;
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
      blacklisted: false,
      details: {},
      errors: validationErrors,
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const results: Record<string, boolean> = {};

  if (body.user_id) {
    results.user_blacklisted = await checkBlacklist(client, 'user_id', body.user_id);
  }

  if (body.email) {
    results.email_blacklisted = await checkBlacklist(client, 'email', body.email);
  }

  if (body.ip_address) {
    results.ip_blacklisted = await checkBlacklist(client, 'ip_address', body.ip_address);
  }

  const isBlacklisted = Object.values(results).some((v) => v);

  const response: BlacklistCheckResponse = {
    blacklisted: isBlacklisted,
    details: results,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
};