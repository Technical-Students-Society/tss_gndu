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

-- Enable Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow anyone to read data)
CREATE POLICY "Allow public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access for team" ON public.team_members FOR SELECT USING (true);

-- Note: In a production app, you would add policies to allow only authenticated 
-- users with 'admin' role to INSERT, UPDATE, and DELETE data.