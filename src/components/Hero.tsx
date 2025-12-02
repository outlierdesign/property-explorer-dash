import heroImage from "@/assets/hero-galtee-mountains.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[35vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-4 md:mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6 drop-shadow-2xl">
            Actions Explorer
          </h1>
        </div>
        
        {/* Stats - Compact on mobile */}
        <div className="mt-6 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
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
    </section>
  );
};
