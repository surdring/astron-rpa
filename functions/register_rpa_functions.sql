-- Register RPA Edge Functions for robot-service replacement
-- These functions replace the old Java robot-service API endpoints
-- Functions are registered as plain JS (no TypeScript) for compatibility with new Function() in worker-template.js

-- =============================================
-- 1. rpa-terminal: Terminal register / heartbeat
-- =============================================
INSERT INTO functions.definitions (slug, name, description, code, status)
VALUES ('rpa-terminal', 'RPA Terminal', 'Terminal register/beat replacement for robot-service', E'module.exports = async function rpaTerminalHandler(req) {
  const INSFORGE_BASE_URL = Deno.env.get("INSFORGE_BASE_URL") || "http://172.16.100.211:7130";
  const ANON_KEY = Deno.env.get("ANON_KEY") || "";
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const authHeader = req.headers.get("Authorization");
  const userToken = authHeader ? authHeader.replace("Bearer ", "") : null;
  if (!userToken) return new Response(JSON.stringify({ error: "Missing bearer token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const client = createClient({ baseUrl: INSFORGE_BASE_URL, anonKey: ANON_KEY, edgeFunctionToken: userToken });
  let body;
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || body.action || "register";
  let userId = null;
  try { const payload = JSON.parse(atob(userToken.split(".")[1])); userId = payload.sub; } catch (e) { console.warn("[RPA-TERMINAL] Failed to parse JWT:", e); }
  try {
    if (action === "register" || action === "beat") return await handleTerminal(client, body, userId, action, corsHeaders);
    return new Response(JSON.stringify({ error: "Unknown action: " + action }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[RPA-TERMINAL] Error:", msg);
    return new Response(JSON.stringify({ success: false, message: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function handleTerminal(client, body, userId, action, corsHeaders) {
    const terminalId = body.terminalId || body.terminal_id || "";
    if (!terminalId) return new Response(JSON.stringify({ error: "terminalId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const now = new Date().toISOString();
    const { data: existing } = await client.database.from("robots").select("id, name, status").eq("agent_key", terminalId).limit(1);
    if (action === "register") {
      if (existing && existing.length > 0) {
        const { data, error } = await client.database.from("robots").update({ status: "online", host_name: body.name || "", ip_address: body.ip || "", os_version: body.os || "", version: body.osPwd || "", last_heartbeat: now, updated_at: now }).eq("id", existing[0].id).select();
        if (error) { console.error("[RPA-TERMINAL] Update error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
        console.log("[RPA-TERMINAL] Robot updated:", terminalId, "->", existing[0].id);
        return new Response(JSON.stringify({ code: 200, data: { id: existing[0].id, terminalId, status: "registered", name: body.name }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } else {
        const { data, error } = await client.database.from("robots").insert([{ name: body.name || terminalId, agent_key: terminalId, status: "online", host_name: body.name || "", ip_address: body.ip || "", os_version: body.os || "", version: body.osPwd || "", last_heartbeat: now, user_id: userId }]).select();
        if (error) { console.error("[RPA-TERMINAL] Insert error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
        const robot = data[0];
        console.log("[RPA-TERMINAL] Robot created:", terminalId, "->", robot.id);
        return new Response(JSON.stringify({ code: 200, data: { id: robot.id, terminalId, status: "registered", name: body.name }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }
    if (existing && existing.length > 0) {
      const { data, error } = await client.database.from("robots").update({ status: "online", last_heartbeat: now, updated_at: now }).eq("id", existing[0].id).select();
      if (error) { console.error("[RPA-TERMINAL] Heartbeat error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
      console.log("[RPA-TERMINAL] Heartbeat:", terminalId, "->", existing[0].id);
      return new Response(JSON.stringify({ code: 200, data: { id: existing[0].id, terminalId, status: "alive", lastHeartbeat: now }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    } else {
      return new Response(JSON.stringify({ code: 200, data: { id: terminalId, terminalId, status: "not_registered", message: "Robot not registered, please register first" } }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }
}', 'active')
ON CONFLICT (slug) DO UPDATE SET code = EXCLUDED.code, status = 'active', updated_at = NOW();

-- =============================================
-- 2. rpa-execution: Task execution status update
-- =============================================
INSERT INTO functions.definitions (slug, name, description, code, status)
VALUES ('rpa-execution', 'RPA Execution', 'Task execution status update replacement for robot-service', E'module.exports = async function rpaExecutionHandler(req) {
  const INSFORGE_BASE_URL = Deno.env.get("INSFORGE_BASE_URL") || "http://172.16.100.211:7130";
  const ANON_KEY = Deno.env.get("ANON_KEY") || "";
  const RESULT_TO_STATUS = { "0": "success", "1": "failed", "2": "running", "3": "cancelled", "4": "error", success: "success", failed: "failed", running: "running", cancelled: "cancelled", error: "error" };
  const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const authHeader = req.headers.get("Authorization");
  const userToken = authHeader ? authHeader.replace("Bearer ", "") : null;
  if (!userToken) return new Response(JSON.stringify({ error: "Missing bearer token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const client = createClient({ baseUrl: INSFORGE_BASE_URL, anonKey: ANON_KEY, edgeFunctionToken: userToken });
  let body;
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || body.action || "update-status";
  let userId = null;
  try { const payload = JSON.parse(atob(userToken.split(".")[1])); userId = payload.sub; } catch (e) { console.warn("[RPA-EXECUTION] Failed to parse JWT:", e); }
  try {
    if (action === "update-status" || action === "save-result") return await handleExecutionStatus(client, body, userId, corsHeaders);
    if (action === "create-record") return await handleCreateExecution(client, body, userId, corsHeaders);
    return new Response(JSON.stringify({ error: "Unknown action: " + action }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[RPA-EXECUTION] Error:", msg);
    return new Response(JSON.stringify({ code: 500, message: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function handleCreateExecution(client, body, userId, corsHeaders) {
    const now = new Date().toISOString();
    const { data, error } = await client.database.from("executions").insert([{ task_id: body.taskId || body.task_id || null, robot_id: body.robotId || body.robot_id || null, workflow_id: body.workflowId || body.workflow_id || null, status: "running", start_time: now, user_id: userId }]).select();
    if (error) { console.error("[RPA-EXECUTION] Create execution error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
    const execution = data[0];
    console.log("[RPA-EXECUTION] Execution created:", execution.id);
    return new Response(JSON.stringify({ code: 200, data: execution, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function handleExecutionStatus(client, body, userId, corsHeaders) {
    const now = new Date().toISOString();
    const result = String(body.result ?? body.status ?? "2");
    const dbStatus = RESULT_TO_STATUS[result] || "running";
    const executionId = body.dispatchTaskExecuteId || body.taskExecuteId || body.execution_id || body.executionId || "";
    const taskId = body.dispatchTaskId || body.taskId || body.task_id || "";
    if (executionId) {
      const { data, error } = await client.database.from("executions").update({ status: dbStatus, end_time: dbStatus !== "running" ? now : null, updated_at: now }).eq("id", executionId).select();
      if (error) { console.error("[RPA-EXECUTION] Update execution error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
      console.log("[RPA-EXECUTION] Execution updated:", executionId, "->", dbStatus);
      return new Response(JSON.stringify({ code: 200, data: data[0] || { id: executionId, status: dbStatus }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (taskId) {
      const { data: executions } = await client.database.from("executions").select("id").eq("task_id", taskId).order("created_at", { ascending: false }).limit(1);
      if (executions && executions.length > 0) {
        const { data, error } = await client.database.from("executions").update({ status: dbStatus, end_time: dbStatus !== "running" ? now : null, updated_at: now }).eq("id", executions[0].id).select();
        if (error) { console.error("[RPA-EXECUTION] Update by task error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
        console.log("[RPA-EXECUTION] Execution updated by task:", taskId, "->", dbStatus);
        return new Response(JSON.stringify({ code: 200, data: data[0] || { taskId, status: dbStatus }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const { data, error } = await client.database.from("executions").insert([{ task_id: taskId, status: dbStatus, start_time: dbStatus === "running" ? now : null, end_time: dbStatus !== "running" ? now : null, user_id: userId }]).select();
      if (error) { console.error("[RPA-EXECUTION] Auto-create error:", error); return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
      console.log("[RPA-EXECUTION] Execution auto-created:", taskId, "->", dbStatus);
      return new Response(JSON.stringify({ code: 200, data: data[0] || { taskId, status: dbStatus }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ code: 200, data: { status: "acknowledged", result: dbStatus }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
}', 'active')
ON CONFLICT (slug) DO UPDATE SET code = EXCLUDED.code, status = 'active', updated_at = NOW();

-- =============================================
-- 3. rpa-crud: Robot CRUD, process, component, global variable management
-- =============================================
INSERT INTO functions.definitions (slug, name, description, code, status)
VALUES ('rpa-crud', 'RPA CRUD', 'CRUD replacement for robot-service (robots, workflows, components, globals)', E'module.exports = async function rpaCrudHandler(req) {
  const INSFORGE_BASE_URL = Deno.env.get("INSFORGE_BASE_URL") || "http://172.16.100.211:7130";
  const ANON_KEY = Deno.env.get("ANON_KEY") || "";
  const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const authHeader = req.headers.get("Authorization");
  const userToken = authHeader ? authHeader.replace("Bearer ", "") : null;
  if (!userToken) return new Response(JSON.stringify({ error: "Missing bearer token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const client = createClient({ baseUrl: INSFORGE_BASE_URL, anonKey: ANON_KEY, edgeFunctionToken: userToken });
  let body;
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || body.action || "";
  let userId = null;
  try { const payload = JSON.parse(atob(userToken.split(".")[1])); userId = payload.sub; } catch (e) { console.warn("[RPA-CRUD] Failed to parse JWT:", e); }
  try {
    switch (action) {
      case "execute-list": return await robotList(client, body, corsHeaders);
      case "robot-detail": return await robotDetail(client, body, corsHeaders);
      case "delete-robot": return await robotDelete(client, body, corsHeaders);
      case "publish": return await versionPublish(client, body, userId, corsHeaders);
      case "latest-info": return await versionLatest(client, body, corsHeaders);
      case "same-name": return await versionNameCheck(client, body, corsHeaders);
      case "process-all-data": return await processList(client, body, corsHeaders);
      case "process-save": return await processSave(client, body, userId, corsHeaders);
      case "process-json": return await processGet(client, body, corsHeaders);
      case "process-create": return await processCreate(client, body, userId, corsHeaders);
      case "process-delete": return await processDelete(client, body, corsHeaders);
      case "process-rename": return await processRename(client, body, corsHeaders);
      case "process-copy": return await processCopy(client, body, corsHeaders);
      case "component-manage-list": return await componentList(client, body, corsHeaders);
      case "component-info": return await componentInfo(client, body, corsHeaders);
      case "global-all": return await globalList(client, body, corsHeaders);
      case "global-create": return await globalCreate(client, body, userId, corsHeaders);
      case "global-save": return await globalSave(client, body, corsHeaders);
      case "global-delete": return await globalDelete(client, body, corsHeaders);
      default: return new Response(JSON.stringify({ code: 400, message: "Unknown action: " + action, data: null }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[RPA-CRUD] Error:", msg);
    return new Response(JSON.stringify({ code: 500, message: msg, data: null }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function robotList(client, body, corsHeaders) {
    const page = body.page || body.pageNum || 1; const pageSize = body.pageSize || 20; const offset = (page - 1) * pageSize;
    let query = client.database.from("robots").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
    if (body.name) query = query.ilike("name", "%" + body.name + "%");
    if (body.status) query = query.eq("status", body.status);
    const { data, error, count } = await query;
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message, records: [], total: 0 }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, data: { records: data || [], total: count || 0, page, pageSize }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function robotDetail(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    if (!robotId) return new Response(JSON.stringify({ code: 400, message: "robotId is required", data: null }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data, error } = await client.database.from("robots").select("*").eq("id", robotId).limit(1);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message, data: null }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, data: (data && data.length > 0) ? data[0] : null, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function robotDelete(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    if (!robotId) return new Response(JSON.stringify({ code: 400, message: "robotId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { error } = await client.database.from("robots").delete().eq("id", robotId);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function versionPublish(client, body, userId, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    if (!robotId) return new Response(JSON.stringify({ code: 400, message: "robotId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data: workflows } = await client.database.from("workflows").select("id, version, status").eq("id", robotId).limit(1);
    const currentVersion = (workflows && workflows.length > 0) ? workflows[0].version : 1;
    const newVersion = currentVersion + 1;
    await client.database.from("workflows").update({ version: newVersion, status: "published", updated_at: new Date().toISOString() }).eq("id", robotId);
    const { data: execRecord } = await client.database.from("executions").insert([{ task_id: null, robot_id: robotId, workflow_id: robotId, status: "released", start_time: new Date().toISOString(), result: { version: newVersion, action: "publish" }, user_id: userId }]).select();
    return new Response(JSON.stringify({ code: 200, data: { version: newVersion, releaseId: execRecord?.[0]?.id || null }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function versionLatest(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    if (!robotId) return new Response(JSON.stringify({ code: 400, message: "robotId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data: workflows } = await client.database.from("workflows").select("id, version, status, workflow_data, updated_at").eq("id", robotId).limit(1);
    if (!workflows || workflows.length === 0) return new Response(JSON.stringify({ code: 200, data: { version: 1, status: "draft" }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data: releases } = await client.database.from("executions").select("id, created_at, result").eq("robot_id", robotId).eq("status", "released").order("created_at", { ascending: false }).limit(1);
    return new Response(JSON.stringify({ code: 200, data: { version: workflows[0].version, status: workflows[0].status, packageName: workflows[0].workflow_data?.packageName || "", description: workflows[0].workflow_data?.description || "", releaseTime: releases?.[0]?.created_at || null }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function versionNameCheck(client, body, corsHeaders) {
    const name = body.name || ""; const robotId = body.robotId || body.robot_id || "";
    if (!name) return new Response(JSON.stringify({ code: 400, message: "name is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    let query = client.database.from("robots").select("id").eq("name", name).limit(1);
    if (robotId) query = query.neq("id", robotId);
    const { data, error } = await query;
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, data: { exists: data && data.length > 0 }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processList(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    let query = client.database.from("workflows").select("*").order("created_at", { ascending: false });
    if (robotId) query = query.eq("id", robotId);
    const { data, error } = await query;
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const records = (data || []).map(function(w) { return { id: w.id, processId: w.id, processName: w.name, processContent: typeof w.workflow_data === "string" ? w.workflow_data : JSON.stringify(w.workflow_data || {}), version: w.version, status: w.status, createdAt: w.created_at, updatedAt: w.updated_at }; });
    return new Response(JSON.stringify({ code: 200, data: records, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processSave(client, body, userId, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    const processJson = body.processJson || body.process_json || "";
    if (!robotId) return new Response(JSON.stringify({ code: 400, message: "robotId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    let workflowData = {};
    try { workflowData = typeof processJson === "string" ? JSON.parse(processJson) : processJson; } catch (e) { workflowData = { raw: processJson }; }
    const { data, error } = await client.database.from("workflows").upsert({ id: robotId, workflow_data: workflowData, updated_at: new Date().toISOString(), user_id: userId }).select();
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, data: data?.[0] || { id: robotId }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processGet(client, body, corsHeaders) {
    const processId = body.processId || body.process_id || body.robotId || "";
    if (!processId) return new Response(JSON.stringify({ code: 400, message: "processId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data, error } = await client.database.from("workflows").select("*").eq("id", processId).limit(1);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const w = data && data.length > 0 ? data[0] : null;
    return new Response(JSON.stringify({ code: 200, data: w ? { processId: w.id, processName: w.name, processContent: typeof w.workflow_data === "string" ? w.workflow_data : JSON.stringify(w.workflow_data || {}), version: w.version, status: w.status } : null, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processCreate(client, body, userId, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    const processName = body.processName || body.process_name || "New Process";
    const { data, error } = await client.database.from("workflows").insert([{ name: processName, status: "draft", user_id: userId }]).select();
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, data: { processId: data[0]?.id || "" }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processDelete(client, body, corsHeaders) {
    const processId = body.processId || body.process_id || body.robotId || "";
    if (!processId) return new Response(JSON.stringify({ code: 400, message: "processId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { error } = await client.database.from("workflows").delete().eq("id", processId);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processRename(client, body, corsHeaders) {
    const processId = body.processId || body.process_id || "";
    const processName = body.processName || body.process_name || "";
    if (!processId || !processName) return new Response(JSON.stringify({ code: 400, message: "processId and processName are required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { error } = await client.database.from("workflows").update({ name: processName, updated_at: new Date().toISOString() }).eq("id", processId);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function processCopy(client, body, corsHeaders) {
    const processId = body.processId || body.process_id || "";
    if (!processId) return new Response(JSON.stringify({ code: 400, message: "processId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data: original } = await client.database.from("workflows").select("*").eq("id", processId).limit(1);
    if (!original || original.length === 0) return new Response(JSON.stringify({ code: 404, message: "Process not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data, error } = await client.database.from("workflows").insert([{ name: original[0].name + " (Copy)", description: original[0].description, workflow_data: original[0].workflow_data, status: "draft", user_id: original[0].user_id }]).select();
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ code: 200, data: { processId: data[0]?.id || "" }, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function componentList(client, body, corsHeaders) {
    const { data, error } = await client.database.from("market_components").select("*").order("created_at", { ascending: false });
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const components = (data || []).map(function(c) { return { id: c.id, componentId: c.id, name: c.name, description: c.description, category: c.category, version: c.version, packageName: c.package_name, isPublic: c.is_public, downloadCount: c.download_count, createdAt: c.created_at }; });
    return new Response(JSON.stringify({ code: 200, data: components, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function componentInfo(client, body, corsHeaders) {
    const componentId = body.componentId || body.component_id || "";
    if (!componentId) return new Response(JSON.stringify({ code: 400, message: "componentId is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data, error } = await client.database.from("market_components").select("*").eq("id", componentId).limit(1);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const c = data && data.length > 0 ? data[0] : null;
    return new Response(JSON.stringify({ code: 200, data: c ? { id: c.id, componentId: c.id, name: c.name, description: c.description, category: c.category, version: c.version, packageName: c.package_name, isPublic: c.is_public, downloadCount: c.download_count, createdAt: c.created_at } : null, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function globalList(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    const { data, error } = await client.database.from("workflows").select("id, workflow_data").eq("id", robotId).limit(1);
    if (error) return new Response(JSON.stringify({ code: 500, message: error.message, data: [] }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const workflowData = data?.[0]?.workflow_data || {};
    return new Response(JSON.stringify({ code: 200, data: workflowData.global_variables || [], message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function globalCreate(client, body, userId, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    const variable = body.variable || body.param || {};
    const { data } = await client.database.from("workflows").select("workflow_data").eq("id", robotId).limit(1);
    const workflowData = data?.[0]?.workflow_data || {};
    const globalVars = workflowData.global_variables || [];
    globalVars.push({ ...variable, id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36)) });
    await client.database.from("workflows").update({ workflow_data: { ...workflowData, global_variables: globalVars }, updated_at: new Date().toISOString() }).eq("id", robotId);
    return new Response(JSON.stringify({ code: 200, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function globalSave(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    const variable = body.variable || body.param || {};
    const { data } = await client.database.from("workflows").select("workflow_data").eq("id", robotId).limit(1);
    const workflowData = data?.[0]?.workflow_data || {};
    const globalVars = workflowData.global_variables || [];
    const idx = globalVars.findIndex(function(v) { return v.id === variable.id; });
    if (idx >= 0) globalVars[idx] = { ...globalVars[idx], ...variable };
    await client.database.from("workflows").update({ workflow_data: { ...workflowData, global_variables: globalVars }, updated_at: new Date().toISOString() }).eq("id", robotId);
    return new Response(JSON.stringify({ code: 200, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  async function globalDelete(client, body, corsHeaders) {
    const robotId = body.robotId || body.robot_id || "";
    const globalId = body.globalId || body.global_id || "";
    const { data } = await client.database.from("workflows").select("workflow_data").eq("id", robotId).limit(1);
    const workflowData = data?.[0]?.workflow_data || {};
    const globalVars = (workflowData.global_variables || []).filter(function(v) { return v.id !== globalId; });
    await client.database.from("workflows").update({ workflow_data: { ...workflowData, global_variables: globalVars }, updated_at: new Date().toISOString() }).eq("id", robotId);
    return new Response(JSON.stringify({ code: 200, message: "success" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
}', 'active')
ON CONFLICT (slug) DO UPDATE SET code = EXCLUDED.code, status = 'active', updated_at = NOW();