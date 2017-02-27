import React from 'react'
import Link from 'next/prefetch'
import Logo from '~/components/logo'
import { Translate, Language, SetLanguage } from '~/helpers/lang'

const T = Translate({
  en: {
    nav: {
			about: "about",
			journal: "journal",
			contact: "contact"
		}
  },
	fr: {
    nav: {
			about: "à propos",
			journal: "journal",
			contact: "contact"
		}
  }
})

export default class extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			factor: 1,
			logoPosition: {
				c: {left: 0, top: 0},
				m: {left: 0, top: 0},
				y: {left: 0, top: 0}
			}
		}
	}

	changeLayers = () => {
	if (process.browser) {
		this.setState({
				factor: this.state.factor + 0.1,
				logoPosition: {
					c: {left: this.randPos(2) + 2, top: 0},
					m: {left: 0, top: this.randPos(2)},
					y: {left: this.randPos(2) - 2, top: 0}
				}
			})
		}
	}

	changeLang = () => {
		let otherLang = this.props.lang == "fr" ? "en" : "fr"
		SetLanguage(otherLang)
    location.reload()
	}

	componentDidMount () {
		this.changeLayers()
	}

	randPos = (range) => {
		return this.state.factor * (Math.random() * range - (range / 2))
	}

	render () {
		let yLogo = this.state.logoPosition.y;
		let cLogo = this.state.logoPosition.c;
		let mLogo = this.state.logoPosition.m;
		let otherLang = Language() == "fr" ? "en" : "fr"
		return (
			<nav className="dt w-100 pb4 pt3 pt4-m pt5-l">
				<h1 onClick={this.changeLayers} className="dtc w-25 pl3 pl5-m pl6-l">
					<Link href="/">
						<a className="dib home-link">
							<div className="logo-layer" style={yLogo}>
								<Logo fill="#FF0"/>
							</div>
							<div className="logo-layer" style={cLogo}>
								<Logo fill="#0FF"/>
							</div>
							<div className="logo-layer" style={mLogo}>
								<Logo fill="#F0F"/>
							</div>
						</a>
					</Link>
				</h1>
				<ul className="f6 f5-ns dtc v-mid list code w-75 tr pa0 pb2 pr3 pr5-m pr6-l">
					<li className="dib ph2 ph3-ns br bw1 b--light-gray">
						<Link href="/about">
							<a className="link dark-gray hover-green">
								{T.Key("nav.about")}
							</a>
						</Link>
					</li>
					<li className="dib ph2 ph3-ns br bw1 b--light-gray">
						<Link href="/journal">
							<a className="link dark-gray hover-green">
								{T.Key("nav.journal")}
							</a>
						</Link>
					</li>
					<li className="dib ph2 ph3-ns br bw1 b--light-gray">
						<Link href="/contact">
							<a className="link dark-gray hover-green">
								{T.Key("nav.contact")}
							</a>
						</Link>
					</li>
					<li className="dib pl2 pl3-ns pointer ttu">
						<a onClick={this.changeLang} className="link f6 b silver hover-green">
							{otherLang}
						</a>
					</li>
				</ul>
				<style jsx>{`
					.home-link {
						height: 42px;
						position: relative;
						transition: transform 0.1s ease-out;
						width: 42px;
					}
					.home-link:hover {
						transform: scale(1.1);
					},
					.home-link:active svg {
						transform: scale(0.9);
					}
					.home-link .logo-layer {
						height: 100%;
						left:0;
						top:0;
						width: 100%;
						mix-blend-mode: multiply;
						position: absolute;
						transition: left .1s ease-out, top .1s ease-out, transform .1s ease-out;
					}
				`}</style>
			</nav>
		)
	}
}
