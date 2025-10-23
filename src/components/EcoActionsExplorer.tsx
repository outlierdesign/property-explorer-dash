import { useState } from "react";
import { Play, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import actionBirdCover from "@/assets/action-bird-cover.jpg";
import actionHedges from "@/assets/action-hedges.jpg";
import actionWoodland from "@/assets/action-woodland.jpg";
import actionRiparian from "@/assets/action-riparian.jpg";
import actionOrchard from "@/assets/action-orchard.jpg";
import actionWetland from "@/assets/action-wetland.jpg";

interface EcoAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  image: string;
  category: string;
  videoUrl?: string;
}

const ecoActions: EcoAction[] = [
  {
    id: "bird-cover",
    title: "Wild Bird Cover Strips",
    description: "Provide mixed crops as habitat and food source for insects, birds and small mammals.",
    impact: "Good hunting opportunities for Barn Owls and Hen Harriers",
    image: actionBirdCover,
    category: "Wildlife",
    videoUrl: "#",
  },
  {
    id: "hedges",
    title: "Native Hedgerow Planting",
    description: "Enhancing field boundaries for biodiversity and landscape connectivity.",
    impact: "Blocks flow pathways from Critical Source Areas to Watercourses",
    image: actionHedges,
    category: "Biodiversity",
    videoUrl: "#",
  },
  {
    id: "woodland",
    title: "Small Woodland Establishment",
    description: "Creating native woodland areas to support diverse wildlife habitats.",
    impact: "Carbon sequestration and habitat corridors for wildlife",
    image: actionWoodland,
    category: "Carbon",
    videoUrl: "#",
  },
  {
    id: "riparian",
    title: "Riparian Buffer Zones",
    description: "Native vegetation margins along streams protecting water quality.",
    impact: "Filters nutrients and sediment, supports aquatic ecosystems",
    image: actionRiparian,
    category: "Water",
    videoUrl: "#",
  },
  {
    id: "orchard",
    title: "Traditional Orchard Restoration",
    description: "Heritage fruit trees supporting pollinators and biodiversity.",
    impact: "Provides habitat for insects, birds and supports local food production",
    image: actionOrchard,
    category: "Biodiversity",
    videoUrl: "#",
  },
  {
    id: "wetland",
    title: "Wetland Habitat Creation",
    description: "Establishing wetland areas to support amphibians and waterfowl.",
    impact: "Natural flood management and water purification",
    image: actionWetland,
    category: "Water",
    videoUrl: "#",
  },
];

const categories = ["All", "Wildlife", "Biodiversity", "Carbon", "Water"];

export const EcoActionsExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredActions = ecoActions.filter(
    (action) => selectedCategory === "All" || action.category === selectedCategory
  );

  return (
    <section className="w-full py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl font-bold mb-4">Eco Actions Explorer</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Discover the environmental initiatives and sustainability features available at our properties. 
            These actions have been selected for their ecological importance and positive impact on nature.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActions.map((action) => (
            <Card 
              key={action.id} 
              className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-elegant"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Video Button Overlay */}
                {action.videoUrl && (
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Play className="h-8 w-8 text-primary group-hover:text-white ml-1" />
                  </button>
                )}

                {/* Category Badge */}
                <Badge className="absolute top-4 right-4 bg-primary/90">
                  {action.category}
                </Badge>

                {/* Title & Description */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="text-sm text-white/90 mb-1">{action.description}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Environmental Impact
                    </p>
                    <p className="text-sm">{action.impact}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
