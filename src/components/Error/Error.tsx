// Imports the GIF animation, a required component and component styles
import gif from "../../assets/404.gif";
import { useAppSelector } from "../../hooks/redux.ts";

import Button from "../Button/Button.tsx";

import "./Error.scss";

// Defines the component
export default function Error() {
  const logged = useAppSelector((state) => state.settings.logged);
  const userData = useAppSelector((state) => state.user.userData);

  return (
    <div className="error">
      <section>
        {/* Displays GIF image */}
        <img
          className="error__image"
          src={gif}
          alt="Error 404 Gif Page Not Found"
        />
        {/* Displays the error title */}
        <h1>Page introuvable</h1>
      </section>
      <section>
        {/* Displays a paragraph indicating the error encountered */}
        <p>Il semble que vous ayez atterri dans une zone inexplorée.</p>{" "}
        {/* Displays a paragraph inviting you to return to the dashboard */}
        <p>
          {logged
            ? "Revenez au tableau de bord pour poursuivre votre aventure éducative !"
            : "Retournez à la page d'accueil pour accéder au site !"}
        </p>
      </section>
      {/* Back to home page button */}
      <Button
        type={"button"}
        label={
          logged ? "Retour au tableau de bord" : "Retour à la page d'accueil"
        }
        link="/"
        className={`${
          userData.roles.includes("ROLE_USER") &&
          !userData.roles.includes("ROLE_ENSEIGNANT") &&
          !userData.roles.includes("ROLE_ADMIN")
            ? "purple"
            : "blue"
        } error__button`}
      />
    </div>
  );
}
