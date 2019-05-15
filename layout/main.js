import Head from "next/head"

import { Translated } from "../helpers/translate"
import { WithAbsoluteUrl } from "../helpers/absoluteUrl"
import Header from "../components/header"
import Footer from "../components/footer"

export default ({
  isHome,
  title,
  overTitle,
  overTitleLink,
  description,
  children
}) => {
  const pageTitle = (overTitle ? overTitle + " - " : "") + title
  return (
    <Translated.Consumer>
      {({ language }) => (
        <WithAbsoluteUrl>
          {({ hostName, path }) => (
            <div lang={language}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <title>{pageTitle}</title>
                <meta itemProp="name" content={pageTitle} />
                <meta property="og:title" content={pageTitle} />
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta
                  itemProp="image"
                  content={hostName + "/static/images/share-og-image-v1.jpg"}
                />
                <meta
                  property="og:image"
                  content={hostName + "/static/images/share-og-image-v1.jpg"}
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="1200" />
                <meta property="og:url" content={hostName + path} />
                <link rel="icon" href="/static/images/favicon.ico" />
                <style type="text/css">{`
                  @font-face {
                    font-family: "Work Sans";
                    src: url("/static/fonts/WorkSans-Regular.woff2") format("woff2"),
                      url("/static/fonts/WorkSans-Regular.woff") format("woff");
                    font-display: fallback;
                  }
                  @font-face {
                    font-family: "Work Sans";
                    font-style: italic;
                    src: url("/static/fonts/WorkSans-Italic.woff2") format("woff2"),
                      url("/static/fonts/WorkSans-Italic.woff") format("woff");
                    font-display: fallback;
                  }
                  @font-face {
                    font-family: "Work Sans";
                    font-weight: 200;
                    src: url("/static/fonts/WorkSans-Light.woff2") format("woff2"),
                      url("/static/fonts/WorkSans-Light.woff") format("woff");
                    font-display: fallback;
                  }
                  @font-face {
                    font-family: "Work Sans";
                    font-weight: 700;
                    src: url("/static/fonts/WorkSans-Bold.woff2") format("woff2"),
                      url("/static/fonts/WorkSans-Bold.woff") format("woff");
                    font-display: fallback;
                  }
                `}</style>
              </Head>
              <style jsx global>{`
                * {
                  box-sizing: border-box;
                }
                body {
                  color: #1e2949;
                  font-family: "Work Sans", Helvetica, Arial, sans-serif;
                  font-size: 16px;
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
          )}
        </WithAbsoluteUrl>
      )}
    </Translated.Consumer>
  )
}
