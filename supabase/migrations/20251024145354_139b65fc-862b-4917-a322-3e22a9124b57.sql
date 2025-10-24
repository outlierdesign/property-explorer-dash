-- Add video_url column to eco_actions table
ALTER TABLE public.eco_actions 
ADD COLUMN IF NOT EXISTS video_url TEXT;