// Imports component styles
import { useAppSelector } from "../../hooks/redux.ts";

import "./Loading.scss";

// Defines the component
export default function Loading() {
  const userData = useAppSelector((state) => state.user.userData);
  const logged = useAppSelector((state) => state.settings.logged);

  return (
    // Displays a loading animation
    <div className="loading">
      <div
        className={`loading__loader ${
          userData.roles.includes("ROLE_USER") &&
          !userData.roles.includes("ROLE_ENSEIGNANT") &&
          !userData.roles.includes("ROLE_ADMIN") &&
          logged
            ? "student"
            : "teacher"
        }`}
      ></div>
    </div>
  );
}
