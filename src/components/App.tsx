// Imports routing components and the useAppSelector hook
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux.ts";

// Imports different components
import AboutUs from "./Informations/AboutUs.tsx";
import Contact from "./Forms/Contact.tsx";
import Dashboard from "./Dashboard/Dashboard.tsx";
import Error from "./Error/Error.tsx";
import ExerciseList from "./Exercise/List/List.tsx";
import ExerciseCreate from "./Exercise/Question/Create.tsx";
import ExerciseUpdate from "./Exercise/Question/Update.tsx";
import GroupList from "./Group/List/List.tsx";
import GroupPage from "./Group/Page/Page.tsx";
import Home from "./Home/Home.tsx";
import Layout from "./Layout/Layout.tsx";
import LegalNotices from "./Informations/LegalNotices.tsx";
// import Messages from "./Messages/Messages.tsx";
import PrivacyPolicy from "./Informations/PrivacyPolicy.tsx";
import Profile from "./Profile/Profile.tsx";
import SignIn from "./Forms/SignIn.tsx";
import SignUp from "./Forms/SignUp.tsx";
import StudentAnswer from "./Exercise/Student/Create.tsx";
import StudentCorrection from "./Exercise/Student/Read.tsx";

// Defines the component
export default function App() {
  const location = useLocation();
  const idExercise = location.pathname.split("/")[2];

  // Using the useAppSelector hook to extract the connection state
  const logged = useAppSelector((state) => state.settings.logged);
  const userData = useAppSelector((state) => state.user.userData);
  const exerciseUserList = useAppSelector(
    (state) => state.exercise.exerciseUserList
  );

  const exercise = exerciseUserList.find(
    (exercise) => exercise.exercise_id === parseInt(idExercise)
  );

  return (
    <>
      <Routes>
        {/* Main route */}
        <Route path="/" element={<Layout />}>
          {/* If the user is not logged in, show the home page, otherwise redirect to the dashboard */}
          <Route
            index
            element={!logged ? <Home /> : <Navigate to="/tableau-de-bord" />}
          />
          {/* Displays links that are available on the home page */}
          <Route path="/a-propos" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalNotices />} />
          <Route
            path="/politique-de-confidentialite"
            element={<PrivacyPolicy />}
          />
          <Route path="/connexion" element={<SignIn />} />
          <Route path="/inscription" element={<SignUp />} />
          {/* <Route path="/mot-de-passe-oublie" element={<ResetPassword />} /> */}
          {logged ? (
            // If the user is logged in then displays the links that are available from the dashboard
            <>
              <Route path="/tableau-de-bord" element={<Dashboard />} />
              <Route path="/classes" element={<GroupList />} />
              <Route path="/exercices" element={<ExerciseList />} />
              {(userData.roles.includes("ROLE_ENSEIGNANT") ||
                userData.roles.includes("ROLE_ADMIN")) && (
                <>
                  <Route
                    path="/exercices/:idExercise/creation"
                    element={<ExerciseCreate />}
                  />
                  <Route
                    path="/exercices/:idExercise/modification"
                    element={<ExerciseUpdate />}
                  />
                </>
              )}
              <Route path="/classes/:idGroup" element={<GroupPage />} />
              {userData.roles.includes("ROLE_USER") &&
                (!userData.roles.includes("ROLE_ENSEIGNANT") ||
                  !userData.roles.includes("ROLE_ADMIN")) && (
                  <>
                    {exercise && exercise.is_done === 0 ? (
                      <Route
                        path={`/exercices/${idExercise}/reponse`}
                        element={<StudentAnswer />}
                      />
                    ) : (
                      ""
                    )}
                    {exercise && exercise.is_done === 1 ? (
                      <Route
                        path={`/exercices/${idExercise}/correction`}
                        element={<StudentCorrection />}
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
              {/* <Route path="/messages" element={<Messages />} /> */}
              <Route path="/profil" element={<Profile />} />
            </>
          ) : (
            // Otherwise redirects the user to the login page
            <>
              <Route
                path="/tableau-de-bord"
                element={<Navigate to="/connexion" />}
              />
              <Route path="/classes" element={<Navigate to="/connexion" />} />
              <Route path="/exercices" element={<Navigate to="/connexion" />} />
              <Route
                path="/classes/:idGroup"
                element={<Navigate to="/connexion" />}
              />
              <Route
                path="/exercices/:idExercise/creation"
                element={<Navigate to="/connexion" />}
              />
              <Route
                path="/exercices/:idExercise/modification"
                element={<Navigate to="/connexion" />}
              />
              <Route
                path="/exercices/:idExercise/reponse"
                element={<Navigate to="/connexion" />}
              />
              <Route
                path="/exercices/:idExercise/correction"
                element={<Navigate to="/connexion" />}
              />
              {/* <Route path="/messages" element={<Navigate to="/connexion" />} /> */}
              <Route path="/profil" element={<Navigate to="/connexion" />} />
            </>
          )}
        </Route>
        {/* Setting a fallback route to handle undefined paths and display the error page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
