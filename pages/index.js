import Page from "../layout/main"
import Title from "../components/section-title"

export default () => {
  return (
    <Page isHome title="Louis-André Labadie">
      <h1 className="intro">
        Je suis Louis-André Labadie, designer indépendant, spécialisé dans les
        produits et les applications numériques.
      </h1>
      <Title>Services</Title>
      <h3>
        <strong>Je suis un designer qui code.</strong> J'aime me concentrer sur
        des produits et des marques avec une vocation claire.
      </h3>
      <h3>
        Le plus possible, je m'implique du tout début d'un projet jusqu'à sa
        mise en ligne.
      </h3>
      <ul className="services-list">
        <li className="ui">
          <h4>Design d'interface</h4>
          <p>
            Je crée des produits utiles et faciles d'utilisation, qui renforcent
            la marque propre à chaque client. La rigueur et la clarté orientent
            mes décisions visuelles.
          </p>
        </li>
        <li className="ux">
          <h4>Design d'expérience</h4>
          <p>
            L'expérience va de pair avec la création du produit. Je me
            spécialise à rendre les produits complexes faciles d'approche.
          </p>
        </li>
        <li className="dev">
          <h4>Développement front-end</h4>
          <p>
            Je poursuis mon travail au-delà de la livraison de maquettes, en
            prenant en charge le développement des interfaces que je livre.
          </p>
        </li>
      </ul>
      <Title>Contact & disponibilités</Title>
      <h3 className="availability">
        Prochaines disponibilités: <strong>mai</strong>
      </h3>
      <h3 className="email">
        Je réponds rapidement à: <br />
        <a href="mailto:monsieur@louis-andre.net">
          <strong>monsieur@louis-andre.net</strong>
        </a>
      </h3>
      <style jsx>{`
        .intro {
          color: #1e2949;
          font-size: 30px;
          font-weight: 300;
          margin-top: 128px;
          max-width: 20em;
        }

        h3 {
          font-size: 22px;
          font-weight: normal;
          max-width: 28em;
        }

        .services-list {
          padding: 32px 0 0;
        }

        .services-list li {
          background: no-repeat center left;
          list-style: none;
          margin: 64px 0;
          padding-left: 162px;
        }

        .services-list li.ui {
          background-image: url("/static/images/icn-ui.svg");
        }

        .services-list li.ux {
          background-image: url("/static/images/icn-ux.svg");
        }

        .services-list li.dev {
          background-image: url("/static/images/icn-dev.svg");
        }

        .services-list h4 {
          color: #2200a1;
          font-weight: 300;
          font-size: 28px;
          margin: 0 0 8px;
        }

        .services-list p {
          color: #1e2949;
          font-size: 16px;
          margin-top: 8px;
          max-width: 28em;
        }

        .availability {
          border: 2px solid #2200a1;
          border-radius: 4px;
          color: #2200a1;
          font-size: 16px;
          padding: 8px 16px;
          display: inline-block;
        }

        .email a {
          color: #2200a1;
          text-decoration: none;
        }

        .email a:hover {
          text-decoration: underline;
        }

        @media (max-width: 512px) {
          /* Smaller fonts */
          .intro {
            font-size: 24px;
            margin-top: 64px;
          }

          h3 {
            font-size: 20px;
          }

          .services-list li {
            background: no-repeat center top;
            margin-top: 32px;
            padding: 128px 0 0;
          }

          .services-list li h4 {
            font-size: 22px;
          }
        }
      `}</style>
    </Page>
  )
}
