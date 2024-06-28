import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { fetchExerciseGroup } from "../../../store/reducers/group.ts";

import Sidebar from "../../Sidebar/Sidebar.tsx";
import Table from "../Table/Table.tsx";

export default function List() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.user.userData);
  const exerciseList = useAppSelector((state) => state.exercise.list);
  const groupExercise = useAppSelector(
    (state) => state.group.listGroupExercises
  );

  useEffect(() => {
    dispatch(fetchExerciseGroup());
  }, [dispatch]);

  return (
    <div className="container__with-sidebar">
      <h1>Liste des exercices</h1>
      <div className="container__content">
        <Sidebar />
        <div className="container__list">
          {(userData.roles.includes("ROLE_ENSEIGNANT") ||
            userData.roles.includes("ROLE_ADMIN")) && (
            <section className="container__list-section">
              <Table
                titles={["Nom", "Matière", " "]}
                exerciseList={exerciseList}
                isDashboard={false}
              />
            </section>
          )}
          {userData.roles.includes("ROLE_USER") &&
            !userData.roles.includes("ROLE_ENSEIGNANT") &&
            !userData.roles.includes("ROLE_ADMIN") && (
              <section className="container__list-section">
                <Table
                  titles={["Nom", "Classe", "Matière", " "]}
                  exerciseGroupList={groupExercise}
                  isDashboard={false}
                />
              </section>
            )}
        </div>
      </div>
    </div>
  );
}
