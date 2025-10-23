import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";

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
}

const ActionDetail = () => {
  const { slug } = useParams();
  const [action, setAction] = useState<EcoAction | null>(null);
  const [relatedActions, setRelatedActions] = useState<EcoAction[]>([]);
  const [loading, setLoading] = useState(true);

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
      {/* Back Button */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
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

            {/* Video/Image Section - Full Width */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/20 to-secondary/20">
                {action.image_url ? (
                  <img 
                    src={action.image_url} 
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
                        {relatedAction.image_url ? (
                          <img 
                            src={relatedAction.image_url} 
                            alt={relatedAction.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
