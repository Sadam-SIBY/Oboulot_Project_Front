import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import Button from "../../Button/Button.tsx";

import {
  fetchQuestionDelete,
  setModalDelete,
  setModalDeleteState,
} from "../../../store/reducers/question.ts";

interface Props {
  id: number;
}

import "./Question.scss";

export default function Delete({ id }: Props) {
  const dispatch = useAppDispatch();

  const modalDelete = useAppSelector((state) => state.question.delete);

  const handleClickButton = () => {
    dispatch(fetchQuestionDelete(id));
    dispatch(setModalDelete(!modalDelete));
    dispatch(setModalDeleteState(true));
  };

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        <h2>Etes vous sur de supprimer la question ?</h2>
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
