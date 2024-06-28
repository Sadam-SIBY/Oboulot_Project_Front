// Imports a required component
import { useAppSelector } from "../../../hooks/redux.ts";

import NavItem from "./NavItem.tsx";

// Defines the component
export default function Footer() {
  const logged = useAppSelector((state) => state.settings.logged);
  const userData = useAppSelector((state) => state.user.userData);

  return (
    // Footer container
    <footer
      className={`footer ${
        userData.roles.includes("ROLE_USER") &&
        !userData.roles.includes("ROLE_ENSEIGNANT") &&
        !userData.roles.includes("ROLE_ADMIN") &&
        logged
          ? "student"
          : "teacher"
      }`}
    >
      {/* Quote content */}
      <p className="footer__quote">
        « En apprenant, vous enseignerez, et{" "}
        <span className="footer__quote-block">
          en enseignant, vous apprendrez. »
          <span className="footer__quote-block__author weight-bold">
            {" "}
            – Phil Collins
          </span>
        </span>
      </p>
      {/* Navigation links */}
      <nav className="footer__menu">
        <NavItem to="/a-propos" label="À propos" />
        <NavItem to="/mentions-legales" label="Mentions légales" />
        <NavItem
          to="/politique-de-confidentialite"
          label="Politique de confidentialité"
        />
      </nav>
    </footer>
  );
}
