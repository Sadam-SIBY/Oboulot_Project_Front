import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IExercise } from "../../../types/types";

import Button from "../../Button/Button.tsx";

import "./Modal.scss";

import {
  fetchExerciseList,
  fetchExerciseDelete,
  setModalDelete,
  setModalDeleteState,
} from "../../../store/reducers/exercise.ts";
import { fetchExerciseGroup } from "../../../store/reducers/group.ts";

interface Props {
  exercise: IExercise;
}

export default function ModalDelete({ exercise }: Props) {
  const dispatch = useAppDispatch();

  const modalDelete = useAppSelector((state) => state.exercise.delete);

  const handleClickButton = () => {
    dispatch(fetchExerciseDelete(exercise.id));
    dispatch(setModalDelete(!modalDelete));
    dispatch(setModalDeleteState(true));
    dispatch(fetchExerciseList());

    setTimeout(() => {
      dispatch(fetchExerciseGroup());
    }, 1000);
  };

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        <h2>Etes vous sur de supprimer l'exercice {exercise.title} ?</h2>
        <div className="group__modal-content__form-buttons">
          <Button
            type={"button"}
            label={"Supprimer"}
            className="red button-margin-top"
            onClick={handleClickButton}
          />
          <Button
            type={"button"}
            label={"Annuler"}
            className="gray button-margin-top"
            onClick={() => {
              dispatch(setModalDelete(!modalDelete));
            }}
          />
        </div>
      </div>
    </div>
  );
}
