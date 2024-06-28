import { useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  fetchExerciseListFromGroup,
  fetchStudentListFromGroup,
  setModalGroupExerciseState,
  setModalGroupStudentState,
} from "../../../store/reducers/group.ts";

export default function Modal() {
  const dispatch = useAppDispatch();
  const { idGroup } = useParams();

  const modalGroupExerciseState = useAppSelector(
    (state) => state.group.groupExerciseState
  );
  const modalGroupStudentState = useAppSelector(
    (state) => state.group.groupStudentState
  );

  let parsedIdGroup: number = 0;

  if (idGroup) {
    parsedIdGroup = parseInt(idGroup);
  }

  const handleModalGroupExerciseClose = () => {
    dispatch(setModalGroupExerciseState(false));
    dispatch(fetchExerciseListFromGroup(parsedIdGroup));
  };

  const handleModalGroupStudentClose = () => {
    dispatch(setModalGroupStudentState(false));
    dispatch(fetchStudentListFromGroup(parsedIdGroup));
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
      {modalGroupStudentState && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleModalGroupStudentClose}
            >
              <IoIosClose />
            </button>
            <p>L'élève a été ajouté à la classe avec succès !</p>
          </div>
        </div>
      )}
    </>
  );
}
