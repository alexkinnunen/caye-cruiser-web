import { Outlet } from "react-router-dom";
import FloatingMapButton from "@/components/ui/FloatingMapButton";
import BottomNav from "@/components/sections/BottomNav";

const Layout = () => {
  return (
    <>
    <main className="relative w-full overflow-x-hidden">
            <FloatingMapButton />
             <BottomNav />
            <Outlet />
       </main>
    </>
  );
};

export default Layout;