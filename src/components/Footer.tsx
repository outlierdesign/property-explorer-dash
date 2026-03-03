import { Facebook, Twitter, Instagram, Linkedin, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { siteContent } from "@/data/siteContent";

export const Footer = () => {
  const { socialMedia } = siteContent.contact;

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ACRES Ireland</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Supporting Irish farmers to manage their land in harmony with
              nature through the Co-operation Programme.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Actions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors"
                >
                  All Actions
                </Link>
              </li>
              <li>
                <Link
                  to="/?stream=NPI"
                  className="hover:text-primary transition-colors"
                >
                  Non-Productive Investments
                </Link>
              </li>
              <li>
                <Link
                  to="/?stream=LA"
                  className="hover:text-primary transition-colors"
                >
                  Landscape Actions
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="hover:text-primary transition-colors"
                >
                  NPI Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Programme</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About ACRES CP
                </Link>
              </li>
              <li>
                <Link
                  to="/what-we-do"
                  className="hover:text-primary transition-colors"
                >
                  What We Do
                </Link>
              </li>
              <li>
                <Link
                  to="/farming"
                  className="hover:text-primary transition-colors"
                >
                  Farming
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Regions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/regions/breifne"
                  className="hover:text-primary transition-colors"
                >
                  Breifne
                </Link>
              </li>
              <li>
                <Link
                  to="/regions/munster-south-connacht"
                  className="hover:text-primary transition-colors"
                >
                  Munster South Connacht
                </Link>
              </li>
              <li>
                <Link
                  to="/regions/leinster"
                  className="hover:text-primary transition-colors"
                >
                  Leinster
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="hover:text-primary transition-colors"
                >
                  Videos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} ACRES Ireland Co-operation Programme.
            Supporting High Nature Value farming across Ireland.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.gov.ie/en/organisation/department-of-agriculture-food-and-the-marine/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              DAFM
            </a>
            <a
              href="https://agriculture.ec.europa.eu/common-agricultural-policy_en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              EU CAP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
