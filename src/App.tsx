// src/App.tsx

import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "sonner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useLenis } from "@/hooks/useLenis";

// Lazy load pages for code splitting
const Main = lazy(() => import("@/pages/Home"));
const BecomeAPartner = lazy(() => import("@/pages/BecomeAPartner"));
const AccountPage = lazy(() => import("@/pages/AccountPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-sand">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cocoa border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-cocoa font-grante text-lg">Loading...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "become-a-partner",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BecomeAPartner />
          </Suspense>
        ),
      },
      {
        path: "user-account",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <AccountPage type="rider" />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "partner-account",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <AccountPage type="partner" />
            </ProtectedRoute>
          </Suspense>
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
