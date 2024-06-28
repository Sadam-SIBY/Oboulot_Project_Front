// Imports required components and component styles
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";

import {
  clear,
  changeEmailValue,
  changePasswordValue,
  signin,
  setRegistered,
} from "../../store/reducers/settings.ts";

import Button from "../Button/Button.tsx";
import Loading from "../Loading/Loading.tsx";
import MessageField from "./MessageField.tsx";

import "./Forms.scss";

// Defines the component
export default function SignIn() {
  // Initializing dispatch function from Redux
  const dispatch = useAppDispatch();
  // Initializing navigate function from React Router
  const navigate = useNavigate();

  // Extracting username and password from Redux store
  const { username, password } = useAppSelector(
    (state) => state.settings.credentials
  );

  // Extracting logged, registered, loading, and error states from Redux store
  const logged = useAppSelector((state) => state.settings.logged);
  const registered = useAppSelector((state) => state.settings.registered);
  const loading = useAppSelector((state) => state.settings.loading);
  const error = useAppSelector((state) => state.settings.error);

  // Function to handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectType = event.target.dataset.type;
    const value = event.target.value;
    if (selectType === "email") {
      dispatch(changeEmailValue(value));
    }

    if (selectType === "password") {
      dispatch(changePasswordValue(value));
    }
  };

  // Function to handle form submission
  const handleSubmitButton = () => {
    dispatch(signin());
  };

  // Function to handle form submission event
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  // Effect to clear Redux state on component mount
  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  // Effect to navigate to dashboard if user is logged in
  useEffect(() => {
    if (logged) {
      navigate("/tableau-de-bord");
    }
  }, [logged, navigate]);

  return (
    <div className="forms signin">
      {/* Displays the Loading component if loading is true */}
      {loading && <Loading />}
      <form className="forms__container" onSubmit={handleSubmit}>
        <h1>Connexion</h1>
        {/* Displays error message if error state exists */}
        {error && (
          <div className="forms__container-message">
            {error === "Request failed with status code 400" && (
              <p>Veuillez remplir tous les champs du formulaire !</p>
            )}
            {error === "Request failed with status code 401" && (
              <p>L'email ou le mot de passe est incorrect.</p>
            )}
            {error === "Request failed with status code 404" && (
              <p>La connexion au serveur a échoué...</p>
            )}
            {error === "Request failed with status code 500" && (
              <p>Erreur interne...</p>
            )}
            {error === "Network Error" && (
              <p>Le serveur n'est pas fonctionnel...</p>
            )}
          </div>
        )}
        {/* Form field container */}
        <div className="forms__container-infos">
          {/* Form fields */}
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border-bottom"}
            label="Email"
            type={"text"}
            name={"email"}
            data={"email"}
            onChangeInput={handleChange}
            value={username}
          />
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border-bottom"}
            label="Mot de passe"
            type={"password"}
            name={"password"}
            data={"password"}
            onChangeInput={handleChange}
            value={password}
          />
          {/* Link to forgot password page */}
          <div className="align-right">
            {/* <Link to="/mot-de-passe-oublie" className="color-black weight-bold">
              Mot de passe oublié ?
            </Link> */}
            <a
              className="color-black weight-bold"
              href="http://francois-morel.vpnuser.lan/Apotheose/projet-06-train-with-fun-back/public/reset-password"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>
        {/* Submit button */}
        <Button
          type={"submit"}
          label={"Se connecter"}
          className="blue center button-margin-top"
          onSubmit={handleSubmitButton}
        />
        {/* Redirect message for new users */}
        <p className="forms__container-message__redirection">
          Vous n'avez pas encore de compte ?{" "}
          <Link to="/inscription" className="color-black weight-bold">
            <span className="display-block">Inscrivez-vous !</span>
          </Link>
        </p>
      </form>
      {/* Modal for successful registration */}
      {registered && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={() => {
                dispatch(setRegistered(false));
              }}
            >
              <IoIosClose />
            </button>
            <p>Inscription réussie !</p>
            <p>Vous pouvez maintenant vous connecter.</p>
          </div>
        </div>
      )}
    </div>
  );
}
