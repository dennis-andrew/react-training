import { NavLink } from "react-router-dom";
import "./Footer.css";

const footerLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const helpLinks = ["Payment Options", "Returns", "Privacy Policies"];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <h2>Furniro.</h2>
          <address>
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </address>
        </div>

        <nav className="footer__column" aria-label="Footer navigation">
          <h3>Links</h3>
          <ul>
            {footerLinks.map(({ label, to, end }) => (
              <li key={to}>
                <NavLink end={end} to={to}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__column">
          <h3>Help</h3>
          <ul>
            {helpLinks.map((link) => (
              <li key={link}>
                <a href="/">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="footer__newsletter"
          onSubmit={(event) => event.preventDefault()}
        >
          <h3>Newsletter</h3>
          <div className="footer__form-row">
            <label className="footer__email">
              <span className="footer__sr-only">Email address</span>
              <input type="email" placeholder="Enter Your Email Address" />
            </label>
            <button type="submit">Subscribe</button>
          </div>
        </form>
      </div>

      <p className="footer__copyright">2023 furino. All rights reverved</p>
    </footer>
  );
};

export default Footer;
