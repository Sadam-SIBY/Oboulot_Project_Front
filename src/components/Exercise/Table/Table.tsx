import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IExercise, IGroupExercise } from "../../../types/types";
import { setIdExercise } from "../../../store/reducers/exercise.ts";

import CardExercise from "../Card/Card.tsx";

interface Props {
  title?: string;
  titles?: string[];
  className?: string;
  exerciseList?: IExercise[];
  exerciseGroupList?: IGroupExercise[];
  isDashboard: boolean;
}

export default function Table({
  title,
  titles,
  className,
  exerciseList,
  exerciseGroupList,
  isDashboard,
}: Props) {
  const dispatch = useAppDispatch();

  const idExercise = useAppSelector((state) => state.exercise.idExercise);
  const userData = useAppSelector((state) => state.user.userData);

  const handleClick = (idExercise: number) => {
    dispatch(setIdExercise(idExercise));
  };

  return (
    <table
      className={`table ${
        userData.roles.includes("ROLE_USER") &&
        !userData.roles.includes("ROLE_ENSEIGNANT") &&
        !userData.roles.includes("ROLE_ADMIN")
          ? "student"
          : "teacher"
      }`}
    >
      <thead>
        <tr>
          {title && (
            <th
              className={`table__th-dashboard ${
                userData.roles.includes("ROLE_USER") &&
                !userData.roles.includes("ROLE_ENSEIGNANT") &&
                !userData.roles.includes("ROLE_ADMIN")
                  ? "student"
                  : "teacher"
              }`}
              colSpan={exerciseGroupList ? 4 : 3}
            >
              {title}
            </th>
          )}
          {titles &&
            titles.map((title, index) => (
              <th
                className={` ${
                  userData.roles.includes("ROLE_USER") &&
                  !userData.roles.includes("ROLE_ENSEIGNANT") &&
                  !userData.roles.includes("ROLE_ADMIN")
                    ? "student"
                    : "teacher"
                }`}
                key={index}
              >
                {title}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className={`${className} ? className : `}>
        {exerciseList &&
          (exerciseList.length > 0 ? (
            (isDashboard ? exerciseList.slice(0, 7) : exerciseList).map(
              (item) => (
                <CardExercise
                  key={item.id}
                  exercise={item}
                  dashboard={isDashboard}
                  onClick={() => handleClick(item.id)}
                  modal={idExercise === item.id}
                />
              )
            )
          ) : (
            <tr>
              <td>Aucun exercice pour le moment</td>
            </tr>
          ))}
        {exerciseGroupList &&
          (exerciseGroupList.length > 0 ? (
            (isDashboard
              ? exerciseGroupList.slice(0, 7)
              : exerciseGroupList
            ).map((item) => (
              <CardExercise
                key={item.id}
                exerciseGroup={item}
                dashboard={isDashboard}
                onClick={() => handleClick(item.id)}
                modal={idExercise === item.id}
              />
            ))
          ) : (
            <tr>
              <td>Aucun exercice pour le moment</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
