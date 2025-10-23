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
      <section className="relative bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              {action.title}
            </h1>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-6 text-center bg-card/80 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground mb-2">Class of Action</p>
                <p className="font-semibold">Non-Productive Investment</p>
              </Card>
              <Card className="p-6 text-center bg-card/80 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground mb-2">Category</p>
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {action.category}
                </Badge>
              </Card>
              <Card className="p-6 text-center bg-card/80 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground mb-2">Payment Rate</p>
                <p className="text-2xl font-bold text-primary">
                  €{action.payment_rate.toFixed(2)}/{action.payment_unit}
                </p>
              </Card>
            </div>

            {/* Video/Image Section */}
            <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {action.image_url ? (
                  <img 
                    src={action.image_url} 
                    alt={action.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Video content coming soon</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Notice Banner */}
            <div className="mt-4 bg-primary/10 border-l-4 border-primary rounded p-4">
              <p className="text-sm">
                <strong>Note:</strong> The most up-to-date specifications are available on the dedicated 
                ACRES / ACRE website under Non-Productive Investments.{" "}
                {action.detail_url && (
                  <a 
                    href={action.detail_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Learn more
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About This Action:</h2>
            
            <Tabs defaultValue="objectives" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
                <TabsTrigger value="involved">What's Involved</TabsTrigger>
                <TabsTrigger value="implementation">Implementation Notes</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="objectives" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{action.title}</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">
                      {action.description || "Enhancing field boundaries for biodiversity and landscape connectivity, blocks flow pathways from Critical Source Areas to Watercourses."}
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li>Establish permanent vegetative cover to protect soil and water</li>
                      <li>Create wildlife corridors and habitat connectivity</li>
                      <li>Reduce agricultural runoff and improve water quality</li>
                      <li>Support pollinators and beneficial insects</li>
                      <li>Enhance carbon sequestration</li>
                    </ul>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="involved" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Implementation Requirements</h3>
                  <div className="prose prose-sm max-w-none">
                    <ul className="space-y-3">
                      <li><strong>Site Selection:</strong> Identify suitable locations based on soil type, exposure, and existing vegetation</li>
                      <li><strong>Plant Species:</strong> Use native species appropriate to your region and soil conditions</li>
                      <li><strong>Planting Season:</strong> Typically November to March during dormant season</li>
                      <li><strong>Spacing:</strong> Follow recommended spacing guidelines for chosen species</li>
                      <li><strong>Protection:</strong> Install guards or fencing to protect young plants from livestock and wildlife</li>
                      <li><strong>Maintenance:</strong> Regular weeding, watering during establishment, and annual trimming once established</li>
                    </ul>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="implementation" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Best Practices & Advice</h3>
                  <div className="prose prose-sm max-w-none space-y-4">
                    <div>
                      <h4 className="font-semibold text-base">Preparation</h4>
                      <p className="text-muted-foreground">Clear the planting area of weeds and existing vegetation. Consider soil testing to ensure appropriate conditions.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Planting Technique</h4>
                      <p className="text-muted-foreground">Use appropriate planting methods (notch, pit, or auger) based on plant size and soil conditions. Ensure firm planting to prevent frost lift.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Aftercare</h4>
                      <p className="text-muted-foreground">Monitor establishment regularly. Replace failures within the first year. Control competing vegetation for at least 3 years.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Long-term Management</h4>
                      <p className="text-muted-foreground">Establish a trimming schedule once mature. Maintain buffer strips to reduce spray drift. Monitor for pests and diseases.</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">When will I receive payment?</h4>
                      <p className="text-muted-foreground text-sm">Payments are typically made annually following successful inspection and verification of work completed.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Can I choose my own plant species?</h4>
                      <p className="text-muted-foreground text-sm">Species must be from the approved list of native varieties suitable for your region. Your advisor can help with species selection.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">What if some plants don't survive?</h4>
                      <p className="text-muted-foreground text-sm">A survival rate of 80% or higher is typically required. Failed plants should be replaced during the next planting season.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Do I need planning permission?</h4>
                      <p className="text-muted-foreground text-sm">Generally not required for standard planting, but check with your local authority for any specific restrictions in your area.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">How long is the commitment period?</h4>
                      <p className="text-muted-foreground text-sm">The commitment period is typically 5 years, during which time the established vegetation must be maintained according to scheme requirements.</p>
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
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Consider These Complementary Actions:</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedActions.map((relatedAction) => (
                  <Link to={`/action/${relatedAction.slug}`} key={relatedAction.id}>
                    <Card className="overflow-hidden h-full hover:shadow-[var(--shadow-elegant)] transition-[var(--transition-smooth)] group">
                      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                        {relatedAction.image_url ? (
                          <img 
                            src={relatedAction.image_url} 
                            alt={relatedAction.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Play className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                          {relatedAction.title}
                        </h3>
                        <div className="space-y-1 text-xs">
                          <p className="text-muted-foreground">Payment Rate:</p>
                          <p className="text-primary font-bold">
                            €{relatedAction.payment_rate.toFixed(2)}/{relatedAction.payment_unit}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-[var(--transition-smooth)]"
                        >
                          Discover More
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
