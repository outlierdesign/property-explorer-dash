import { useState } from "react";
import { Hero } from "@/components/Hero";
import { EcoActionsExplorer } from "@/components/EcoActionsExplorer";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedStream, setSelectedStream] = useState<"NPI" | "LA">("NPI");

  return (
    <div className="min-h-screen">
      <Hero 
        selectedStream={selectedStream}
        onStreamChange={setSelectedStream}
      />
      <EcoActionsExplorer streamType={selectedStream} />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;
