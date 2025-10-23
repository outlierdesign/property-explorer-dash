import { Hero } from "@/components/Hero";
import { EcoActionsExplorer } from "@/components/EcoActionsExplorer";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <EcoActionsExplorer />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;
