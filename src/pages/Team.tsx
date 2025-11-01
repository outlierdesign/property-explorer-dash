import { useState } from "react";
import { Footer } from "@/components/Footer";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { TeamMemberDialog } from "@/components/TeamMemberDialog";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

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

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Programme Director",
    title: "Programme Director",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Leading the ACRES Co-operation Programme with 25+ years of experience in agri-environment sector. Instrumental in developing results-based approaches for High Nature Value farmland.",
    email: "director@example.ie",
    phone: "087 000 0000"
  },
  {
    id: "2",
    name: "Project Manager",
    title: "Project Manager - Breifne",
    department: "Breifne",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Extensive experience in High Nature Value farmland systems. Specializing in habitat recognition and rehabilitation to ensure climate change resilience.",
    email: "breifne@example.ie",
    phone: "085 000 0000"
  },
  {
    id: "3",
    name: "Project Manager",
    title: "Project Manager - Munster/South Connacht",
    department: "Munster South Connacht",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "Over 20 years working in the agri-environment sector, supporting farmers in delivering environmental objectives across the Munster and South Connacht regions.",
    email: "munster@example.ie",
    phone: "085 000 0001"
  },
  {
    id: "4",
    name: "Project Manager",
    title: "Project Manager - Leinster",
    department: "Leinster",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Leading the Leinster Co-operation Project with expertise in High Nature Value farmland management and farmer engagement.",
    email: "leinster@example.ie",
    phone: "085 000 0002"
  },
  {
    id: "5",
    name: "Team Leader",
    title: "Team Leader - Breifne",
    department: "Breifne",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Experienced field ornithologist with expertise in habitat assessment and farmer engagement in High Nature Value areas.",
    email: "team.breifne@example.ie",
    phone: "085 000 0003"
  },
  {
    id: "6",
    name: "Team Leader",
    title: "Team Leader - Munster/South Connacht",
    department: "Munster South Connacht",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    bio: "Background in Agricultural Science with extensive experience in delivering results-based agri-environment schemes.",
    email: "team.munster@example.ie",
    phone: "085 000 0004"
  },
  {
    id: "7",
    name: "Operations Manager",
    title: "Operations Manager",
    department: "Admin & Technical",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Works across all ACRES CP areas, highly skilled in project coordination and farmer support services.",
    email: "operations@example.ie",
    phone: "085 000 0005"
  },
  {
    id: "8",
    name: "Communications Manager",
    title: "Communications Manager",
    department: "Admin & Technical",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Seasoned communications professional managing stakeholder engagement and programme communications.",
    email: "comms@example.ie",
    phone: "085 000 0006"
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const departments = ["All", "Leadership", "Breifne", "Munster South Connacht", "Leinster", "Admin & Technical"];

  const filteredMembers = filter === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated professionals behind the ACRES Co-operation Programme, 
              working to support farmers and restore Ireland's biodiversity.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={filter === dept ? "default" : "outline"}
                onClick={() => setFilter(dept)}
                className="transition-all"
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No team members found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Member Dialog */}
      <TeamMemberDialog
        member={selectedMember}
        open={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
      />

      <Footer />
    </div>
  );
};

export default Team;
