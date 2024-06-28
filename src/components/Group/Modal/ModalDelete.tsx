import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IGroup } from "../../../types/types";

import {
  fetchGroupDelete,
  setModalDelete,
  setModalDeleteState,
} from "../../../store/reducers/group.ts";

interface Props {
  group: IGroup;
}

import Button from "../../Button/Button.tsx";
import Loading from "../../Loading/Loading.tsx";

import "./Modal.scss";

export default function ModalDelete({ group }: Props) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.student.loading);

  const modalDelete = useAppSelector((state) => state.group.delete);

  const handleClickButton = () => {
    dispatch(fetchGroupDelete(group.id));
    dispatch(setModalDelete(!modalDelete));
    dispatch(setModalDeleteState(true));
  };

  return (
    <div className="group__modal">
      <div className="group__modal-content">
        {loading && <Loading />}
        <h2>Etes vous sur de supprimer la classe {group.name} ?</h2>
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
