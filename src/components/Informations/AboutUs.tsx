// Imports a required component
import { Link } from "react-router-dom";

// Defines the component
export default function AboutUs() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Container for the about us page content
    <div className="home">
      <h1>À propos</h1>
      <h2>Présentation</h2>
      <p>
        O’Boulot est une plateforme éducative interactive conçue pour répondre
        aux défis rencontrés par de nombreux enseignants et élèves pendant la
        pandémie de coronavirus. Face aux problèmes techniques sur les
        plateformes éducatives existantes, nous avons été inspirés à créer une
        interface interactive plus fiable et performante.
      </p>
      <h2>Notre objectif</h2>
      <p>
        Notre objectif est de rendre l'apprentissage plus accessible pour les
        élèves tout en offrant des outils intuitifs aux enseignants pour
        faciliter la création et la gestion de leurs exercices en ligne.
      </p>
      <h2>Nos services</h2>
      <p>
        O’Boulot propose une expérience d'apprentissage moderne et innovante.
        Finis les stylos et les feuilles de papier, notre plateforme permet aux
        élèves de se connecter facilement avec leur smartphone, tablette ou
        ordinateur pour réaliser des exercices créés par leurs professeurs avec
        soin.
      </p>
      <h2>Pour les enseignants</h2>
      <p>
        Nous offrons des outils intuitifs pour créer des exercices
        personnalisés, gérer les classes et communiquer avec les élèves de
        manière simple et efficace.
      </p>
      <h2>Pour les élèves</h2>
      <p>
        Nous offrons une interface conviviale pour améliorer leur expérience
        d'apprentissage en ligne, avec un accès facile aux exercices assignés
        par leurs enseignants.
      </p>
      <h2>Notre engagement</h2>
      <p>
        Chez O’Boulot, nous croyons en l'importance de l'éducation et nous nous
        engageons à fournir une plateforme qui permet aux enseignants et aux
        élèves de s'épanouir dans leur parcours d'apprentissage.
      </p>
      <h2>Contactez-nous</h2>
      {/* Description inviting users to contact */}
      <p>
        Contactez-nous si vous avez des questions ou des commentaires, n'hésitez
        pas à nous contacter via notre{" "}
        <Link
          className="color-black weight-bold"
          to="/contact"
          onClick={handleClick}
        >
          formulaire de contact
        </Link>
        . Nous sommes impatients de vous entendre !
      </p>
    </div>
  );
}
