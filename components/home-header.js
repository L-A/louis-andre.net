export default () => {
  return (
    <header>
      <nav>
        <a href="/" className="logo">
          <img src="/static/images/img-logo.svg" alt="Louis-André Labadie" />
        </a>
        <a href="#">Contact</a>
        <a href="#">Journal</a>
      </nav>
      <h1 className="hero-text">
        <img alt="Design & Code" src="/static/images/img-design-code.svg" />
      </h1>
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
        }

        .hero-text {
          text-align: center;
          margin: 128px auto 128px;
        }

        .hero-text img {
          max-width: 60vw;
        }

        @media (max-width: 726px) {
          nav {
            padding: 0 32px;
            margin: 32px auto;
          }
        }
      `}</style>
    </header>
  )
}
