import { cartItems } from "../data/cartItems";
import type { CartItem } from "../data/cartItems";
import type { Product } from "../data/products";

export type CustomerReview = {
  id: number;
  name: string;
  rating: number;
  message: string;
  imageUrl?: string;
};

const CUSTOMER_REVIEWS_KEY = "furniro_customer_reviews";
const CART_ITEMS_KEY = "furniro_cart_items";
const CART_ITEMS_UPDATED_EVENT = "furniro_cart_items_updated";

const getCustomerReviews = () => {
  const storedReviews = localStorage.getItem(CUSTOMER_REVIEWS_KEY);

  if (!storedReviews) {
    return [];
  }

  try {
    return JSON.parse(storedReviews) as CustomerReview[];
  } catch {
    return [];
  }
};

const saveCustomerReviews = (reviews: CustomerReview[]) => {
  localStorage.setItem(CUSTOMER_REVIEWS_KEY, JSON.stringify(reviews));
};

const getCartItems = () => {
  const storedItems = localStorage.getItem(CART_ITEMS_KEY);

  if (!storedItems) {
    return cartItems;
  }

  try {
    return JSON.parse(storedItems) as CartItem[];
  } catch {
    return cartItems;
  }
};

const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_ITEMS_UPDATED_EVENT));
};

const addCartItem = (product: Product, quantity: number) => {
  const currentItems = getCartItems();
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

  saveCartItems(updatedItems);
};

const localStorageService = {
  addCartItem,
  cartItemsUpdatedEvent: CART_ITEMS_UPDATED_EVENT,
  getCustomerReviews,
  getCartItems,
  saveCustomerReviews,
  saveCartItems,
};

export default localStorageService;
