import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { FavoritesDrawer } from "./FavoritesDrawer";
import { useFavorites } from "@/hooks/useFavorites";
import { Badge } from "./ui/badge";

export const FavoritesFloatingButton = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { count } = useFavorites();

  if (count === 0) return null;

  return (
    <>
      <Button
        onClick={() => setDrawerOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg hover:shadow-xl transition-all animate-in fade-in slide-in-from-bottom-4"
      >
        <div className="relative">
          <Heart className="mr-2 h-5 w-5 fill-current" />
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {count}
          </Badge>
        </div>
        <span className="ml-1">
          {count} Action{count !== 1 ? 's' : ''}
        </span>
      </Button>

      <FavoritesDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};
