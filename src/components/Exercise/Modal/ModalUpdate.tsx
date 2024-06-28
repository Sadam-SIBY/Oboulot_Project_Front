import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IGroup } from "../../../types/types";

import {
  setDescription,
  setLevel,
  setName,
  fetchGroupUpdate,
  setModalUpdate,
  setModalUpdateState,
} from "../../../store/reducers/group.ts";

import Button from "../../Button/Button.tsx";

import "./Modal.scss";

interface Props {
  group: IGroup;
}

export default function ModalUpdate({ group }: Props) {
  const dispatch = useAppDispatch();

  const modalUpdate = useAppSelector((state) => state.group.update);
  const message = useAppSelector((state) => state.group.message);

  const name = useAppSelector((state) => state.group.data.name);
  const description = useAppSelector((state) => state.group.data.description);
  const level = useAppSelector((state) => state.group.data.level);

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

  const handleClickButton = () => {
    dispatch(fetchGroupUpdate(group.id));
    dispatch(setModalUpdate(!modalUpdate));
    dispatch(setModalUpdateState(true));
  };

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleClickButton();
  };

  useEffect(() => {
    dispatch(setName(group.name));
    dispatch(setDescription(group.description));
    dispatch(setLevel(group.level));
  }, [dispatch, group]);

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        <h2>Modifier les informations</h2>
        <form
          className="group__modal-content__form"
          onSubmit={handleSubmitUpdate}
        >
          {message && (
            <div className="forms__container-message">
              <p>{message}</p>
            </div>
          )}
          <div className="group__modal-content__form-section">
            <label htmlFor="name" className="weight-bold">
              Modifier le nom :
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
            <label htmlFor="name" className="weight-bold">
              Modifier le niveau :
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
            <label htmlFor="name" className="weight-bold">
              Modifier la description :
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
              type={"button"}
              label={"Enregistrer"}
              className="green button-margin-top"
              onClick={handleClickButton}
            />
            <Button
              type={"button"}
              label={"Annuler"}
              className="gray button-margin-top"
              onClick={() => {
                dispatch(setModalUpdate(!modalUpdate));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
