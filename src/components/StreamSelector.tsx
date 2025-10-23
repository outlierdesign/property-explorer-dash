import { Button } from "@/components/ui/button";
import { Sprout, Mountain } from "lucide-react";

interface StreamSelectorProps {
  selectedStream: "NPI" | "LA";
  onStreamChange: (stream: "NPI" | "LA") => void;
}

export const StreamSelector = ({ selectedStream, onStreamChange }: StreamSelectorProps) => {
  return (
    <div className="w-full bg-gradient-to-br from-background to-muted/30 py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Choose Your Conservation Stream</h2>
          <p className="text-muted-foreground">
            Select the type of environmental actions that best suit your land and conservation goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* NPI Stream */}
          <button
            onClick={() => onStreamChange("NPI")}
            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              selectedStream === "NPI"
                ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="bg-card p-8 text-left">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-colors ${
                selectedStream === "NPI" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Sprout className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Non-Productive Investments</h3>
              <p className="text-muted-foreground mb-4">
                Infrastructure and habitat creation actions that enhance your land's ecological value
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className={selectedStream === "NPI" ? "text-primary" : "text-muted-foreground"}>
                  Explore NPIs
                </span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </button>

          {/* LA Stream */}
          <button
            onClick={() => onStreamChange("LA")}
            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              selectedStream === "LA"
                ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="bg-card p-8 text-left">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-colors ${
                selectedStream === "LA" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Mountain className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Landscape Actions</h3>
              <p className="text-muted-foreground mb-4">
                Management activities that protect wildlife, control invasives, and restore habitats
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className={selectedStream === "LA" ? "text-primary" : "text-muted-foreground"}>
                  Explore LAs
                </span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
