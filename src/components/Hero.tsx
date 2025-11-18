import heroImage from "@/assets/hero-galtee-mountains.jpg";
import { StreamSelector } from "@/components/StreamSelector";

interface HeroProps {
  selectedStream: "NPI" | "LA";
  onStreamChange: (stream: "NPI" | "LA") => void;
}

export const Hero = ({ selectedStream, onStreamChange }: HeroProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-2xl">
            Actions Explorer
          </h1>
          
          {/* Stream Selector integrated into hero */}
          <div className="max-w-2xl mx-auto">
            <StreamSelector 
              selectedStream={selectedStream} 
              onStreamChange={onStreamChange} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
