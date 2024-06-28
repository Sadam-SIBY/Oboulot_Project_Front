import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaPen,
  FaPlus,
  FaTrash,
  FaCaretRight,
  FaCaretDown,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { IExercise, IGroupExercise } from "../../../types/types";
import {
  fetchExerciseUser,
  setModalDelete,
} from "../../../store/reducers/exercise.ts";

import { setModalExerciseGroup } from "../../../store/reducers/exercise.ts";

import Button from "../../Button/Button.tsx";
import ModalDelete from "../Modal/ModalDelete.tsx";
import ModalGroupExercise from "../Modal/ModalGroupExercise.tsx";
import { fetchGroupList } from "../../../store/reducers/group.ts";

interface Props {
  exercise?: IExercise;
  exerciseGroup?: IGroupExercise;
  dashboard?: boolean;
  modal?: boolean;
  onClick: () => void;
}

export default function Card({
  exercise,
  exerciseGroup,
  dashboard,
  modal,
  onClick,
}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const groupList = useAppSelector((state) => state.group.list);
  const exerciseUserList = useAppSelector(
    (state) => state.exercise.exerciseUserList
  );
  const modalDelete = useAppSelector((state) => state.exercise.delete);
  const modalExerciseGroup = useAppSelector(
    (state) => state.exercise.exerciseGroup
  );

  const [isCRUDOpen, setIsCRUDOpen] = useState(false);

  const handleClick = () => {
    setIsCRUDOpen(!isCRUDOpen);
  };

  const handleClickRead = () => {
    onClick();
    if (exerciseGroup && filteredGroup) {
      navigate(`/exercices/${exerciseGroup.exercise_id}/correction`);
    }
  };

  const handleClickCreate = () => {
    onClick();
    if (exerciseGroup && filteredGroup) {
      navigate(`/exercices/${exerciseGroup.exercise_id}/reponse`);
    }
  };

  const handleClickUpdate = () => {
    onClick();
    if (exercise) {
      navigate(`/exercices/${exercise.id}/modification`);
    }
  };

  const handleClickDelete = () => {
    onClick();
    dispatch(setModalDelete(!modalDelete));
  };

  const handleClickAddGroupExercises = () => {
    onClick();
    dispatch(setModalExerciseGroup(!modalExerciseGroup));
  };

  useEffect(() => {
    if (modal) {
      setIsCRUDOpen(false);
    }
  }, [modal, isCRUDOpen]);

  useEffect(() => {
    dispatch(fetchExerciseUser());
    dispatch(fetchGroupList());
  }, [dispatch]);

  const filteredExerciseUserList = exerciseUserList.find((exerciseUser) => {
    return exerciseUser.exercise_id === exerciseGroup?.exercise_id;
  });

  const filteredGroup = groupList.find((group) => {
    return group.id === exerciseGroup?.group_id;
  });

  return (
    <>
      <tr>
        <td>
          {exercise &&
            (dashboard ? `Exercice ${exercise.title}` : exercise.title)}
          {exerciseGroup &&
            (dashboard
              ? `Exercice ${exerciseGroup.title}`
              : exerciseGroup.title)}
        </td>
        {exerciseGroup && filteredGroup && <td>{filteredGroup.name}</td>}
        <td>
          {exercise && exercise.subject}
          {exerciseGroup && exerciseGroup.subject}
        </td>
        <td>
          <div className="logos">
            {
              <div className="logos__container">
                {exerciseGroup && (
                  <>
                    {filteredExerciseUserList?.is_done === 1 ? (
                      <Button
                        type="button"
                        className="white"
                        label={<FaEye />}
                        onClick={handleClickRead}
                      />
                    ) : (
                      <Button
                        type="button"
                        className="white"
                        label={<FaPen />}
                        onClick={handleClickCreate}
                      />
                    )}
                  </>
                )}
                {!exerciseGroup && (
                  <>
                    <Button
                      type="button"
                      className="white"
                      label={<FaPlus />}
                      onClick={handleClickAddGroupExercises}
                    />
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
                  {!exerciseGroup && (
                    <>
                      <Button
                        type="button"
                        className="white"
                        label={"Associer"}
                        onClick={handleClickAddGroupExercises}
                      />
                      <Button
                        type="button"
                        className="white"
                        label={"Modifier"}
                        onClick={handleClickUpdate}
                      />{" "}
                      <Button
                        type="button"
                        className="white"
                        label={"Supprimer"}
                        onClick={handleClickDelete}
                      />
                    </>
                  )}
                  {exerciseGroup && (
                    <>
                      {filteredExerciseUserList?.is_done === 1 ? (
                        <Button
                          type="button"
                          className="white"
                          label={"Voir la correction"}
                          onClick={handleClickRead}
                        />
                      ) : (
                        <Button
                          type="button"
                          className="white"
                          label={"Faire l'exercice"}
                          onClick={handleClickCreate}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            {modalDelete && modal && exercise && (
              <ModalDelete exercise={exercise} />
            )}
            {modalExerciseGroup && modal && exercise && (
              <ModalGroupExercise exercise={exercise} />
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
