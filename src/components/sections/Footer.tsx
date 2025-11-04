import { WHATSAPP_NUMBER } from "@/lib/constants";

const Footer = () => {
  return (
        <footer
          className="bg-primary text-primary-foreground min-h-[900px] -mt-24 w-full relative"
          style={{
            clipPath: 'polygon(0% 25px, 5% 35px, 10% 28px, 15% 45px, 20% 38px, 25% 55px, 30% 48px, 35% 70px, 40% 62px, 45% 80px, 50% 75px, 55% 85px, 60% 78px, 65% 70px, 70% 60px, 75% 50px, 80% 55px, 85% 48px, 90% 58px, 95% 52px, 100% 60px, 100% 100%, 0% 100%)'
          }}
        >
           <div className="absolute top-64 left-10 text-sand text-lg z-10 flex flex-col gap-4">
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-sand text-lg hover:text-foreground transition-colors">
                  +{WHATSAPP_NUMBER}
                </a>
                <div className="text-sand text-lg hover:text-foreground transition-colors">
                  hello@cayecruiser.com
                </div>
                <p>© Authentically Belizean. Unmistakably Caye Cruiser. San Pedro, Ambergris Caye, Belize <span className="text-sand"> &#x2665; </span></p>
              </div>
                

      <div className="w-full pt-[350px] overflow-visible relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 w-max">
          <h1 className="text-sand font-grante xs:text-[17vh] sm:text-[17vh] md:text-[22vh] lg:text-[55vh] leading-none tracking-[0] whitespace-nowrap">
            CAYECRUISER
          </h1>
        </div>
      </div>
    </footer>
  
   
  );
};

export default Footer;
