import { Link } from "react-router-dom";
import { useNetwork } from "@/hooks/useNetwork";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileHeader = () => {
  const isOnline = useNetwork();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AC</span>
          </div>
          <span className="font-heading font-bold text-lg hidden sm:inline">
            ACRES Explorer
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Online/Offline Status */}
          <div 
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              isOnline 
                ? "bg-primary/10 text-primary" 
                : "bg-muted text-muted-foreground"
            )}
          >
            {isOnline ? (
              <>
                <Wifi className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};