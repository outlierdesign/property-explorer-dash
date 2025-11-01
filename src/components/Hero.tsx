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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Rewarding your farming for nature: join the ACRES Co-operation Programme
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 drop-shadow-lg leading-relaxed">
            As a farmer in a High Nature Value (HNV) area you're already delivering more than meets the eye. The ACRES Co-operation Programme recognises the value of your land and your efforts: you'll receive support, advice and payments for managing your farm in harmony with nature and the landscape over the next five years. Through tailored score cards, your forage and habitat land will be assessed each year. The higher the score, the greater the payment — all based on your decisions and how you manage your fields. You'll benefit from expert guidance from a local CP team, access to funding for non-productive investments and landscape actions to enhance your farm's habitat value and scores, and a five year commitment offering stability and flexibility. Speak with your approved farm advisor today to check eligibility and prepare for the next tranche of applications.
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
