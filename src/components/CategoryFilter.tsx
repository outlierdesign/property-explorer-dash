import { Home, TreePine, Mountain, Waves, Tractor, Bird } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: Home, label: "Eco Lodges", count: 156 },
  { icon: TreePine, label: "Treehouses", count: 89 },
  { icon: Mountain, label: "Mountain Cabins", count: 124 },
  { icon: Waves, label: "Lakefront", count: 67 },
  { icon: Tractor, label: "Farm Stays", count: 203 },
  { icon: Bird, label: "Wildlife", count: 45 },
];

export const CategoryFilter = () => {
  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border-y border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore by Category</h2>
          <Button variant="link" className="text-primary">View All</Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <button
                key={idx}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary transition-[var(--transition-smooth)] group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-[var(--transition-smooth)]">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{category.label}</p>
                  <p className="text-xs text-muted-foreground">{category.count} properties</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
