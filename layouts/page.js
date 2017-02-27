import React from 'react'
import Head from '~/components/head' // I really should change this nomenclature
import Header from '~/components/header'
import Footer from '~/components/footer'
import { writeCookie, readCookie } from '~/helpers/cookie'

export default (WrappedComponent, naked = false) => {
  return class extends React.Component {
    
    static async getInitialProps (ctx) {
      let lang = readCookie("lang", ctx.req)
      let pageProps = {}
      writeCookie("lang", lang)
      if (WrappedComponent.getInitialProps) {
        pageProps = await WrappedComponent.getInitialProps(ctx);
      }
      return {...WrappedComponent.props, ...pageProps}
    }

    render (props) {
      if (naked) {
        return <WrappedComponent {...this.props}/>
      } else {
        return (
          <div className="avenir min-vh-100">
            <Head title={this.props.title} />
            <Header />
            <WrappedComponent {...this.props}/>
            <Footer />
          </div>
        )
      }
    }
  }
}
