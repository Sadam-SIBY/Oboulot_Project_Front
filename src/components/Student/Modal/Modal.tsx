import { IoIosClose } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import {
  setModalCreate,
  setModalCreateState,
} from "../../../store/reducers/student.ts";

export default function Modal() {
  const dispatch = useAppDispatch();

  const modalCreateStudent = useAppSelector((state) => state.student.create);
  const modalCreateStateStudent = useAppSelector(
    (state) => state.student.createState
  );

  const handleModalStudentClose = () => {
    dispatch(setModalCreateState(false));
    dispatch(setModalCreate(!modalCreateStudent));
  };

  return (
    <>
      {modalCreateStateStudent && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleModalStudentClose}
            >
              <IoIosClose />
            </button>
            <p>Le compte de l'élève a été crée avec succès !</p>
          </div>
        </div>
      )}
    </>
  );
}
