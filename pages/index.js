import React from 'react'
import css from 'next/css'
import Link from 'next/link'
import Page from '~/layouts/page'
import Project from '~/components/project'
import ColorRange from '~/helpers/colorRange'
import Shot from '~/components/dribbble-shot.js'

export default () => (
  <Page>
		<MovingFill />
		<div {...headerStyle} className="f2 lh-title ph3 pv5 ph5-m ph6-l tc b">
			<p>Hi! I'm Louis-André, freelance designer.<br/>I make brands and interfaces.</p>
			<p>Let's <Link href="#"><a className="no-underline">work together</a></Link>!</p>
		</div>
		<h4 className="f6 pv3 tc ttu dribbble-shots">Bite-sized images</h4>
		<div className="cf ph3 pv5 ph5-m ph6-l">
			<Shot shotImageURL="https://d13yacurqjgara.cloudfront.net/users/8100/screenshots/3159749/shot_2x_1x.png"></Shot>
			<Shot shotImageURL="https://d13yacurqjgara.cloudfront.net/users/8100/screenshots/3062699/doodle-2_1x.jpg"></Shot>
			<Shot shotImageURL="https://d13yacurqjgara.cloudfront.net/users/8100/screenshots/1580576/metrio-brand_1x.png"></Shot>
			<a href="https://dribbble.com/l-a" className="db ph3 silver tc">more of these</a>
		</div>			
		<h4 className="f6 pv3 tc ttu case-studies">Projects &amp; case studies</h4>
		<Project name="Octobot" titleColor="#bfa28b" buttonColor="#cc6633" image="octobot@2x.png" btnURL="/projects/octobot">
			<p className="lh-copy">A friendly app that instantly notifies you when Github services go offline.</p>
			<p className="lh-copy code gray f6">Interface design, branding, assets production (iOS&nbsp;&amp;&nbsp;Android), web development.</p>
		</Project>
		<Project name="Little Jekyll" titleColor="#5560ac" image="little-jekyll@2x.png">
			<p className="lh-copy">If the command-line is still unknown territory, this desktop app allows anyone to write, serve and build a Jekyll website.</p>
			<p className="lh-copy code gray f6">Interface design, branding, Node.js &amp; Electron development.</p>
		</Project>	
		<Project name="Fitsteady" titleColor="#459283" buttonColor="#00a087" image="fitsteady@2x.png" btnURL="/projects/fitsteady">
			<p className="lh-copy">Masters of making a workspace healthy, Fitsteady added an attendance and satisfaction app to their trainers’ toolbelt.</p>
			<p className="lh-copy code gray f6">Interface design, assets production.</p>
		</Project>	
	</Page>
)

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
				viewportHeight = window.innerHeight,
				st = bod.scrollTop || doc.scrollTop,
				sh = bod.scrollHeight || doc.scrollHeight,
				scrollStart = document.querySelector(".case-studies").offsetTop - (viewportHeight),
				scrollDistance = sh - scrollStart - viewportHeight


		let ratio = 0;

		if (st > scrollStart) {
			ratio = (st - scrollStart) / scrollDistance 
		}

		ratio = ratio <= 0 ? 0 : ratio
		ratio = ratio >= 1 ? 1 : ratio

		console.log(ratio)
		
		return ratio
	}

	fillPosition = () => {
		return 100 - (this.state.scrollRatio * 80)
	}

	handleScroll = () => {
		this.setState({ scrollRatio: this.reportScrollRatio() })
	}

	render = () => {
		return <div {...fillStyle(this.fillPosition(), this.state.scrollRatio)}/>
	}
}

const fillStyle = (fillPosition, ratio) => {
	return css({
		position: 'fixed',
		backgroundColor: '#' + ColorRange('e9f6fc', 'f9f9f5', ratio),
		width: '100%',
		height: '100vh',
		bottom: -fillPosition + 'vh',
		transform: 'skewY(-8deg)',
		zIndex: '-1',
		transition: 'background-color 80ms ease-out, bottom 80ms ease-out'
	})
}

const headerStyle = css({
	color: '#4e5667',
	textShadow: '1px 1px #fff, 2px 3px 0 #dff6fb'
	
})
