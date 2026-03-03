import {
  Home,
  FileText,
  Mountain,
  Users,
  Info,
  Briefcase,
  Film,
  BookOpen,
  Phone,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNetwork } from "@/hooks/useNetwork";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  path: string;
  label: string;
}

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
  isActive?: boolean;
  dropdown?: DropdownItem[];
}

export const DesktopNav = () => {
  const location = useLocation();
  const isOnline = useNetwork();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    {
      path: "/",
      icon: Home,
      label: "Home",
      exact: true,
    },
    {
      path: "/?stream=NPI",
      icon: FileText,
      label: "NPI Actions",
      isActive: location.search.includes("stream=NPI"),
    },
    {
      path: "/?stream=LA",
      icon: Mountain,
      label: "Landscape Actions",
      isActive: location.search.includes("stream=LA"),
    },
    {
      path: "#regions",
      icon: Users,
      label: "Our Regions",
      dropdown: [
        { path: "/regions/breifne", label: "Breifne" },
        {
          path: "/regions/munster-south-connacht",
          label: "Munster South Connacht",
        },
        { path: "/regions/leinster", label: "Leinster" },
        { path: "/team", label: "All Team Members" },
      ],
    },
    {
      path: "#about",
      icon: Info,
      label: "About",
      dropdown: [
        { path: "/about", label: "About Us" },
        { path: "/what-we-do", label: "What We Do" },
        { path: "/farming", label: "Farming" },
      ],
    },
    {
      path: "#resources",
      icon: BookOpen,
      label: "Resources",
      dropdown: [
        { path: "/resources", label: "NPI Resources" },
        { path: "/videos", label: "Videos" },
      ],
    },
    {
      path: "/contact",
      icon: Phone,
      label: "Contact",
    },
  ];

  const isActiveRoute = (item: NavItem) => {
    if (item.exact) {
      return location.pathname === item.path && !location.search;
    }
    if (item.isActive !== undefined) {
      return item.isActive;
    }
    if (item.dropdown) {
      return item.dropdown.some((d) => location.pathname === d.path);
    }
    return location.pathname === item.path;
  };

  return (
    <header className="hidden md:block sticky top-0 z-40 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl">
            ACRES Ireland
          </span>
        </Link>

        <nav className="flex items-center gap-0.5" ref={dropdownRef}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item);

            if (item.dropdown) {
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors font-medium text-sm",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 bg-card border rounded-lg shadow-lg py-1 min-w-[200px] z-50">
                      {item.dropdown.map((dd) => (
                        <Link
                          key={dd.path}
                          to={dd.path}
                          onClick={() => setOpenDropdown(null)}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors",
                            location.pathname === dd.path
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {dd.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors font-medium text-sm",
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
              "flex items-center gap-1.5 px-2.5 py-2 rounded-md ml-1",
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
        </nav>
      </div>
    </header>
  );
};
