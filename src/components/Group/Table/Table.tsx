import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { IGroup } from "../../../types/types";
import { setIdGroup } from "../../../store/reducers/group.ts";

import CardGroup from "../Card/Card.tsx";

import "./Table.scss";

interface Props {
  title?: string;
  titles?: string[];
  className?: string;
  groupList: IGroup[];
  isDashboard: boolean;
}

export default function Table({
  title,
  titles,
  className,
  groupList,
  isDashboard,
}: Props) {
  const dispatch = useAppDispatch();

  const idGroup = useAppSelector((state) => state.group.idGroup);
  const userData = useAppSelector((state) => state.user.userData);

  const handleClick = (idGroup: number) => {
    dispatch(setIdGroup(idGroup));
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
              colSpan={3}
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
        {groupList &&
          (groupList.length > 0 ? (
            (isDashboard ? groupList.slice(0, 7) : groupList).map((item) => (
              <CardGroup
                key={item.id}
                group={item}
                dashboard={isDashboard}
                onClick={() => handleClick(item.id)}
                modal={idGroup === item.id}
              />
            ))
          ) : (
            <tr>
              <td>Aucune classe pour le moment</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
