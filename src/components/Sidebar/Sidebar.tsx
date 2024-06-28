import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { IoIosClose } from "react-icons/io";

import Button from "../Button/Button.tsx";
import ModalExercise from "../Exercise/Modal/Modal.tsx";
import ModalGroup from "../Group/Modal/Modal.tsx";
import ModalStudent from "../Student/Modal/Modal.tsx";
import ModalCreateGroup from "../Group/Modal/ModalCreate.tsx";
import ModalCreateExercise from "../Exercise/Modal/ModalCreate.tsx";
import ModalCreateExerciseQuestion from "../Exercise/Modal/Modal.tsx";
import ModalCreateStudent from "../Student/Modal/ModalCreate.tsx";
import ModalGroupStudent from "../Group/Modal/ModalGroupStudent.tsx";
import ModalGroupExercise from "../Group/Modal/ModalGroupExercise.tsx";
import Table from "./Table/Table.tsx";

import {
  fetchGroupList,
  setModalGroupStudent,
  setModalGroupExercise,
  setModalCreate as setModalCreateGroup,
  setModalCreateState as setModalCreateStateGroup,
  setModalUpdateState as setModalUpdateStateGroup,
  setModalDeleteState as setModalDeleteStateGroup,
  fetchExerciseGroup,
  fetchGroup,
} from "../../store/reducers/group.ts";

import {
  fetchExerciseList,
  fetchExerciseLastId,
  setModalCreate as setModalCreateExercise,
  setModalCreateState as setModalCreateStateExercise,
  setModalCreateStateFinal,
  setModalUpdateState as setModalUpdateStateExercise,
  setModalDeleteState as setModalDeleteStateExercise,
  fetchExerciseUser,
} from "../../store/reducers/exercise.ts";

import { setModalCreate as setModalCreateStudent } from "../../store/reducers/student.ts";

import "./Sidebar.scss";
import { fetchGetUserProfile } from "../../store/reducers/user.ts";

interface Props {
  list?: boolean;
}

export default function Sidebar({ list }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { idGroup } = useParams();

  const exerciseLastId = useAppSelector(
    (state) => state.exercise.lastIdExercise.id
  );

  const modalGroupCreate = useAppSelector((state) => state.group.create);
  const modalGroupExercise = useAppSelector(
    (state) => state.group.groupExercise
  );
  const modalGroupExerciseState = useAppSelector(
    (state) => state.group.groupExerciseState
  );

  const modalExerciseCreate = useAppSelector((state) => state.exercise.create);
  const modalExerciseCreateState = useAppSelector(
    (state) => state.exercise.createState
  );
  const modalCreateExerciseFinal = useAppSelector(
    (state) => state.exercise.createStateFinal
  );
  const modalExerciseUpdateState = useAppSelector(
    (state) => state.exercise.updateState
  );
  const modalExerciseGroupState = useAppSelector(
    (state) => state.exercise.exerciseGroupState
  );

  const modalStudentCreate = useAppSelector((state) => state.student.create);
  const modalStudentCreateState = useAppSelector(
    (state) => state.student.createState
  );
  const modalGroupStudent = useAppSelector((state) => state.group.groupStudent);
  const modalGroupStudentState = useAppSelector(
    (state) => state.group.groupStudentState
  );

  const userData = useAppSelector((state) => state.user.userData);
  const exerciseList = useAppSelector((state) => state.exercise.list);
  const exerciseGroupList = useAppSelector(
    (state) => state.group.listGroupExercises
  );
  const exerciseUserList = useAppSelector(
    (state) => state.exercise.exerciseUserList
  );

  const modalCreateGroup = useAppSelector((state) => state.group.createState);
  const modalUpdateGroup = useAppSelector((state) => state.group.updateState);
  const modalDeleteGroup = useAppSelector((state) => state.group.deleteState);

  const modalCreateExercise = useAppSelector(
    (state) => state.exercise.createState
  );
  const modalUpdateExercise = useAppSelector(
    (state) => state.exercise.updateState
  );
  const modalDeleteExercise = useAppSelector(
    (state) => state.exercise.deleteState
  );

  const handleCreateModalCloseGroup = () => {
    dispatch(setModalCreateStateGroup(false));
    dispatch(fetchGroupList());
  };

  const handleUpdateModalCloseGroup = () => {
    dispatch(setModalUpdateStateGroup(false));
    dispatch(fetchGroupList());
    if (idGroup) {
      dispatch(fetchGroup(parseInt(idGroup)));
    }
  };

  const handleDeleteModalCloseGroup = () => {
    dispatch(setModalDeleteStateGroup(false));
    dispatch(fetchGroupList());
  };

  const handleCreateModalCloseExercise = () => {
    dispatch(setModalCreateStateExercise(false));
    dispatch(fetchExerciseLastId());

    setTimeout(() => {
      navigate(`/exercices/${exerciseLastId + 1}/creation`);
    }, 1000);

    dispatch(fetchExerciseList());
  };

  const handleCreateModalCloseExerciseFinal = () => {
    dispatch(setModalCreateStateFinal(false));
    dispatch(fetchExerciseList());
  };

  const handleUpdateModalCloseExercise = () => {
    dispatch(setModalUpdateStateExercise(false));
    dispatch(fetchExerciseList());
  };

  const handleDeleteModalCloseExercise = () => {
    dispatch(setModalDeleteStateExercise(false));
    dispatch(fetchExerciseList());
  };

  const handleClickCreateGroup = () => {
    dispatch(setModalCreateGroup(!modalGroupCreate));
  };

  const handleClickCreateExercise = () => {
    dispatch(setModalCreateExercise(!modalExerciseCreate));
  };

  const handleClickAddStudent = () => {
    dispatch(setModalCreateStudent(!modalStudentCreate));
  };

  const handleClickGroupStudent = () => {
    dispatch(setModalGroupStudent(!modalGroupStudent));
  };

  const handleClickGroupExercise = () => {
    dispatch(setModalGroupExercise(!modalGroupExercise));
  };

  useEffect(() => {
    dispatch(fetchExerciseList());
    dispatch(fetchExerciseLastId());
    dispatch(fetchExerciseGroup());
    dispatch(fetchExerciseUser());
  }, [dispatch]);

  const sortedExercisesCreated = exerciseList.slice().sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const sortedExercisesPublished = exerciseGroupList
    .filter((exercise) => exercise.published_at !== null)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const sortedExercisesDone = exerciseUserList.filter(
    (exercise) => exercise.is_done === 1
  );

  const filteredExercisesPublished = sortedExercisesPublished.filter(
    (exercise) =>
      !sortedExercisesDone.some(
        (doneExercise) => doneExercise.id === exercise.id
      )
  );

  return (
    <div className="sidebar__container">
      {(userData.roles.includes("ROLE_ENSEIGNANT") ||
        userData.roles.includes("ROLE_ADMIN")) && (
        <section className="sidebar__container-section__buttons">
          {list ? (
            <>
              <Button
                type="button"
                className={"blue button-100"}
                label={"Ajouter un élève"}
                onClick={handleClickGroupStudent}
              />
              <Button
                type="button"
                className={"blue button-100 button-margin-top"}
                label={"Ajouter un exercice"}
                onClick={handleClickGroupExercise}
              />
            </>
          ) : (
            <>
              <Button
                type="button"
                className={"blue button-100"}
                label={"Créer un compte élève"}
                onClick={handleClickAddStudent}
              />
              <Button
                type="button"
                className={"blue button-100 button-margin-top"}
                label={"Créer une classe"}
                onClick={handleClickCreateGroup}
              />
              <Button
                type="button"
                className={"blue button-100 button-margin-top"}
                label={"Créer un exercice"}
                onClick={handleClickCreateExercise}
              />
            </>
          )}
        </section>
      )}
      {userData.roles.includes("ROLE_USER") &&
      !userData.roles.includes("ROLE_ENSEIGNANT") &&
      !userData.roles.includes("ROLE_ADMIN") ? (
        <section className="sidebar__container-section__array">
          <Table
            title="Derniers exercises à faire"
            className="sidebar"
            exerciseGroupList={filteredExercisesPublished}
          />
          <Table
            title="Derniers exercises faits"
            className="sidebar"
            exerciseUserList={sortedExercisesDone}
          />
        </section>
      ) : (
        <section className="sidebar__container-section__array">
          <Table
            title="Derniers exercises crées"
            className="sidebar"
            exerciseList={sortedExercisesCreated}
          />
          <Table
            title="Derniers exercises publiés"
            className="sidebar"
            exerciseGroupList={sortedExercisesPublished}
          />
        </section>
      )}
      {modalGroupCreate && <ModalCreateGroup />}
      {modalGroupExercise && <ModalGroupExercise />}
      {modalGroupStudent && <ModalGroupStudent />}
      {modalGroupExerciseState && <ModalGroup />}

      {modalExerciseCreate && <ModalCreateExercise />}
      {modalExerciseCreateState && <ModalCreateExerciseQuestion />}
      {modalExerciseUpdateState && <ModalCreateExerciseQuestion />}
      {modalExerciseGroupState && <ModalExercise />}

      {modalStudentCreate && <ModalCreateStudent />}
      {modalStudentCreateState && <ModalStudent />}
      {modalGroupStudentState && <ModalGroup />}

      {/* Modal for successful registration */}
      {modalCreateGroup && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleCreateModalCloseGroup}
            >
              <IoIosClose />
            </button>
            <p>Classe créée avec succès !</p>
            <p>
              Vous pouvez maintenant le retrouver dans la liste des classes.
            </p>
          </div>
        </div>
      )}
      {modalUpdateGroup && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleUpdateModalCloseGroup}
            >
              <IoIosClose />
            </button>
            <p>
              Les informations sur la classe ont été modifiées avec succès !
            </p>
          </div>
        </div>
      )}
      {modalDeleteGroup && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleDeleteModalCloseGroup}
            >
              <IoIosClose />
            </button>
            <p>La classe a été supprimée avec succès !</p>
          </div>
        </div>
      )}

      {modalCreateExercise && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleCreateModalCloseExercise}
            >
              <IoIosClose />
            </button>
            <p>
              Vous pouvez maintenant ajouter des questions ! (Cliquer sur la
              croix pour continuer)
            </p>
          </div>
        </div>
      )}
      {modalCreateExerciseFinal && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleCreateModalCloseExerciseFinal}
            >
              <IoIosClose />
            </button>
            <p>Exercice crée avec succès !</p>
            <p>
              Vous pouvez maintenant le retrouver dans la liste des exercices.
            </p>
          </div>
        </div>
      )}
      {modalUpdateExercise && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleUpdateModalCloseExercise}
            >
              <IoIosClose />
            </button>
            <p>L'exercice a été modifié avec succès !</p>
          </div>
        </div>
      )}
      {modalDeleteExercise && (
        <div className="registered">
          <div className="registered__modal">
            <button
              className="registered__modal-close"
              onClick={handleDeleteModalCloseExercise}
            >
              <IoIosClose />
            </button>
            <p>L'exercice a été supprimé avec succès !</p>
          </div>
        </div>
      )}
    </div>
  );
}
