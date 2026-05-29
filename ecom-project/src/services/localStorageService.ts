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

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const CUSTOMER_REVIEWS_KEY = "furniro_customer_reviews";
const CART_ITEMS_KEY = "furniro_cart_items";
const CART_ITEMS_UPDATED_EVENT = "furniro_cart_items_updated";
const USERS_KEY = "furniro_users";
const CURRENT_USER_KEY = "furniro_current_user";
const AUTH_UPDATED_EVENT = "furniro_auth_updated";

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

const getUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    return JSON.parse(storedUsers) as User[];
  } catch {
    return [];
  }
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getCurrentUser = () => {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  window.dispatchEvent(new Event(AUTH_UPDATED_EVENT));
};

const signUp = (name: string, email: string, password: string) => {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  saveUsers([...users, newUser]);
  setCurrentUser(newUser);

  return { ok: true, message: "Signup successful." };
};

const login = (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find(
    (storedUser) =>
      storedUser.email === normalizedEmail && storedUser.password === password,
  );

  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  setCurrentUser(user);

  return { ok: true, message: "Login successful." };
};

const logout = () => {
  setCurrentUser(null);
};

const localStorageService = {
  addCartItem,
  authUpdatedEvent: AUTH_UPDATED_EVENT,
  cartItemsUpdatedEvent: CART_ITEMS_UPDATED_EVENT,
  getCurrentUser,
  getCustomerReviews,
  getCartItems,
  login,
  logout,
  saveCustomerReviews,
  saveCartItems,
  signUp,
};

export default localStorageService;
