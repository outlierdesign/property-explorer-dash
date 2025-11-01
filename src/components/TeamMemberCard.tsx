import { Card, CardContent } from "@/components/ui/card";
import { TeamMember } from "@/pages/Team";

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
}

export const TeamMemberCard = ({ member, onClick }: TeamMemberCardProps) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{member.title}</p>
          <p className="text-xs text-primary font-medium">{member.department}</p>
        </div>
      </CardContent>
    </Card>
  );
};
