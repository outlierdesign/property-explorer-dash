import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EcoAction {
  title: string;
  slug: string;
  description?: string;
  payment_rate: number;
  payment_unit: string;
  category: string;
  image_url?: string;
  detail_url?: string;
}

const extractCategory = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('hedge')) return 'Hedges';
  if (lowerTitle.includes('woodland') || lowerTitle.includes('tree')) return 'Woodland';
  if (lowerTitle.includes('riparian')) return 'Riparian';
  if (lowerTitle.includes('bird') || lowerTitle.includes('owl') || lowerTitle.includes('swift') || lowerTitle.includes('swallow') || lowerTitle.includes('bat')) return 'Wildlife';
  if (lowerTitle.includes('orchard')) return 'Orchard';
  if (lowerTitle.includes('wetland') || lowerTitle.includes('wader')) return 'Wetland';
  if (lowerTitle.includes('fenc')) return 'Infrastructure';
  if (lowerTitle.includes('water') || lowerTitle.includes('pump') || lowerTitle.includes('trough')) return 'Water Management';
  if (lowerTitle.includes('stone')) return 'Heritage';
  if (lowerTitle.includes('cultural') || lowerTitle.includes('heritage')) return 'Heritage';
  if (lowerTitle.includes('stubble') || lowerTitle.includes('margin')) return 'Field Management';
  return 'Other';
};

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const parsePaymentRate = (rateStr: string): { rate: number; unit: string } => {
  // Extract number and unit from strings like "€5.41/ m" or "€133.71/ monument"
  const match = rateStr.match(/€([\d,]+\.?\d*)\s*\/\s*(.+)/);
  if (match) {
    const rate = parseFloat(match[1].replace(',', ''));
    const unit = match[2].trim();
    return { rate, unit };
  }
  return { rate: 0, unit: '' };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching ACRES Ireland actions page...');
    
    // Fetch the all-actions page
    const response = await fetch('https://acresireland.ie/all-actions/');
    const html = await response.text();
    
    console.log('Parsing actions from page...');
    
    // Parse the HTML to extract action data
    const actions: EcoAction[] = [];
    
    // Simple regex-based parsing of the structure we saw
    const actionPattern = /##\s+(NPI\s+[^\n]+)\s+Payment Rate:\s*\n\s*([^\n]+)\s+\[Discover More\]\(([^)]+)\)/g;
    const imagePattern = /!\[\]\(([^)]+)\)\s+##\s+(NPI\s+[^\n]+)/g;
    
    // First, collect images mapped to titles
    const imageMap = new Map<string, string>();
    let imageMatch;
    while ((imageMatch = imagePattern.exec(html)) !== null) {
      const imageUrl = imageMatch[1];
      const title = imageMatch[2];
      imageMap.set(title, imageUrl);
    }
    
    // Now parse actions
    let match;
    while ((match = actionPattern.exec(html)) !== null) {
      const title = match[1].trim();
      const paymentRateStr = match[2].trim();
      const detailUrl = match[3];
      
      const { rate, unit } = parsePaymentRate(paymentRateStr);
      const category = extractCategory(title);
      const slug = createSlug(title);
      const imageUrl = imageMap.get(title);
      
      actions.push({
        title,
        slug,
        payment_rate: rate,
        payment_unit: unit,
        category,
        image_url: imageUrl,
        detail_url: detailUrl,
      });
    }
    
    console.log(`Found ${actions.length} actions`);
    
    if (actions.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'No actions found. The page structure may have changed.',
          success: false 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Clear existing data
    console.log('Clearing existing actions...');
    const { error: deleteError } = await supabase
      .from('eco_actions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.error('Error clearing actions:', deleteError);
    }
    
    // Insert new actions
    console.log('Inserting new actions...');
    const { data, error: insertError } = await supabase
      .from('eco_actions')
      .insert(actions)
      .select();
    
    if (insertError) {
      console.error('Error inserting actions:', insertError);
      throw insertError;
    }
    
    console.log(`Successfully inserted ${data?.length || 0} actions`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        count: data?.length || 0,
        actions: data 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in populate-eco-actions function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
