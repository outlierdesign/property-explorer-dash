import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  action: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    category: string | null;
    payment_rate: number | null;
    payment_unit: string | null;
    image_url: string | null;
    video_url: string | null;
    detail_url: string | null;
    type: string;
  };
  className?: string;
}

export const FavoriteButton = ({ action, className }: FavoriteButtonProps) => {
  const { isFavorited, addToFavorites } = useFavorites();
  const favorited = isFavorited(action.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToFavorites(action);
    toast({
      title: "Added to shortlist",
      description: `${action.title} has been added.`,
      duration: 1500
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={cn("hover:scale-110 transition-transform", className)}
      aria-label="Add to shortlist"
    >
      <Heart 
        className="h-5 w-5 transition-colors text-muted-foreground"
      />
    </Button>
  );
};
