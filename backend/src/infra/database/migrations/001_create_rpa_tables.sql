-- 001_create_rpa_tables.sql
-- RPA business tables for AstronRPA on InsForge (PostgreSQL)
-- Place this file in the InsForge source repo:
--   backend/src/infra/database/migrations/

-- ============================================================
-- 1. Robots (Agent) Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.robots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    agent_key VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'offline',
    host_name VARCHAR(255),
    ip_address VARCHAR(45),
    os_version VARCHAR(100),
    version VARCHAR(50),
    last_heartbeat TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- 2. Projects Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- 3. Workflows Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_id UUID REFERENCES public.projects(id),
    workflow_data JSONB,
    version INTEGER DEFAULT 1,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- 4. Tasks Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    workflow_id UUID REFERENCES public.workflows(id),
    robot_id UUID REFERENCES public.robots(id),
    trigger_type VARCHAR(50) DEFAULT 'manual',
    cron_expression VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    priority INTEGER DEFAULT 0,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- 5. Executions Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES public.tasks(id),
    robot_id UUID REFERENCES public.robots(id),
    workflow_id UUID REFERENCES public.workflows(id),
    status VARCHAR(50) DEFAULT 'running',
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    duration_ms INTEGER,
    result JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- 6. Execution Logs Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES public.executions(id),
    level VARCHAR(20) DEFAULT 'info',
    message TEXT,
    component_name VARCHAR(100),
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. Market Components Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.market_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    version VARCHAR(50),
    package_name VARCHAR(255),
    is_public BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- 8. Triggers Table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.triggers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    config JSONB,
    task_id UUID REFERENCES public.tasks(id),
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);

-- ============================================================
-- RLS (Row Level Security) Policies
-- ============================================================
ALTER TABLE public.robots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triggers ENABLE ROW LEVEL SECURITY;

-- Generic RLS: user can only see their own data
CREATE POLICY "Users can only access their own robots" ON public.robots
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own projects" ON public.projects
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own workflows" ON public.workflows
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own tasks" ON public.tasks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own executions" ON public.executions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own logs" ON public.execution_logs
    FOR ALL USING (auth.uid() = (
        SELECT user_id FROM public.executions WHERE id = execution_id
    ));

CREATE POLICY "Users can only access their own triggers" ON public.triggers
    FOR ALL USING (auth.uid() = user_id);

-- Market components: public data is viewable by all authenticated users
CREATE POLICY "Public components are viewable by all" ON public.market_components
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage their own components" ON public.market_components
    FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Realtime Notification Trigger (PostgreSQL LISTEN/NOTIFY)
-- ============================================================
CREATE OR REPLACE FUNCTION public.notify_execution_change()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('realtime_message', json_build_object(
        'table', TG_TABLE_NAME,
        'schema', TG_TABLE_SCHEMA,
        'event', TG_OP,
        'id', NEW.id
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER execution_change_trigger
    AFTER INSERT OR UPDATE ON public.executions
    FOR EACH ROW EXECUTE FUNCTION public.notify_execution_change();

-- ============================================================
-- Indexes for common queries
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_robots_user_id ON public.robots(user_id);
CREATE INDEX IF NOT EXISTS idx_robots_agent_key ON public.robots(agent_key);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_project_id ON public.workflows(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_robot_id ON public.tasks(robot_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_executions_task_id ON public.executions(task_id);
CREATE INDEX IF NOT EXISTS idx_executions_robot_id ON public.executions(robot_id);
CREATE INDEX IF NOT EXISTS idx_execution_logs_execution_id ON public.execution_logs(execution_id);
CREATE INDEX IF NOT EXISTS idx_market_components_category ON public.market_components(category);
CREATE INDEX IF NOT EXISTS idx_triggers_task_id ON public.triggers(task_id);