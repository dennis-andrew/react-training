import type { FC } from "react";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div>
        <h1>{title}</h1>
        <p>
          <span>Admin Dashboard</span> &gt; <span>{title}</span>
        </p>
      </div>

      <button className="theme-button" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  );
};

export default Header;
