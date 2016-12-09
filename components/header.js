import React from 'react'
import css from 'next/css'
import Link from 'next/link'
import Logo from '~/components/logo'

export default class extends React.Component { 
	constructor (props) {
		super(props)
		this.state = {
			factor: 1,
			logoPosition: {
				c: {x: 0, y: 0},
				m: {x: 0, y: 0},
				y: {x: 0, y: 0}
			}
		}
	}

	changeLayers = () => {
	if (process.browser) {
		this.setState(
			{	
				factor: this.state.factor + 0.1,
				logoPosition: {
					c: {x: this.randPos(5), y: this.randPos(2)},
					m: {x: this.randPos(4), y: this.randPos(2)},
					y: {x: this.randPos(2), y: this.randPos(3)}
				}
			}
		)
		}
	}

	componentDidMount () {
		this.changeLayers()
	}
	
	randPos = (range) => {
		return this.state.factor * (Math.random() * range - (range / 2))
	}

	render () {
		return (
		<nav className="dt w-100 pv4">
		<h1 onClick={this.changeLayers} className="dtc w-25 pl3 pl5-m pl6-l">
			<Link href="/">
				<a className="dib" {...homeLinkStyle}>
					<Logo fill="#FF0" style={logoStyle(this.state.logoPosition.c)}/>
					<Logo fill="#0FF" style={logoStyle(this.state.logoPosition.m)}/>
          <Logo fill="#F0F" style={logoStyle(this.state.logoPosition.y)}/>
				</a>
			</Link>
		</h1>
		<ul className="dtc v-mid list code w-75 tr ph3 ph5-m ph6-l">
			<li className="dib pr3 br bw1 b--light-gray">
				<Link href="/journal">
					<a className="link dark-gray hover-green">journal</a>
				</Link>
			</li>
			<li className="dib pl3">
				<Link href="/about">
					<a className="link dark-gray hover-green">about</a>
				</Link>
			</li>
		</ul>
	</nav>
	)
	}
}

const	logoStyle = (posGroup = {x: 0, y: 0}) => {
	return {
		height: "100%",
		width: "100%",
		mixBlendMode: "multiply",
		position: "absolute",
		left: posGroup.x,
		top: posGroup.y,
		transition: "left .1s ease-out, top .1s ease-out, transform .1s ease-out",
	}
}

const homeLinkStyle = css({
	width: "42px",
	height: "42px",
	position: "relative",
	transition: "transform 0.1s ease-out",
	":hover": {
		transform: "scale(1.1)",
	},
	":active svg": {
		transform: "scale(0.9)"
	}
})
