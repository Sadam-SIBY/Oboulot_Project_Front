import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IExercise } from "../../../types/types";

import { setModalPublish } from "../../../store/reducers/exercise.ts";

import Button from "../../Button/Button.tsx";

interface Props {
  exercise: IExercise;
}

export default function ModalDelete({ exercise }: Props) {
  const dispatch = useAppDispatch();

  const modalPublish = useAppSelector((state) => state.exercise.publish);

  const handleClickButton = () => {
    dispatch(setModalPublish(!modalPublish));
  };

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        <h2>Etes vous sur de publier l'exercice #{exercise.id} ?</h2>
        <div className="group__modal-content__form-buttons">
          <Button
            type={"button"}
            label={"Publier"}
            className="red button-margin-top"
            onClick={handleClickButton}
          />
          <Button
            type={"button"}
            label={"Annuler"}
            className="gray button-margin-top"
            onClick={() => {
              dispatch(setModalPublish(!modalPublish));
            }}
          />
        </div>
      </div>
    </div>
  );
}
