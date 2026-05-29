import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./IconButton.css";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

const IconButton = ({
  label,
  children,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) => {
  return (
    <button
      aria-label={label}
      className={`icon-button ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
