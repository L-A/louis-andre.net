import React from 'react'
import Link from 'next/prefetch'
import Page from '~/layouts/page'
import Icon from '~/components/icon.js'
import Project from '~/components/project'
import ColorRange from '~/helpers/colorRange'
import Shot from '~/components/dribbble-shot'

export default () => (
  <Page>
		<MovingFill />
		<div style={headerStyle} className="lh-title ph3 pt5 pb4 ph5-m ph6-l tc b f3 f2-ns">
			<p>Hi! I'm&nbsp;Louis-André, freelance&nbsp;designer.<br/>I make apps and web&nbsp;sites.</p>
    </div>
    <div className="tc pb5">
      <Link href="/about">
        <a style={contactLinkStyle} className="no-underline dib pointer pv3 ph4 white br2 tc"> Available!</a>
      </Link>
    </div>
		<h4 className="f6 pv2 tc ttu dribbble-shots">Bite-sized work <Icon iconName="dribbble" /></h4>
		<div className="cf ph3 pt1 ph5-m ph6-l tc">
			<Shot shotImageURL={shots[0].image} linkTo={shots[0].url}></Shot>
			<Shot shotImageURL={shots[1].image} linkTo={shots[1].url}></Shot>
			<Shot shotImageURL={shots[2].image} linkTo={shots[2].url}></Shot>
		</div>
    <a href="https://dribbble.com/l-a" className="db mt3 ph3 silver tc">more of these</a>
    <div className="case-studies">
      <h4 className="f6 pt6 pb1 tc ttu">Projects &amp; case studies <Icon iconName="cases" /></h4>
      <Project name="Octobot" titleColor="#bfa28b" buttonColor="#cc6633" image="octobot@2x.png" btnURL="/journal/octobot">
        <p className="lh-copy">A friendly app that instantly notifies you when Github services go offline.</p>
        <p className="lh-copy code gray f6">Interface design, branding, assets production (iOS&nbsp;&amp;&nbsp;Android), web development.</p>
      </Project>
      <Project name="Little Jekyll" titleColor="#5560ac" image="little-jekyll@2x.png" btnText="On hold">
        <p className="lh-copy">If the command-line is still unknown territory, this desktop app allows anyone to write, serve and build a Jekyll website.</p>
        <p className="lh-copy code gray f6">Interface design, branding, Node.js &amp; Electron development.</p>
      </Project>
      <Project name="Fitsteady" titleColor="#459283" buttonColor="#00a087" image="fitsteady@2x.png" btnURL="/journal/fitsteady">
        <p className="lh-copy">Masters of making a workspace healthy, Fitsteady added an attendance and satisfaction app to their trainers’ toolbelt.</p>
        <p className="lh-copy code gray f6">Interface design, assets production.</p>
      </Project>
    </div>
	</Page>
)

const shots = [
	{
		image: "https://d13yacurqjgara.cloudfront.net/users/8100/screenshots/3159749/shot_2x_1x.png",
		url: "https://dribbble.com/shots/3159749-Housing"
	},
	{
		image: "https://d13yacurqjgara.cloudfront.net/users/8100/screenshots/3062699/doodle-2_1x.jpg",
		url: "https://dribbble.com/shots/3062699-Star-CGI-detail"
	},
	{
		image: "https://d13yacurqjgara.cloudfront.net/users/8100/screenshots/1580576/metrio-brand_1x.png",
		url: "https://dribbble.com/shots/1580576-Metrio-Brand"
	}
]

const fillStyle = (fillPosition, ratio) => {
	return {
		position: 'fixed',
		backgroundColor: '#' + ColorRange('e9f6fc', 'fff9f0', ratio),
		width: '100%',
		height: '100vh',
		bottom: -fillPosition + 'vh',
		transform: 'skewY(-8deg)',
		zIndex: '-1',
		transition: 'background-color 80ms ease-out, bottom 80ms ease-out'
	}
}

const headerStyle = {
	color: '#4e5667',
	textShadow: '1px 1px #fff, 2px 3px 0 #dff6fb'
}

const contactLinkStyle = {
  backgroundColor: '#4eb648',
  textShadow: "0 1px 0 #31992b"
}

// Moving color fill element

class MovingFill extends React.Component {
	constructor (props) {
		super(props)
		this.state = { scrollRatio: 0 }
	}

	componentDidMount = () => {
		if (!process.browser) { return false }
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.handleScroll)
	}

	reportScrollRatio = () => {
		if ( !process.browser ) { return 0 } // A reasonable assumption, I hope
		let bod = document.body,
				doc = document.documentElement,
        elem = document.querySelector(".case-studies"),
				viewportHeight = window.innerHeight,
				st = bod.scrollTop || doc.scrollTop,
				sh = bod.scrollHeight || doc.scrollHeight,
				scrollStart = elem.offsetTop - (viewportHeight),
				scrollDistance = elem.offsetHeight

		let ratio = (st - scrollStart) / scrollDistance

		ratio = ratio <= 0 ? 0 : ratio
		ratio = ratio >= 1 ? 1 : ratio

		return ratio
	}

	fillPosition = () => {
		return 110 - (this.state.scrollRatio * 100)
	}

	handleScroll = () => {
		this.setState({ scrollRatio: this.reportScrollRatio() })
	}

	render = () => {
		return <div style={fillStyle(this.fillPosition(), this.state.scrollRatio)}/>
	}
}
