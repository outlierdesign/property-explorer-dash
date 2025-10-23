import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { EcoActionsExplorer } from "@/components/EcoActionsExplorer";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryFilter />
      <FeaturedProperties />
      <EcoActionsExplorer />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;
