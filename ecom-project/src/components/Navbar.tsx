import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import appLogo from "../assets/icons/app_logo.svg";
import { AccountIcon, CartIcon, HeartIcon, SearchIcon } from "../icons";
import localStorageService from "../services/localStorageService";
import IconButton from "./IconButton";
import "./Navbar.css";

const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() =>
    localStorageService.getCurrentUser(),
  );
  const [cartItemCount, setCartItemCount] = useState(() =>
    localStorageService
      .getCartItems()
      .reduce((total, item) => total + item.quantity, 0),
  );

  useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(
        localStorageService
          .getCartItems()
          .reduce((total, item) => total + item.quantity, 0),
      );
    };

    window.addEventListener(
      localStorageService.cartItemsUpdatedEvent,
      updateCartCount,
    );
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener(
        localStorageService.cartItemsUpdatedEvent,
        updateCartCount,
      );
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const logout = () => {
    localStorageService.logout();
    navigate("/login");
  };

  useEffect(() => {
    const updateCurrentUser = () => {
      setCurrentUser(localStorageService.getCurrentUser());
    };

    window.addEventListener(
      localStorageService.authUpdatedEvent,
      updateCurrentUser,
    );
    window.addEventListener("storage", updateCurrentUser);

    return () => {
      window.removeEventListener(
        localStorageService.authUpdatedEvent,
        updateCurrentUser,
      );
      window.removeEventListener("storage", updateCurrentUser);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar_brand-group">
          <NavLink className="navbar_brand" to="/" aria-label="Home">
            <img className="navbar_brand-image" src={appLogo} alt="" />
          </NavLink>
          <h1 className="navbar_brand-text">Furniro</h1>
        </div>

        <div className="navbar_menu">
          <ul>
            {navLinks.map(({ label, to, end }) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    `navlink ${isActive ? "navlink_active" : ""}`.trim()
                  }
                  end={end}
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar_actions">
          {currentUser ? (
            <div className="navbar_user">
              <span>Hi, {currentUser.name}</span>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink className="icon-button" to="/login" aria-label="Login">
              <AccountIcon />
            </NavLink>
          )}
          <IconButton label="Search products">
            <SearchIcon />
          </IconButton>
          <IconButton label="View wishlist">
            <HeartIcon />
          </IconButton>
          <NavLink
            className="icon-button navbar_cart-link"
            to="/cart"
            aria-label="View cart"
          >
            <CartIcon />
            {cartItemCount > 0 && (
              <span className="navbar_cart-badge">{cartItemCount}</span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
