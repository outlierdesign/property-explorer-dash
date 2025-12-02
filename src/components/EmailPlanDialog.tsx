import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FavoriteAction } from "@/hooks/useFavorites";
import { Loader2 } from "lucide-react";

interface EmailPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favorites: FavoriteAction[];
  totalEstimate: number;
}

export const EmailPlanDialog = ({ open, onOpenChange, favorites, totalEstimate }: EmailPlanDialogProps) => {
  // Load sender email from localStorage on mount
  const [senderEmail, setSenderEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sender_email') || "";
    }
    return "";
  });
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!senderEmail || !recipientEmail) {
      toast({
        title: "Missing information",
        description: "Please enter both sender and recipient email addresses.",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail) || !emailRegex.test(recipientEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter valid email addresses.",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-action-plan', {
        body: {
          senderEmail,
          recipientEmail,
          message,
          favorites: favorites.map(f => ({
            title: f.action.title,
            category: f.action.category,
            description: f.action.description,
            paymentRate: f.action.payment_rate,
            paymentUnit: f.action.payment_unit,
            calculatedTotal: f.calculatedTotal,
            customQuantities: f.customQuantities
          })),
          totalEstimate
        }
      });

      if (error) throw error;

      // Save sender email to localStorage for future use
      localStorage.setItem('sender_email', senderEmail);

      toast({
        title: "Email sent!",
        description: `Your action plan has been sent to ${recipientEmail}`
      });
      
      onOpenChange(false);
      setRecipientEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to send email",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Email Your Action Plan</DialogTitle>
          <DialogDescription>
            Send your shortlist of {favorites.length} actions with a total estimate of €{totalEstimate.toFixed(2)}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="sender">Your Email</Label>
            <Input
              id="sender"
              type="email"
              placeholder="your@email.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              autoComplete="email"
            />
            {senderEmail && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) && (
              <p className="text-xs text-destructive">Please enter a valid email address</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Email</Label>
            <Input
              id="recipient"
              type="email"
              placeholder="recipient@email.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              autoComplete="email"
            />
            {recipientEmail && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) && (
              <p className="text-xs text-destructive">Please enter a valid email address</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Optional Message</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
