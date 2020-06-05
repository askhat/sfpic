import { createContext } from "react";

export interface UserContext {
  profile: IdToken;
  error: Error;
  isAuth: boolean;
  isLoading: boolean;
  login(): void;
  logout(): void;
}

// ! don't use
export const User = createContext<UserContext>(null!);
