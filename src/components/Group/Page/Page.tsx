import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/index.ts";
import { useParams } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";

import Button from "../../Button/Button.tsx";
import ListUser from "../List/ListUser.tsx";
import Modal from "../Modal/ModalUpdate.tsx";
import Sidebar from "../../Sidebar/Sidebar.tsx";
import TableExercise from "../../Exercise/Table/Table.tsx";

import "./Page.scss";

import {
  fetchGroup,
  fetchExerciseListFromGroup,
  fetchStudentListFromGroup,
  setModalUpdate,
  clearExerciseList,
  fetchExerciseGroup,
} from "../../../store/reducers/group.ts";

export default function Group() {
  const dispatch = useAppDispatch();
  const { idGroup } = useParams();

  const userData = useAppSelector((state) => state.user.userData);
  const modalUpdate = useAppSelector((state) => state.group.update);
  const exerciseList = useAppSelector((state) => state.group.exerciseList);
  const groupData = useAppSelector((state) => state.group.groupData);
  const userList = useAppSelector((state) => state.group.userList);
  const groupExercise = useAppSelector(
    (state) => state.group.listGroupExercises
  );

  const [isListOpen, setIsListOpen] = useState(false);

  let parsedIdGroup: number = 0;

  if (idGroup) {
    parsedIdGroup = parseInt(idGroup);
  }

  const handleClick = () => {
    dispatch(setModalUpdate(!modalUpdate));
  };

  useEffect(() => {
    dispatch(setModalUpdate(false));
    dispatch(clearExerciseList());
    dispatch(fetchExerciseGroup());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGroup(parsedIdGroup));
    dispatch(fetchExerciseListFromGroup(parsedIdGroup));
    dispatch(fetchStudentListFromGroup(parsedIdGroup));
  }, [dispatch, parsedIdGroup]);

  return (
    <div className="container__with-sidebar">
      <section className="container__with-editMode">
        <h1>Classe {groupData.name}</h1>
        {(userData.roles.includes("ROLE_ENSEIGNANT") ||
          userData.roles.includes("ROLE_ADMIN")) &&
          (modalUpdate ? (
            ""
          ) : (
            <div className="header__button">
              <Button
                type="button"
                className="blue header__button-text"
                onClick={handleClick}
                label={"Modifier les informations"}
              />
            </div>
          ))}
      </section>
      <div className="container__group-list">
        <div>
          <button
            type="button"
            className={`${
              userData.roles.includes("ROLE_USER") &&
              !userData.roles.includes("ROLE_ENSEIGNANT") &&
              !userData.roles.includes("ROLE_ADMIN")
                ? "purple"
                : "blue"
            } header__button-logo ${
              isListOpen ? "button-left" : "button-right"
            }`}
            onClick={() => setIsListOpen(!isListOpen)}
          >
            <BsFillPeopleFill />
          </button>
          <div
            className={
              isListOpen
                ? "container__group-list__visible slide-in-left"
                : "container__group-list__invisible"
            }
          >
            <h3>Liste des participants</h3>
            <ul>
              {[
                ...userList
                  .filter((user) => user.roles.includes("ROLE_ENSEIGNANT"))
                  .sort((a, b) => {
                    const removeAccents = (name: string) => {
                      return name
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    };
                    const firstnameA = removeAccents(a.firstname.toLowerCase());
                    const firstnameB = removeAccents(b.firstname.toLowerCase());
                    if (firstnameA < firstnameB) {
                      return -1;
                    }
                    if (firstnameA > firstnameB) {
                      return 1;
                    }
                    return 0;
                  }),
                ...userList
                  .filter((user) => !user.roles.includes("ROLE_ENSEIGNANT"))
                  .sort((a, b) => {
                    const removeAccents = (name: string) => {
                      return name
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    };
                    const firstnameA = removeAccents(a.firstname.toLowerCase());
                    const firstnameB = removeAccents(b.firstname.toLowerCase());
                    if (firstnameA < firstnameB) {
                      return -1;
                    }
                    if (firstnameA > firstnameB) {
                      return 1;
                    }
                    return 0;
                  }),
              ].map((user) => (
                <ListUser key={user.id} user={user} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container__content">
        <Sidebar list={true} />
        <div className="container__list">
          <section className="container__list-section">
            {userData.roles.includes("ROLE_USER") &&
            !userData.roles.includes("ROLE_ENSEIGNANT") &&
            !userData.roles.includes("ROLE_ADMIN") ? (
              <TableExercise
                titles={["Nom", "Classe", "Matière", " "]}
                exerciseGroupList={groupExercise}
                isDashboard={false}
              />
            ) : (
              <TableExercise
                titles={["Nom", "Matière", " "]}
                exerciseList={exerciseList}
                isDashboard={false}
              />
            )}
          </section>
        </div>
        {modalUpdate && <Modal group={groupData} />}
      </div>
    </div>
  );
}
