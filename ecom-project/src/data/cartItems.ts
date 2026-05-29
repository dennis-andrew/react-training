import { products } from "./products";

export const cartItems = [
  {
    product: products[13],
    quantity: 1,
  },
];

export type CartItem = (typeof cartItems)[number];
