import "isomorphic-fetch"

import { Translate } from "../helpers/translate"

import Page from "../layout/main"
import Title from "../components/section-title"
import Contact from "../components/contact"

const T = Translate({
	fr: {
		meta: {
			description: `Designer indépendant, spécialisé en web et applications`
		},
		intro: `Je suis Louis-André Labadie, designer indépendant.
    Je bâtis des produits et applications numériques remarquables.`,
		services: {
			title: "Services",
			introEmphasis: "Je suis un designer qui code.",
			introParagraph:
				"J'aime me concentrer sur des produits et des marques avec une vocation claire.",
			introParagraph2:
				"Le plus possible, je m'implique du tout début d'un projet jusqu'à sa mise en ligne.",
			uiTitle: "Design d'interface",
			uiParagraph: `Je crée des produits utiles et faciles d'utilisation, qui renforcent
      la marque propre à chaque client. La rigueur et la clarté orientent
      mes décisions visuelles.`,
			uxTitle: "Design d'expérience",
			uxParagraph: `L'expérience va de pair avec la création du produit.
      Je me spécialise à rendre les produits complexes faciles d'approche.`,
			frontEndTitle: "Développement front-end",
			frontEndParagraph: `Je poursuis mon travail au-delà de la livraison de maquettes,
			en prenant en charge le développement des interfaces que je livre.`
		}
	},
	en: {
		meta: {
			description: `Independent designer, specialized in web and applications`
		},
		intro: `I'm Louis-André Labadie, an independent designer
    focused on building great applications and digital products.`,
		services: {
			title: "Services",
			introEmphasis: "I'm a designer who codes.",
			introParagraph:
				"I enjoy working on products and brands defined by their clear purpose.",
			introParagraph2:
				"I try to be involved in projects from inception to launch.",
			uiTitle: "Interface design",
			uiParagraph: `I create useful and approachable products that play on their brands' strengths. Clarity and rigor guide my decisions.`,
			uxTitle: "Experience design",
			uxParagraph: `Experience can't be separated from product design. I specialize in making complex products easy to pick up and understand.`,
			frontEndTitle: "Front-end development",
			frontEndParagraph: `I follow-up on the design work by delivering developed interfaces that are ready to use.`
		}
	}
})

const Index = ({ availableMonth }) => {
	return (
		<Page
			isHome
			title="Louis-André Labadie"
			description="Independent designer. Hire me to ship great apps and websites!"
		>
			<h1 className="intro">{T("intro")}</h1>
			<Title>{T("services.title")}</Title>
			<h3>
				<strong>{T("services.introEmphasis")}</strong>{" "}
				{T("services.introParagraph")}
			</h3>
			<h3>{T("services.introParagraph2")}</h3>
			<ul className="services-list">
				<li className="ui">
					<h4>{T("services.uiTitle")}</h4>
					<p>{T("services.uiParagraph")}</p>
				</li>
				<li className="ux">
					<h4>{T("services.uxTitle")}</h4>
					<p>{T("services.uxParagraph")}</p>
				</li>
				<li className="dev">
					<h4>{T("services.frontEndTitle")}</h4>
					<p>{T("services.frontEndParagraph")}</p>
				</li>
			</ul>
			<Contact availableMonth={availableMonth} />
			<style jsx>{`
				.intro {
					color: #1e2949;
					font-size: 30px;
					font-weight: 300;
					margin-top: 128px;
					max-width: 20em;
				}

				h3 {
					font-size: 22px;
					font-weight: normal;
					max-width: 28em;
				}

				.services-list {
					padding: 32px 0 0;
				}

				.services-list li {
					background: no-repeat center left;
					list-style: none;
					margin: 64px 0;
					padding-left: 162px;
				}

				.services-list li.ui {
					background-image: url("/static/images/icn-ui.svg");
				}

				.services-list li.ux {
					background-image: url("/static/images/icn-ux.svg");
				}

				.services-list li.dev {
					background-image: url("/static/images/icn-dev.svg");
				}

				.services-list h4 {
					color: #2200a1;
					font-weight: 300;
					font-size: 28px;
					margin: 0 0 8px;
				}

				.services-list p {
					color: #1e2949;
					font-size: 16px;
					margin-top: 8px;
					max-width: 28em;
				}

				@media (max-width: 512px) {
					/* Smaller fonts */
					.intro {
						font-size: 24px;
						margin-top: 64px;
					}

					h3 {
						font-size: 20px;
					}

					.services-list li {
						background: no-repeat center top;
						margin-top: 32px;
						padding: 128px 0 0;
					}

					.services-list li h4 {
						font-size: 22px;
					}
				}
			`}</style>
		</Page>
	)
}

export default Index
