import { createContext } from "react";
import type { User } from "../services/localStorageService";

export type AuthResult = {
  ok: boolean;
  message: string;
};

export type AuthContextValue = {
  currentUser: User | null;
  login: (username: string, password: string) => AuthResult;
  logout: () => void;
  signUp: (
    username: string,
    email: string,
    password: string,
    gender: string,
    address: string,
  ) => AuthResult;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
