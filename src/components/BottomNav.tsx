import { Home, FileText, Mountain, Heart, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const location = useLocation();
  const { count } = useFavorites();

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Home",
      exact: true,
    },
    {
      path: "/?stream=NPI",
      icon: FileText,
      label: "NPI",
      isActive: location.search.includes("stream=NPI"),
    },
    {
      path: "/?stream=LA",
      icon: Mountain,
      label: "LA",
      isActive: location.search.includes("stream=LA"),
    },
    {
      path: "/resources",
      icon: BookOpen,
      label: "Resources",
      isActive: location.pathname === "/resources",
    },
  ];

  const isActiveRoute = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return location.pathname === item.path && !location.search;
    }
    return item.isActive || false;
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Hidden on Desktop */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elegant">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Shortlist Button - Always visible */}
          <button
            onClick={() => {
              const favButton = document.querySelector(
                "[data-favorites-button]"
              ) as HTMLButtonElement;
              if (favButton) favButton.click();
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors relative",
              "text-muted-foreground"
            )}
          >
            <div className="relative">
              <Heart
                className={cn(
                  "h-5 w-5",
                  count > 0 && "fill-primary text-primary"
                )}
              />
              {count > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-3 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
                >
                  {count}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">Shortlist</span>
          </button>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the bottom nav on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
};
