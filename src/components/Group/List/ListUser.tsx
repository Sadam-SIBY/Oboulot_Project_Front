import { IUser } from "../../../types/types";

interface Props {
  user: IUser;
}

export default function ListStudent({ user }: Props) {
  return (
    <li className="container__group-user">
      {user.roles.includes("ROLE_ENSEIGNANT") ? (
        <>
          {user.firstname} {user.lastname} <strong>(Enseignant)</strong>
        </>
      ) : (
        `${user.firstname} ${user.lastname}`
      )}
    </li>
  );
}
