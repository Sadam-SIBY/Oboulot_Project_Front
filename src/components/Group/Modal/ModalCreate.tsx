import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  setDescription,
  setLevel,
  setName,
  fetchGroupCreate,
  setModalCreate,
  setMessage,
  clear,
  setModalCreateState,
} from "../../../store/reducers/group.ts";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Modal.scss";

export default function ModalCreate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.student.loading);
  const message = useAppSelector((state) => state.exercise.message);

  const name = useAppSelector((state) => state.group.data.name);
  const description = useAppSelector((state) => state.group.data.description);
  const level = useAppSelector((state) => state.group.data.level);

  const modalCreate = useAppSelector((state) => state.group.create);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescription(event.target.value));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLevel(event.target.value));
  };

  const handleSubmitButton = () => {
    if (name && description && level) {
      dispatch(fetchGroupCreate());
      dispatch(setModalCreate(!modalCreate));
      dispatch(setModalCreateState(true));
    } else {
      dispatch(setMessage("Veuillez remplir tous les champs"));
    }
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  useEffect(() => {
    if (modalCreate) {
      navigate("/tableau-de-bord");
    }
  }, [modalCreate, navigate]);

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        {loading && <Loading />}
        <h2>Créer une classe</h2>
        <form
          className="group__modal-content__form"
          onSubmit={handleSubmitCreate}
        >
          {message && (
            <div className="forms__container-message">
              <p>{message}</p>
            </div>
          )}
          <div className="group__modal-content__form-section">
            <label htmlFor="name" className="weight-bold">
              Nom :
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="forms__container-input__border"
              onChange={handleChangeInput}
              value={name}
            />
          </div>
          <div className="group__modal-content__form-section">
            <label htmlFor="level" className="weight-bold">
              Niveau :
            </label>
            <select
              name="level"
              id="level"
              className="forms__container-input__border"
              onChange={handleChangeSelect}
              value={level}
            >
              <option value=""></option>
              <option value="Élémentaire">Élémentaire</option>
              <option value="Sixième">Sixième</option>
              <option value="Cinquième">Cinquième</option>
              <option value="Quatrième">Quatrième</option>
              <option value="Troisième">Troisième</option>
              <option value="Seconde">Seconde</option>
              <option value="Première">Première</option>
              <option value="Terminale">Terminale</option>
              <option value="Première année">Première année</option>
              <option value="Deuxième année">Deuxième année</option>
              <option value="Troisième année">Troisième année</option>
              <option value="Quatrième année">Quatrième année</option>
              <option value="Cinquième année">Cinquième année</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
          <div className="group__modal-content__form-section">
            <label htmlFor="description" className="weight-bold">
              Description :
            </label>
            <textarea
              name="description"
              id="description"
              className="forms__container-input__border"
              onChange={handleChangeTextarea}
              value={description}
            />
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
                dispatch(setModalCreate(!modalCreate));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
