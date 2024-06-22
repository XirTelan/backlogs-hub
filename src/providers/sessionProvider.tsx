"use client";
import { createContext, useContext, useState } from "react";

const defaultValue: {
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
} = { user: null };

const SessionContext = createContext(defaultValue);

export function Session({
  userData,
  children,
}: {
  userData: typeof defaultValue;
  children: React.ReactNode;
}) {
  const [user] = useState(userData);

  return (
    <SessionContext.Provider value={user}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
