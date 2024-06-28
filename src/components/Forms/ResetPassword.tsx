// Imports required components and component styles
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button.tsx";
import MessageField from "./MessageField.tsx";

import "./Forms.scss";

// Defines the component
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [messageEmail, setMessageEmail] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleClick = () => {
    if (
      email &&
      email.includes("@") &&
      (email.includes(".fr") || email.includes(".com"))
    ) {
      setMessageEmail(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleClick();
  };

  return (
    <div className="forms signin">
      <form className="forms__container" onSubmit={handleSubmit}>
        <h1>Réinitialiser le mot de passe </h1>
        {/* Message */}
        {messageEmail && (
          <div className="forms__container-infos message">
            <p>
              <strong>Merci pour votre demande ! </strong>
            </p>
            <p>
              Si votre adresse e-mail est associée à un compte, vous recevrez
              sous peu un e-mail. Veuillez vérifier votre boîte de réception,
              ainsi que vos dossiers de courriers indésirables, au cas où.
            </p>
          </div>
        )}
        {/* Form field container */}
        <div className="forms__container-infos">
          {/* Instructions */}
          <section className="forms__container-instructions">
            <p>
              Saisissez l'adresse email associée à votre compte. <br />
              Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </section>
          {/* Form field */}
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border-bottom"}
            label="Email"
            type={"text"}
            name={"email"}
            data={"email"}
            onChangeInput={handleChange}
            value={email}
          />
        </div>
        {/* Send button */}
        <Button
          type={"button"}
          label={"Envoyer"}
          className="blue center button-margin-top"
          onClick={handleClick}
        />
        {/* Link to login page */}
        <Link className="color-black weight-bold" to="/connexion">
          <p className="forms__container-message__redirection">
            {"<"} Retour à la page de connexion
          </p>
        </Link>
      </form>
    </div>
  );
}
