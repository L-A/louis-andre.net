import React from 'react'
import Page from '../layouts/page'
import { Translate } from '~/helpers/lang'

const T = Translate({
  en: {
    title: "Wallpapers",
    intro: "Sometimes I make wallpapers. Here they are in downloadable form!",
    wp_links: (desktop, phone) => {
      return (
        <p>Get it for <a className="link blue dim" href={desktop}>desktops (2880 x 1800)</a> and <a className="link blue dim" href={phone}>phones (1080 x 1920)</a>.</p>
      )
    }
  },
  fr: {
    title: "Fonds d'écran",
    intro: "Parfois je crée des fonds d'écran. C'est ici que vous pouvez les voir et les télécharger!",
    wp_links: (desktop, phone) => {
      return (
        <p>À télécharger pour <a className="link blue dim" href={desktop}>ordinateurs (2880 x 1800)</a> et <a className="link blue dim" href={phone}>téléphones (1080 x 1920)</a>.</p>
      )
    }
  }
})


const wallpapers = [
  {
    name: "Orb",
    img: "static/images/wallpapers/previews/orb.jpg",
    desktop: "/static/images/wallpapers/Orb - louis-andre.net.jpg",
    phone: "/static/images/wallpapers/Orb - Phone - louis-andre.net.jpg"
  },
  {
    name: "Known Topography",
    img: "static/images/wallpapers/previews/topography.jpg",
    desktop: "/static/images/wallpapers/Known Topography - louis-andre.net.jpg",
    phone: "/static/images/wallpapers/Known Topography - Phone - louis-andre.net.jpg"
  },
  {
    name: "Distance",
    img: "static/images/wallpapers/previews/distance.jpg",
    desktop: "/static/images/wallpapers/Distance - louis-andre.net.jpg",
    phone: "/static/images/wallpapers/Distance - Phone - louis-andre.net.jpg"
  }
]

const Wallpapers = (props) => {
  let poorIterator = 0
  const WallList = props.wallpapers.map((wp) => {
    return (
      <li className="mt5" key={poorIterator++}>
        <h2 className="navy">{wp.name}</h2>
        <img src={wp.img} />
        {T.Key("wp_links")(wp.desktop, wp.phone)}
      </li>
    )
  })
  return (
    <ul className="list pa0">
      { WallList }
    </ul>
  )
}

export default Page( () => (
  <div className="ph3 ph5-m ph6-l relative-l">
    <h1 className="mv4 f2 fw3 navy">{T.Key("title")}</h1>
    <p className="mb4">{T.Key("intro")}</p>
    <Wallpapers wallpapers={wallpapers} />
  </div>
), {title: T.Key("title")})
