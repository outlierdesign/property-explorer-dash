import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Users, Target, GraduationCap, Leaf } from "lucide-react";

const About = () => {
  const { about } = siteContent;

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            {about.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {about.intro}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "19,000+", label: "Farmers in Tranche 1" },
              { value: "9,000+", label: "Farmers in Tranche 2" },
              { value: "3", label: "Regional Teams" },
              { value: "38+", label: "NPI Actions Available" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {about.sections.map((section, i) => {
            const icons = [Target, Users, GraduationCap];
            const Icon = icons[i] || Leaf;
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

      {/* Partners */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-xl font-semibold mb-6 text-muted-foreground">
            Government & EU Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href={siteContent.partners.dafm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {siteContent.partners.dafm.name}
            </a>
            <a
              href={siteContent.partners.euCap.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {siteContent.partners.euCap.name}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
