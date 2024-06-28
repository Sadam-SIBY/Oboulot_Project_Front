// Imports a required component
import { Link } from "react-router-dom";

// Defines the component
export default function PrivacyPolicy() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Container for the privacy policy page content
    <div className="home">
      <h1>Politique de Confidentialité</h1>
      <h2>Introduction</h2>
      <p>
        Nous accordons une grande importance à la confidentialité et à la
        protection des données de nos utilisateurs. Cette Politique de
        Confidentialité explique comment nous collectons, utilisons, partageons
        et protégeons vos informations personnelles lorsque vous utilisez notre
        site.
      </p>
      <h2>Collecte d'information</h2>
      <p>
        Nous collectons des informations personnelles lorsque vous vous
        inscrivez sur notre site ou lorsque vous remplissez un formulaire de
        contact pour communiquer avec nous. Ces informations peuvent inclure
        votre nom, votre prénom ou encore votre adresse mail.
      </p>
      <h2>Utilisation des informations</h2>
      <p>
        Les informations que nous collectons peuvent être utilisées de la
        manière suivante :
      </p>
      <ul className="margin-top">
        <li>Répondre à vos demandes</li>
        <li>Personnaliser votre expérience utilisateur sur le site</li>
        <li>Vous fournir des informations et des mises à jour</li>
        <li>Améliorer notre site et nos services</li>
      </ul>
      <h2>Protection des informations</h2>
      <p>
        Nous mettons en œuvre des mesures de sécurité pour protéger vos
        informations personnelles. Cependant, aucune méthode de transmission sur
        Internet, ni aucune méthode de stockage électronique, n'est totalement
        sécurisée. Nous nous efforçons de prendre toutes les précautions
        nécessaires pour protéger vos données, mais nous ne pouvons garantir
        leur sécurité absolue.
      </p>
      <h2>Partage des informations</h2>
      <p>
        Nous ne vendons, ne louons ni ne partageons vos informations
        personnelles avec des tiers sans votre consentement exprès, sauf si cela
        est nécessaire pour répondre à vos demandes ou pour se conformer à des
        obligations légales.
      </p>
      <h2>Cookies </h2>
      <p>
        Notre site utilise des cookies pour améliorer l'expérience de
        l'utilisateur. En utilisant ce site, vous consentez à l'utilisation de
        cookies conformément à notre politique en matière de cookies.
      </p>
      <h2>Contactez-nous</h2>
      {/* Description inviting users to contact */}
      <p>
        Si vous avez des questions ou des préoccupations concernant notre
        Politique de Confidentialité, veuillez nous contacter via notre{" "}
        <Link
          className="color-black weight-bold"
          to="/contact"
          onClick={handleClick}
        >
          formulaire de contact
        </Link>
        .
      </p>
    </div>
  );
}
