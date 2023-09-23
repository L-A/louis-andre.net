import React from 'react'
import Head from 'components/head' // I really should change this nomenclature
import Header from 'components/header'
import Footer from 'components/footer'
import 'isomorphic-fetch'
import { writeCookie, readCookie } from 'helpers/cookie'

const defaultOpts = {
  naked: false,
  title: false,
  trackErrors: true
}

export default (WrappedComponent, opts) => {
  opts = {...defaultOpts, ...opts}

  return class extends React.Component {
    static async getInitialProps (ctx) {

      // Language & lang cookie
      let lang = readCookie("lang", ctx.req)
      let pageProps = {}

      writeCookie("lang", lang)
      if (WrappedComponent.getInitialProps) {
        pageProps = await WrappedComponent.getInitialProps(ctx);
      }

      return {...WrappedComponent.props, ...pageProps, lang: lang}
    }

    render (props) {
      if (opts.naked) {
        return (
          <div>
            <WrappedComponent {...this.props}/>
          </div>
        )
      } else {
        return (
          <div className="avenir min-vh-100">
            <Head title={opts.title} />
            <Header lang={this.props.lang} />
            <WrappedComponent {...this.props}/>
            <Footer />
          </div>
        )
      }
    }
  }
}
