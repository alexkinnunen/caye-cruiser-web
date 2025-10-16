import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground min-h-[800px] pb-20 flex flex-col justify-end">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold">Caye Cruiser</h3>
            </div>
            <p className="text-white leading-relaxed">
              Your trusted island transportation partner.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

 
          <div className="space-y-4">
            <h4 className="text-lg font-brushstrokes">Quick Links</h4>
            <ul className="space-y-2 text-white">
              <li>
                <a
                  href="/become-a-partner"
                  className="hover:text-foreground transition-colors"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="hover:text-foreground transition-colors"
                >
                  Catch a Cruiser
                </a>
              </li>
              <li>
                <a
                  href="/#rentals"
                  className="hover:text-foreground transition-colors"
                >
                  Rentals
                </a>
              </li>
            </ul>
          </div>


          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#interactive-map"
                  className="text-white hover:text-foreground transition-colors"
                >
                  Ride Sharing
                </a>
              </li>
              <li>
                <a
                  href="/cart-rentals"
                  className="text-white hover:text-foreground transition-colors"
                >
                  Long Term Rentals
                </a>
              </li>
              <li>
                <a
                  href="/#interactive-map"
                  className="text-white hover:text-foreground transition-colors"
                >
                  Island Tours
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-white hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

     
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3 text-white">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span className=" text-sm">
                  San Pedro, Ambergris Caye, Belize
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span className="text-sm">
                  +501-XXX-XXXX
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm text-primary">
                  hello@cayecruiser.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-5 pt-8 text-white text-sm">
          <p>© Authentically Belizean. Unmistakably Caye Cruiser. <span className="text-primary-foreground"> &#x2665; </span> All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
