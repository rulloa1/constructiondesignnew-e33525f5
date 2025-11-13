// Deployment test - changes automatically deploy to mcdesign.bio
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageLoader from "@/components/PageLoader";

// Lazy load pages for code splitting and performance optimization
const Index = lazy(() => import("./pages/Index"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const Login = lazy(() => import("./pages/Login"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * TanStack Query client for managing server state, caching, and data synchronization
 * @see https://tanstack.com/query/latest
 */
const queryClient = new QueryClient();

/**
 * Higher-order function that wraps lazy-loaded components with Suspense boundary
 * Provides loading fallback UI while component code is being loaded
 *
 * @param Component - Lazy-loaded React component
 * @returns JSX element with Suspense wrapper
 */
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

/**
 * Application router configuration using React Router v6
 * All routes are lazy-loaded for optimal code splitting and performance
 *
 * Routes:
 * - / - Home page with hero, about, services sections
 * - /portfolio - Portfolio gallery with category filtering
 * - /project/:id - Individual project detail page
 * - /auth - Authentication page
 * - /login - Login page
 * - /admin - Admin dashboard (protected)
 * - /admin/users - User management (protected)
 * - * - 404 Not Found page
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Index),
  },
  {
    path: "/project/:id",
    element: withSuspense(ProjectDetail),
  },
  {
    path: "/portfolio",
    element: withSuspense(Portfolio),
  },
  {
    path: "/auth",
    element: withSuspense(Auth),
  },
  {
    path: "/admin",
    element: withSuspense(Admin),
  },
  {
    path: "/admin/users",
    element: withSuspense(AdminUsers),
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "*",
    element: withSuspense(NotFound),
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
});

/**
 * Main Application Component
 *
 * Root component that provides:
 * - Error boundary for graceful error handling
 * - React Query for server state management
 * - Supabase authentication state management
 * - Toast notifications (Toaster and Sonner)
 * - Tooltip provider for UI components
 * - Client-side routing
 *
 * @returns The complete application wrapped with necessary providers
 */
const App: React.FC = () => {
  /** Current authenticated user (if any) */
  const [user, setUser] = useState<User | null>(null);
  /** Current authentication session (if any) */
  const [session, setSession] = useState<Session | null>(null);

  /**
   * Set up Supabase authentication state listener
   * Listens for auth state changes and updates local state accordingly
   */
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Cleanup: unsubscribe from auth state changes on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
