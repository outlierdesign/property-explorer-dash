import { useParams, Link } from "react-router-dom";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { regions, teamMembers } from "@/data/teamData";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { TeamMemberDialog } from "@/components/TeamMemberDialog";
import { useState } from "react";
import { MapPin, Phone, Mail, Building2, Users } from "lucide-react";
import type { TeamMember } from "@/data/teamData";

const Region = () => {
  const { slug } = useParams<{ slug: string }>();
  const region = regions.find((r) => r.slug === slug);
  const members = teamMembers.filter((m) => m.region === slug);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (!region) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Region not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span>Our Regions</span>
            <span>/</span>
            <span className="text-foreground">{region.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            ACRES {region.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {region.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {region.counties.map((county) => (
              <span
                key={county}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
              >
                {county}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Office Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background rounded-xl p-5 border">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{region.office.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {region.office.eircode}
                  </p>
                </div>
              </div>
              {region.office.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${region.office.phone}`}
                    className="text-primary hover:underline"
                  >
                    {region.office.phone}
                  </a>
                </div>
              )}
            </div>
            {region.additionalOffices?.map((office, i) => (
              <div key={i} className="bg-background rounded-xl p-5 border">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="font-medium">{office.address}</p>
                </div>
                {office.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${office.phone}`}
                      className="text-primary hover:underline"
                    >
                      {office.phone}
                    </a>
                  </div>
                )}
              </div>
            ))}
            <div className="bg-background rounded-xl p-5 border">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${region.email}`}
                  className="text-primary hover:underline"
                >
                  {region.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Objectives (if present) */}
      {region.objectives && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-xl font-semibold mb-6">
              Local Area Objectives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {region.objectives.map((obj) => {
                const [area, ...rest] = obj.split(": ");
                return (
                  <div key={area} className="rounded-xl p-5 border bg-muted/20">
                    <h3 className="font-semibold text-primary mb-1">{area}</h3>
                    <p className="text-sm text-muted-foreground">
                      {rest.join(": ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Meet the {region.name} Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-background rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {member.title}
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
        </div>
      </section>

      {selectedMember && (
        <TeamMemberDialog
          member={{
            id: selectedMember.id,
            name: selectedMember.name,
            title: selectedMember.title,
            department: selectedMember.department,
            image: "",
            bio: `${selectedMember.name} is a ${selectedMember.title} on the ACRES ${region.name} team.`,
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

export default Region;
