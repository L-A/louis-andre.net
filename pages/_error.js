import React from 'react'
import Page from '~/layouts/page'
import Link from 'next/prefetch'
import { Translate } from '~/helpers/lang'

const T = Translate({
  en: {
    title: "Four oh four",
    subtitle: "Oof! It seems like there's nothing at this address on the site.",
    hint: <p>If you clicked on an article's link from an older site, there's a chance you might find what you want in the <Link href="/journal"><a className="link blue dim">Journal</a></Link> section of my website.</p>
  },
  fr: {
    title: "Quat' cent quat'",
    subtitle: "Oh! Il semblerait qu'il n'y ait pas de page à cette adresse sur le site.",
    hint: <p>Si vous avez cliqué sur un lien d'article, il y a des chances que vous trouviez ce que vous cherchez dans la section <Link href="/journal"><a className="link blue dim">Journal</a></Link> du site.</p>
  }
})

class ErrorPage extends React.Component {
  static async getInitialProps ({ req, res }) {
    if (req) {
      const pathname = req.url
      let destination = pathname

      if (pathname.indexOf("/fr/") != -1) {
        destination = pathname.replace("/fr/", "/")
        res.writeHead(302, {Location: destination})
        res.end()
      }

      if (pathname.indexOf("/journal/wallpapers") != -1) {
        destination = "/wallpapers"
        res.writeHead(302, {Location: destination})
        res.end()
      }

      if (pathname.indexOf("/little-jekyll") != -1) {
        destination = "/journal/little-jekyll"
        res.writeHead(302, {Location: destination})
        res.end()
      }

      if (pathname.slice(-1) == "/") {
        destination = pathname.slice(0, -1)
        res.writeHead(302, {Location: destination})
        res.end()
      }

      return {foo: destination}
    } else {
      return {}
    }
  }

  render = () => {
    return (
			<div className="ph3 mw6 ph5-m ph0-l center">
        <h2 className="f2 fw3 navy no-underline pa0">{T.Key("title")}</h2>
        <p className="f4">
          {T.Key("subtitle")}
        </p>
        {T.Key("hint")}
      </div>
      )
    }
}

export default Page(ErrorPage, {title: "Four oh four"})
