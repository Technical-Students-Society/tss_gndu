-- TSS GNDU - Initial Database Schema

-- 1. Create 'events' table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  title TEXT NOT NULL,
  caption TEXT,
  description TEXT,
  thumbnail TEXT,
  location TEXT,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  reg_link TEXT,

  image_set TEXT[],           -- array of URL strings
  winners JSONB DEFAULT '[]', -- array of JSON objects: [{ name, position }]
  organizers JSONB DEFAULT '[]',
  volunteers JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create 'team_members' table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  team_group TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,

  batch TEXT,

  linkedin_url TEXT,
  github_url TEXT,
  instagram_url TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
 
);

-- 3. Create 'settings' table
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY,
  maintenance_enabled BOOLEAN DEFAULT false NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow anyone to read data)
CREATE POLICY "Allow public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access for team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access for settings" ON public.settings FOR SELECT USING (true);

-- Note: In a production app, you would add policies to allow only authenticated 
-- users with 'admin' role to INSERT, UPDATE, and DELETE data.


-- 4. Create 'certificates' table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cert_number TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_email TEXT,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  certificate_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_revoked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create Policies for certificates
CREATE POLICY "Allow public read access for certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert certificates" ON public.certificates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update certificates" ON public.certificates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete certificates" ON public.certificates FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Create 'announcements' table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  thumbnail TEXT,
  type TEXT NOT NULL DEFAULT 'info',
  link TEXT,
  is_active BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create Policies for announcements
CREATE POLICY "Allow public read access for announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage announcements" ON public.announcements FOR ALL USING (auth.role() = 'authenticated');
