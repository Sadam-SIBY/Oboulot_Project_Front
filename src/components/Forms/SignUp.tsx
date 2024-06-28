// Imports the picture, required components and component styles
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";

import {
  clear,
  changeFirstname,
  changeLastname,
  changeEmailValue,
  changePasswordValue,
  signup,
  addMessage,
  removeMessage,
} from "../../store/reducers/settings.ts";

import picture from "../../assets/signup.png";

import Button from "../Button/Button.tsx";
import Loading from "../Loading/Loading.tsx";
import MessageField from "./MessageField.tsx";

import "./Forms.scss";

// Defines the component
export default function SignUp() {
  // Initializing dispatch function from Redux
  const dispatch = useAppDispatch();
  // Initializing navigate function from React Router
  const navigate = useNavigate();

  // Initializes state for the input password and checkbox
  const [inputPassword, setInputPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Retrieves values from Redux store for user registration information
  const lastname = useAppSelector(
    (state) => state.settings.registration.lastname
  );
  const firstname = useAppSelector(
    (state) => state.settings.registration.firstname
  );
  const email = useAppSelector((state) => state.settings.registration.email);
  const password = useAppSelector(
    (state) => state.settings.registration.password
  );

  // Extracting registration, messages, loading, and error states from Redux store
  const registration = useAppSelector((state) => state.settings.registration);
  const messages = useAppSelector((state) => state.settings.messages);
  const loading = useAppSelector((state) => state.settings.loading);
  const error = useAppSelector((state) => state.settings.error);

  // Function to handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectType = event.target.dataset.type;
    const value = event.target.value;

    if (selectType === "lastname") {
      dispatch(changeLastname(value));
    }

    if (selectType === "firstname") {
      dispatch(changeFirstname(value));
    }

    if (selectType === "email") {
      dispatch(changeEmailValue(value));
    }

    if (selectType === "password") {
      dispatch(changePasswordValue(value));
    }

    if (selectType === "confirm-password") {
      setInputPassword(value);
    }
  };

  // Function to handle form submission
  const handleSubmitButton = () => {
    if (!isChecked) {
      dispatch(
        addMessage(
          "Veuillez accepter la politique de confidentialité pour pouvoir vous inscrire."
        )
      );
    } else {
      dispatch(
        removeMessage(
          "Veuillez accepter la politique de confidentialité pour pouvoir vous inscrire."
        )
      );
    }

    if (
      registration.lastname &&
      registration.firstname &&
      registration.email &&
      registration.password
    ) {
      dispatch(
        removeMessage("Veuillez remplir tous les champs du formulaire !")
      );

      if (
        registration.email.includes("@") &&
        (registration.email.includes(".fr") ||
          registration.email.includes(".com"))
      ) {
        dispatch(removeMessage("Veuillez entrer un email valide."));

        if (password !== inputPassword) {
          dispatch(
            addMessage(
              "Les mots de passe que vous avez saisis ne sont pas identiques."
            )
          );
        } else {
          dispatch(
            removeMessage(
              "Les mots de passe que vous avez saisis ne sont pas identiques."
            )
          );
          if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)
          ) {
            if (password.length < 8) {
              dispatch(
                addMessage(
                  "Le mot de passe doit contenir au moins 8 caractères."
                )
              );
            }
            if (!/[A-Z]/.test(password)) {
              dispatch(
                addMessage(
                  "Le mot de passe doit contenir au moins une lettre majuscule."
                )
              );
            }
            if (!/[a-z]/.test(password)) {
              dispatch(
                addMessage(
                  "Le mot de passe doit contenir au moins une lettre minuscule."
                )
              );
            }
            if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
              dispatch(
                addMessage(
                  "Le mot de passe doit contenir au moins un caractère spécial."
                )
              );
            }
          } else {
            dispatch(
              removeMessage(
                "Le mot de passe doit contenir au moins 8 caractères."
              )
            );
            dispatch(
              removeMessage(
                "Le mot de passe doit contenir au moins une lettre majuscule."
              )
            );
            dispatch(
              removeMessage(
                "Le mot de passe doit contenir au moins une lettre minuscule."
              )
            );
            dispatch(
              removeMessage(
                "Le mot de passe doit contenir au moins un caractère spécial."
              )
            );

            if (isChecked) {
              dispatch(signup());
              navigate("/connexion");
              setInputPassword("");
            }
          }
        }
      } else {
        dispatch(addMessage("Veuillez entrer un email valide."));
      }
    } else {
      dispatch(addMessage("Veuillez remplir tous les champs du formulaire !"));
    }
  };

  // Function to handle form submission event
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  // Function to handle checkbox change
  const handleChangeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Effect to clear Redux state on component mount or when dispatch changes
  useEffect(() => {
    dispatch(clear());
    setInputPassword("");
  }, [dispatch]);

  return (
    <div className="forms">
      {/* Displays the Loading component if loading is true */}
      {loading && <Loading />}
      <div className="forms__div">
        <img className="forms__div-picture" src={picture} alt="" />
      </div>
      <form
        className="forms__container forms__container__with-picture"
        onSubmit={handleSubmit}
      >
        <h1>Inscription</h1>
        {/* Displays error message if error state exists */}
        {error ||
          (messages && (
            <div className="forms__container-message">
              {error === "Request failed with status code 500" && (
                <p>L'adresse e-mail que vous avez entrée existe déjà.</p>
              )}
              {messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          ))}
        {/* Form field container */}
        <div className="forms__container-infos">
          {/* Form fields */}
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border-bottom"}
            label="Nom"
            type={"text"}
            name={"lastname"}
            data={"lastname"}
            onChangeInput={handleChange}
            value={lastname}
          />
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border-bottom"}
            label="Prenom"
            type={"text"}
            name={"firstname"}
            data={"firstname"}
            onChangeInput={handleChange}
            value={firstname}
          />
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
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border-bottom"}
            label="Confirmer le mot de passe"
            type={"password"}
            name={"password"}
            data={"confirm-password"}
            onChangeInput={handleChange}
            value={inputPassword}
          />
          {/* Checkbox section for privacy policy acceptance */}
          <section className="forms__container-section__checkbox">
            <label htmlFor="checkbox" className="weight-normal">
              <input
                type="checkbox"
                name="checkbox"
                className="forms__container-input__checkbox"
                checked={isChecked}
                onChange={handleChangeCheckbox}
              />
              J'ai lu et j'accepte les informsations sur le traitement de mes
              données personnelles expliquées dans la{" "}
              <Link
                to="/politique-de-confidentialite"
                className="color-black weight-bold"
              >
                Politique de Confidentialité
              </Link>
            </label>
          </section>
        </div>
        {/* Submit button */}
        <Button
          type={"submit"}
          label={"S'inscrire"}
          className="blue center button-margin-top"
          onSubmit={handleSubmitButton}
        />
        {/* Redirect message for users who already have an account */}
        <p className="forms__container-message__redirection">
          Vous avez un compte ?{" "}
          <Link to="/connexion" className="color-black weight-bold">
            <span className="display-block">Connectez-vous !</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
