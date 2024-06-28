import { useParams } from "react-router";
import { useAppSelector } from "../../hooks/redux.ts";

import Sidebar from "../Sidebar/Sidebar.tsx";
import FilterList from "./FilterList.tsx";
import Table from "./Table.tsx";

import "./List.scss";

export default function List() {
  const { slug, idGroup, idExercise } = useParams();

  const groupList = useAppSelector((state) => state.group.list);
  const exerciseList = useAppSelector((state) => state.exercise.list);

  let idExerciseNumber: number;
  let idGroupNumber: number;

  if (idExercise) {
    idExerciseNumber = parseInt(idExercise, 10);
  }

  if (idGroup) {
    idGroupNumber = parseInt(idGroup, 10);
  }

  const groupFound = groupList?.find((group) => group.id === idGroupNumber);

  const exerciseStudentList = exerciseList.filter(
    (exercise) =>
      exercise.id === idExerciseNumber &&
      exercise.groups[0].id === idGroupNumber
  );

  return (
    <div className="container__with-sidebar">
      {slug && <h1>Liste des {slug}</h1>}
      {idGroup && idExercise && (
        <h1>
          Liste des élèves appartenant à la classe{" "}
          {groupFound && groupFound.name} pour l'exercice n°
          {idExercise}
        </h1>
      )}
      <div className="container__content">
        <Sidebar />
        <div>
          {idGroup && idExercise && groupFound && <FilterList />}
          <div className="container__list">
            <section className="container__list-section">
              {idGroup && idExercise && (
                <Table
                  titles={["Nom", "Prénom", "Statut", " "]}
                  exerciseList={exerciseStudentList}
                  isFilterList={true}
                />
              )}
              {slug === "classes" && (
                <Table
                  titles={["Nom", "Niveau", "Description", " "]}
                  groupList={groupList}
                  isList={true}
                />
              )}
              {slug === "exercices" && (
                <Table
                  titles={["Nom", "Classe", "Statut", " "]}
                  exerciseList={exerciseList}
                  isList={true}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
