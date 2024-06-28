// Imports the picture, required components and component styles
import { useAppSelector } from "../../hooks/redux.ts";

import picture from "./../../assets/contact.png";

import Button from "../Button/Button.tsx";
import Loading from "../Loading/Loading.tsx";
import MessageField from "./MessageField.tsx";

import "./Forms.scss";

// Defines the component
export default function Contact() {
  // Using the useAppSelector hook to get loading status
  const loading = useAppSelector((state) => state.settings.loading);

  return (
    <div className="forms">
      {/* Displays the Loading component if loading is true */}
      {loading && <Loading />}
      {/* Displays picture */}
      <div className="forms__div">
        <img className="forms__div-picture" src={picture} alt="" />
      </div>
      <div className="forms__container forms__container__with-picture">
        <h1>Contactez-nous !</h1>
        {/* Form field container */}
        <div className="forms__container-infos">
          {/* Instructions */}
          <section className="forms__container-instructions">
            <p>
              Veuillez remplir le formulaire ci-dessous pour nous contacter.
              Nous vous répondrons dès que possible !
            </p>
          </section>
          {/* Form fields */}
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border"}
            label="Nom"
            type={"text"}
            name={"lastname"}
            data={"lastname"}
            onChangeInput={() => {}}
            value={""}
          />
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border"}
            label="Prénom"
            type={"text"}
            name={"firstname"}
            data={"firstname"}
            onChangeInput={() => {}}
            value={""}
          />
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border"}
            label="Email"
            type={"text"}
            name={"email"}
            data={"email"}
            onChangeInput={() => {}}
            value={""}
          />
          <MessageField
            typeField="input"
            classNameField={"forms__container-input__border"}
            label="Sujet"
            type={"text"}
            name={"topic"}
            data={"topic"}
            onChangeInput={() => {}}
            value={""}
          />
          <MessageField
            typeField="textarea"
            classNameField={"forms__container-input__border"}
            label="Message"
            type={"text"}
            name={"message"}
            data={"message"}
            onChangeTextArea={() => {}}
            value={""}
          />
        </div>
        {/* Send button */}
        <Button
          type={"button"}
          label={"Envoyer"}
          className="blue center button-margin-top"
        />
      </div>
    </div>
  );
}
