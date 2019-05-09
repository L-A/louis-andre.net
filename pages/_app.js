import App, { Container } from "next/app"
import { readCookie } from "../helpers/cookies"
import { Translated, SetLanguage } from "../helpers/translate"

// This is just used to localize right now

class Localized extends App {
  state = { language: this.props.language }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const language = readCookie("language", ctx.req) || "en"
    return { pageProps: pageProps, language: language }
  }

  switchLanguage = () => {
    const newLanguage = this.state.language == "en" ? "fr" : "en"
    this.setState({ language: newLanguage })
    SetLanguage(newLanguage)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Translated.Provider
          value={{
            language: this.state.language,
            switchLanguage: this.switchLanguage
          }}
        >
          <Component {...pageProps} />
        </Translated.Provider>
      </Container>
    )
  }
}

export default Localized
