import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { EcoActionsExplorer } from "@/components/EcoActionsExplorer";
import { StreamSelector } from "@/components/StreamSelector";
import { InfoSection } from "@/components/InfoSection";
import { Footer } from "@/components/Footer";
import { MobileHeader } from "@/components/MobileHeader";
import { DesktopNav } from "@/components/DesktopNav";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const streamParam = searchParams.get("stream");
  const [selectedStream, setSelectedStream] = useState<"NPI" | "LA">(
    (streamParam === "LA" ? "LA" : "NPI") as "NPI" | "LA"
  );

  // Update stream when URL changes
  useEffect(() => {
    const streamParam = searchParams.get("stream");
    if (streamParam === "LA" || streamParam === "NPI") {
      setSelectedStream(streamParam);
    }
  }, [searchParams]);

  const handleStreamChange = (stream: "NPI" | "LA") => {
    setSelectedStream(stream);
    setSearchParams({ stream });
  };

  return (
    <div className="min-h-screen">
      <MobileHeader />
      <DesktopNav />
      <Hero />
      <StreamSelector 
        selectedStream={selectedStream} 
        onStreamChange={handleStreamChange} 
      />
      <EcoActionsExplorer streamType={selectedStream} />
      <InfoSection />
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
