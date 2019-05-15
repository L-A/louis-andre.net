import Link from "next/link"
import { Translated, Translate } from "../helpers/translate"

const T = Translate({
  fr: {
    about: "À propos",
    journal: "Journal",
    otherLanguage: "English"
  },
  en: {
    about: "About",
    journal: "Journal",
    otherLanguage: "Français"
  }
})

export default ({ isFooter }) => {
  return (
    <nav>
      <Link href="/" prefetch>
        <a className="logo">
          <img src="/static/images/img-logo.svg" alt="Louis-André Labadie" />
        </a>
      </Link>
      <Link href="/" prefetch>
        <a>{T("about")}</a>
      </Link>
      <Link href="/journal" prefetch>
        <a>{T("journal")}</a>
      </Link>
      <Translated.Consumer>
        {({ switchLanguage }) => (
          <a className="language-switch" onClick={switchLanguage}>
            {T("otherLanguage")}
          </a>
        )}
      </Translated.Consumer>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: ${isFooter ? "flex-start" : "flex-end"};
          align-items: center;
          padding: 0 64px;
          margin: ${isFooter ? "32px auto 8px" : "64px auto"};
        }

        nav a {
          color: #D73F00;
          font-weight: 700;
          ${isFooter ? "margin-right: 32px;" : "margin-left: 32px;"}
          text-decoration: none;
        }

        nav a:hover {
          text-decoration: underline;
        }

        nav a.logo {
          margin: 0 auto 0 0;
          color: transparent;
          display: ${isFooter ? "none" : "auto"};
        }

        nav a.language-switch {
          color: #f2f5f8;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          margin-left: ${isFooter ? "auto" : "32px"};
          margin-right: 0;
        }

        @media (max-width: 726px) {
          nav {
            padding: 0 32px;
            margin: ${isFooter ? "32px auto 8px" : "32px auto"};
          }
        }
        @media (max-width: 390px) {
          nav a, nav a.language-switch {
            ${isFooter ? "margin-right: 16px;" : "margin-left: 16px;"};
          }
          nav a.language-switch {
            margin-right: 0;
          }
          nav a.logo img{
            max-width: 32px;
          }
      `}</style>
    </nav>
  )
}
