// Imports required components
import React from "react";
import { Link } from "react-router-dom";

// Definition of the types of properties expected by the component
interface Props {
  type: "button" | "submit";
  className?: string;
  label: string | React.ReactNode;
  link?: string;
  onClick?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
}

// Defines the component
export default function Button({
  type,
  className,
  label,
  link,
  onClick,
  onSubmit,
}: Props) {
  const button = link ? (
    // If a link is provided, render a Link component wrapping the button
    <Link to={`${link}`}>
      <button
        type={type}
        className={className}
        onClick={onClick}
        onSubmit={onSubmit}
      >
        {label}
      </button>
    </Link>
  ) : (
    // If no link is provided, render a button element
    <button
      type={type}
      className={className}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {label}
    </button>
  );

  // Render the button
  return button;
}
