-- Create function to update timestamps if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create eco_actions table to store NPIs (Non-Productive Investments)
CREATE TABLE public.eco_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  payment_rate DECIMAL(10, 2),
  payment_unit TEXT,
  category TEXT,
  image_url TEXT,
  detail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better search performance
CREATE INDEX idx_eco_actions_category ON public.eco_actions(category);
CREATE INDEX idx_eco_actions_title ON public.eco_actions USING gin(to_tsvector('english', title));
CREATE INDEX idx_eco_actions_description ON public.eco_actions USING gin(to_tsvector('english', description));

-- Enable Row Level Security
ALTER TABLE public.eco_actions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since this is public information)
CREATE POLICY "Eco actions are viewable by everyone" 
ON public.eco_actions 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_eco_actions_updated_at
BEFORE UPDATE ON public.eco_actions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();