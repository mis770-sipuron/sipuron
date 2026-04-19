-- ============================================
-- Leads Table — CRM for potential customers
-- ============================================

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'schooler'
    CHECK (source IN ('schooler', 'organic', 'whatsapp', 'referral', 'campaign', 'manual')),
  campaign TEXT,
  campaign_details JSONB DEFAULT '{}',
  schooler_student_id INT,
  schooler_courses JSONB DEFAULT '[]',
  join_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'lead'
    CHECK (status IN ('lead', 'contacted', 'trial', 'converted', 'churned', 'inactive')),
  notes TEXT,
  tags JSONB DEFAULT '[]',
  converted_profile_id UUID REFERENCES public.profiles(id),
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
ALTER TABLE public.leads ADD CONSTRAINT leads_schooler_student_id_unique UNIQUE (schooler_student_id);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_phone ON public.leads(phone);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_campaign ON public.leads(campaign);
CREATE INDEX idx_leads_source ON public.leads(source);
CREATE INDEX idx_leads_join_date ON public.leads(join_date DESC);

-- Auto-update updated_at
CREATE TRIGGER leads_updated BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
