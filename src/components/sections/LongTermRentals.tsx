import GolfCarts from "@/components/images/golf-carts-on-san-pedro-beach.jpg";
import Squiggle from "@/components/images/squiggle.svg";
import Asset10 from "@/components/images/hero/Asset 10.svg";
import { Car, Crown, Leaf, Users } from "lucide-react";

const LongTermRentals = () => {
  // Vehicle rental data
  const rentals = [
    {
      name: "ECO CAYE",
      type: "Electric",
      icon: Leaf,
      passengers: "2-4",
      weeklyRate: 400,
      monthlyRate: 1200,
      colorBlock: "color-block-ocean",
      textColor: "text-secondary",
      popular: false,
    },
    {
      name: "CAYE CRUISER",
      type: "Gas",
      icon: Car,
      passengers: "4-6",
      weeklyRate: 500,
      monthlyRate: 1500,
      colorBlock: "color-block-lime",
      textColor: "text-primary",
      popular: true,
    },
    {
      name: "CAYE CREW",
      type: "Family 6-Seater",
      icon: Users,
      passengers: "6",
      weeklyRate: 600,
      monthlyRate: 1800,
      colorBlock: "color-block-cocoa",
      textColor: "text-cocoa",
      popular: false,
    },
  ];

  return (
    <div className="w-full relative py-20 md:py-32 overflow-hidden bg-sand">
      {/* Large Background Shape - Ocean Blue */}
      <div className="absolute top-0 right-0 w-1/2 h-full color-block-ocean opacity-10 -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="font-grante text-cocoa leading-none mb-6">
            <span className="block text-6xl md:text-8xl lg:text-9xl">STAY</span>
            <span className="block text-6xl md:text-8xl lg:text-9xl text-primary">
              LONGER,
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl">
              CRUISE DAILY
            </span>
          </h2>

          <p className="text-2xl md:text-3xl font-kensington text-secondary italic max-w-xl">
            Weekly & Monthly Rental Options
          </p>

          {/* Decorative Squiggle */}
          <div className="absolute right-0 top-0 w-64 h-64 opacity-20 -z-10 hidden xl:block">
            <img
              src={Squiggle}
              alt=""
              className="w-full h-full object-contain geometric-rotate-minus-3"
            />
          </div>
        </div>

        {/* Vehicle Rental Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rentals.map((rental, index) => {
            const IconComponent = rental.icon;

            return (
              <div key={rental.name} className="relative group cursor-pointer">
                {/* Popular Badge */}
                {rental.popular && (
                  <div className="absolute -top-4 -right-4 z-20 bg-primary text-white px-4 py-2 font-grante text-sm uppercase brutalist-border">
                    Most Popular
                  </div>
                )}

                {/* Geometric Color Block Background */}
                <div
                  className={`absolute -inset-4 ${rental.colorBlock} opacity-20 geometric-rotate-${index % 2 === 0 ? "3" : "minus-3"} -z-10 transition-transform group-hover:rotate-0`}
                />

                {/* Main Card */}
                <div className="bg-white brutalist-border overflow-hidden transition-all group-hover:shadow-2xl">
                  {/* Vehicle Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={GolfCarts}
                      alt={rental.name}
                      className="w-full h-full object-cover brutalist-image transition-transform group-hover:scale-105"
                    />

                    {/* Icon Overlay */}
                    <div
                      className={`absolute top-4 right-4 w-16 h-16 bg-white/90 flex items-center justify-center ${rental.textColor}`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Vehicle Name */}
                    <h3 className="font-grante text-3xl text-cocoa mb-2">
                      {rental.name}
                    </h3>

                    {/* Specs */}
                    <p className="text-muted-foreground mb-6">
                      {rental.type} · {rental.passengers} passengers
                    </p>

                    {/* Pricing Section */}
                    <div className="border-t border-border pt-4">
                      {/* Weekly Rate */}
                      <div className="mb-4">
                        <div
                          className={`font-grante text-5xl ${rental.textColor} mb-1`}
                        >
                          ${rental.weeklyRate}
                        </div>
                        <p className="text-lg font-semibold">per week</p>
                      </div>

                      {/* Monthly Rate */}
                      <div className="bg-muted/50 -mx-6 -mb-6 px-6 py-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Monthly Rate
                        </p>
                        <p className="font-grante text-2xl text-foreground">
                          ${rental.monthlyRate}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Save ${rental.weeklyRate * 4 - rental.monthlyRate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Option - Full Width Card */}
        <div className="relative group cursor-pointer mb-24">
          {/* Large Geometric Shape */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-96 h-96 color-block-cocoa opacity-20 geometric-circle -z-10 hidden lg:block" />

          {/* Geometric Color Block */}
          <div className="absolute -inset-6 color-block-cocoa opacity-10 geometric-rotate-3 -z-10" />

          {/* Main Card */}
          <div className="bg-white brutalist-border-thick overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Section */}
              <div className="lg:col-span-5 relative h-80 lg:h-auto">
                <img
                  src={GolfCarts}
                  alt="Luxe Cruiser"
                  className="w-full h-full object-cover brutalist-image"
                />

                {/* Premium Badge */}
                <div className="absolute top-6 left-6 bg-cocoa text-white px-6 py-3 brutalist-border">
                  <Crown className="w-6 h-6 inline-block mr-2" />
                  <span className="font-grante text-lg uppercase">
                    Premium
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-grante text-5xl md:text-6xl text-cocoa mb-4">
                  LUXE CRUISER
                </h3>

                <p className="text-xl text-muted-foreground mb-6">
                  Premium Gas · 4 passengers · Built-in Cooler · VIP Experience
                </p>

                <p className="text-lg text-foreground mb-8 max-w-xl">
                  Elevate your island experience with our premium cart featuring
                  enhanced comfort, premium seating, built-in cooler, and
                  priority service.
                </p>

                {/* Pricing Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Weekly Rate
                    </p>
                    <p className="font-grante text-5xl text-cocoa">$750</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Monthly Rate
                    </p>
                    <p className="font-grante text-5xl text-primary">$2,250</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Save $750
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="relative group px-8 py-4 bg-cocoa text-white font-grante text-lg uppercase tracking-wide overflow-hidden brutalist-border inline-block w-fit">
                  <span className="relative z-10">Reserve Premium</span>
                  <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Savings & CTA */}
        <div className="mt-32 relative">
          {/* Massive Background Text */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
            <img
              src={Asset10}
              alt=""
              className="w-full max-w-6xl object-contain"
            />
          </div>

          {/* Split Layout - Negative Space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left - Large Number Typography */}
            <div className="relative">
              <div className="font-grante text-[12rem] md:text-[16rem] lg:text-[20rem] leading-none text-primary opacity-20 select-none">
                +40%
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="font-grante text-3xl md:text-4xl text-cocoa">
                  SAVINGS
                </p>
                <p className="text-xl text-muted-foreground">
                  on monthly plans
                </p>
              </div>
            </div>

            {/* Right - Text Block & CTA */}
            <div className="relative neg-space-md">
              <h3 className="font-kensington text-4xl md:text-5xl text-secondary italic mb-6">
                Your Island Home Deserves an Island Ride
              </h3>
              <p className="text-lg text-foreground leading-relaxed mb-8">
                Whether you're staying for a season or setting up island life,
                our long-term rental plans give you the freedom to explore San
                Pedro on your own terms. No surge pricing, no surprises—just
                honest island service.
              </p>

              {/* View All CTA */}
              <button className="relative group px-10 py-5 bg-primary text-white font-grante text-xl uppercase tracking-wide overflow-hidden brutalist-border">
                <span className="relative z-10">View All Rentals</span>
                <div className="absolute inset-0 bg-cocoa transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongTermRentals;
