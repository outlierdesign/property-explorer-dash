import heroImage from "@/assets/hero-galtee-mountains.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Rewarding your farming for nature: join the ACRES Co-operation Programme
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 drop-shadow-lg leading-relaxed">
            As a farmer in a High Nature Value area, you're already delivering valuable conservation work. The ACRES Co-operation Programme recognises this with support, advice and annual payments based on your farm's ecological score. The higher your score, the greater the reward. Benefit from expert local guidance, funding for habitat enhancements, and a five year commitment offering stability. Speak with your approved farm advisor today to check eligibility.
          </p>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-white drop-shadow-lg">35+</p>
            <p className="text-white/80 text-sm mt-1">NPI Actions</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white drop-shadow-lg">€5M+</p>
            <p className="text-white/80 text-sm mt-1">Available Funding</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white drop-shadow-lg">100%</p>
            <p className="text-white/80 text-sm mt-1">Verified Schemes</p>
          </div>
        </div>
      </div>
    </section>
  );
};
