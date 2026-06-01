import { NavLink, useNavigate } from "react-router-dom";
import appLogo from "../assets/icons/app_logo.svg";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { AccountIcon, CartIcon, HeartIcon, SearchIcon } from "../icons";
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
  const { currentUser, logout: logoutUser } = useAuth();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

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
              <span>Hi, {currentUser.username || currentUser.email}</span>
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
