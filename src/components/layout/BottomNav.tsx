import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navLinks = [
    { name: "CRUISE", path: "/" },
    { name: "CART RENTALS", path: "/cart-rentals" },
    { name: "PARTNER WITH US", path: "/become-a-partner" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cocoa z-[110] border-cocoa/20" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Branding on left */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl lg:text-4xl font-grante text-sand tracking-[0] leading-none whitespace-nowrap">
              CayeCruiser
            </h1>
          </div>

          {/* Navigation links on right */}
          <div className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm lg:text-base text-sand hover:text-primary transition-colors duration-200"
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
