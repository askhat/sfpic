import { createContext } from "react";
import { Auth0UserProfile, Auth0Error } from "auth0-js";

export interface UserContext<P, E> {
  profile: P;
  error: E;
  isAuth: boolean;
  isLoading: boolean;
  login(): void;
  logout(): void;
}

export const User = createContext<UserContext<Auth0UserProfile, Auth0Error>>(null!);
