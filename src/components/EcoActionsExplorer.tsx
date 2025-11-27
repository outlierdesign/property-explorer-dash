import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Filter, RefreshCw, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FavoriteButton } from "@/components/FavoriteButton";
import { DownloadButton } from "@/components/DownloadButton";
import { OfflineBadge } from "@/components/OfflineIndicator";
import { SyncStatus } from "@/components/SyncStatus";
import { isNativeApp } from "@/services/videoDownloader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VideoModal } from "./VideoModal";
import { useOfflineSync } from "@/hooks/useOfflineSync";

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
  video_url: string | null;
  video_url_download?: string | null;
  video_downloaded?: boolean;
  video_local_path?: string | null;
  image_downloaded?: boolean;
  image_local_path?: string | null;
}

interface EcoActionsExplorerProps {
  streamType?: "NPI" | "LA";
}

export const EcoActionsExplorer = ({ streamType = "NPI" }: EcoActionsExplorerProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineActions, setOnlineActions] = useState<EcoAction[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopulating, setIsPopulating] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const { toast } = useToast();

  // Use offline sync for native app
  const { 
    actions: offlineActions, 
    isLoading: offlineLoading, 
    isSyncing, 
    lastSync, 
    isOnline, 
    syncActions 
  } = useOfflineSync(streamType);

  // Determine which actions to display
  const isNative = isNativeApp();
  const actions = isNative ? offlineActions : onlineActions;
  const loading = isNative ? offlineLoading : isLoading;

  useEffect(() => {
    if (!isNative) {
      fetchActions();
    }
  }, [streamType, isNative]);

  // Update categories when actions change
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(actions.map(action => action.category).filter(Boolean) as string[])
    );
    setCategories(["All", ...uniqueCategories.sort()]);
  }, [actions]);

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

      setOnlineActions(data || []);
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
        if (isNative) {
          await syncActions();
        } else {
          await fetchActions();
        }
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

  const handleDownloadComplete = () => {
    // Refresh to update download status
    if (isNative) {
      syncActions();
    }
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold">
              {streamType === "NPI" ? "Non-Productive Investments" : "Landscape Actions"}
            </h2>
            {isNative && (
              <SyncStatus 
                lastSync={lastSync} 
                isSyncing={isSyncing} 
                isOnline={isOnline} 
                onSync={syncActions} 
              />
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            {streamType === "NPI" 
              ? "Infrastructure and habitat creation actions available through the ACRES Co-operation Programme. These investments enhance your farm's ecological value and contribute to your annual score card assessment."
              : "Management activities available through the ACRES Co-operation Programme that protect wildlife, control invasive species, restore habitats, and enhance your land's ecological value and score card results."
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
              disabled={isPopulating || (isNative && !isOnline)}
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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Loading eco actions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActions.map((action) => (
              <div key={action.id}>
                <Card 
                  className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-elegant h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    {action.video_url ? (
                      <div 
                        className="relative w-full h-full cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedVideo({ url: action.video_url!, title: action.title });
                          setVideoModalOpen(true);
                        }}
                      >
                        <iframe
                          src={action.video_url}
                          className="w-full h-full pointer-events-none"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          title={action.title}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                          <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-primary" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    ) : (action.type === "LA" && laImageMap[action.slug]) || action.image_url ? (
                      <Link to={`/action/${action.slug}`}>
                        <img
                          src={action.type === "LA" && laImageMap[action.slug] ? laImageMap[action.slug] : action.image_url!}
                          alt={action.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>
                    ) : (
                      <Link to={`/action/${action.slug}`}>
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <p className="text-muted-foreground">No image</p>
                        </div>
                      </Link>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                    {/* Offline Badge */}
                    <OfflineBadge isDownloaded={action.video_downloaded || action.image_downloaded || false} />

                    {/* Category Badge */}
                    {action.category && (
                      <Badge className="absolute top-4 left-4 bg-primary/90 pointer-events-none">
                        {action.category}
                      </Badge>
                    )}
                    
                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 z-10">
                      <FavoriteButton 
                        action={{
                          id: action.id,
                          title: action.title,
                          slug: action.slug,
                          description: action.description,
                          category: action.category,
                          payment_rate: action.payment_rate,
                          payment_unit: action.payment_unit,
                          image_url: action.image_url,
                          video_url: action.video_url,
                          detail_url: action.detail_url,
                          type: action.type
                        }}
                      />
                    </div>

                    {/* Title */}
                    <Link to={`/action/${action.slug}`} className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                      {action.description && (
                        <p className="text-sm text-white/90 mb-1 line-clamp-2">{action.description}</p>
                      )}
                    </Link>
                  </div>

                  <Link to={`/action/${action.slug}`}>
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
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 group-hover:bg-primary group-hover:text-white transition-colors"
                          >
                            Learn More
                          </Button>
                          {isNative && (action.video_url_download || action.image_url) && (
                            <DownloadButton
                              actionId={action.id}
                              actionTitle={action.title}
                              videoUrl={action.video_url_download}
                              imageUrl={action.image_url}
                              isDownloaded={action.video_downloaded || action.image_downloaded || false}
                              onDownloadComplete={handleDownloadComplete}
                              compact
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        )}

        {filteredActions.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {isNative && !isOnline 
                ? "No cached actions available. Connect to the internet to sync."
                : "No actions found for the selected category."
              }
            </p>
          </div>
        )}
      </div>

      {selectedVideo && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => {
            setVideoModalOpen(false);
            setSelectedVideo(null);
          }}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
};
