import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchExerciseList,
  setMessage,
  clear,
} from "../../../store/reducers/exercise.ts";

import {
  fetchExerciseAddGroup,
  fetchExerciseListFromGroup,
  setIdGroupExercise,
  setModalGroupExercise,
} from "../../../store/reducers/group.ts";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Modal.scss";

export default function ModalGroupExercises() {
  const dispatch = useAppDispatch();
  const { idGroup } = useParams();

  const loading = useAppSelector((state) => state.student.loading);
  const message = useAppSelector((state) => state.exercise.message);

  const exerciseList = useAppSelector((state) => state.exercise.list);
  const exerciseGroupList = useAppSelector((state) => state.group.exerciseList);

  const selectedExercise = useAppSelector(
    (state) => state.group.dataGroupExercises.idExercise
  );

  const modalGroupExercise = useAppSelector(
    (state) => state.group.groupExercise
  );

  let parsedIdGroup: number = 0;

  if (idGroup) {
    parsedIdGroup = parseInt(idGroup);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idExercice = parseInt(event.target.value);

    if (event.target.checked) {
      dispatch(
        setIdGroupExercise({
          idGroup: parsedIdGroup,
          idExercise: idExercice,
        })
      );
    }
  };

  const handleSubmitButton = () => {
    if (selectedExercise !== 0) {
      dispatch(fetchExerciseAddGroup());
      dispatch(setModalGroupExercise(!modalGroupExercise));
    } else {
      dispatch(setMessage("Veuillez sélectionner une classe !"));
    }
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  useEffect(() => {
    dispatch(clear());
    dispatch(fetchExerciseList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExerciseListFromGroup(parsedIdGroup));
    dispatch(setIdGroupExercise({ idGroup: parsedIdGroup, idExercise: 0 }));
  }, [dispatch, parsedIdGroup]);

  const filteredExerciseList = exerciseList.filter(
    (exercise) =>
      !exerciseGroupList.some((exerciseData) => exerciseData.id === exercise.id)
  );

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        {loading && <Loading />}
        <h2>Ajouter un exercice à la classe</h2>
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
            {filteredExerciseList.map((exercise) => (
              <div key={exercise.id}>
                <input
                  type="radio"
                  name={"options"}
                  value={exercise.id}
                  onChange={handleChange}
                  className="forms__container-input__border"
                />
                <label htmlFor={"options"}>{`${exercise.title}`}</label>
              </div>
            ))}
          </div>
          <div className="group__modal-content__form-buttons">
            <Button
              type={"submit"}
              label={"Ajouter"}
              className="green button-margin-top"
              onSubmit={handleSubmitButton}
            />
            <Button
              type={"button"}
              label={"Annuler"}
              className="gray button-margin-top"
              onClick={() => {
                dispatch(setModalGroupExercise(!modalGroupExercise));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
