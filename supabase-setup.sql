-- Recess Affiliate System - Supabase Table Setup
-- Run this SQL in your Supabase SQL Editor

-- Affiliate Payments Table
CREATE TABLE IF NOT EXISTS affiliate_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  skool_username TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('paypal', 'venmo', 'zelle')),
  payment_handle TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Sessions Table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_affiliate_payments_email ON affiliate_payments(email);
CREATE INDEX IF NOT EXISTS idx_affiliate_payments_created_at ON affiliate_payments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_created_at ON admin_sessions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE affiliate_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for affiliate_payments (service role can do everything)
CREATE POLICY "Service role can manage affiliate_payments"
  ON affiliate_payments
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Policies for admin_sessions (service role can do everything)
CREATE POLICY "Service role can manage admin_sessions"
  ON admin_sessions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Quiz Submissions
CREATE TABLE quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  track TEXT NOT NULL,
  archetype TEXT NOT NULL,
  archetype_name TEXT NOT NULL,
  bottleneck TEXT,
  recommended_tier TEXT,
  strike_zone TEXT,
  focus TEXT[],
  ignore_list TEXT,
  sixty_day_path TEXT,
  answers JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_submissions_email ON quiz_submissions(email);
CREATE INDEX idx_quiz_submissions_created_at ON quiz_submissions(created_at);
CREATE INDEX idx_quiz_submissions_archetype ON quiz_submissions(archetype);
CREATE INDEX idx_quiz_submissions_track ON quiz_submissions(track);

ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access quiz" ON quiz_submissions
  FOR ALL
  USING (auth.role() = 'service_role');