import Head from "next/head"
import Header from "../components/header"
import Footer from "../components/footer"

export default ({ isHome, title, overTitle, overTitleLink, children }) => {
  const pageTitle = (overTitle ? overTitle + " - " : "") + title
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <link rel="icon" href="/static/images/favicon.ico" />
      </Head>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          color: #1e2949;
          font-family: "Work Sans", Helvetica, Arial, sans-serif;
          font-weight: 16px;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          line-height: 1.4;
          margin: 0;
          padding: 0;
        }
        a {
          color: inherit;
        }
        img {
          color: transparent;
        }

        /* Fonts */
        @font-face {
          font-family: "Work Sans";
          src: url("/static/fonts/WorkSans-Regular.woff2") format("woff2"),
            url("/static/fonts/WorkSans-Regular.woff") format("woff");
        }
        @font-face {
          font-family: "Work Sans";
          font-style: italic;
          src: url("/static/fonts/WorkSans-Italic.woff2") format("woff2"),
            url("/static/fonts/WorkSans-Italic.woff") format("woff");
        }
        @font-face {
          font-family: "Work Sans";
          font-weight: 200;
          src: url("/static/fonts/WorkSans-Light.woff2") format("woff2"),
            url("/static/fonts/WorkSans-Light.woff") format("woff");
        }
        @font-face {
          font-family: "Work Sans";
          font-weight: 700;
          src: url("/static/fonts/WorkSans-Bold.woff2") format("woff2"),
            url("/static/fonts/WorkSans-Bold.woff") format("woff");
        }
      `}</style>
      <Header
        withHeroText={isHome}
        overTitle={overTitle}
        overTitleLink={overTitleLink}
        title={!isHome ? title : ""}
      />
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          margin: 0 auto 128px;
          max-width: 694px;
          padding: 32px;
        }
      `}</style>
      <Footer />
    </div>
  )
}
