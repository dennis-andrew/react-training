import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import localStorageService from "../services/localStorageService";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUser = localStorageService.getCurrentUser();

  if (!currentUser) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
