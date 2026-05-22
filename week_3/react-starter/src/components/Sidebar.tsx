import type { FC } from "react";
import { NavLink } from "react-router-dom";

const Sidebar: FC = () => {
  return (
    <section id="sidebar">
      <ul>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/details" className={({ isActive }) => (isActive ? "active" : "")}>
            User Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            Settings
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
