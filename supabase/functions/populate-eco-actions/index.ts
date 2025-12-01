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
  type: string;
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
    
    // Match heading patterns with more flexibility
    // Looking for h2/h3 tags with "NPI" in them
    const headingPattern = /<h[23][^>]*>(NPI[^<]+)<\/h[23]>/gi;
    const linkPattern = /<a[^>]+href="([^"]+)"[^>]*>Discover More<\/a>/gi;
    const imagePattern = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    
    // Extract all headings
    const headings: string[] = [];
    let headingMatch;
    while ((headingMatch = headingPattern.exec(html)) !== null) {
      headings.push(headingMatch[1].trim());
    }
    
    // Extract all links - more flexible pattern
    const links: string[] = [];
    const linkPattern2 = /href="(https:\/\/acresireland\.ie\/action-projects\/[^"]+)"/gi;
    let linkMatch;
    while ((linkMatch = linkPattern2.exec(html)) !== null) {
      links.push(linkMatch[1]);
    }
    
    // Extract all images
    const images: string[] = [];
    let imageMatch;
    while ((imageMatch = imagePattern.exec(html)) !== null) {
      const src = imageMatch[1];
      // Only include actual images, not icons/placeholders
      if (src.includes('wp-content/uploads')) {
        images.push(src);
      }
    }
    
    console.log(`Found ${headings.length} headings, ${links.length} links, ${images.length} images`);
    
    // Try to extract payment rates - more flexible pattern
    // Looking for Euro amounts with forward slash
    const paymentPattern2 = /€[\d,]+\.?\d*\s*\/\s*[a-zA-Z\s]+/gi;
    const paymentRates: string[] = [];
    let paymentMatch;
    while ((paymentMatch = paymentPattern2.exec(html)) !== null) {
      paymentRates.push(paymentMatch[0].trim());
    }
    
    console.log(`Found ${paymentRates.length} payment rates`);
    
    // Match them up (assuming they appear in same order)
    const minLength = Math.min(headings.length, paymentRates.length, links.length);
    
    for (let i = 0; i < minLength; i++) {
      const title = headings[i];
      const paymentRateStr = paymentRates[i];
      const detailUrl = links[i];
      const imageUrl = i < images.length ? images[i] : undefined;
      
      const { rate, unit } = parsePaymentRate(paymentRateStr);
      const category = extractCategory(title);
      const slug = createSlug(title);
      
      actions.push({
        title,
        slug,
        payment_rate: rate,
        payment_unit: unit,
        category,
        image_url: imageUrl,
        detail_url: detailUrl,
        type: 'NPI',
      });
    }
    
    console.log(`Created ${actions.length} actions`);
    
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
    
    // Never delete actions - only insert new ones that don't exist
    console.log('Checking for existing actions...');
    
    // Get existing action titles to avoid duplicates
    const { data: existingActions } = await supabase
      .from('eco_actions')
      .select('title')
      .eq('type', 'NPI');
    
    const existingTitles = new Set(existingActions?.map(a => a.title) || []);
    
    // Filter out actions that already exist
    const newActions = actions.filter(action => !existingTitles.has(action.title));
    
    console.log(`Found ${newActions.length} new actions to add (${actions.length - newActions.length} already exist)`);
    
    // Insert only new actions
    if (newActions.length === 0) {
      console.log('No new actions to insert');
      return new Response(
        JSON.stringify({ 
          success: true, 
          count: 0,
          message: 'All actions already exist in database'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log('Inserting new actions...');
    const { data, error: insertError } = await supabase
      .from('eco_actions')
      .insert(newActions)
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
