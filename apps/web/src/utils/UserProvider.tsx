import React from "react";

import { User } from "../context";
import { useAuth0 } from "../hooks";

interface Props {
  children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  return <User.Provider value={useAuth0()}>{children}</User.Provider>;
}
