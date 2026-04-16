-- New table for raw Cardcom transactions (no auth dependency)
CREATE TABLE IF NOT EXISTS public.cardcom_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id INT NOT NULL UNIQUE,
  amount NUMERIC(10,2) NOT NULL,
  card_owner_name TEXT,
  last4_digits TEXT,
  transaction_date TEXT,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'refunded')),
  status_code INT,
  status_description TEXT,
  num_of_payments INT DEFAULT 1,
  first_payment_amount NUMERIC(10,2),
  rest_payments_amount NUMERIC(10,2),
  currency TEXT DEFAULT 'ILS',
  invoice_number TEXT,
  failure_reason TEXT,
  raw_response JSONB,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cardcom_tx_date ON public.cardcom_transactions(synced_at DESC);
CREATE INDEX IF NOT EXISTS idx_cardcom_tx_status ON public.cardcom_transactions(status);

-- Add previous_member_count to whatsapp_groups for growth tracking
ALTER TABLE public.whatsapp_groups ADD COLUMN IF NOT EXISTS previous_member_count INT DEFAULT 0;
