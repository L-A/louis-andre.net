import React from 'react'
import Page from '../layouts/page'
import { Translate } from '~/helpers/lang'

const T = Translate({
  en: {
    title: "About",
    tagline: "I design and build web sites and apps."
  },
  fr: {
    title: "À propos",
    tagline: "Je conçois des sites et applications web."
  }
})

export default Page( () => (
		<div className="ph3 ph5-m ph6-l relative-l">
			<h1 className="mv4 f2 fw3 navy no-underline">{T.Key("tagline")}</h1>
			<img className="fr mw4 mw5-ns pb3 pl3" style={imgStyle} src="static/images/about-page/portrait.png"/>
			<p className="measure lh-copy">My work involves turning broad ideas into nicely defined concepts, and then making them come to life.</p>
			<p className="measure lh-copy"><em>Some</em> years ago, I walked out of University with a formal education in graphic design. I quickly lost touch with my favorite printers and Pantone charts as I moved more and more into design for screens.</p>
			<p className="measure lh-copy">I have worked and learned at <a className="link dim blue" href="http://ock.am">Ockam</a>, <a className="link dim blue" href="http://mirego.com">Mirego</a>, and <a className="link dim blue" href="http://hooktstudios.com">Hookt Studios</a>. Working with some of the finest in the industry there, I made a lot of great apps for all kinds of people and devices.</p>
			<p className="measure lh-copy">I use tools like Photoshop, Illustrator, Sketch, Vim, a terminal, Javascript, SASS, various frameworks, libraries and other development thingamajigs as needs arise.</p>
		</div>
), {title: T.Key("title")})

const imgStyle = {
	width: "50%"
}
