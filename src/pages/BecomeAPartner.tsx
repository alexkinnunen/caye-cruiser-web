import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Car, CheckCircle, Clock, DollarSign, Heart, MapPin, Shield, Smartphone, TrendingUp, Users, Zap } from "lucide-react";

const BecomeAPartner = () => {
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const partnerTypes = [
    { title: "Individual Drivers", icon: <Users className="w-8 h-8" />, description: "Local residents with golf carts looking to earn flexible income", benefits: ["70% commission on every ride", "Flexible scheduling around your life", "Use your own golf cart", "Community engagement opportunities", "Tourist interaction and local pride"], requirements: ["Valid driver's license (18+ years)", "Local San Pedro residency", "Golf cart with current insurance", "Clean driving record", "Smartphone with WhatsApp"], cta: "Start Driving", ctaMessage: "I'm interested in becoming a Caye Cruiser driver" },
    { title: "Golf Cart Rental Companies", icon: <Car className="w-8 h-8" />, description: "Established rental businesses seeking additional revenue streams", benefits: ["Additional income from idle inventory", "Reduced wear on premium rental carts", "Data insights on demand patterns", "Marketing reach to new customers", "Revenue sharing: 70% partner, 30% platform"], requirements: ["Established golf cart rental business", "Fleet of 5+ available carts", "Current business licenses", "Comprehensive insurance coverage", "Commitment to training drivers"], cta: "Partner with Us", ctaMessage: "I represent a golf cart rental company interested in partnering" },
    { title: "Hotels & Resorts", icon: <Building2 className="w-8 h-8" />, description: "Accommodation providers wanting to enhance guest services", benefits: ["Enhanced guest transportation services", "Reduced front desk coordination", "Commission sharing opportunities", "Preferred booking status for guests", "Improved guest satisfaction scores"], requirements: ["Licensed accommodation business", "Guest capacity of 20+ rooms", "Concierge or front desk services", "Commitment to promoting service", "Guest feedback participation"], cta: "Enhance Guest Experience", ctaMessage: "I'm interested in a hotel partnership with Caye Cruiser" },
  ];
  const whyPartner = [
    { icon: <TrendingUp className="w-6 h-6 text-green" />, title: "Growing Market", description: "20,000+ residents and thousands of tourists year-round on a 2.5 square mile island" },
    { icon: <Smartphone className="w-6 h-6 text-green" />, title: "WhatsApp Integration", description: "Easy-to-use platform that locals and tourists already know and trust" },
    { icon: <MapPin className="w-6 h-6 text-green" />, title: "First-Mover Advantage", description: "Be part of the first organized ride-sharing system in San Pedro" },
    { icon: <Heart className="w-6 h-6 text-green" />, title: "Community Impact", description: "Help solve real transportation challenges for locals and tourists alike" },
  ];
  const supportFeatures = [
    { icon: <Shield className="w-6 h-6" />, title: "Insurance Coverage", description: "Comprehensive insurance protection for all partners and passengers" },
    { icon: <Clock className="w-6 h-6" />, title: "24/7 Support", description: "Round-the-clock customer support for partners and riders" },
    { icon: <Zap className="w-6 h-6" />, title: "Real-Time Tracking", description: "GPS tracking and automated matching system for efficiency" },
    { icon: <DollarSign className="w-6 h-6" />, title: "Transparent Payments", description: "Clear commission structure with prompt payment processing" },
  ];
  const handlePartnerContact = (message: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <section>
        <div className="container mx-auto mb-12  px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6">Partner with <span className="text-green">Caye Cruiser</span></h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Join our network of local drivers and businesses to earn more, serve the community, and help us provide San Pedro's first organized ride-sharing service.</p>
            <Button size="lg" variant="link" onClick={() => handlePartnerContact("I'm interested in learning more about partnership opportunities with Caye Cruiser")}>Start Your Partnership Journey</Button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPartner.map((reason, index) => (<Card key={index} className="text-center hover:shadow-lg transition-shadow"><CardHeader><div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">{reason.icon}</div><CardTitle className="text-lg">{reason.title}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground text-sm">{reason.description}</p></CardContent></Card>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Partnership Opportunities</h2><p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the partnership model that fits your business or lifestyle.</p></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerTypes.map((partner, index) => (<Card key={index} className="h-full flex flex-col hover:shadow-xl transition-all duration-300"><CardHeader className="text-center"><div className="w-16 h-16 bg-med-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-med-purple">{partner.icon}</div><CardTitle className="text-xl font-serif">{partner.title}</CardTitle><p className="text-muted-foreground text-sm">{partner.description}</p></CardHeader><CardContent className="flex-grow"><div className="mb-6"><h4 className="font-semibold mb-3 text-med-purple">Benefits:</h4><ul className="space-y-2">{partner.benefits.map((benefit, i) => (<li key={i} className="flex items-start text-sm"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />{benefit}</li>))}</ul></div><div className="mb-6"><h4 className="font-semibold mb-3 text-med-purple">Requirements:</h4><ul className="space-y-2">{partner.requirements.map((req, i) => (<li key={i} className="flex items-start text-sm text-muted-foreground"><div className="w-2 h-2 bg-muted-foreground/50 rounded-full mr-2 mt-2 flex-shrink-0" />{req}</li>))}</ul></div></CardContent><div className="p-6 pt-0"><Button className="w-full" variant="link" onClick={() => handlePartnerContact(partner.ctaMessage)}>{partner.cta}</Button></div></Card>))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Partner Support & Features</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">We provide comprehensive support to ensure your success as a Caye Cruiser partner.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportFeatures.map((feature, index) => (<Card key={index} className="text-center hover:shadow-lg transition-shadow border-border/50"><CardHeader><div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-green">{feature.icon}</div><CardTitle className="text-lg">{feature.title}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground text-sm">{feature.description}</p></CardContent></Card>))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomeAPartner;