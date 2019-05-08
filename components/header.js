import Link from "next/link"

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
  return (
    <header>
      <nav>
        <Link href="/">
          <a className="logo">
            <img src="/static/images/img-logo.svg" alt="Louis-André Labadie" />
          </a>
        </Link>
        <a href="#">Contact</a>
        <Link href="/journal">
          <a>Journal</a>
        </Link>
      </nav>
      {withHeroText ? HeroText : ""}
      <h2>
        <Link href={overTitleLink}>
          <a>{overTitle}</a>
        </Link>
      </h2>
      <h1>{title}</h1>
      <style jsx>{`
        header {
          background-color: #420b45;
          background-image: url("/static/images/header-bg.jpg");
          background-size: cover;
          color: #fff;
          overflow: hidden;
        }

        nav {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 64px;
          margin: 64px auto;
        }

        nav a {
          color: #f95d0c;
          font-weight: 700;
          margin-left: 32px;
          text-decoration: none;
        }

        nav a:hover {
          text-decoration: underline;
        }

        nav .logo {
          margin: 0 auto 0 0;
          color: transparent;
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

        h2 a {
          text-decoration: none;
        }

        h2 a:hover {
          text-decoration: underline;
        }

        @media (max-width: 726px) {
          nav {
            padding: 0 32px;
            margin: 32px auto;
          }

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
