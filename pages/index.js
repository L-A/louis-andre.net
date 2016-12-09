import React from 'react'
import css from 'next/css'
import Page from '~/layouts/page'
import Project from '~/components/project'
import ColorRange from '~/helpers/colorRange'

export default () => (
  <Page>
	<MovingFill />
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
		let bod = document.body
		let doc = document.documentElement
		let st = bod.scrollTop, sh = bod.scrollHeight, dt  = doc.scrollTop, dh = doc.scrollHeight
		return (dt || st) / ((dh || sh) - doc.clientHeight)
	}

	fillPosition = () => {
		return 40 + (this.state.scrollRatio * 10)
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
