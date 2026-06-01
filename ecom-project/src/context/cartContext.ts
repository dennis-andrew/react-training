import { createContext } from "react";
import type { CartItem } from "../data/cartItems";
import type { Product } from "../data/products";

export type CartContextValue = {
  cartItems: CartItem[];
  addCartItem: (product: Product, quantity: number) => void;
  removeCartItem: (productId: number) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
