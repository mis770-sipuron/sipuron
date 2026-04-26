-- Tracks which onboarding messages were sent to each subscriber.
-- Used by the state machine to avoid re-sending and to drive the sequence.

CREATE TABLE public.onboarding_events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  event       TEXT NOT NULL CHECK (event IN (
    'welcome',
    'checkin_day3',
    'social_proof_7',
    'pre_billing_3d',
    'dunning_1',
    'dunning_2',
    'dunning_final',
    'win_back'
  )),
  sent_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_onboarding_events_sub ON public.onboarding_events(subscription_id);
CREATE INDEX idx_onboarding_events_event ON public.onboarding_events(event);

-- Add payment_failed_at to subscriptions (for dunning sequence)
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS payment_failed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at      TIMESTAMPTZ;
