import Nav from "../components/nav"

import { Translate } from "../helpers/translate"

const T = Translate({
  fr: { credit: "Photo originale par Paweł Czerwiński" },
  en: { credit: "Original photograph: Paweł Czerwiński" }
})

export default () => {
  return (
    <footer>
      <Nav isFooter />
      <div className="wrap">
        <p>© Louis-André Labadie</p>
        <p>{T("credit")}</p>
      </div>
      <style jsx>{`
        footer {
          background-color: #420b45;
          background-image: url("/static/images/header-bg.jpg");
          background-size: cover;
          background-position: top;
          color: #fff;
          overflow: hidden;
        }
        .wrap {
          display: flex;
          justify-content: space-between;
          padding: 0 64px;
          margin: 16px 0 32px;
        }
        p {
          color: #bdb2d1;
          font-size: 14px;
          margin: 0;
        }
        @media (max-width: 726px) {
          .wrap {
            padding: 0 32px;
          }
        }

        @media (max-width: 500px) {
          .wrap {
            display: block;
          }
        }
      `}</style>
    </footer>
  )
}
