import Link from "next/link"

import Nav from "../components/nav"

const HeroText = (
  <h1 className="hero-text">
    <img alt="Design & Code" src="/static/images/img-design-code.svg" />
    <style jsx>{`
      .hero-text {
        text-align: center;
        margin: 128px auto 128px;
      }

      .hero-text img {
        max-width: 60vw;
      }
    `}</style>
  </h1>
)

export default ({ title, overTitle, overTitleLink, withHeroText }) => {
  overTitle = overTitleLink ? (
    <Link href={overTitleLink}>
      <a>
        {overTitle}
        <style jsx>{`
          a {
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </a>
    </Link>
  ) : (
    overTitle
  )

  return (
    <header>
      <Nav />
      {withHeroText ? HeroText : ""}
      <h2>{overTitle}</h2>
      <h1>{title}</h1>
      <style jsx>{`
        header {
          background-color: #420b45;
          background-image: url("/static/images/header-bg.jpg");
          background-size: cover;
          color: #fff;
          overflow: hidden;
        }

        h1 {
          margin: 0 64px 64px;
          font-size: 46px;
          line-height: 1.1;
          max-width: 15em;
        }

        h2 {
          color: #f95d0c;
          font-size: 16px;
          font-weight: 500;
          margin: 0 64px;
          max-width: 18em;
        }

        @media (max-width: 726px) {
          h1 {
            font-size: 36px;
            margin: 0 32px 32px;
          }

          h2 {
            margin: 0 32px;
          }
        }
      `}</style>
    </header>
  )
}
