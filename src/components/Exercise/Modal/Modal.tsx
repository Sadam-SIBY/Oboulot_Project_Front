import { IoIosClose } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  setModalExerciseGroupState,
  setModalCreateState,
  setModalUpdateState,
} from "../../../store/reducers/exercise.ts";

export default function Modal() {
  const dispatch = useAppDispatch();

  const modalGroupExerciseState = useAppSelector(
    (state) => state.group.groupExerciseState
  );

  const modalExerciceCreateState = useAppSelector(
    (state) => state.exercise.createState
  );

  const modalExerciceUpdateState = useAppSelector(
    (state) => state.exercise.updateState
  );

  const handleModalGroupExerciseClose = () => {
    dispatch(setModalExerciseGroupState(false));
  };

  const handleModalExerciseCreateClose = () => {
    dispatch(setModalCreateState(false));
  };

  const handleModalExerciseUpdateClose = () => {
    dispatch(setModalUpdateState(false));
  };

  return (
    <>
      {modalGroupExerciseState && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleModalGroupExerciseClose}
            >
              <IoIosClose />
            </button>
            <p>L'exercice a été ajouté à la classe avec succès !</p>
          </div>
        </div>
      )}
      {modalExerciceCreateState && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleModalExerciseCreateClose}
            >
              <IoIosClose />
            </button>
            <p>L'exercice a été crée avec succès !</p>
          </div>
        </div>
      )}
      {modalExerciceUpdateState && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleModalExerciseUpdateClose}
            >
              <IoIosClose />
            </button>
            <p>L'exercice a été modifié avec succès !</p>
          </div>
        </div>
      )}
    </>
  );
}
