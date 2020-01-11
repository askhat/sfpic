import { createContext } from "react";

export interface UserContext<I, E> {
  profile: I;
  error: E;
  isAuth: boolean;
  isLoading: boolean;
  login(): void;
  logout(): void;
}

export const User = createContext<UserContext<IdToken, AuthenticationResult>>(null!);
