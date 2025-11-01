import { Facebook, Twitter, Instagram, Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ACRES Ireland</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Supporting Irish farmers to manage their land in harmony with nature through the Co-operation Programme.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Actions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">All Actions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Non-Productive Investments</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Landscape Actions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Funding Information</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Programme</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About ACRES CP</a></li>
              <li><a href="/team" className="hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Eligibility</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How to Apply</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact CP Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Guidance Documents</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Score Card System</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Farm Advisors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 ACRES Ireland Co-operation Programme. Supporting High Nature Value farming across Ireland.</p>
        </div>
      </div>
    </footer>
  );
};
