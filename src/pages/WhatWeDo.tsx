import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Plane, ScanSearch, ClipboardCheck, BarChart3 } from "lucide-react";

const WhatWeDo = () => {
  const { whatWeDo } = siteContent;

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            {whatWeDo.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {whatWeDo.intro}
          </p>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-start gap-6 mb-10">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <ScanSearch className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                {whatWeDo.assessmentProcess.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {whatWeDo.assessmentProcess.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Drone Technology */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Plane className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                {whatWeDo.droneTechnology.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {whatWeDo.droneTechnology.content}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 md:ml-20">
            {whatWeDo.droneTechnology.drones.map((drone) => (
              <div
                key={drone.name}
                className="bg-background rounded-xl p-5 border shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2 text-primary">
                  {drone.name}
                </h3>
                <p className="text-muted-foreground text-sm">{drone.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecards & Payments */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                {whatWeDo.scorecards.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {whatWeDo.scorecards.content}
              </p>
            </div>
          </div>
          <div className="ml-0 md:ml-20">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Payment Structure
                </h3>
                <div className="space-y-3">
                  {whatWeDo.scorecards.paymentStructure.map((tier) => (
                    <div
                      key={tier.score}
                      className="flex items-center gap-4 bg-background rounded-lg p-4 border"
                    >
                      <span className="font-mono font-bold text-lg text-primary min-w-[80px]">
                        {tier.score}
                      </span>
                      <span className="text-muted-foreground">
                        {tier.payment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
