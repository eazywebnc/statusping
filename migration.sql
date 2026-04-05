-- StatusPing Database Migration
-- Tables use sp_ prefix, with RLS enabled

-- ============================================================
-- MONITORS
-- ============================================================
CREATE TABLE IF NOT EXISTS sp_monitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  method TEXT NOT NULL DEFAULT 'GET',
  interval_seconds INTEGER NOT NULL DEFAULT 300,
  timeout_ms INTEGER NOT NULL DEFAULT 10000,
  expected_status INTEGER DEFAULT 200,
  headers JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_checked_at TIMESTAMPTZ,
  last_status TEXT DEFAULT 'unknown', -- 'up', 'down', 'degraded', 'unknown'
  last_response_time_ms INTEGER,
  uptime_percentage NUMERIC(5,2) DEFAULT 100.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sp_monitors_user_id ON sp_monitors(user_id);
CREATE INDEX idx_sp_monitors_is_active ON sp_monitors(is_active);
CREATE INDEX idx_sp_monitors_last_checked ON sp_monitors(last_checked_at);

ALTER TABLE sp_monitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own monitors"
  ON sp_monitors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own monitors"
  ON sp_monitors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own monitors"
  ON sp_monitors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own monitors"
  ON sp_monitors FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- INCIDENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS sp_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monitor_id UUID NOT NULL REFERENCES sp_monitors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'investigating', -- 'investigating', 'identified', 'monitoring', 'resolved'
  severity TEXT NOT NULL DEFAULT 'minor', -- 'minor', 'major', 'critical'
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sp_incidents_monitor_id ON sp_incidents(monitor_id);
CREATE INDEX idx_sp_incidents_user_id ON sp_incidents(user_id);
CREATE INDEX idx_sp_incidents_status ON sp_incidents(status);
CREATE INDEX idx_sp_incidents_started_at ON sp_incidents(started_at DESC);

ALTER TABLE sp_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own incidents"
  ON sp_incidents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own incidents"
  ON sp_incidents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own incidents"
  ON sp_incidents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own incidents"
  ON sp_incidents FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- STATUS PAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS sp_status_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  custom_domain TEXT,
  theme JSONB DEFAULT '{"primaryColor": "#06b6d4", "darkMode": true}',
  monitor_ids UUID[] DEFAULT '{}',
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sp_status_pages_user_id ON sp_status_pages(user_id);
CREATE INDEX idx_sp_status_pages_slug ON sp_status_pages(slug);
CREATE INDEX idx_sp_status_pages_custom_domain ON sp_status_pages(custom_domain);

ALTER TABLE sp_status_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own status pages"
  ON sp_status_pages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public status pages are viewable by all"
  ON sp_status_pages FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can insert their own status pages"
  ON sp_status_pages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own status pages"
  ON sp_status_pages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own status pages"
  ON sp_status_pages FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS sp_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status_page_id UUID NOT NULL REFERENCES sp_status_pages(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  notification_type TEXT NOT NULL DEFAULT 'email', -- 'email', 'sms', 'webhook'
  webhook_url TEXT,
  is_confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sp_subscribers_status_page_id ON sp_subscribers(status_page_id);
CREATE INDEX idx_sp_subscribers_email ON sp_subscribers(email);

ALTER TABLE sp_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Status page owners can view subscribers"
  ON sp_subscribers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sp_status_pages
      WHERE sp_status_pages.id = sp_subscribers.status_page_id
      AND sp_status_pages.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can subscribe"
  ON sp_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Status page owners can delete subscribers"
  ON sp_subscribers FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM sp_status_pages
      WHERE sp_status_pages.id = sp_subscribers.status_page_id
      AND sp_status_pages.user_id = auth.uid()
    )
  );

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS sp_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'pro', 'business'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  notification_email TEXT,
  notification_phone TEXT,
  notification_webhook TEXT,
  timezone TEXT DEFAULT 'Pacific/Noumea',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sp_settings_user_id ON sp_settings(user_id);
CREATE INDEX idx_sp_settings_stripe_customer ON sp_settings(stripe_customer_id);

ALTER TABLE sp_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings"
  ON sp_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON sp_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON sp_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTION: Auto-create settings on user signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.sp_settings (user_id, plan)
  VALUES (NEW.id, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FUNCTION: Updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sp_monitors_updated_at
  BEFORE UPDATE ON sp_monitors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_sp_incidents_updated_at
  BEFORE UPDATE ON sp_incidents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_sp_status_pages_updated_at
  BEFORE UPDATE ON sp_status_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_sp_settings_updated_at
  BEFORE UPDATE ON sp_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
