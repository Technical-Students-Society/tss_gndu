-- TSS GNDU - Sample Seed Data

-- 1. Insert seed data into 'events'
INSERT INTO public.events (title, description, date, location, image_url, registration_link)
VALUES 
  ('Tech-Fest 2025', 'The annual flagship technical festival at GNDU, featuring hackathons, workshops, and competitions.', '2025-04-20', 'GNDU Main Campus', 'https://example.com/tech-fest.jpg', 'https://tech-fest.com/register'),
  ('UI/UX Workshop', 'A hands-on workshop covering modern design principles and tools like Figma.', '2025-05-15', 'Computer Science Dept.', 'https://example.com/ui-ux.jpg', 'https://workshop.com/register');

-- 2. Insert seed data into 'team'
INSERT INTO public.team (name, role, linkedin_url, github_url, bio)
VALUES 
  ('Sahildeep Singh', 'Core Lead', 'https://linkedin.com/in/sahil-deep', 'https://github.com/sahil-deep', 'Full-stack developer with a passion for web engineering.'),
  ('Kartikay Sharma', 'Technical Head', 'https://linkedin.com/in/kartikay-sharma', 'https://github.com/kartikay', 'Expert in scalable systems and competitive programming.');

-- 3. Insert seed data into 'gallery'
INSERT INTO public.gallery (image_url, caption)
VALUES 
  ('https://example.com/photo1.jpg', 'TSS Inauguration Ceremony 2024'),
  ('https://example.com/photo2.jpg', 'Winners of Hack-a-thon 2.0');
