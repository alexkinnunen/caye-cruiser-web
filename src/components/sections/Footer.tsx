import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground min-h-[1050px] flex flex-col justify-start">
      <div className="container mx-auto px-4 -pb-20 pt-10">
       
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
       
          <div className="space-y-4">
            <h4 className="text-2xl text-cocoa font-kensington">Quick Links</h4>
            <ul className="space-y-2 text-cocoa">
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
            <h4 className="text-2xl text-cocoa font-kensington">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#interactive-map"
                  className="text-cocoa hover:text-foreground transition-colors"
                >
                  Ride Sharing
                </a>
              </li>
              <li>
                <a
                  href="/cart-rentals"
                  className="text-cocoa hover:text-foreground transition-colors"
                >
                  Long Term Rentals
                </a>
              </li>
              <li>
                <a
                  href="/#interactive-map"
                  className="text-cocoa hover:text-foreground transition-colors"
                >
                  Island Tours
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-cocoa hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

     
          <div className="space-y-4">
            <h4 className="text-2xl text-cocoa font-kensington">Contact</h4>
            <div className="space-y-3 text-cocoa">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span className=" text-sm">
                  San Pedro, Ambergris Caye, Belize
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-sm hover:text-foreground transition-colors">
                  +{WHATSAPP_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm text-cocoa">
                  hello@cayecruiser.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[210px]  overflow-visible relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-max">
          <h1 className="text-cocoa font-grante xs:text-[17vh] sm:text-[17vh] md:text-[22vh] lg:text-[55vh] leading-none tracking-[0] whitespace-nowrap">
            CAYECRUISER
          </h1>
        </div>
        <div className="absolute top-0 right-4 text-cocoa text-sm">
          <p>© Authentically Belizean. Unmistakably Caye Cruiser. <span className="text-primary-foreground"> &#x2665; </span> All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
