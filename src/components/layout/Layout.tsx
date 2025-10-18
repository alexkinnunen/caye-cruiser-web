import { Outlet } from "react-router-dom";
import FloatingMapButton from "@/components/ui/FloatingMapButton";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";

const Layout = () => {
  return (
    <>
    <main className="relative">
      <BottomNav />
      <Outlet />
      <FloatingMapButton />
      <Footer />
       </main>
    </>
  );
};

export default Layout;