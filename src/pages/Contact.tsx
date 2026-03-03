import { DesktopNav } from "@/components/DesktopNav";
import { MobileHeader } from "@/components/MobileHeader";
import { Footer } from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { regions } from "@/data/teamData";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const { contact, partners } = siteContent;

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />

      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            {contact.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get in touch with the ACRES Co-operation Programme. Our team is here
            to help farmers and advisors across Ireland.
          </p>
        </div>
      </section>

      {/* Main Office */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Head Office</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{contact.mainOffice.name}</p>
                    <p className="text-muted-foreground">
                      {contact.mainOffice.address}
                    </p>
                    <p className="text-muted-foreground">
                      {contact.mainOffice.eircode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${contact.mainOffice.phone}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {contact.mainOffice.phone}
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-3">Regional Email Contacts</h3>
                <div className="space-y-2">
                  {contact.regionalEmails.map((re) => (
                    <div key={re.email} className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <span className="text-sm text-muted-foreground mr-2">
                          {re.region}:
                        </span>
                        <a
                          href={`mailto:${re.email}`}
                          className="text-primary hover:underline text-sm"
                        >
                          {re.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href={contact.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href={contact.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href={contact.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href={contact.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Regional Offices</h2>
              <div className="space-y-4">
                {regions.map((region) => (
                  <Link
                    key={region.id}
                    to={`/regions/${region.slug}`}
                    className="block rounded-xl border p-5 bg-background hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-primary">
                        ACRES {region.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {region.office.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {region.office.eircode}
                    </p>
                    {region.office.phone && (
                      <p className="text-sm text-primary mt-1">
                        {region.office.phone}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Government & EU Partners
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={partners.dafm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {partners.dafm.name}
            </a>
            <a
              href={partners.euCap.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {partners.euCap.name}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
