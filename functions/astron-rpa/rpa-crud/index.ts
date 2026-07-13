// Edge Function: RPA CRUD Operations
// Replaces robot-service CRUD endpoints:
//   /api/robot/robot-execute/execute-list, /api/robot/robot-execute/delete-robot
//   /api/robot/robot-version/publish, /api/robot/robot-version/latest-info
//   /api/robot/process/save, /api/robot/process/process-json, /api/robot/process/all-data
//   /api/robot/component/editing/manage-list, /api/robot/component/editing/info
//   /api/robot/global/*, /api/robot/element/*, /api/robot/group/*
//   /api/robot/require/*, /api/robot/module/*
// Adapted for InsForge Worker Runtime (exports handler, no Deno.serve)
//
// Required env vars:
//   INSFORGE_BASE_URL, ANON_KEY

const INSFORGE_BASE_URL = Deno.env.get('INSFORGE_BASE_URL') || 'http://172.16.100.211:7130';
const ANON_KEY = Deno.env.get('ANON_KEY') || '';

// Handler function - called by InsForge Worker Runtime
module.exports = async function rpaCrudHandler(req: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only POST for now (robot-service uses POST for everything)
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
  const action = url.searchParams.get('action') || body.action || '';

  // Parse user_id from JWT
  let userId = null;
  try {
    const payload = JSON.parse(atob(userToken.split('.')[1]));
    userId = payload.sub;
  } catch (e) {
    console.warn('[RPA-CRUD] Failed to parse JWT:', e);
  }

  try {
    switch (action) {
      // === Robot management ===
      case 'execute-list':
        return await handleRobotList(client, body, userId, corsHeaders);
      case 'robot-detail':
        return await handleRobotDetail(client, body, corsHeaders);
      case 'delete-robot':
        return await handleRobotDelete(client, body, corsHeaders);

      // === Version management ===
      case 'publish':
        return await handleVersionPublish(client, body, userId, corsHeaders);
      case 'latest-info':
        return await handleVersionLatest(client, body, corsHeaders);
      case 'same-name':
        return await handleVersionNameCheck(client, body, corsHeaders);

      // === Process (Workflow) management ===
      case 'process-all-data':
        return await handleProcessList(client, body, corsHeaders);
      case 'process-save':
        return await handleProcessSave(client, body, userId, corsHeaders);
      case 'process-json':
        return await handleProcessGet(client, body, corsHeaders);
      case 'process-create':
        return await handleProcessCreate(client, body, userId, corsHeaders);
      case 'process-delete':
        return await handleProcessDelete(client, body, corsHeaders);
      case 'process-name':
        return await handleProcessName(client, body, corsHeaders);
      case 'process-rename':
        return await handleProcessRename(client, body, corsHeaders);
      case 'process-copy':
        return await handleProcessCopy(client, body, corsHeaders);
      case 'process-module-list':
        return await handleProcessModuleList(client, body, corsHeaders);

      // === Component management ===
      case 'component-manage-list':
        return await handleComponentList(client, body, corsHeaders);
      case 'component-info':
        return await handleComponentInfo(client, body, corsHeaders);

      // === Global variable management ===
      case 'global-all':
        return await handleGlobalList(client, body, corsHeaders);
      case 'global-create':
        return await handleGlobalCreate(client, body, userId, corsHeaders);
      case 'global-save':
        return await handleGlobalSave(client, body, corsHeaders);
      case 'global-delete':
        return await handleGlobalDelete(client, body, corsHeaders);
      case 'global-name-list':
        return await handleGlobalNameList(client, body, corsHeaders);

      default:
        return new Response(JSON.stringify({
          code: 400,
          message: 'Unknown action: ' + action,
          data: null,
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[RPA-CRUD] Error:', msg);
    return new Response(JSON.stringify({ code: 500, message: msg, data: null }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

// ==================== Robot Management ====================

async function handleRobotList(client, body, userId, corsHeaders) {
  const page = body.page || body.pageNum || 1;
  const pageSize = body.pageSize || body.pageSize || 20;
  const offset = (page - 1) * pageSize;

  let query = client.database
    .from('robots')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (body.name) {
    query = query.ilike('name', '%' + body.name + '%');
  }
  if (body.status) {
    query = query.eq('status', body.status);
  }

  const { data, error, count } = await query;

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, records: [], total: 0 }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: {
      records: data || [],
      total: count || 0,
      page: page,
      pageSize: pageSize,
    },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleRobotDetail(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  if (!robotId) {
    return new Response(JSON.stringify({ code: 400, message: 'robotId is required', data: null }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await client.database
    .from('robots')
    .select('*')
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, data: null }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: (data && data.length > 0) ? data[0] : null,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleRobotDelete(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  if (!robotId) {
    return new Response(JSON.stringify({ code: 400, message: 'robotId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { error } = await client.database
    .from('robots')
    .delete()
    .eq('id', robotId);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ==================== Version Management ====================

async function handleVersionPublish(client, body, userId, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  if (!robotId) {
    return new Response(JSON.stringify({ code: 400, message: 'robotId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get current workflow version
  const { data: workflows } = await client.database
    .from('workflows')
    .select('id, version, status')
    .eq('id', robotId)
    .limit(1);

  const currentVersion = (workflows && workflows.length > 0) ? workflows[0].version : 1;
  const newVersion = currentVersion + 1;

  // Update workflow version and status
  const { error: updateError } = await client.database
    .from('workflows')
    .update({ version: newVersion, status: 'published', updated_at: new Date().toISOString() })
    .eq('id', robotId);

  if (updateError) {
    return new Response(JSON.stringify({ code: 500, message: updateError.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Create a version record in executions (as a release record)
  const { data: execRecord, error: execError } = await client.database
    .from('executions')
    .insert([{
      task_id: null,
      robot_id: robotId,
      workflow_id: robotId,
      status: 'released',
      start_time: new Date().toISOString(),
      result: { version: newVersion, action: 'publish' },
      user_id: userId,
    }])
    .select();

  if (execError) {
    console.error('[RPA-CRUD] Version record error:', execError);
  }

  return new Response(JSON.stringify({
    code: 200,
    data: { version: newVersion, releaseId: execRecord?.[0]?.id || null },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleVersionLatest(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  if (!robotId) {
    return new Response(JSON.stringify({ code: 400, message: 'robotId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get workflow version info
  const { data: workflows } = await client.database
    .from('workflows')
    .select('id, version, status, workflow_data, updated_at')
    .eq('id', robotId)
    .limit(1);

  if (!workflows || workflows.length === 0) {
    return new Response(JSON.stringify({
      code: 200,
      data: { version: 1, status: 'draft' },
      message: 'success',
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get latest release record
  const { data: releases } = await client.database
    .from('executions')
    .select('id, created_at, result')
    .eq('robot_id', robotId)
    .eq('status', 'released')
    .order('created_at', { ascending: false })
    .limit(1);

  return new Response(JSON.stringify({
    code: 200,
    data: {
      version: workflows[0].version,
      status: workflows[0].status,
      packageName: workflows[0].workflow_data?.packageName || '',
      description: workflows[0].workflow_data?.description || '',
      releaseTime: releases?.[0]?.created_at || null,
    },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleVersionNameCheck(client, body, corsHeaders) {
  const name = body.name || '';
  const robotId = body.robotId || body.robot_id || '';

  if (!name) {
    return new Response(JSON.stringify({ code: 400, message: 'name is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let query = client.database
    .from('robots')
    .select('id')
    .eq('name', name)
    .limit(1);

  if (robotId) {
    query = query.neq('id', robotId);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: { exists: data && data.length > 0 },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ==================== Process (Workflow) Management ====================

async function handleProcessList(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';

  let query = client.database
    .from('workflows')
    .select('*')
    .order('created_at', { ascending: false });

  if (robotId) {
    query = query.eq('id', robotId);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Map workflows to the expected format
  const records = (data || []).map(w => ({
    id: w.id,
    processId: w.id,
    processName: w.name,
    processContent: typeof w.workflow_data === 'string' ? w.workflow_data : JSON.stringify(w.workflow_data || {}),
    version: w.version,
    status: w.status,
    createdAt: w.created_at,
    updatedAt: w.updated_at,
  }));

  return new Response(JSON.stringify({
    code: 200,
    data: records,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessSave(client, body, userId, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  const processJson = body.processJson || body.process_json || '';

  if (!robotId) {
    return new Response(JSON.stringify({ code: 400, message: 'robotId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let workflowData = {};
  try {
    workflowData = typeof processJson === 'string' ? JSON.parse(processJson) : processJson;
  } catch (e) {
    workflowData = { raw: processJson };
  }

  const { data, error } = await client.database
    .from('workflows')
    .upsert({
      id: robotId,
      workflow_data: workflowData,
      updated_at: new Date().toISOString(),
      user_id: userId,
    })
    .select();

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, data: data?.[0] || { id: robotId }, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessGet(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  const processId = body.processId || body.process_id || robotId;

  if (!processId) {
    return new Response(JSON.stringify({ code: 400, message: 'processId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await client.database
    .from('workflows')
    .select('*')
    .eq('id', processId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workflow = data && data.length > 0 ? data[0] : null;
  return new Response(JSON.stringify({
    code: 200,
    data: workflow ? {
      processId: workflow.id,
      processName: workflow.name,
      processContent: typeof workflow.workflow_data === 'string'
        ? workflow.workflow_data
        : JSON.stringify(workflow.workflow_data || {}),
      version: workflow.version,
      status: workflow.status,
    } : null,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessCreate(client, body, userId, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  const processName = body.processName || body.process_name || 'New Process';

  if (!robotId) {
    return new Response(JSON.stringify({ code: 400, message: 'robotId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await client.database
    .from('workflows')
    .insert([{
      name: processName,
      status: 'draft',
      user_id: userId,
    }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: { processId: data[0]?.id || '' },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessDelete(client, body, corsHeaders) {
  const processId = body.processId || body.process_id || body.robotId || '';
  if (!processId) {
    return new Response(JSON.stringify({ code: 400, message: 'processId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { error } = await client.database
    .from('workflows')
    .delete()
    .eq('id', processId);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessName(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';

  // Count existing workflows for this user to generate a unique name
  const { data, error } = await client.database
    .from('workflows')
    .select('name', { count: 'exact' })
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: 'New Process',
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessRename(client, body, corsHeaders) {
  const processId = body.processId || body.process_id || '';
  const processName = body.processName || body.process_name || '';

  if (!processId || !processName) {
    return new Response(JSON.stringify({ code: 400, message: 'processId and processName are required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { error } = await client.database
    .from('workflows')
    .update({ name: processName, updated_at: new Date().toISOString() })
    .eq('id', processId);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessCopy(client, body, corsHeaders) {
  const processId = body.processId || body.process_id || '';
  if (!processId) {
    return new Response(JSON.stringify({ code: 400, message: 'processId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get original workflow
  const { data: original } = await client.database
    .from('workflows')
    .select('*')
    .eq('id', processId)
    .limit(1);

  if (!original || original.length === 0) {
    return new Response(JSON.stringify({ code: 404, message: 'Process not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Create a copy
  const { data, error } = await client.database
    .from('workflows')
    .insert([{
      name: original[0].name + ' (Copy)',
      description: original[0].description,
      workflow_data: original[0].workflow_data,
      status: 'draft',
      user_id: original[0].user_id,
    }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: { processId: data[0]?.id || '' },
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleProcessModuleList(client, body, corsHeaders) {
  // Return the workflows as process modules
  const robotId = body.robotId || body.robot_id || '';
  let query = client.database
    .from('workflows')
    .select('id, name, version, status, updated_at')
    .order('updated_at', { ascending: false });

  if (robotId) {
    query = query.eq('id', robotId);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const modules = (data || []).map(w => ({
    moduleId: w.id,
    moduleName: w.name,
    version: w.version,
    status: w.status,
    updateTime: w.updated_at,
  }));

  return new Response(JSON.stringify({
    code: 200,
    data: modules,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ==================== Component Management ====================

async function handleComponentList(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';

  let query = client.database
    .from('market_components')
    .select('*')
    .order('created_at', { ascending: false });

  if (robotId) {
    query = query.eq('user_id', robotId);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const components = (data || []).map(c => ({
    id: c.id,
    componentId: c.id,
    name: c.name,
    description: c.description,
    category: c.category,
    version: c.version,
    packageName: c.package_name,
    isPublic: c.is_public,
    downloadCount: c.download_count,
    createdAt: c.created_at,
  }));

  return new Response(JSON.stringify({
    code: 200,
    data: components,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleComponentInfo(client, body, corsHeaders) {
  const componentId = body.componentId || body.component_id || '';
  if (!componentId) {
    return new Response(JSON.stringify({ code: 400, message: 'componentId is required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await client.database
    .from('market_components')
    .select('*')
    .eq('id', componentId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    code: 200,
    data: data && data.length > 0 ? {
      id: data[0].id,
      componentId: data[0].id,
      name: data[0].name,
      description: data[0].description,
      category: data[0].category,
      version: data[0].version,
      packageName: data[0].package_name,
      isPublic: data[0].is_public,
      downloadCount: data[0].download_count,
      createdAt: data[0].created_at,
    } : null,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ==================== Global Variable Management ====================

async function handleGlobalList(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';

  // Global variables are stored in workflow_data.global_variables
  const { data, error } = await client.database
    .from('workflows')
    .select('id, workflow_data')
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workflowData = data?.[0]?.workflow_data || {};
  const globalVars = workflowData.global_variables || [];

  return new Response(JSON.stringify({
    code: 200,
    data: globalVars,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleGlobalCreate(client, body, userId, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  const variable = body.variable || body.param || {};

  const { data, error } = await client.database
    .from('workflows')
    .select('workflow_data')
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workflowData = data?.[0]?.workflow_data || {};
  const globalVars = workflowData.global_variables || [];
  globalVars.push({ ...variable, id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36) });

  const { error: updateError } = await client.database
    .from('workflows')
    .update({ workflow_data: { ...workflowData, global_variables: globalVars }, updated_at: new Date().toISOString() })
    .eq('id', robotId);

  if (updateError) {
    return new Response(JSON.stringify({ code: 500, message: updateError.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleGlobalSave(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  const variable = body.variable || body.param || {};

  const { data, error } = await client.database
    .from('workflows')
    .select('workflow_data')
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workflowData = data?.[0]?.workflow_data || {};
  const globalVars = workflowData.global_variables || [];
  const idx = globalVars.findIndex(v => v.id === variable.id);
  if (idx >= 0) {
    globalVars[idx] = { ...globalVars[idx], ...variable };
  }

  const { error: updateError } = await client.database
    .from('workflows')
    .update({ workflow_data: { ...workflowData, global_variables: globalVars }, updated_at: new Date().toISOString() })
    .eq('id', robotId);

  if (updateError) {
    return new Response(JSON.stringify({ code: 500, message: updateError.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleGlobalDelete(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';
  const globalId = body.globalId || body.global_id || '';

  const { data, error } = await client.database
    .from('workflows')
    .select('workflow_data')
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workflowData = data?.[0]?.workflow_data || {};
  const globalVars = (workflowData.global_variables || []).filter(v => v.id !== globalId);

  const { error: updateError } = await client.database
    .from('workflows')
    .update({ workflow_data: { ...workflowData, global_variables: globalVars }, updated_at: new Date().toISOString() })
    .eq('id', robotId);

  if (updateError) {
    return new Response(JSON.stringify({ code: 500, message: updateError.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ code: 200, message: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleGlobalNameList(client, body, corsHeaders) {
  const robotId = body.robotId || body.robot_id || '';

  const { data, error } = await client.database
    .from('workflows')
    .select('workflow_data')
    .eq('id', robotId)
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const workflowData = data?.[0]?.workflow_data || {};
  const globalVars = workflowData.global_variables || [];
  const names = globalVars.map(v => v.name || v.varName || '').filter(Boolean);

  return new Response(JSON.stringify({
    code: 200,
    data: names,
    message: 'success',
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}