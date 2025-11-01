import { Leaf, Shield, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Tailored Score Cards",
    description: "Your forage and habitat land assessed annually with payments based on ecological value",
  },
  {
    icon: Shield,
    title: "Expert Local Support",
    description: "Dedicated CP team providing guidance and advice throughout the five year programme",
  },
  {
    icon: Heart,
    title: "Funding for Actions",
    description: "Access to funding for non-productive investments and landscape actions to enhance habitat value",
  },
  {
    icon: Award,
    title: "Five Year Commitment",
    description: "Stability and flexibility with a long term partnership that rewards your conservation efforts",
  },
];

export const InfoSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Join ACRES Co-operation Programme?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recognition, support and rewards for managing your High Nature Value farm in harmony with nature
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-[var(--transition-smooth)]">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
