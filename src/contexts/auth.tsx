// Consolidated Auth Context, Provider, and Hook
// Combines: authContext.ts, authProvider.tsx, useAuth.ts

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/client";
import {
  AuthChangeEvent,
  AuthError,
  AuthResponse,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";

// ============================================================================
// Types
// ============================================================================

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (
    credentials: SignInWithPasswordCredentials,
  ) => Promise<AuthResponse["data"]>;
  signUpWithEmail: (
    credentials: SignUpWithPasswordCredentials,
  ) => Promise<AuthResponse["data"]>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

// ============================================================================
// Context
// ============================================================================

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    // Skip auth initialization if Supabase is not configured
    if (!isSupabaseConfigured()) {
      if (import.meta.env.DEV) {
        console.warn("⚠️  Supabase not configured - auth features disabled");
      }
      setLoading(false);
      return;
    }

    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) setError(error);
        else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setError(null);
        setLoading(false);
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const clearError = () => setError(null);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      const configError = new Error("Supabase not configured. Add credentials to .env.local") as AuthError;
      setError(configError);
      return;
    }
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setError(error);
  };

  const signInWithEmail = async (credentials: SignInWithPasswordCredentials): Promise<AuthResponse["data"]> => {
    if (!isSupabaseConfigured()) {
      const configError = new Error("Supabase not configured. Add credentials to .env.local") as AuthError;
      setError(configError);
      throw configError;
    }
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      setError(error);
      throw error;
    }
    return data;
  };

  const signUpWithEmail = async (credentials: SignUpWithPasswordCredentials): Promise<AuthResponse["data"]> => {
    if (!isSupabaseConfigured()) {
      const configError = new Error("Supabase not configured. Add credentials to .env.local") as AuthError;
      setError(configError);
      throw configError;
    }
    setError(null);
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) {
      setError(error);
      throw error;
    }
    return data;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      return;
    }
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error);
  };

  const value = {
    session,
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ============================================================================
// Hook
// ============================================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
