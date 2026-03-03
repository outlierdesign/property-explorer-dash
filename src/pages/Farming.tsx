import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Link } from "react-router-dom";
import { Leaf, Sprout, Coins, TreePine } from "lucide-react";

const Farming = () => {
  const { farming } = siteContent;

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            {farming.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {farming.intro}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {farming.sections.map((section, i) => {
            const icons = [Leaf, Coins, TreePine];
            const Icon = icons[i] || Sprout;
            return (
              <div
                key={section.title}
                className="flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Explore Available Actions
          </h2>
          <p className="mb-6 opacity-90 max-w-xl mx-auto">
            Discover the full range of Non-Productive Investments and Landscape
            Actions available through the ACRES Co-operation Programme.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/?stream=NPI"
              className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Browse NPI Actions
            </Link>
            <Link
              to="/?stream=LA"
              className="px-6 py-3 bg-white/10 border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Browse Landscape Actions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Farming;
