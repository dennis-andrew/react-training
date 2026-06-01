import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import localStorageService from "../services/localStorageService";
import type { User } from "../services/localStorageService";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    localStorageService.getCurrentUser(),
  );

  const login = (username: string, password: string) => {
    const result = localStorageService.login(username, password);

    if (result.ok) {
      setCurrentUser(localStorageService.getCurrentUser());
    }

    return result;
  };

  const signUp = (
    username: string,
    email: string,
    password: string,
    gender: string,
    address: string,
  ) => {
    const result = localStorageService.signUp(
      username,
      email,
      password,
      gender,
      address,
    );

    if (result.ok) {
      setCurrentUser(localStorageService.getCurrentUser());
    }

    return result;
  };

  const logout = () => {
    localStorageService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext value={{ currentUser, login, logout, signUp }}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
