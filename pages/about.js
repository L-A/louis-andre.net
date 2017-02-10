import React from 'react'
import Page from '../layouts/page'

export default () => (
  <Page title="About">
		<div className="ph3 ph5-m ph6-l relative-l">
			<h1 className="f2 mt4 code gray fw1 measure">I design and build web sites and apps.</h1>
			<img className="fr mw4 mw5-ns pb3 pl3" style={imgStyle} src="static/images/about-page/portrait.png"/>
			<p className="measure lh-copy">My work involves turning broad ideas into nicely defined concepts, and then making them come to life.</p>
			<p className="measure lh-copy"><em>Some</em> years ago, I walked out of University with a formal education in graphic design. I quickly lost touch with my favorite printers and Pantone charts as I moved more and more into design for screens.</p>
			<p className="measure lh-copy">I have worked and learned at <a href="http://ock.am">Ockam</a>, <a href="http://mirego.com">Mirego</a>, and <a href="http://hooktstudios.com">Hookt Studios</a>. Working with some of the finest in the industry there, I made a lot of great apps for all kinds of people and devices.</p>
			<p className="measure lh-copy">I use tools like Photoshop, Illustrator, Sketch, Vim, a terminal, Javascript, SASS, various frameworks, libraries and other development thingamajigs as needs arise.</p>
		</div>
	</Page>
)

const imgStyle = {
	width: "50%"
}