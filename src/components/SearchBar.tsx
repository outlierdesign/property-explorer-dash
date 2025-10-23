import { Search, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-[var(--shadow-elegant)] p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-foreground">Location</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Where to?" 
                className="pl-10 bg-background/50 border-border focus:border-primary transition-[var(--transition-smooth)]"
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-foreground">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="date" 
                className="pl-10 bg-background/50 border-border focus:border-primary transition-[var(--transition-smooth)]"
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-foreground">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="date" 
                className="pl-10 bg-background/50 border-border focus:border-primary transition-[var(--transition-smooth)]"
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-foreground">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="number" 
                placeholder="2" 
                min="1" 
                className="pl-10 bg-background/50 border-border focus:border-primary transition-[var(--transition-smooth)]"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            size="lg" 
            variant="hero"
            className="px-12"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Properties
          </Button>
        </div>
      </div>
    </div>
  );
};
