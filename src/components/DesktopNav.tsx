import { Home, FileText, Mountain, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNetwork } from "@/hooks/useNetwork";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const DesktopNav = () => {
  const location = useLocation();
  const isOnline = useNetwork();
  
  const navItems = [
    { 
      path: "/", 
      icon: Home, 
      label: "Home",
      exact: true 
    },
    { 
      path: "/?stream=NPI", 
      icon: FileText, 
      label: "NPI Actions",
      isActive: location.search.includes("stream=NPI")
    },
    { 
      path: "/?stream=LA", 
      icon: Mountain, 
      label: "Landscape Actions",
      isActive: location.search.includes("stream=LA")
    },
    { 
      path: "/team", 
      icon: Users, 
      label: "Team"
    },
  ];

  const isActiveRoute = (item: typeof navItems[0]) => {
    if (item.exact) {
      return location.pathname === item.path && !location.search;
    }
    if (item.isActive !== undefined) {
      return item.isActive;
    }
    return location.pathname === item.path;
  };

  return (
    <header className="hidden md:block sticky top-0 z-40 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AC</span>
          </div>
          <span className="font-heading font-bold text-xl">
            ACRES Explorer
          </span>
        </Link>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md transition-colors font-medium",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Online/Offline Status */}
          <div 
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md ml-2",
              isOnline 
                ? "bg-primary/10 text-primary" 
                : "bg-muted text-muted-foreground"
            )}
          >
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span className="text-sm font-medium">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span className="text-sm font-medium">Offline</span>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};