import Nav from "../components/nav"

export default () => {
  return (
    <footer>
      <Nav isFooter />
      <style jsx>{`
        footer {
          background-color: #420b45;
          background-image: url("/static/images/header-bg.jpg");
          background-size: cover;
          color: #fff;
          overflow: hidden;
        }
      `}</style>
    </footer>
  )
}
