import { Outlet } from "react-router-dom";
import FloatingMapButton from "@/components/ui/FloatingMapButton";
import BottomNav from "@/components/sections/BottomNav";
import Footer from "@/components/sections/Footer";

const Layout = () => {
  return (
    <>
    <main className="relative w-full overflow-x-hidden">
            <FloatingMapButton />
            <Outlet />
            <BottomNav />
            <Footer />
       </main>
    </>
  );
};

export default Layout;