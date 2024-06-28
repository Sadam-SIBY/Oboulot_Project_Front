import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

import userPicture from "../../assets/user.png";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  editMode,
  changeLastname,
  changeFirstname,
  changeEmail,
  fetchGetUserProfile,
  fetchPutUserProfile,
  editPasswordMode,
  fetchPutUserProfilePassword,
  setNewPassword,
  setOldPassword,
  updatePasswordMode,
  clear,
  updateMode,
} from "../../store/reducers/user.ts";

import Button from "../Button/Button.tsx";
import Loading from "../Loading/Loading.tsx";

import "./Profile.scss";
import { useEffect } from "react";

export default function Profile() {
  const dispatch = useAppDispatch();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessageOldPassword, setMessageOldPassword] = useState("");
  const [errorMessageComparePasswords, setMessageComparePasswords] =
    useState("");

  const edit = useAppSelector((state) => state.user.edit);
  const editPassword = useAppSelector((state) => state.user.editPassword);

  const user = useAppSelector((state) => state.user.userData);
  const update = useAppSelector((state) => state.user.update);
  const updatePassword = useAppSelector((state) => state.user.updatePassword);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  // const update = useAppSelector((state) => state.user.update);
  const lastname = useAppSelector((state) => state.user.data.lastname);
  const firstname = useAppSelector((state) => state.user.data.firstname);
  const email = useAppSelector((state) => state.user.data.email);

  const oldPassword = useAppSelector((state) => state.user.oldPassword);
  const newPassword = useAppSelector((state) => state.user.newPassword);

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
      dispatch(changeEmail(value));
    }

    if (selectType === "oldPassword") {
      dispatch(setOldPassword(value));
    }
    if (selectType === "newPassword") {
      dispatch(setNewPassword(value));
    }
    if (selectType === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  };

  const handleClickPassword = () => {
    dispatch(editPasswordMode(true));
    setMessageOldPassword("");
    setMessageComparePasswords("");
    dispatch(setOldPassword(""));
    dispatch(setNewPassword(""));
    setConfirmPassword("");
  };

  const handleClick = () => {
    dispatch(fetchPutUserProfile());
  };

  const handleClickSubmitPassword = () => {
    setMessageOldPassword("");
    setMessageComparePasswords("");

    if (oldPassword) {
      if (newPassword && newPassword === confirmPassword) {
        if (
          newPassword.length < 8 ||
          !/[A-Z]/.test(newPassword) ||
          !/[a-z]/.test(newPassword) ||
          !/[$&+,:;=?@#|'<>.^*()%!-]/.test(newPassword)
        ) {
          setMessageComparePasswords(
            "Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule et un caractère spécial."
          );
        } else {
          dispatch(fetchPutUserProfilePassword());

          if (error) {
            setMessageOldPassword(error);
          }
        }
      } else {
        setMessageComparePasswords("Les mots de passe ne correspondent pas");
      }
    } else {
      setMessageOldPassword("Le champ est vide");
    }
  };

  const handleClose = () => {
    dispatch(updateMode(false));
    dispatch(updatePasswordMode(false));
    dispatch(editPasswordMode(false));
  };

  useEffect(() => {
    dispatch(clear());
    dispatch(fetchGetUserProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeLastname(user.lastname));
    dispatch(changeFirstname(user.firstname));
    dispatch(changeEmail(user.email));
  }, [dispatch, user]);

  return (
    <>
      <div className="wrapper">
        {loading && <Loading />}
        <section className="container__with-editMode">
          <h1>Mon profil</h1>
          {editPassword || edit ? (
            ""
          ) : (
            <div className="header__button">
              <div className="informations">
                <Button
                  type="button"
                  className={`${
                    user.roles.includes("ROLE_USER") &&
                    !user.roles.includes("ROLE_ENSEIGNANT") &&
                    !user.roles.includes("ROLE_ADMIN")
                      ? "purple"
                      : "blue"
                  }`}
                  onClick={() => dispatch(editMode(true))}
                  label={"Modifier mes informations"}
                />
              </div>
              <div className="password">
                <Button
                  type="button"
                  className={`${
                    user.roles.includes("ROLE_USER") &&
                    !user.roles.includes("ROLE_ENSEIGNANT") &&
                    !user.roles.includes("ROLE_ADMIN")
                      ? "purple"
                      : "blue"
                  }`}
                  onClick={handleClickPassword}
                  label={"Modifier mon mot de passe"}
                />
              </div>
            </div>
          )}
        </section>
        {editPassword ? (
          <section>
            <section className="profil">
              <div className="profil__container">
                <section className="profil__picture">
                  <img
                    className="profil__picture-img"
                    src={userPicture}
                    alt={`Photo de profil de ${""}`}
                  />
                  {/* {edit && (
                    <Button
                      type={"button"}
                      label={"Modifier mon avatar"}
                      className="blue button-margin-top inline"
                      onClick={() => dispatch(editMode(edit))}
                      link="/profil"
                    />
                  )} */}
                </section>
                <section className="profil__infos">
                  <div className="forms__container-infos profil">
                    <section className="forms__container-section profil">
                      {errorMessageOldPassword && (
                        <p className="message">{errorMessageOldPassword}</p>
                      )}
                      <label htmlFor="lastname" className="weight-bold">
                        Votre mot de passe actuel
                      </label>
                      <input
                        type="password"
                        data-type="oldPassword"
                        className="forms__container-input__border"
                        value={oldPassword}
                        onChange={handleChange}
                      />
                    </section>
                    <section className="forms__container-section profil">
                      {errorMessageComparePasswords && (
                        <p className="message">
                          {errorMessageComparePasswords}
                        </p>
                      )}
                      <label htmlFor="lastname" className="weight-bold">
                        Votre nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        data-type="newPassword"
                        className="forms__container-input__border"
                        value={newPassword}
                        onChange={handleChange}
                      />
                    </section>
                    <section className="forms__container-section profil">
                      <label htmlFor="lastname" className="weight-bold">
                        Confirmer votre nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        data-type="confirmPassword"
                        className="forms__container-input__border"
                        value={confirmPassword}
                        onChange={handleChange}
                      />
                    </section>
                  </div>
                  <div className="profil__infos-buttons">
                    <Button
                      type={"button"}
                      label={"Modifier"}
                      className="blue button-margin-top"
                      onClick={handleClickSubmitPassword}
                    />
                    <Button
                      type={"button"}
                      label={"Annuler"}
                      className="gray button-margin-top"
                      onClick={() => dispatch(editPasswordMode(false))}
                    />
                  </div>
                </section>
              </div>
            </section>
          </section>
        ) : (
          <section>
            <section className="profil">
              <div className="profil__container">
                <section className="profil__picture">
                  <img
                    className="profil__picture-img"
                    src={userPicture}
                    alt={`Photo de profil de ${""}`}
                  />
                  {/* {edit && (
                    <Button
                      type={"button"}
                      label={"Modifier mon avatar"}
                      className="blue button-margin-top inline"
                      onClick={() => dispatch(editMode(edit))}
                      link="/profil"
                    />
                  )} */}
                </section>
                <section className="profil__infos">
                  <div className="forms__container-infos profil">
                    <section className="forms__container-section profil">
                      <label htmlFor="lastname" className="weight-bold">
                        Nom
                      </label>
                      {edit ? (
                        <input
                          type="text"
                          data-type="lastname"
                          className="forms__container-input__border"
                          value={lastname}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="forms__container-input__border-bottom">
                          {lastname}
                        </p>
                      )}
                    </section>
                    <section className="forms__container-section profil">
                      <label htmlFor="firstname" className="weight-bold">
                        Prénom
                      </label>
                      {edit ? (
                        <input
                          type="text"
                          data-type="firstname"
                          className="forms__container-input__border"
                          value={firstname}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="forms__container-input__border-bottom">
                          {firstname}
                        </p>
                      )}
                    </section>
                    <section className="forms__container-section profil">
                      <label htmlFor="email" className="weight-bold">
                        Email
                      </label>
                      {edit ? (
                        <input
                          type="email"
                          data-type="email"
                          className="forms__container-input__border"
                          value={email}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="forms__container-input__border-bottom">
                          {email}
                        </p>
                      )}
                    </section>
                  </div>
                  {edit && (
                    <div className="profil__infos-buttons">
                      <Button
                        type={"button"}
                        label={"Enregistrer"}
                        className="blue button-margin-top"
                        onClick={handleClick}
                      />
                      <Button
                        type={"button"}
                        label={"Annuler"}
                        className="gray button-margin-top"
                        onClick={() => (
                          dispatch(changeLastname(user.lastname)),
                          dispatch(changeFirstname(user.firstname)),
                          dispatch(changeEmail(user.email)),
                          dispatch(editMode(false))
                        )}
                      />
                    </div>
                  )}
                </section>
              </div>
            </section>
          </section>
        )}
        {update && (
          <div className="registered">
            <div className="registered__modal">
              <button className="registered__modal-close" onClick={handleClose}>
                <IoIosClose />
              </button>
              <p>Les informations ont été modifiées avec succès !</p>
            </div>
          </div>
        )}
        {updatePassword && (
          <div className="registered">
            <div className="registered__modal">
              <button className="registered__modal-close" onClick={handleClose}>
                <IoIosClose />
              </button>
              <p>Le mot de passe a été modifié avec succès !</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
