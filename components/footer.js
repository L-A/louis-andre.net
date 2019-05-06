export default () => {
  return (
    <footer>
      <nav>
        <a href="#">Contact</a>
        <a href="#">Journal</a>
      </nav>
      <style jsx>{`
        footer {
          background-color: #420b45;
          background-image: url("/static/images/header-bg.jpg");
          background-size: cover;
          color: #fff;
          overflow: hidden;
        }
        nav {
          display: flex;
          justify-content: flex-start;
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
        @media (max-width: 726px) {
          nav {
            padding: 0 32px;
            margin: 32px auto;
          }
          nav a {
            margin-left: 0;
            margin-right: 32px;
          }
        }
      `}</style>
    </footer>
  )
}
