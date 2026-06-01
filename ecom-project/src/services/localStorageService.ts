import type { CartItem } from "../data/cartItems";

export type CustomerReview = {
  id: number;
  name: string;
  rating: number;
  message: string;
  imageUrl?: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  gender: string;
  address: string;
};

const CUSTOMER_REVIEWS_KEY = "furniro_customer_reviews";
const CART_ITEMS_KEY_PREFIX = "furniro_cart_items";
const USERS_KEY = "furniro_users";
const CURRENT_USER_KEY = "furniro_current_user";

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

const getCartItemsKey = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return `${CART_ITEMS_KEY_PREFIX}_guest`;
  }

  return `${CART_ITEMS_KEY_PREFIX}_${currentUser.id}`;
};

const getCartItems = (): CartItem[] => {
  const storedItems = localStorage.getItem(getCartItemsKey());

  if (!storedItems) {
    return [];
  }

  try {
    return JSON.parse(storedItems) as CartItem[];
  } catch {
    return [];
  }
};

const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(getCartItemsKey(), JSON.stringify(items));
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
};

const signUp = (
  username: string,
  email: string,
  password: string,
  gender: string,
  address: string,
) => {
  const users = getUsers();
  const existingUser = users.find(
    (user) => user.email === email || user.username === username,
  );

  if (existingUser) {
    return {
      ok: false,
      message: "An account with this username or email already exists.",
    };
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    gender,
    address,
  };

  saveUsers([...users, newUser]);
  setCurrentUser(newUser);

  return { ok: true, message: "Signup successful." };
};

const login = (username: string, password: string) => {
  const user = getUsers().find(
    (storedUser) =>
      storedUser.username === username && storedUser.password === password,
  );

  if (!user) {
    return { ok: false, message: "Invalid username or password." };
  }

  setCurrentUser(user);

  return { ok: true, message: "Login successful." };
};

const logout = () => {
  setCurrentUser(null);
};

const localStorageService = {
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
