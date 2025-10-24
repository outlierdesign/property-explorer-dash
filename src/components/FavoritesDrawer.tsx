import { useFavorites, hasFencingComponent } from "@/hooks/useFavorites";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Button } from "./ui/button";
import { X, Download, Mail, Trash2 } from "lucide-react";
import { QuantityInput } from "./QuantityInput";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { EmailPlanDialog } from "./EmailPlanDialog";
import { generatePDF } from "@/lib/pdfGenerator";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

interface FavoritesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FavoritesDrawer = ({ open, onOpenChange }: FavoritesDrawerProps) => {
  const { favorites, removeFromFavorites, clearFavorites, getTotalEstimate } = useFavorites();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const totalEstimate = getTotalEstimate();

  const handleDownloadPDF = () => {
    if (favorites.length === 0) {
      toast({
        title: "No actions selected",
        description: "Add some actions to your shortlist first.",
        variant: "destructive",
        duration: 1500
      });
      return;
    }
    
    generatePDF(favorites, totalEstimate);
    toast({
      title: "PDF Downloaded",
      description: "Your action plan has been downloaded successfully.",
      duration: 1500
    });
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all actions from your shortlist?")) {
      clearFavorites();
      toast({
        title: "Shortlist cleared",
        description: "All actions have been removed.",
        duration: 1500
      });
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>My Action Shortlist</DrawerTitle>
            <DrawerDescription>
              {favorites.length === 0 
                ? "Your shortlist is empty. Add actions to get started."
                : `${favorites.length} action${favorites.length !== 1 ? 's' : ''} selected`
              }
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="flex-1 px-4">
            {favorites.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No actions added yet.</p>
                <p className="text-sm mt-2">Browse actions and click the heart icon to add them here.</p>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
                {favorites.map((favorite) => (
                  <div key={favorite.instanceId} className="border rounded-lg p-4 space-y-3 bg-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-base leading-tight">
                          {favorite.action.title}
                        </h3>
                        {favorite.action.category && (
                          <Badge variant="secondary" className="text-xs">
                            {favorite.action.category}
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromFavorites(favorite.instanceId)}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {favorite.action.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {favorite.action.description}
                      </p>
                    )}

                    <div className="space-y-2">
                      {favorite.action.payment_rate && favorite.action.payment_unit && (
                        <p className="text-sm font-medium">
                          €{favorite.action.payment_rate.toFixed(2)} per {favorite.action.payment_unit}
                        </p>
                      )}

                      {hasFencingComponent(favorite.action) && (
                        <QuantityInput
                          instanceId={favorite.instanceId}
                          paymentRate={favorite.action.payment_rate || 0}
                          paymentUnit={favorite.action.payment_unit || "unit"}
                        />
                      )}

                      <div className="pt-2 border-t">
                        <p className="text-sm font-semibold">
                          Estimated: €{favorite.calculatedTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <DrawerFooter className="border-t">
            {favorites.length > 0 && (
              <>
                <div className="text-center pb-2">
                  <p className="text-lg font-bold">
                    Total Estimate: €{totalEstimate.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Based on {favorites.length} selected action{favorites.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={handleDownloadPDF} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button onClick={() => setEmailDialogOpen(true)} variant="secondary" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Plan
                  </Button>
                </div>

                <Button onClick={handleClearAll} variant="outline" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </>
            )}

            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <EmailPlanDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        favorites={favorites}
        totalEstimate={totalEstimate}
      />
    </>
  );
};
