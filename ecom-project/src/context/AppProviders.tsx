import type { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import CartProvider from "./CartProvider";
import useAuth from "../hooks/useAuth";

type AppProvidersProps = {
  children: ReactNode;
};

const CartProviderForUser = ({ children }: AppProvidersProps) => {
  const { currentUser } = useAuth();

  return (
    <CartProvider key={currentUser?.id ?? "guest"}>{children}</CartProvider>
  );
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <CartProviderForUser>{children}</CartProviderForUser>
    </AuthProvider>
  );
};

export default AppProviders;
