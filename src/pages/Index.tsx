import { Hero } from "@/components/Hero";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryFilter />
      <FeaturedProperties />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;
