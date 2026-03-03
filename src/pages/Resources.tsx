import { useState } from "react";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { npiResources } from "@/data/resourceData";
import { FileText, Download, Search, BookOpen } from "lucide-react";

const Resources = () => {
  const [search, setSearch] = useState("");

  const filtered = npiResources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
            NPI Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Download specification documents for all Non-Productive Investments.
            These guides provide detailed requirements and implementation advice
            for farmers and advisors.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="sticky top-16 md:top-[72px] z-30 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 max-w-5xl py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
              <a
                key={resource.id}
                href={resource.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border p-4 bg-background hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    PDF Document
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
