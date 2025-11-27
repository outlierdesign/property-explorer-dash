-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('action-videos', 'action-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Action videos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'action-videos');

-- Create policy for authenticated uploads (admin)
CREATE POLICY "Authenticated users can upload action videos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'action-videos');

-- Add column for self-hosted video URL (direct MP4 link for download)
ALTER TABLE public.eco_actions
ADD COLUMN IF NOT EXISTS video_url_download text;