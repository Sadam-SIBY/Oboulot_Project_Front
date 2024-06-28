import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchExerciseCreate,
  setTitle,
  setInstruction,
  setSubject,
  setModalCreate,
  setModalCreateState,
  setMessage,
  clear,
} from "../../../store/reducers/exercise.ts";

import Button from "../../Button/Button.tsx";

import "./Modal.scss";

export default function ModalCreate() {
  const dispatch = useAppDispatch();

  const message = useAppSelector((state) => state.exercise.message);

  const title = useAppSelector((state) => state.exercise.data.title);
  const subject = useAppSelector((state) => state.exercise.data.subject);
  const instruction = useAppSelector(
    (state) => state.exercise.data.instruction
  );

  const modalCreate = useAppSelector((state) => state.exercise.create);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value));
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setInstruction(event.target.value));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSubject(event.target.value));
  };

  const handleSubmitButton = () => {
    if (title && instruction && subject) {
      dispatch(fetchExerciseCreate());
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

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        <h2>Créer un exercice</h2>
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
            <label htmlFor="title" className="weight-bold">
              Titre :
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="forms__container-input__border"
              onChange={handleChangeInput}
              value={title}
            />
          </div>
          <div className="group__modal-content__form-section">
            <label htmlFor="subject" className="weight-bold">
              Matière :
            </label>
            <select
              name="subject"
              id="subject"
              className="forms__container-input__border"
              onChange={handleChangeSelect}
              value={subject}
            >
              <option value=""></option>
              <option value="Anglais">Anglais</option>
              <option value="Économie">Économie</option>
              <option value="Français">Français</option>
              <option value="Géographie">Géographie</option>
              <option value="Histoire">Histoire</option>
              <option value="Informatique">Informatique</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique-chimie">Physique-chimie</option>
              <option value="Sport">Sport</option>
              <option value="SVT">SVT</option>
              <option value="Technologie">Technologie</option>
            </select>
          </div>
          <div className="group__modal-content__form-section">
            <label htmlFor="instruction" className="weight-bold">
              Instructions :
            </label>
            <textarea
              name="instruction"
              id="instruction"
              className="forms__container-input__border"
              onChange={handleChangeTextarea}
              value={instruction}
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
