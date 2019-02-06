import React from 'react'
import Page from '../layouts/page'
import { Translate } from '~/helpers/lang'

const T = Translate({
  en: {
    title: "About",
    tagline: "Interdisciplinary designer",
    p_intro: "My work involves turning broad ideas into nicely defined concepts, and then making them come to life.",
    p_education: "<em>Some</em> years ago, I walked out of University with a formal education in graphic design. I quickly lost touch with my favorite printers and Pantone charts as I moved more and more into design for screens: web sites, web and mobiles applications.",
    p_work: 'I have worked and learned at <a class="link dim blue" href="https://ock.am">Ockam</a>, <a class="link dim blue" href="https://www.mirego.com">Mirego</a>, and <a class="link dim blue" href="https://hooktstudios.com">Hookt Studios</a>. Working with some of the finest in the industry there, I made a lot of great apps for all kinds of people and devices.',
    p_tools: 'I use tools like Photoshop, Illustrator, Sketch, Vim, a terminal, Javascript, SASS, various frameworks, libraries and other development thingamajigs as needs arise.'
  },
  fr: {
    title: "À propos",
    tagline: "Designer multidisciplinaire",
    p_intro: "Mon travail consiste à transformer les idées larges en concepts bien définis, que je m’applique ensuite à réaliser.",
    p_education: "Il y a <em>quelques</em> années, je suis sorti de l’Université avec un Bac en design graphique. J’ai rapidement perdu contact avec mes chartes Pantones et mes imprimeurs préférés, me spécialisant tranquillement en design pour les écrans: sites web, applications web et mobiles.",
    p_work: 'J’ai appris et travaillé chez <a class="link dim blue" href="https://ock.am">Ockam</a>, <a class="link dim blue" href="https://www.mirego.com">Mirego</a>, et <a class="link dim blue" href="https://hooktstudios.com">Hookt Studios</a>. Accompagné de collègues incroyables, j’y ai créé une multitude d’applications de qualité, pour toutes sortes de gens et d’appareils.',
    p_tools: 'J’utilise des outils comme Photoshop, Illustrator, Sketch, Vim, un terminal, Javascript, SASS, différents <em>frameworks</em> et autres bidules de programmation selon les besoins de chaque projet.'
  }
})

export default Page( () => (
		<div className="ph3 ph5-m ph6-l">
			<h1 className="mv4 f2 fw3 navy no-underline">{T.Key("tagline")}</h1>
			<p className="measure lh-copy">{T.Key("p_intro")}</p>
			<p className="measure lh-copy" dangerouslySetInnerHTML={{__html: T.Key("p_education")}} />
      <p className="measure lh-copy" dangerouslySetInnerHTML={{__html: T.Key("p_work")}} />
      <p className="measure lh-copy" dangerouslySetInnerHTML={{__html: T.Key("p_tools")}} />
		</div>
), {title: T.Key("title")})
