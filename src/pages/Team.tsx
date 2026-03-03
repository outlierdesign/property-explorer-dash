import { useState } from "react";
import { Link } from "react-router-dom";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { TeamMemberDialog } from "@/components/TeamMemberDialog";
import { teamMembers, regions } from "@/data/teamData";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import type { TeamMember as RealTeamMember } from "@/data/teamData";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
}

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<RealTeamMember | null>(
    null
  );
  const [filter, setFilter] = useState<string>("All");

  const departments = ["All", ...regions.map((r) => r.name)];

  const filteredMembers =
    filter === "All"
      ? teamMembers
      : teamMembers.filter((member) => {
          const region = regions.find((r) => r.name === filter);
          return region ? member.region === region.slug : false;
        });

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Our Team</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-3">
            <Users className="w-8 h-8 md:w-10 md:h-10" />
            Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Meet the dedicated professionals behind the ACRES Co-operation
            Programme, working to support farmers and restore Ireland's
            biodiversity across three regions.
          </p>
        </div>
      </section>

      {/* Region Quick Links */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((region) => (
              <Link
                key={region.slug}
                to={`/regions/${region.slug}`}
                className="bg-background rounded-xl p-5 border hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {region.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {region.counties.join(", ")}
                </p>
                <p className="text-xs text-primary mt-2 font-medium">
                  {teamMembers.filter((m) => m.region === region.slug).length}{" "}
                  team members →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-16 md:top-[72px] z-30 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === dept
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {dept}
                {dept !== "All" && (
                  <span className="ml-1.5 opacity-70">
                    (
                    {
                      teamMembers.filter((m) => {
                        const region = regions.find((r) => r.name === dept);
                        return region ? m.region === region.slug : false;
                      }).length
                    }
                    )
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-background rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {member.title}
                </p>
                <p className="text-xs text-primary/70 mb-3 font-medium">
                  {regions.find((r) => r.slug === member.region)?.name ||
                    member.region}
                </p>
                <div className="space-y-1.5">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {member.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No team members found in this region.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedMember && (
        <TeamMemberDialog
          member={{
            id: selectedMember.id,
            name: selectedMember.name,
            title: selectedMember.title,
            department:
              regions.find((r) => r.slug === selectedMember.region)?.name ||
              selectedMember.region,
            image: "",
            bio: `${selectedMember.name} is a ${selectedMember.title} on the ACRES ${regions.find((r) => r.slug === selectedMember.region)?.name || ""} team.`,
            email: selectedMember.email,
            phone: selectedMember.phone,
          }}
          open={!!selectedMember}
          onOpenChange={(open) => !open && setSelectedMember(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Team;
