-- ============================================
-- Sipuron Database Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---- Profiles (extends auth.users) ----
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'subscriber' CHECK (role IN ('subscriber', 'admin')),
  cardcom_customer_id TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'free'
    CHECK (subscription_status IN ('free', 'trial', 'active', 'cancelled', 'failed', 'expired')),
  sector TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Children ----
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hebrew_birthday TEXT,
  hebrew_birthday_day INT,
  hebrew_birthday_month INT,
  gregorian_birthday DATE,
  age_group TEXT CHECK (age_group IN ('2-4', '4-6', '6-8', '8-10', '10-13')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Plans ----
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price_monthly NUMERIC(10,2) NOT NULL,
  price_total NUMERIC(10,2) NOT NULL,
  billing_period TEXT NOT NULL CHECK (billing_period IN ('monthly', 'quarterly', 'annual')),
  features JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Subscriptions ----
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'cancelled', 'failed', 'expired', 'trial')),
  cardcom_token TEXT,
  cardcom_transaction_id TEXT,
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ,
  next_billing_date TIMESTAMPTZ,
  cancel_reason TEXT,
  amount NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Stories ----
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  audio_url TEXT,
  duration_seconds INT NOT NULL DEFAULT 0,
  narrator TEXT NOT NULL DEFAULT 'מנחם שרון',
  age_min INT NOT NULL DEFAULT 2,
  age_max INT NOT NULL DEFAULT 13,
  is_premium BOOLEAN NOT NULL DEFAULT true,
  cover_image_url TEXT,
  sort_order INT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Story Categories ----
CREATE TABLE public.story_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('topic', 'character', 'series', 'holiday', 'parasha')),
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES public.story_categories(id),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Story <-> Category M2M ----
CREATE TABLE public.story_category_map (
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.story_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (story_id, category_id)
);

-- ---- Listening History ----
CREATE TABLE public.listening_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  progress_seconds INT NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  last_played_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, story_id)
);

-- ---- Payments ----
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id),
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'refunded', 'pending')),
  cardcom_transaction_id TEXT,
  cardcom_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Projects (Roadmap) ----
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'in_progress', 'completed', 'on_hold')),
  progress_percent INT NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  department TEXT,
  owner_vp TEXT,
  start_date DATE,
  target_date DATE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Project Milestones ----
CREATE TABLE public.project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed')),
  due_date DATE,
  completed_at TIMESTAMPTZ,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Campaigns ----
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  hero_image_url TEXT,
  price_first_month NUMERIC(10,2) DEFAULT 5,
  regular_price NUMERIC(10,2) DEFAULT 49.90,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT false,
  spots_total INT,
  spots_remaining INT,
  cta_text TEXT DEFAULT 'להתחיל ב-₪5 עכשיו',
  features JSONB DEFAULT '[]',
  testimonials JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Short Links ----
CREATE TABLE public.short_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  title TEXT,
  tags JSONB DEFAULT '[]',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  click_count INT NOT NULL DEFAULT 0,
  unique_click_count INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Link Clicks ----
CREATE TABLE public.link_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_id UUID NOT NULL REFERENCES public.short_links(id) ON DELETE CASCADE,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_hash TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  referer TEXT,
  session_id TEXT,
  user_id UUID REFERENCES public.profiles(id)
);

-- ---- Page Views ----
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  session_id TEXT,
  user_id UUID REFERENCES public.profiles(id),
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  entered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  left_at TIMESTAMPTZ,
  time_on_page_seconds INT
);

-- ---- Broadcasts ----
CREATE TABLE public.broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  media_url TEXT,
  media_type TEXT,
  channel TEXT CHECK (channel IN ('green', 'cloud', 'both')),
  target_audience JSONB,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),
  total_recipients INT DEFAULT 0,
  delivered INT DEFAULT 0,
  failed INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Bot Flows ----
CREATE TABLE public.bot_flows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  trigger_value TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  flow_definition JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- WhatsApp Groups ----
CREATE TABLE public.whatsapp_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  group_id TEXT,
  invite_link TEXT,
  member_count INT NOT NULL DEFAULT 0,
  max_capacity INT NOT NULL DEFAULT 2000,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'full', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Contacts ----
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT NOT NULL,
  name TEXT,
  email TEXT,
  source TEXT DEFAULT 'import',
  tags JSONB DEFAULT '[]',
  engagement_score INT DEFAULT 0,
  last_message_at TIMESTAMPTZ,
  user_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---- Department KPIs ----
CREATE TABLE public.department_kpis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department TEXT NOT NULL,
  kpi_name TEXT NOT NULL,
  kpi_value NUMERIC(12,2),
  kpi_target NUMERIC(12,2),
  period TEXT DEFAULT 'monthly',
  measured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_stories_published ON public.stories(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX idx_stories_premium ON public.stories(is_premium);
CREATE INDEX idx_stories_status ON public.stories(status);
CREATE INDEX idx_story_category_map_category ON public.story_category_map(category_id);
CREATE INDEX idx_listening_history_user ON public.listening_history(user_id);
CREATE INDEX idx_listening_history_last ON public.listening_history(last_played_at DESC);
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_payments_user ON public.payments(user_id);
CREATE INDEX idx_payments_created ON public.payments(created_at DESC);
CREATE INDEX idx_children_user ON public.children(user_id);
CREATE INDEX idx_profiles_status ON public.profiles(subscription_status);
CREATE INDEX idx_profiles_phone ON public.profiles(phone);
CREATE INDEX idx_short_links_slug ON public.short_links(slug);
CREATE INDEX idx_link_clicks_link ON public.link_clicks(link_id);
CREATE INDEX idx_link_clicks_time ON public.link_clicks(clicked_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views(path);
CREATE INDEX idx_page_views_time ON public.page_views(entered_at DESC);
CREATE INDEX idx_contacts_phone ON public.contacts(phone);
CREATE INDEX idx_broadcasts_status ON public.broadcasts(status);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER stories_updated BEFORE UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER short_links_updated BEFORE UPDATE ON public.short_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER campaigns_updated BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    NEW.phone
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
