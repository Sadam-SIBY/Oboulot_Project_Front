import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchGroupList,
  fetchExerciseGroup,
} from "../../store/reducers/group.ts";

import { fetchExerciseList } from "../../store/reducers/exercise.ts";

import Sidebar from "../Sidebar/Sidebar.tsx";
import Button from "../Button/Button.tsx";
import TableGroup from "../Group/Table/Table.tsx";
import TableExercise from "../Exercise/Table/Table.tsx";

import "./Dashboard.scss";
import { fetchGetUserProfile } from "../../store/reducers/user.ts";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.user.userData);
  const groupList = useAppSelector((state) => state.group.list);
  const exerciseList = useAppSelector((state) => state.exercise.list);
  const groupExercise = useAppSelector(
    (state) => state.group.listGroupExercises
  );

  useEffect(() => {
    dispatch(fetchGroupList());
    dispatch(fetchExerciseGroup());
    dispatch(fetchExerciseList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetUserProfile());
  }, []);

  return (
    <div className="container__with-sidebar">
      <h1>Tableau de bord</h1>
      <div className="container__content">
        <Sidebar />
        <div className="container__list sidebar">
          <section className="container__list-section">
            <TableGroup
              title="Liste des classes"
              className="dashboard"
              groupList={groupList}
              isDashboard={true}
            />
            {groupList.length >= 8 && (
              <Button
                type="button"
                className={`${
                  userData.roles.includes("ROLE_USER") &&
                  !userData.roles.includes("ROLE_ENSEIGNANT") &&
                  !userData.roles.includes("ROLE_ADMIN")
                    ? "purple"
                    : "blue"
                } button-100`}
                label={"Voir la liste de toutes les classes"}
                link={"/classes"}
              />
            )}
          </section>
          {userData.roles.includes("ROLE_USER") &&
          !userData.roles.includes("ROLE_ENSEIGNANT") &&
          !userData.roles.includes("ROLE_ADMIN") ? (
            <section className="container__list-section">
              <TableExercise
                title="Liste des exercices"
                className="dashboard"
                exerciseGroupList={groupExercise}
                isDashboard={true}
              />
              {exerciseList.length >= 8 && (
                <Button
                  type="button"
                  className={`${
                    userData.roles.includes("ROLE_USER") &&
                    !userData.roles.includes("ROLE_ENSEIGNANT") &&
                    !userData.roles.includes("ROLE_ADMIN")
                      ? "purple"
                      : "blue"
                  } button-100`}
                  label={"Voir la liste de tous les exercices"}
                  link={"/exercices"}
                />
              )}
            </section>
          ) : (
            <section className="container__list-section">
              <TableExercise
                title="Liste des exercices"
                className="dashboard"
                exerciseList={exerciseList}
                isDashboard={true}
              />
              {exerciseList.length >= 8 && (
                <Button
                  type="button"
                  className={`${
                    userData.roles.includes("ROLE_USER") &&
                    !userData.roles.includes("ROLE_ENSEIGNANT") &&
                    !userData.roles.includes("ROLE_ADMIN")
                      ? "purple"
                      : "blue"
                  } button-100`}
                  label={"Voir la liste de tous les exercices"}
                  link={"/exercices"}
                />
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
