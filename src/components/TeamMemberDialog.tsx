import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamMember } from "@/pages/Team";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMemberDialogProps {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeamMemberDialog = ({ member, open, onOpenChange }: TeamMemberDialogProps) => {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{member.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header with Image */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-48 aspect-square rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-lg text-muted-foreground mb-2">{member.title}</p>
              <p className="text-sm font-medium text-primary mb-4">{member.department}</p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                {member.email && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={`mailto:${member.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      {member.email}
                    </a>
                  </Button>
                )}
                {member.phone && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={`tel:${member.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {member.phone}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
