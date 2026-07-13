// Edge Function: RPA Execution Status
// Replaces: /api/robot/task-execute/status, /api/robot/robot-record/save-result
// Adapted for InsForge Worker Runtime (exports handler, no Deno.serve)
//
// Required env vars:
//   INSFORGE_BASE_URL, ANON_KEY

const INSFORGE_BASE_URL = Deno.env.get('INSFORGE_BASE_URL') || 'http://172.16.100.211:7130';
const ANON_KEY = Deno.env.get('ANON_KEY') || '';

// Status mapping: engine result values → DB status
const RESULT_TO_STATUS = {
  '0': 'success',      // SUCCESS
  '1': 'failed',       // FAIL
  '2': 'running',      // EXECUTING
  '3': 'cancelled',    // CANCEL
  '4': 'error',        // EXEC_ERROR
  'success': 'success',
  'failed': 'failed',
  'running': 'running',
  'cancelled': 'cancelled',
  'error': 'error',
};

// Handler function - called by InsForge Worker Runtime
module.exports = async function rpaExecutionHandler(req: Request): Promise<Response> {
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
  const action = url.searchParams.get('action') || body.action || 'update-status';

  // Parse user_id from JWT
  let userId = null;
  try {
    const payload = JSON.parse(atob(userToken.split('.')[1]));
    userId = payload.sub;
  } catch (e) {
    console.warn('[RPA-EXECUTION] Failed to parse JWT:', e);
  }

  try {
    if (action === 'update-status' || action === 'save-result') {
      return await handleExecutionStatus(client, body, userId, action, corsHeaders);
    }
    if (action === 'create-record') {
      return await handleCreateExecution(client, body, userId, corsHeaders);
    }
    return new Response(JSON.stringify({ error: 'Unknown action: ' + action }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[RPA-EXECUTION] Error:', msg);
    return new Response(JSON.stringify({ code: 500, message: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

async function handleCreateExecution(client, body, userId, corsHeaders) {
  // Create a new execution record
  const now = new Date().toISOString();
  const { data, error } = await client.database
    .from('executions')
    .insert([{
      task_id: body.taskId || body.task_id || null,
      robot_id: body.robotId || body.robot_id || null,
      workflow_id: body.workflowId || body.workflow_id || null,
      status: 'running',
      start_time: now,
      user_id: userId,
    }])
    .select();

  if (error) {
    console.error('[RPA-EXECUTION] Create execution error:', error);
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const execution = data[0];
  console.log(`[RPA-EXECUTION] Execution created: ${execution.id}`);
  return new Response(JSON.stringify({
    code: 200,
    data: execution,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleExecutionStatus(client, body, userId, action, corsHeaders) {
  const now = new Date().toISOString();

  // Map the engine's result value to DB status
  const result = String(body.result ?? body.status ?? '2');
  const dbStatus = RESULT_TO_STATUS[result] || 'running';

  // Determine execution ID - engine sends either dispatchTaskExecuteId or taskExecuteId
  const executionId = body.dispatchTaskExecuteId || body.taskExecuteId || body.execution_id || body.executionId || '';
  const taskId = body.dispatchTaskId || body.taskId || body.task_id || '';
  const terminalId = body.terminalId || body.terminal_id || '';

  // If executionId is provided, update that specific execution
  if (executionId) {
    const updateData = {
      status: dbStatus,
      end_time: dbStatus !== 'running' ? now : null,
      updated_at: now,
    };
    if (dbStatus !== 'running') {
      updateData.duration_ms = 0; // Will be computed if needed
    }

    const { data, error } = await client.database
      .from('executions')
      .update(updateData)
      .eq('id', executionId)
      .select();

    if (error) {
      console.error('[RPA-EXECUTION] Update execution error:', error);
      return new Response(JSON.stringify({ code: 500, message: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[RPA-EXECUTION] Execution updated: ${executionId} -> ${dbStatus}`);
    return new Response(JSON.stringify({
      code: 200,
      data: data[0] || { id: executionId, status: dbStatus },
      message: 'success',
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // If only taskId is provided, find the latest execution for that task
  if (taskId) {
    const { data: executions } = await client.database
      .from('executions')
      .select('id')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (executions && executions.length > 0) {
      const { data, error } = await client.database
        .from('executions')
        .update({
          status: dbStatus,
          end_time: dbStatus !== 'running' ? now : null,
          updated_at: now,
        })
        .eq('id', executions[0].id)
        .select();

      if (error) {
        console.error('[RPA-EXECUTION] Update execution by task error:', error);
        return new Response(JSON.stringify({ code: 500, message: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log(`[RPA-EXECUTION] Execution updated by task: ${taskId} -> ${dbStatus}`);
      return new Response(JSON.stringify({
        code: 200,
        data: data[0] || { taskId, status: dbStatus },
        message: 'success',
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // No execution found, create a new one
    const { data, error } = await client.database
      .from('executions')
      .insert([{
        task_id: taskId,
        status: dbStatus,
        start_time: dbStatus === 'running' ? now : null,
        end_time: dbStatus !== 'running' ? now : null,
        user_id: userId,
      }])
      .select();

    if (error) {
      console.error('[RPA-EXECUTION] Create execution on status error:', error);
      return new Response(JSON.stringify({ code: 500, message: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[RPA-EXECUTION] Execution auto-created: ${taskId} -> ${dbStatus}`);
    return new Response(JSON.stringify({
      code: 200,
      data: data[0] || { taskId, status: dbStatus },
      message: 'success',
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: { status: 'acknowledged', result: dbStatus },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}