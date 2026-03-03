import { Link, useLocation } from "react-router-dom";
import { useNetwork } from "@/hooks/useNetwork";
import {
  Wifi,
  WifiOff,
  Menu,
  X,
  Leaf,
  Home,
  FileText,
  Mountain,
  Users,
  Info,
  BookOpen,
  Phone,
  Film,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const MobileHeader = () => {
  const isOnline = useNetwork();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuSections = [
    {
      title: "Actions",
      items: [
        { path: "/", label: "Home", icon: Home, exact: true },
        { path: "/?stream=NPI", label: "NPI Actions", icon: FileText },
        { path: "/?stream=LA", label: "Landscape Actions", icon: Mountain },
      ],
    },
    {
      title: "Our Regions",
      items: [
        { path: "/regions/breifne", label: "Breifne", icon: Users },
        {
          path: "/regions/munster-south-connacht",
          label: "Munster South Connacht",
          icon: Users,
        },
        { path: "/regions/leinster", label: "Leinster", icon: Users },
        { path: "/team", label: "All Team Members", icon: Users },
      ],
    },
    {
      title: "About",
      items: [
        { path: "/about", label: "About Us", icon: Info },
        { path: "/what-we-do", label: "What We Do", icon: Briefcase },
        { path: "/farming", label: "Farming", icon: Leaf },
      ],
    },
    {
      title: "Resources",
      items: [
        { path: "/resources", label: "NPI Resources", icon: BookOpen },
        { path: "/videos", label: "Videos", icon: Film },
      ],
    },
    {
      title: "",
      items: [{ path: "/contact", label: "Contact Us", icon: Phone }],
    },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === "/" && !location.search;
    if (path.includes("?"))
      return location.search.includes(path.split("?")[1]);
    return location.pathname === path;
  };

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg">
              ACRES Ireland
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                isOnline
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isOnline ? (
                <Wifi className="h-3.5 w-3.5" />
              ) : (
                <WifiOff className="h-3.5 w-3.5" />
              )}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-30 bg-background/98 backdrop-blur-sm overflow-y-auto pb-20">
          <nav className="container mx-auto px-4 py-4 space-y-6">
            {menuSections.map((section) => (
              <div key={section.title || "contact"}>
                {section.title && (
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    {section.title}
                  </p>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(
                      item.path,
                      "exact" in item ? (item as any).exact : false
                    );
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                          active
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
