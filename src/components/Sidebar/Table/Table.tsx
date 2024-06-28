import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IExercise, IGroupExercise, IUserExercise } from "../../../types/types";
import { setIdExercise } from "../../../store/reducers/exercise.ts";

import CardExercise from "../Card/Card.tsx";

interface Props {
  title: string;
  className: string;
  exerciseList?: IExercise[];
  exerciseGroupList?: IGroupExercise[];
  exerciseUserList?: IUserExercise[];
}

export default function Table({
  title,
  className,
  exerciseList,
  exerciseGroupList,
  exerciseUserList,
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
          <th
            className={`table__th-sidebar ${
              userData.roles.includes("ROLE_USER") &&
              !userData.roles.includes("ROLE_ENSEIGNANT") &&
              !userData.roles.includes("ROLE_ADMIN")
                ? "student"
                : "teacher"
            }`}
            colSpan={3}
          >
            {title}
          </th>
        </tr>
      </thead>
      <tbody className={`${className} ? className : `}>
        {exerciseList &&
          (exerciseList.length > 0 ? (
            exerciseList
              .slice(0, 3)
              .map((item) => (
                <CardExercise
                  key={item.id}
                  exercise={item}
                  modal={idExercise === item.id}
                  onClick={() => handleClick(item.id)}
                />
              ))
          ) : (
            <tr>
              <td>Aucun exercice crée pour le moment</td>
              <td></td>
            </tr>
          ))}
        {exerciseGroupList &&
          (exerciseGroupList.length > 0 ? (
            exerciseGroupList
              .slice(0, 3)
              .map((item) => (
                <CardExercise
                  key={item.id}
                  exerciseData={item}
                  modal={idExercise === item.id}
                  onClick={() => handleClick(item.id)}
                />
              ))
          ) : (
            <tr>
              {userData.roles.includes("ROLE_USER") &&
              !userData.roles.includes("ROLE_ENSEIGNANT") &&
              !userData.roles.includes("ROLE_ADMIN") ? (
                <td>Aucun exercice à faire pour le moment</td>
              ) : (
                <td>Aucun exercice publié pour le moment</td>
              )}
              <td></td>
            </tr>
          ))}
        {exerciseUserList &&
          (exerciseUserList.length > 0 ? (
            exerciseUserList
              .slice(0, 3)
              .map((item) => (
                <CardExercise
                  key={item.id}
                  exerciseUserData={item}
                  modal={idExercise === item.id}
                  onClick={() => handleClick(item.id)}
                />
              ))
          ) : (
            <tr>
              <td>Aucun exercice fait pour le moment</td>
              <td></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
