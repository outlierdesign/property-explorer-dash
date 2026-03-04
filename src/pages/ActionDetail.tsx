import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Play, Film, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { VideoModal } from "@/components/VideoModal";
import { getVideosForAction, type Video } from "@/data/videoData";
import { getResourceForAction } from "@/data/resourceData";
import { getActionHeroImage } from "@/data/actionImageData";

// Import LA placeholder images
import laCorncrakeHabitat from "@/assets/la-corncrake-habitat.jpg";
import laFarmInfrastructure from "@/assets/la-farm-infrastructure.jpg";
import laHeritageInfrastructure from "@/assets/la-heritage-infrastructure.jpg";
import laInvasiveRemoval from "@/assets/la-invasive-removal.jpg";
import laPredatorFence from "@/assets/la-predator-fence.jpg";
import laRiparianPlanting from "@/assets/la-riparian-planting.jpg";
import laScrubManagement from "@/assets/la-scrub-management.jpg";
import laWaterManagement from "@/assets/la-water-management.jpg";
import laWetlandHabitat from "@/assets/la-wetland-habitat.jpg";
import laWildlifePond from "@/assets/la-wildlife-pond.jpg";

// Map action slugs to their corresponding images
const laImageMap: Record<string, string> = {
  "la-corncrake-habitat-management": laCorncrakeHabitat,
  "la-farm-infrastructure-biodiversity": laFarmInfrastructure,
  "la-heritage-infrastructure-conservation": laHeritageInfrastructure,
  "la-invasive-species-removal": laInvasiveRemoval,
  "la-predator-proof-fencing": laPredatorFence,
  "la-riparian-zone-planting": laRiparianPlanting,
  "la-scrub-management-wildlife": laScrubManagement,
  "la-water-management-systems": laWaterManagement,
  "la-wetland-habitat-creation": laWetlandHabitat,
  "la-wildlife-pond-construction": laWildlifePond,
};

interface EcoAction {
  id: string;
  title: string;
  slug: string;
  description?: string;
  payment_rate: number;
  payment_unit: string;
  category: string;
  image_url?: string;
  detail_url?: string;
  type?: string;
  video_url?: string;
}

const ActionDetail = () => {
  const { slug } = useParams();
  const [action, setAction] = useState<EcoAction | null>(null);
  const [relatedActions, setRelatedActions] = useState<EcoAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Get matched videos, resource and hero image for this action
  const matchedVideos = slug ? getVideosForAction(slug) : [];
  const matchedResource = slug ? getResourceForAction(slug) : undefined;
  const heroImage = slug ? getActionHeroImage(slug) : undefined;

  useEffect(() => {
    const fetchAction = async () => {
      setLoading(true);
      
      // Fetch the main action
      const { data: actionData, error } = await supabase
        .from("eco_actions")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching action:", error);
        setLoading(false);
        return;
      }

      setAction(actionData);

      // Fetch related actions from the same category
      if (actionData?.category) {
        const { data: relatedData } = await supabase
          .from("eco_actions")
          .select("*")
          .eq("category", actionData.category)
          .neq("id", actionData.id)
          .limit(4);

        setRelatedActions(relatedData || []);
      }

      setLoading(false);
    };

    if (slug) {
      fetchAction();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-32 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!action) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Action Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Back Button */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Actions
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Title & Category */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
                    {action.category}
                  </Badge>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {action.title}
                  </h1>
                  
                  {/* Payment Rate - Prominent Display */}
                  <div className="flex items-baseline gap-2 text-primary">
                    <span className="text-4xl md:text-5xl font-bold">
                      €{action.payment_rate.toFixed(2)}
                    </span>
                    <span className="text-xl text-muted-foreground">
                      per {action.payment_unit}
                    </span>
                  </div>
                </div>
                
                {/* Favorite Button */}
                <FavoriteButton 
                  action={{
                    id: action.id,
                    title: action.title,
                    slug: action.slug,
                    description: action.description || null,
                    category: action.category,
                    payment_rate: action.payment_rate,
                    payment_unit: action.payment_unit,
                    image_url: action.image_url || null,
                    video_url: action.video_url || null,
                    detail_url: action.detail_url || null,
                    type: action.type || 'NPI'
                  }}
                  className="shrink-0"
                />
              </div>
            </div>

            {/* Hero Image / Video Section - Full Width */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/20 to-secondary/20">
                {action.video_url ? (
                  <iframe
                    src={action.video_url}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={action.title}
                  />
                ) : heroImage ? (
                  <img
                    src={heroImage}
                    alt={action.title}
                    className="w-full h-full object-cover"
                  />
                ) : (action.type === "LA" && laImageMap[action.slug]) || action.image_url ? (
                  <img
                    src={action.type === "LA" && laImageMap[action.slug] ? laImageMap[action.slug] : action.image_url!}
                    alt={action.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Play className="h-20 w-20 mb-4 text-muted-foreground" />
                    <p className="text-lg text-muted-foreground">Video content coming soon</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Cards - Clean Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-8 border-2 hover:border-primary/50 transition-colors">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-3 font-medium">
                  Class of Action
                </p>
                <p className="text-xl font-semibold">Non-Productive Investment</p>
              </Card>
              
              <Card className="p-8 border-2 hover:border-primary/50 transition-colors">
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-3 font-medium">
                  Commitment Period
                </p>
                <p className="text-xl font-semibold">5 Years</p>
              </Card>
            </div>

            {/* Notice Banner - Subtle */}
            {action.detail_url && (
              <div className="bg-muted/50 border border-border rounded-xl p-6">
                <p className="text-sm leading-relaxed">
                  <strong className="font-semibold">Official Specifications:</strong> For the most up-to-date details, 
                  visit the{" "}
                  <a 
                    href={action.detail_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    ACRES/ACRE website
                  </a>
                  {" "}under Non-Productive Investments.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">What You Need to Know</h2>
            
            <Tabs defaultValue="objectives" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-10 h-auto p-1 bg-background border border-border">
                <TabsTrigger value="objectives" className="text-sm md:text-base py-3">Objectives</TabsTrigger>
                <TabsTrigger value="involved" className="text-sm md:text-base py-3">What's Involved</TabsTrigger>
                <TabsTrigger value="implementation" className="text-sm md:text-base py-3">Implementation</TabsTrigger>
                <TabsTrigger value="faq" className="text-sm md:text-base py-3">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="objectives" className="space-y-6">
                <Card className="p-8 md:p-10 border-none shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">{action.title}</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                      {action.description || "Enhancing field boundaries for biodiversity and landscape connectivity, blocks flow pathways from Critical Source Areas to Watercourses."}
                    </p>
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold mb-4">Key Benefits</h4>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">Establish permanent vegetative cover to protect soil and water</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">Create wildlife corridors and habitat connectivity</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">Reduce agricultural runoff and improve water quality</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">Support pollinators and beneficial insects</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">Enhance carbon sequestration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="involved" className="space-y-6">
                <Card className="p-8 md:p-10 border-none shadow-lg">
                  <h3 className="text-2xl font-bold mb-8">Implementation Requirements</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-semibold text-lg mb-2">Site Selection</h4>
                      <p className="text-muted-foreground leading-relaxed">Identify suitable locations based on soil type, exposure, and existing vegetation</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-semibold text-lg mb-2">Plant Species</h4>
                      <p className="text-muted-foreground leading-relaxed">Use native species appropriate to your region and soil conditions</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-semibold text-lg mb-2">Planting Season</h4>
                      <p className="text-muted-foreground leading-relaxed">Typically November to March during dormant season</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-semibold text-lg mb-2">Spacing</h4>
                      <p className="text-muted-foreground leading-relaxed">Follow recommended spacing guidelines for chosen species</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-semibold text-lg mb-2">Protection</h4>
                      <p className="text-muted-foreground leading-relaxed">Install guards or fencing to protect young plants from livestock and wildlife</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-semibold text-lg mb-2">Maintenance</h4>
                      <p className="text-muted-foreground leading-relaxed">Regular weeding, watering during establishment, and annual trimming once established</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="implementation" className="space-y-6">
                <Card className="p-8 md:p-10 border-none shadow-lg">
                  <h3 className="text-2xl font-bold mb-8">Best Practices & Expert Advice</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-3">Preparation</h4>
                        <p className="text-muted-foreground leading-relaxed">Clear the planting area of weeds and existing vegetation. Consider soil testing to ensure appropriate conditions.</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-3">Planting Technique</h4>
                        <p className="text-muted-foreground leading-relaxed">Use appropriate planting methods (notch, pit, or auger) based on plant size and soil conditions. Ensure firm planting to prevent frost lift.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-3">Aftercare</h4>
                        <p className="text-muted-foreground leading-relaxed">Monitor establishment regularly. Replace failures within the first year. Control competing vegetation for at least 3 years.</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-3">Long-term Management</h4>
                        <p className="text-muted-foreground leading-relaxed">Establish a trimming schedule once mature. Maintain buffer strips to reduce spray drift. Monitor for pests and diseases.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <Card className="p-8 md:p-10 border-none shadow-lg">
                  <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
                  <div className="space-y-8">
                    <div className="pb-6 border-b border-border">
                      <h4 className="font-semibold text-lg mb-3">When will I receive payment?</h4>
                      <p className="text-muted-foreground leading-relaxed">Payments are typically made annually following successful inspection and verification of work completed.</p>
                    </div>
                    <div className="pb-6 border-b border-border">
                      <h4 className="font-semibold text-lg mb-3">Can I choose my own plant species?</h4>
                      <p className="text-muted-foreground leading-relaxed">Species must be from the approved list of native varieties suitable for your region. Your advisor can help with species selection.</p>
                    </div>
                    <div className="pb-6 border-b border-border">
                      <h4 className="font-semibold text-lg mb-3">What if some plants don't survive?</h4>
                      <p className="text-muted-foreground leading-relaxed">A survival rate of 80% or higher is typically required. Failed plants should be replaced during the next planting season.</p>
                    </div>
                    <div className="pb-6 border-b border-border">
                      <h4 className="font-semibold text-lg mb-3">Do I need planning permission?</h4>
                      <p className="text-muted-foreground leading-relaxed">Generally not required for standard planting, but check with your local authority for any specific restrictions in your area.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3">How long is the commitment period?</h4>
                      <p className="text-muted-foreground leading-relaxed">The commitment period is typically 5 years, during which time the established vegetation must be maintained according to scheme requirements.</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Videos Section */}
      {matchedVideos.length > 0 && (
        <section className="py-12 bg-muted/20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                <Film className="h-6 w-6 text-primary" />
                Related Videos
              </h2>
              <p className="text-muted-foreground mb-8">Watch videos related to this action</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group cursor-pointer rounded-xl overflow-hidden border bg-background hover:shadow-lg transition-all"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative aspect-video bg-muted">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-7 h-7 text-primary ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NPI Resource Download */}
      {matchedResource && (
        <section className="py-8 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 p-6 rounded-xl border bg-primary/5">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{matchedResource.title}</h3>
                  <p className="text-sm text-muted-foreground">NPI Resource Guide (PDF)</p>
                </div>
                <a
                  href={matchedResource.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.embedUrl}
          title={selectedVideo.title}
        />
      )}

      {/* Related Actions */}
      {relatedActions.length > 0 && (
        <section className="py-16 md:py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complementary Actions</h2>
              <p className="text-muted-foreground text-lg mb-12">Consider these related NPIs to maximize your impact</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedActions.map((relatedAction) => (
                  <Link to={`/action/${relatedAction.slug}`} key={relatedAction.id} className="group">
                    <Card className="overflow-hidden h-full border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                        {getActionHeroImage(relatedAction.slug) ? (
                          <img
                            src={getActionHeroImage(relatedAction.slug)}
                            alt={relatedAction.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        ) : (relatedAction.type === "LA" && laImageMap[relatedAction.slug]) || relatedAction.image_url ? (
                          <img
                            src={relatedAction.type === "LA" && laImageMap[relatedAction.slug] ? laImageMap[relatedAction.slug] : relatedAction.image_url!}
                            alt={relatedAction.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Play className="h-12 w-12 text-muted-foreground group-hover:scale-110 transition-transform" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-base mb-3 line-clamp-2 min-h-[3rem] leading-snug group-hover:text-primary transition-colors">
                          {relatedAction.title}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl font-bold text-primary">
                            €{relatedAction.payment_rate.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /{relatedAction.payment_unit}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                        >
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ActionDetail;
