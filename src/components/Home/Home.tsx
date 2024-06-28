// Imports a required component and component styles
import Button from "../Button/Button.tsx";

import "./Home.scss";

// Defines the component
export default function Home() {
  return (
    // Container for the home page content
    <div className="home">
      <h1 className="teacher">Bienvenue sur O'Boulot !</h1>
      <p className="home__description">
        Une plateforme éducative qui propose des outils intuitifs pour les
        enseignants afin de créer des exercices personnalisés, tout en offrant
        aux élèves une expérience d’apprentissage ludique et interactive
      </p>
      <section className="home__section">
        <h2 className="home__section-title">
          Explorez l'univers des exercices en ligne !
        </h2>
        <p className="home__section-text">
          De la création jusqu’à l’utilisation, la plateforme offre aux
          enseignants des outils pour concevoir des exercices, tandis que les
          élèves bénéficient d’une expérience conviviale pour y répondre.
        </p>
        <p className="home__section-text">
          Relevez le défi et découvrez comment O'Boulot transforme
          l’apprentissage des élèves en une expérience enrichissante.
        </p>
        {/* Button to navigate to the registration page */}
        <Button
          type={"button"}
          label={"Je m'inscris !"}
          link={"inscription"}
          className="blue button-margin-top"
        />
      </section>
    </div>
  );
}
