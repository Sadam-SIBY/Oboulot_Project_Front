import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchStudentCreate,
  setEmail,
  setFirstname,
  setLastname,
  setPassword,
  setModalCreate,
  setMessage,
  clear,
} from "../../../store/reducers/student.ts";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Modal.scss";

export default function ModalCreate() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.student.loading);
  const message = useAppSelector((state) => state.student.message);

  const lastname = useAppSelector((state) => state.student.data.lastname);
  const firstname = useAppSelector((state) => state.student.data.firstname);
  const email = useAppSelector((state) => state.student.data.email);
  const password = useAppSelector((state) => state.student.data.password);

  const modalCreateStudent = useAppSelector((state) => state.student.create);

  // Function to handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectType = event.target.dataset.type;
    const value = event.target.value;

    if (selectType === "lastname") {
      dispatch(setLastname(value));
    }

    if (selectType === "firstname") {
      dispatch(setFirstname(value));
    }

    if (selectType === "email") {
      dispatch(setEmail(value));
    }

    if (selectType === "password") {
      dispatch(setPassword(value));
    }
  };

  const handleSubmitButton = () => {
    if (
      email.includes("@") &&
      (email.includes(".fr") || email.includes(".com"))
    ) {
      if (lastname && firstname && email && password) {
        dispatch(fetchStudentCreate());
      } else {
        dispatch(setMessage("Veuillez remplir tous les champs"));
      }
    } else {
      dispatch(setMessage("Veuillez entrer un email valide."));
    }
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  return (
    <>
      <div className="group__modal">
        <div className="group__modal-content">
          {loading && <Loading />}
          <h2>Créer un compte élève</h2>
          <form
            className="group__modal-content__form"
            onSubmit={handleSubmitCreate}
          >
            {message && (
              <div className="forms__container-message">
                <p>
                  {message === "Request failed with status code 500"
                    ? "L'adresse e-mail que vous avez entrée existe déjà."
                    : message}
                </p>
              </div>
            )}
            <div className="group__modal-content__form-section">
              <label htmlFor="lastname" className="weight-bold">
                Nom :
              </label>
              <input
                type="text"
                name="lastname"
                data-type="lastname"
                className="forms__container-input__border"
                onChange={handleChange}
                value={lastname}
              />
            </div>
            <div className="group__modal-content__form-section">
              <label htmlFor="firstname" className="weight-bold">
                Prénom :
              </label>
              <input
                type="text"
                name="firstname"
                data-type="firstname"
                className="forms__container-input__border"
                onChange={handleChange}
                value={firstname}
              />
            </div>
            <div className="group__modal-content__form-section">
              <label htmlFor="email" className="weight-bold">
                Email :
              </label>
              <input
                type="text"
                name="email"
                data-type="email"
                className="forms__container-input__border"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="group__modal-content__form-section">
              <label htmlFor="password" className="weight-bold">
                Mot de passe :
              </label>
              <input
                type="password"
                name="password"
                data-type="password"
                className="forms__container-input__border"
                onChange={handleChange}
                value={password}
              />
              <p
                style={{ color: "gray", fontSize: "1rem", marginTop: "-16px" }}
              >
                (L'élève pourra modifier son mot de passe via son profil une
                fois connecté)
              </p>
            </div>
            <div className="group__modal-content__form-buttons">
              <Button
                type={"submit"}
                label={"Créer"}
                className="green button-margin-top"
                onSubmit={handleSubmitButton}
              />
              <Button
                type={"button"}
                label={"Annuler"}
                className="gray button-margin-top"
                onClick={() => {
                  dispatch(setModalCreate(!modalCreateStudent));
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
