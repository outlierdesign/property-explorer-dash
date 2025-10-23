import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Filter, RefreshCw, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  description: string | null;
  payment_rate: number | null;
  payment_unit: string | null;
  category: string | null;
  image_url: string | null;
  detail_url: string | null;
  type: string;
}

interface EcoActionsExplorerProps {
  streamType?: "NPI" | "LA";
}

export const EcoActionsExplorer = ({ streamType = "NPI" }: EcoActionsExplorerProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [actions, setActions] = useState<EcoAction[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopulating, setIsPopulating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchActions();
  }, [streamType]);

  const fetchActions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('eco_actions')
        .select('*')
        .eq('type', streamType)
        .order('category', { ascending: true })
        .order('title', { ascending: true });

      if (error) throw error;

      setActions(data || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data?.map(action => action.category).filter(Boolean) as string[])
      );
      setCategories(["All", ...uniqueCategories.sort()]);
    } catch (error) {
      console.error('Error fetching actions:', error);
      toast({
        title: "Error",
        description: "Failed to load eco actions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const populateActions = async () => {
    try {
      setIsPopulating(true);
      toast({
        title: "Populating database",
        description: "Fetching latest actions from ACRES Ireland...",
      });

      const response = await fetch(
        `https://ewgttimylpcniqpowugd.supabase.co/functions/v1/populate-eco-actions`,
        { method: 'POST' }
      );

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: `Added ${result.count} eco actions to database`,
        });
        await fetchActions();
      } else {
        throw new Error(result.error || 'Failed to populate actions');
      }
    } catch (error) {
      console.error('Error populating actions:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to populate actions",
        variant: "destructive",
      });
    } finally {
      setIsPopulating(false);
    }
  };

  const filteredActions = actions.filter((action) => {
    const matchesCategory = selectedCategory === "All" || action.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (action.description && action.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl font-bold mb-4">
            {streamType === "NPI" ? "Non-Productive Investments" : "Landscape Actions"}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {streamType === "NPI" 
              ? "Discover environmental initiatives and Non-Productive Investments (NPIs) from the ACRES Ireland program. These actions support biodiversity, water quality, and sustainable farming practices."
              : "Explore landscape-scale management actions that protect wildlife, control invasive species, restore habitats, and enhance your land's ecological value through targeted conservation activities."
            }
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button 
              variant="outline"
              onClick={populateActions}
              disabled={isPopulating}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isPopulating ? 'animate-spin' : ''}`} />
              {isPopulating ? "Updating..." : "Update from ACRES"}
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Search Actions
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Actions Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Loading eco actions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActions.map((action) => (
              <Link to={`/action/${action.slug}`} key={action.id}>
                <Card 
                  className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-elegant cursor-pointer h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    {(action.type === "LA" && laImageMap[action.slug]) || action.image_url ? (
                      <img
                        src={action.type === "LA" && laImageMap[action.slug] ? laImageMap[action.slug] : action.image_url!}
                        alt={action.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">No image</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Category Badge */}
                    {action.category && (
                      <Badge className="absolute top-4 right-4 bg-primary/90">
                        {action.category}
                      </Badge>
                    )}

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                      {action.description && (
                        <p className="text-sm text-white/90 mb-1 line-clamp-2">{action.description}</p>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {action.payment_rate && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Payment Rate
                          </p>
                          <p className="text-lg font-semibold text-primary">
                            €{action.payment_rate.toFixed(2)}
                            {action.payment_unit && ` / ${action.payment_unit}`}
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filteredActions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No actions found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
