import React from 'react'
import Link from 'next/prefetch'
import Page from '~/layouts/page'
import Icon from '~/components/icon.js'
import Project from '~/components/project'
import ColorRange from '~/helpers/colorRange'
import Shot from '~/components/dribbble-shot'
import { Translate } from '~/helpers/lang'

const T = Translate({
  en: {
    tagline: "Hi! I'm&nbsp;Louis&#8209;André, freelance&nbsp;designer.<br/>I make apps and web&nbsp;sites.",
    more: "more of these",
    on_hold: "On hold",
    headers: {
      dribbble: "Bite-sized work",
      case_studies: "Projects & case-studies"
    },
    availability: {
      available: "Available!"
    },
    octobot: {
      description: "A friendly app that instantly notifies you when Github services go offline.",
      details: "Interface design, branding, assets production (iOS & Android), web development."
    },
    littleJekyll: {
      description: "If the command-line is still unknown territory, this desktop app allows anyone to write, serve and build a Jekyll website.",
      details: "Interface design, branding, Node.js & Electron development."
    },
    fitsteady: {
      description: "Masters of making a workspace healthy, Fitsteady added an attendance and satisfaction app to their trainers’ toolbelt.",
      details: "Interface design, assets production."
    }
  },
	fr: {
    tagline: "Bonjour! Je suis Louis&#8209;André, designer. Je&nbsp;fais des sites et applications web.",
    more: "voir d'autres",
    on_hold: "Interrompu",
    headers: {
      dribbble: "Petits extraits",
      case_studies: "Projets intéressants"
    },
    availability: {
      available: "Disponible!"
    },
    octobot: {
      description: "Une sympathique application qui notifie instantanément lors d'interruptions de service Github.",
      details: "Design d'interface, design de marque, production des ressources (iOS et Android), développement web."
    },
    littleJekyll: {
      description: "Cette application permet à tous de créer et de bâtir un site avec Jekyll, même sans connaître le Terminal.",
      details: "Design d'interface, design de marque, développement Node.js et Electron."
    },
    fitsteady: {
      description: "Passés maîtres dans l'art du bien-être en milieu de travail, Fitsteady ont équippé leurs entraîneurs avec une application de prise de présence et de mesure de satisfaction.",
      details: "Design d'interface, production des ressources."
    }
  }
})

export default Page( () => (
  <div>
		<MovingFill />
		<div style={headerStyle} className="lh-title mb4 mb5-ns mt3 mt5-ns ph3 ph5-m ph6-l tc b f3 f2-ns center" dangerouslySetInnerHTML={{__html: T.Key("tagline")}} />
    <div className="tc mb4 mb5-ns">
      <Link href="/contact">
        <a style={contactLinkStyle} className="no-underline dib pointer pv3 ph4 white br2 tc">{T.Key('availability.available')}</a>
      </Link>
    </div>
		<h4 className="f6 ph3 mb3 mt6 mt5-ns tc ttu dribbble-shots">{T.Key("headers.dribbble")} <Icon iconName="dribbble" /></h4>
		<div className="cf ph3 pt1-ns ph5-m ph6-l tc">
			<Shot shotImageURL={shots[0].image} linkTo={shots[0].url}></Shot>
			<Shot shotImageURL={shots[1].image} linkTo={shots[1].url}></Shot>
			<Shot shotImageURL={shots[2].image} linkTo={shots[2].url}></Shot>
		</div>
    <a href="https://dribbble.com/l-a" className="f6 f5-ns db mt3 ph3 silver tc">{T.Key("more")}</a>
    <div className="case-studies">
      <h4 className="f6 ph3 mt6 mt5-ns mb3 tc ttu">{T.Key("headers.case_studies")} <Icon iconName="cases" /></h4>
      <Project name="Octobot" titleColor="#bfa28b" buttonColor="#cc6633" image="octobot@2x.png" btnURL="/journal/octobot">
        <p className="lh-copy">{T.Key("octobot.description")}</p>
        <p className="lh-copy code gray f6">{T.Key("octobot.details")}</p>
      </Project>
      <Project name="Little Jekyll" titleColor="#5560ac" image="little-jekyll@2x.png" btnText={T.Key("on_hold")}>
        <p className="lh-copy">{T.Key("littleJekyll.description")}</p>
        <p className="lh-copy code gray f6">{T.Key("littleJekyll.details")}</p>
      </Project>
      <Project name="Fitsteady" titleColor="#459283" buttonColor="#00a087" image="fitsteady@2x.png" btnURL="/journal/fitsteady">
        <p className="lh-copy">{T.Key("fitsteady.description")}</p>
        <p className="lh-copy code gray f6">{T.Key("fitsteady.details")}</p>
      </Project>
    </div>
	</div>
))


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
		height: '120vh',
		bottom: -fillPosition + 'vh',
		transform: 'skewY(-8deg)',
		zIndex: '-1',
		transition: 'background-color 80ms ease-out, bottom 80ms ease-out'
	}
}

const headerStyle = {
	color: '#4e5667',
  maxWidth: '1256px',
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
		return 130 - (this.state.scrollRatio * 100)
	}

	handleScroll = () => {
		this.setState({ scrollRatio: this.reportScrollRatio() })
	}

	render = () => {
		return <div style={fillStyle(this.fillPosition(), this.state.scrollRatio)}/>
	}
}
