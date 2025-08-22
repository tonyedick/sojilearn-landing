/*
# Create leads table for Sojilearn landing page

1. New Tables
  - `leads` - Stores lead information from the multi-step form
    - Personal information (name, email, phone)
    - Education background and preferences
    - Timeline and budget information
    - Metadata for tracking

2. Security
  - Enable RLS on `leads` table
  - Add policy for anonymous form submissions
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  current_level text NOT NULL,
  institution text,
  graduation_year text NOT NULL,
  preferred_program text NOT NULL,
  field_of_study text NOT NULL,
  preferred_universities text,
  intended_start_date text NOT NULL,
  has_passport boolean DEFAULT false,
  previous_applications boolean DEFAULT false,
  budget_range text NOT NULL,
  additional_questions text,
  source text DEFAULT 'landing_page',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the contact form)
CREATE POLICY "Allow anonymous form submissions"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Allow reading own submissions if you implement user auth later
CREATE POLICY "Users can read own submissions"
  ON leads
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);