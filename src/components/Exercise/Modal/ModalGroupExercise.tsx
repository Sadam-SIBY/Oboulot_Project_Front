import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchGroupListFromExercise,
  setModalExerciseGroup,
  setMessage,
  clear,
} from "../../../store/reducers/exercise.ts";

import {
  fetchGroupList,
  fetchExerciseGroup,
  fetchExerciseAddGroup,
  setIdGroupExercise,
} from "../../../store/reducers/group.ts";

import { IExercise } from "../../../types/types";

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Modal.scss";

interface Props {
  exercise: IExercise;
}

export default function ModalGroupExercises({ exercise }: Props) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.student.loading);
  const message = useAppSelector((state) => state.exercise.message);

  const groupList = useAppSelector((state) => state.group.list);
  const groupExerciseList = useAppSelector((state) => state.exercise.groupList);

  const selectedGroup = useAppSelector(
    (state) => state.group.dataGroupExercises.idGroup
  );

  const modalExerciseGroup = useAppSelector(
    (state) => state.exercise.exerciseGroup
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idGroup = parseInt(event.target.value);

    if (event.target.checked) {
      dispatch(
        setIdGroupExercise({ idGroup: idGroup, idExercise: exercise.id })
      );
    }
  };

  const handleSubmitButton = () => {
    if (selectedGroup !== 0) {
      dispatch(fetchExerciseAddGroup());

      setTimeout(() => {
        dispatch(fetchExerciseGroup());
      }, 1000);

      dispatch(setModalExerciseGroup(!modalExerciseGroup));
    } else {
      dispatch(setMessage("Veuillez sélectionner un exercice !"));
    }
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmitButton();
  };

  useEffect(() => {
    dispatch(clear());
    dispatch(fetchGroupList());
    dispatch(fetchExerciseGroup());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGroupListFromExercise(exercise.id));
    dispatch(setIdGroupExercise({ idGroup: 0, idExercise: exercise.id }));
  }, [dispatch, exercise.id]);

  const filteredGroupList = groupList.filter(
    (group) => !groupExerciseList.some((groupData) => groupData.id === group.id)
  );

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        {loading && <Loading />}
        <h2>Ajouter l'exercice {exercise.title} à une classe</h2>
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
            {filteredGroupList.map((group) => (
              <div key={group.id}>
                <input
                  type="radio"
                  name={"options"}
                  value={group.id}
                  onChange={handleChange}
                  className="forms__container-input__border"
                />
                <label htmlFor={"options"}>{`${group.name}`}</label>
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
                dispatch(setModalExerciseGroup(!modalExerciseGroup));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
