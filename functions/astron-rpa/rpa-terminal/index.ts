// Edge Function: RPA Terminal Management
// Replaces: /api/robot/terminal/register, /api/robot/terminal/beat
// Adapted for InsForge Worker Runtime (exports handler, no Deno.serve)
//
// Required env vars:
//   INSFORGE_BASE_URL, ANON_KEY

const INSFORGE_BASE_URL = Deno.env.get('INSFORGE_BASE_URL') || 'http://172.16.100.211:7130';
const ANON_KEY = Deno.env.get('ANON_KEY') || '';

// Handler function - called by InsForge Worker Runtime
module.exports = async function rpaTerminalHandler(req: Request): Promise<Response> {
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

  const authHeader = req.headers.get('Authorization');
  const userToken = authHeader ? authHeader.replace('Bearer ', '') : null;
  if (!userToken) {
    return new Response(JSON.stringify({ error: 'Missing bearer token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const client = createClient({
    baseUrl: INSFORGE_BASE_URL,
    anonKey: ANON_KEY,
    edgeFunctionToken: userToken,
  });

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get('action') || body.action || 'register';

  // Parse user_id from JWT once
  let userId = null;
  try {
    const payload = JSON.parse(atob(userToken.split('.')[1]));
    userId = payload.sub;
  } catch (e) {
    console.warn('[RPA-TERMINAL] Failed to parse JWT:', e);
  }

  try {
    if (action === 'register' || action === 'beat') {
      return await handleTerminal(client, body, userId, action, corsHeaders);
    }
    return new Response(JSON.stringify({ error: 'Unknown action: ' + action }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[RPA-TERMINAL] Error:', msg);
    return new Response(JSON.stringify({ success: false, message: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function handleTerminal(client, body, userId, action, corsHeaders) {
  const terminalId = body.terminalId || body.terminal_id || '';
  if (!terminalId) {
    return new Response(JSON.stringify({ error: 'terminalId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get user info
  let userEmail = 'unknown';
  if (userId) {
    const { data: userData } = await client.database
      .from('auth.users')
      .select('email')
      .eq('id', userId)
      .limit(1);
    if (userData && userData.length > 0) {
      userEmail = userData[0].email;
    }
  }

  // Map engine status to DB status
  // Engine: "busy" / "free"  →  DB: "online" / "offline"
  const engineStatus = body.status || 'free';
  const dbStatus = engineStatus === 'busy' ? 'online' : 'online'; // Any heartbeat means the robot is online

  const now = new Date().toISOString();

  // Check if robot already exists by agent_key (terminalId)
  const { data: existing } = await client.database
    .from('robots')
    .select('id, name, status')
    .eq('agent_key', terminalId)
    .limit(1);

  if (action === 'register') {
    if (existing && existing.length > 0) {
      // Update existing robot
      const { data, error } = await client.database
        .from('robots')
        .update({
          status: dbStatus,
          host_name: body.name || '',
          ip_address: body.ip || '',
          os_version: body.os || '',
          version: body.osPwd || '',
          last_heartbeat: now,
          updated_at: now,
        })
        .eq('id', existing[0].id)
        .select();

      if (error) {
        console.error('[RPA-TERMINAL] Update error:', error);
        return new Response(JSON.stringify({ code: 500, message: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log(`[RPA-TERMINAL] Robot updated: ${terminalId} -> ${existing[0].id}`);
      return new Response(JSON.stringify({
        code: 200,
        data: {
          id: existing[0].id,
          terminalId: terminalId,
          status: 'registered',
          name: body.name,
        },
        message: 'success',
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Create new robot
      const { data, error } = await client.database
        .from('robots')
        .insert([{
          name: body.name || terminalId,
          agent_key: terminalId,
          status: dbStatus,
          host_name: body.name || '',
          ip_address: body.ip || '',
          os_version: body.os || '',
          version: body.osPwd || '',
          last_heartbeat: now,
          user_id: userId,
        }])
        .select();

      if (error) {
        console.error('[RPA-TERMINAL] Insert error:', error);
        return new Response(JSON.stringify({ code: 500, message: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const robot = data[0];
      console.log(`[RPA-TERMINAL] Robot created: ${terminalId} -> ${robot.id}`);
      return new Response(JSON.stringify({
        code: 200,
        data: {
          id: robot.id,
          terminalId: terminalId,
          status: 'registered',
          name: body.name,
        },
        message: 'success',
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // action === 'beat' (heartbeat)
  if (existing && existing.length > 0) {
    const { data, error } = await client.database
      .from('robots')
      .update({
        status: dbStatus,
        last_heartbeat: now,
        updated_at: now,
      })
      .eq('id', existing[0].id)
      .select();

    if (error) {
      console.error('[RPA-TERMINAL] Heartbeat error:', error);
      return new Response(JSON.stringify({ code: 500, message: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[RPA-TERMINAL] Heartbeat: ${terminalId} -> ${existing[0].id}`);
    return new Response(JSON.stringify({
      code: 200,
      data: {
        id: existing[0].id,
        terminalId: terminalId,
        status: 'alive',
        lastHeartbeat: now,
      },
      message: 'success',
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } else {
    // Robot not registered yet - auto-register on first heartbeat
    console.log(`[RPA-TERMINAL] Auto-register on heartbeat: ${terminalId}`);
    return new Response(JSON.stringify({
      code: 200,
      data: {
        id: terminalId,
        terminalId: terminalId,
        status: 'not_registered',
        message: 'Robot not registered, please register first',
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}