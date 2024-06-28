// Imports a required component
import { NavLink } from "react-router-dom";

// Definition of the types of properties expected by the component
interface Props {
  to: string;
  label: string;
  authentification?: () => void;
}

// Defines the component
export default function NavItem({ to, label, authentification }: Props) {
  // Function to handle click event
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (authentification) {
      authentification();
    }
  };

  return (
    // Navigation link in the application
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) => {
        if (isActive) {
          return "current";
        } else {
          return "";
        }
      }}
    >
      {label}
    </NavLink>
  );
}
