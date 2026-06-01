import { useState, type ReactNode } from "react";
import { CartContext } from "./cartContext";
import type { CartItem } from "../data/cartItems";
import type { Product } from "../data/products";
import localStorageService from "../services/localStorageService";

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    localStorageService.getCartItems(),
  );

  const addCartItem = (product: Product, quantity: number) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      const updatedItems = existingItem
        ? currentItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...currentItems, { product, quantity }];

      localStorageService.saveCartItems(updatedItems);
      return updatedItems;
    });
  };

  const removeCartItem = (productId: number) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (item) => item.product.id !== productId,
      );

      localStorageService.saveCartItems(updatedItems);
      return updatedItems;
    });
  };

  return (
    <CartContext value={{ addCartItem, cartItems, removeCartItem }}>
      {children}
    </CartContext>
  );
};

export default CartProvider;
