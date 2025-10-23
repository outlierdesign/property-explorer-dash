import heroImage from "@/assets/hero-eco-property.jpg";

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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            ACRES Ireland
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Non-Productive Investments
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg">
            Explore environmental actions and funding opportunities for sustainable farming. Support biodiversity and habitat conservation.
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
