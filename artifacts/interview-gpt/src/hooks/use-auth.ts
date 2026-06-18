import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const AUTH_KEY = "interviewgpt_auth";

export interface AuthUser {
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (email: string, name: string) => {
    const u: AuthUser = { name, email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return { user, login, logout, isAuthenticated: !!user };
}

export function useRequireAuth() {
  const [, navigate] = useLocation();
  const auth = useAuth();
  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login");
  }, [auth.isAuthenticated, navigate]);
  return auth;
}
