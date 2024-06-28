import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDoorOpen,
  FaPen,
  FaTrash,
  FaCaretRight,
  FaCaretDown,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { IGroup } from "../../../types/types";
import {
  setModalUpdate,
  setModalDelete,
} from "../../../store/reducers/group.ts";

import Button from "../../Button/Button.tsx";
import "./Card.scss";
import ModalUpdate from "../Modal/ModalUpdate.tsx";
import ModalDelete from "../Modal/ModalDelete.tsx";

interface Props {
  group: IGroup;
  dashboard?: boolean;
  modal?: boolean;
  onClick: () => void;
}

export default function Card({ group, dashboard, modal, onClick }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.user.userData);
  const modalUpdate = useAppSelector((state) => state.group.update);
  const modalDelete = useAppSelector((state) => state.group.delete);

  const [isCRUDOpen, setIsCRUDOpen] = useState(false);

  const handleClick = () => {
    setIsCRUDOpen(!isCRUDOpen);
  };

  const handleClickUpdate = () => {
    onClick();
    dispatch(setModalUpdate(!modalUpdate));
  };

  const handleClickDelete = () => {
    onClick();
    dispatch(setModalDelete(!modalDelete));
  };

  useEffect(() => {
    if (modal) {
      setIsCRUDOpen(false);
    }
  }, [modal, isCRUDOpen]);

  return (
    <>
      <tr>
        <td>{dashboard ? `Classe ${group.name}` : group.name}</td>
        <td>{group.level}</td>
        {!dashboard && <td>{group.description}</td>}
        <td>
          <div className="logos">
            {
              <div className="logos__container">
                <Button
                  type="button"
                  className="white"
                  label={<FaDoorOpen />}
                  onClick={() => {
                    navigate(`/classes/${group.id}`);
                  }}
                />
                {(userData.roles.includes("ROLE_ENSEIGNANT") ||
                  userData.roles.includes("ROLE_ADMIN")) && (
                  <>
                    <Button
                      type="button"
                      className="white"
                      label={<FaPen />}
                      onClick={handleClickUpdate}
                    />
                    <Button
                      type="button"
                      className="white"
                      label={<FaTrash />}
                      onClick={handleClickDelete}
                    />
                  </>
                )}
              </div>
            }
            <div className="logos__container-arrow">
              {isCRUDOpen ? (
                <FaCaretDown
                  onClick={handleClick}
                  className="logos__container-arrow__logo"
                />
              ) : (
                <FaCaretRight
                  onClick={handleClick}
                  className="logos__container-arrow__logo"
                />
              )}
              {isCRUDOpen && (
                <div className="logos__container-arrow__infos">
                  <Button
                    type="button"
                    className="white"
                    label={"Rejoindre"}
                    onClick={() => {
                      navigate(`/classes/${group.id}`);
                    }}
                  />
                  <Button
                    type="button"
                    className="white"
                    label={"Modifier"}
                    onClick={handleClickUpdate}
                  />
                  <Button
                    type="button"
                    className="white"
                    label={"Supprimer"}
                    onClick={handleClickDelete}
                  />
                </div>
              )}
            </div>
            {modalUpdate && modal && <ModalUpdate group={group} />}
            {modalDelete && modal && <ModalDelete group={group} />}
          </div>
        </td>
      </tr>
    </>
  );
}
