import { useState } from "react";
import { EcoActionsExplorer } from "@/components/EcoActionsExplorer";
import { StreamSelector } from "@/components/StreamSelector";

const Embed = () => {
  const [selectedStream, setSelectedStream] = useState<"NPI" | "LA">("NPI");

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <StreamSelector 
          selectedStream={selectedStream} 
          onStreamChange={setSelectedStream} 
        />
        <EcoActionsExplorer streamType={selectedStream} />
      </div>
    </div>
  );
};

export default Embed;
