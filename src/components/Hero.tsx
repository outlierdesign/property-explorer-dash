import { useState } from "react";
import { Play, X } from "lucide-react";
import heroImage from "@/assets/hero-galtee-mountains.jpg";
import { siteImages } from "@/data/actionImageData";

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-[40vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-4 md:mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6 drop-shadow-2xl">
            Actions Explorer
          </h1>
          <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto mb-6">
            Explore Non-Productive Investments and Landscape Actions available through the ACRES Co-operation Programme
          </p>

          {/* Play Video Button */}
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full px-6 py-3 transition-all hover:scale-105 border border-white/30"
          >
            <div className="bg-white rounded-full p-2">
              <Play className="h-5 w-5 text-primary ml-0.5" fill="currentColor" />
            </div>
            <span className="font-medium text-sm md:text-base">Watch Introduction</span>
          </button>
        </div>

        {/* Stats - Compact on mobile */}
        <div className="mt-6 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">35+</p>
            <p className="text-white/80 text-xs md:text-sm mt-1">NPI Actions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">€5M+</p>
            <p className="text-white/80 text-xs md:text-sm mt-1">Available Funding</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">100%</p>
            <p className="text-white/80 text-xs md:text-sm mt-1">Verified Schemes</p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <video
                src="https://henharrierprogram.euvidecdn.com/videos/68f8e31f3b4c45f08d7e7458/1/video/mp4/video-1080p.mp4"
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
