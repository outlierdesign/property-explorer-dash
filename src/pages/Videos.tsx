import { useState } from "react";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { VideoModal } from "@/components/VideoModal";
import { getAllGalleryVideos, type Video } from "@/data/videoData";
import { Play, Film } from "lucide-react";

const Videos = () => {
  const allVideos = getAllGalleryVideos();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(allVideos.map((v) => v.category))),
  ];

  const filteredVideos =
    activeCategory === "All"
      ? allVideos
      : allVideos.filter((v) => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-3">
            <Film className="w-8 h-8 md:w-10 md:h-10" />
            Videos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Watch our collection of videos covering farming practices,
            conservation techniques, habitat management, and more.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 md:top-[72px] z-30 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer rounded-xl overflow-hidden border bg-background hover:shadow-lg transition-all"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                    {video.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.embedUrl}
          title={selectedVideo.title}
        />
      )}

      <Footer />
    </div>
  );
};

export default Videos;
