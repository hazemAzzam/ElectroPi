"use client";

import React from "react";
import { AuthUser } from "../_domain/auth";

type SiteContextType = {
  loggedIn: boolean;
  user: AuthUser | null;
  handleLogin: (user: AuthUser) => void;
  handleLogout: () => void;
};

const SiteContext = React.createContext<SiteContextType>({
  loggedIn: false,
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

export default function SiteProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);

  const handleLogin = React.useCallback((user: AuthUser) => {
    setUser(user);
  }, []);

  const handleLogout = React.useCallback(() => {
    setUser(null);
  }, []);

  return (
    <SiteContext.Provider
      value={{
        loggedIn: user !== null,
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export const useSiteContext = () => React.useContext(SiteContext);
