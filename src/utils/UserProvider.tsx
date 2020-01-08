import React from "react";
import { useAuth0 } from "~hooks";
import { User } from "~context";

interface Props {
  children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  return <User.Provider value={useAuth0()}>{children}</User.Provider>;
}
