// Imports the picture and required components
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";

import { logout } from "../../../store/reducers/settings.ts";

import logo from "./../../../assets/logo.png";

import NavItem from "./NavItem.tsx";
import { fetchGetUserProfile } from "../../../store/reducers/user.ts";

// Defines the component
export default function Header() {
  // Initializing dispatch function from Redux
  const dispatch = useAppDispatch();
  // Retrieve the current location of the page
  const location = useLocation();

  // Extracting logged states from Redux store
  const logged = useAppSelector((state) => state.settings.logged);

  const userData = useAppSelector((state) => state.user.userData);

  // Manages the state for the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle the toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Effect closes the mobile menu whenever a link is clicked by updating the state variable menuOpen to false when the location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (logged) {
      dispatch(fetchGetUserProfile());
    }
  }, [dispatch, logged]);

  return (
    // Header container
    <header
      className={`header ${
        userData.roles.includes("ROLE_USER") &&
        !userData.roles.includes("ROLE_ENSEIGNANT") &&
        !userData.roles.includes("ROLE_ADMIN") &&
        logged
          ? "student"
          : "teacher"
      }`}
    >
      {/* Project logo and name */}
      <div className="header__project">
        <Link to="/">
          <img
            className="header__project-logo"
            src={logo}
            alt="Logo O'Boulot"
          />
        </Link>
        <Link to="/">
          <span className="header__project-name">O'Boulot</span>
        </Link>
      </div>
      {/* Mobile menu button */}
      <div
        className={`header__menu-button ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="header__menu-button__burger"></div>
      </div>
      {/* Conditional rendering based on user authentication status and mobile menu state */}
      {menuOpen && !logged && (
        <nav className={`header__menu-nav visitor ${menuOpen ? "open" : ""}`}>
          <NavItem to="/contact" label="Contactez-nous" />
          <NavItem to="/connexion" label="Se connecter" />
          <NavItem to="/inscription" label="S'inscrire" />
        </nav>
      )}
      {menuOpen && logged && (
        <>
          <nav className={`header__menu-nav ${menuOpen ? "open" : ""}`}>
            <div>
              <NavItem to="/tableau-de-bord" label="Accueil" />
              <NavItem to="/classes" label="Classes" />
              <NavItem to="/exercices" label="Exercices" />
            </div>
            <div>
              <NavItem to="/profil" label="Profil" />
              {/* <NavItem to="/messages" label="Messages" /> */}
              {userData.roles.includes("ROLE_ADMIN") && (
                <a href="http://francois-morel.vpnuser.lan/Apotheose/projet-06-train-with-fun-back/public/">
                  Backoffice
                </a>
              )}
              <NavItem
                to="/"
                label="Se déconnecter"
                authentification={() => {
                  dispatch(logout());
                }}
              />
              <p>
                <FaRegUser />
                {userData.firstname}
              </p>
            </div>
          </nav>
        </>
      )}
      <div className="header__menu-content">
        {logged && (
          <>
            <nav>
              <NavItem to="/tableau-de-bord" label="Accueil" />
              <NavItem to="/classes" label="Classes" />
              <NavItem to="/exercices" label="Exercices" />
            </nav>
          </>
        )}
      </div>
      {/* Conditional rendering for logged-in and non-logged-in users */}
      <div className="header__menu-content">
        {logged ? (
          <nav>
            <NavItem to="/profil" label="Profil" />
            {/* <NavItem to="/messages" label="Messages" /> */}
            {userData.roles.includes("ROLE_ADMIN") && (
              <a href="http://francois-morel.vpnuser.lan/Apotheose/projet-06-train-with-fun-back/public/">
                Backoffice
              </a>
            )}
            <NavItem
              to="/"
              label="Se déconnecter"
              authentification={() => {
                dispatch(logout());
              }}
            />
            <p>
              <FaRegUser />
              {userData.firstname}
            </p>
          </nav>
        ) : (
          <nav>
            <NavItem to="/contact" label="Contactez-nous" />
            <NavItem to="/connexion" label="Se connecter" />
            <NavItem to="/inscription" label="S'inscrire" />
          </nav>
        )}
      </div>
    </header>
  );
}
