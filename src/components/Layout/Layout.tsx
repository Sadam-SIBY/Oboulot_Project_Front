// Imports required components and component styles
import Header from "./Structure/Header.tsx";
import Footer from "./Structure/Footer.tsx";
import { Outlet } from "react-router-dom";

import "./Layout.scss";

// Defines the component
export default function Layout() {
  return (
    // Rendering the Header component at the top, Outlet component to handle nested routes and Footer component at the bottom.
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
