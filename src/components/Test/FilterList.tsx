import { useAppSelector } from "../../hooks/redux.ts";
import { useNavigate, useParams } from "react-router";

export default function FilterList() {
  const navigate = useNavigate();
  const { idGroup, idExercise } = useParams();

  const classList = useAppSelector((state) => state.group.list);
  const exerciseList = useAppSelector((state) => state.exercise.list);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectType = event.target.dataset.type;

    if (selectType === "class") {
      const selectedClass = event.target.value;
      navigate(`/classe/${selectedClass}/exercice/${idExercise}`);
    }
    if (selectType === "exercice") {
      const selectedExercise = event.target.value;
      navigate(`/classe/${idGroup}/exercice/${selectedExercise}`);
    }
  };

  const filteredExercises = exerciseList.filter(
    (exercise) => exercise.id === parseInt(idGroup)
  );

  return (
    <div className="filter__list">
      <label htmlFor="class-select" className="filter__list-label weight-bold">
        Classe :
        <select
          name="class-select"
          data-type="class"
          onChange={handleChange}
          value={idGroup}
        >
          {classList.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="exercice-select"
        className="filter__list-label weight-bold"
      >
        Exercice :
        <select
          name="exercice-select"
          data-type="exercice"
          onChange={handleChange}
          value={idExercise}
        >
          {filteredExercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              #{exercise.id}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
