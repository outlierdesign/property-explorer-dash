import { Heart, MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  ecoFeatures: string[];
  featured?: boolean;
}

export const PropertyCard = ({
  image,
  title,
  location,
  rating,
  reviews,
  price,
  ecoFeatures,
  featured = false,
}: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-[var(--shadow-elegant)] transition-[var(--transition-smooth)] cursor-pointer">
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-[var(--transition-smooth)]" />
        
        {featured && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-none">
            Featured
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-card/80 hover:bg-card backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
        </Button>
        
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-[var(--transition-smooth)] translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2 flex-wrap">
            {ecoFeatures.map((feature, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
