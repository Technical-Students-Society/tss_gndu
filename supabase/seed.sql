-- TSS GNDU - Sample Seed Data

-- 1. Insert seed data into 'events'
INSERT INTO public.events (title, description, start_at, location, thumbnail, reg_link, image_set, winners, organizers)
VALUES 
  (
    'Tech-Fest 2025', 
    'The annual flagship technical festival at GNDU, featuring hackathons, workshops, and competitions.', 
    '2025-04-20 10:00:00+05:30', 
    'GNDU Main Campus', 
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87', 
    'https://tech-fest.com/register',
    ARRAY['https://images.unsplash.com/photo-1540575467063-178a50c2df87', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'],
    '[{"name": "Team Alpha", "position": "1st"}, {"name": "Team Beta", "position": "2nd"}]',
    '[{"name": "Sahildeep Singh", "role": "Lead"}, {"name": "Kartikay Sharma", "role": "Tech Head"}]'
  ),
  (
    'UI/UX Workshop', 
    'A hands-on workshop covering modern design principles and tools like Figma.', 
    '2025-05-15 14:00:00+05:30', 
    'Computer Science Dept.', 
    'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c', 
    'https://workshop.com/register',
    ARRAY['https://images.unsplash.com/photo-1586717791821-3f44a563dc4c'],
    '[]',
    '[{"name": "Jane Doe", "role": "Speaker"}]'
  );

-- 2. Insert seed data into 'team_members'
INSERT INTO public.team_members (name, role, team_group, batch, linkedin_url, github_url, avatar_url)
VALUES 
  ('Sahildeep Singh', 'Core Lead', 'Executives', '2025-2026', 'https://linkedin.com/in/sahil-deep', 'https://github.com/sahil-deep', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil'),
  ('Kartikay Sharma', 'Technical Head', 'Technical', '2025-2026', 'https://linkedin.com/in/kartikay-sharma', 'https://github.com/kartikay', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kartikay');

-- 3. Insert seed data into 'settings'
INSERT INTO public.settings (id, maintenance_enabled)
VALUES ('maintenance_mode', false)
ON CONFLICT (id) DO NOTHING;
