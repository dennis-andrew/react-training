import type { FC } from "react";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>
        <span>Admin Dashboard</span> &gt; <span>{title}</span>
      </p>
    </header>
  );
};

export default Header;
