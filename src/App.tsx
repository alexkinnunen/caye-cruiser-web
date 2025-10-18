// src/App.tsx

import { Toaster as Sonner } from "sonner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Main from "@/pages/Main";
import BecomeAPartner from "@/pages/BecomeAPartner";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/pages/NotFound";
import CartRentals from "@/components/sections/CartRentals";
import { useLenis } from "@/hooks/useLenis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "cart-rentals", element: <CartRentals /> },
      { path: "become-a-partner", element: <BecomeAPartner /> },
      {
        path: "user-account",
        element: (
          <ProtectedRoute>
            <AccountPage type="rider" />
          </ProtectedRoute>
        ),
      },
      {
        path: "partner-account",
        element: (
          <ProtectedRoute>
            <AccountPage type="partner" />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <>
      <Sonner richColors />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
