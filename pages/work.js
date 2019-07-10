import { Translated } from "../helpers/translate"

import Page from "../layout/main"
import Contact from "../components/contact"

const Locales = {
	fr: {
		title: "Réalisations",
		foundations: {
			title: "Fondations",
			description: [
				"Design et mise en page du manifeste de l'équipe de Mirego.",
				"Extraits des explorations.",
				"Découvrez Fondations, le Manifeste résultant, sur le site de Mirego."
			],
			buttonName: "mirego.com",
			buttonURL: "https://www.mirego.com/fr/manifeste"
		},
		littleJekyll: {
			title: "Little Jekyll",
			description: [
				"Design de produit, icône, interface.",
				"Développement de l'application."
			],
			buttonName: "L-A/Little-Jekyll",
			buttonURL: "https://github.com/L-A/Little-Jekyll"
		},
		metricsWatch: {
			title: "Metrics Watch",
			description: [
				"Image de marque, visuel des rapports envoyés par courriel."
			],
			buttonName: "metricswatch.com",
			buttonURL: "https://metricswatch.com"
		}
	},
	en: {
		title: "Work",
		foundations: {
			title: "Foundations",
			description: [
				"Design and layout for the Mirego team's manifesto.",
				"Exploration outtakes.",
				"You can discover Foundations, the resulting manifesto, on Mirego's website."
			],
			buttonName: "mirego.com",
			buttonURL: "https://www.mirego.com/en/manifesto"
		},
		littleJekyll: {
			title: "Little Jekyll",
			description: [
				"Product design, icon, interface.",
				"Application development."
			],
			buttonName: "L-A/Little-Jekyll",
			buttonURL: "https://github.com/L-A/Little-Jekyll"
		},
		metricsWatch: {
			title: "Metrics Watch",
			description: ["Branding, email reports redesign"],
			buttonName: "metricswatch.com",
			buttonURL: "https://metricswatch.com"
		}
	}
}

const Piece = ({
	color,
	title,
	description,
	imageURL,
	imageWidth,
	buttonName,
	buttonURL
}) => (
	<div className="piece">
		<h2>{title}</h2>
		<div className="description">
			{description.map(description => (
				<p>{description}</p>
			))}
		</div>
		<a href={buttonURL}>{buttonName}</a>
		<img src={imageURL} />
		<style jsx>{`
			.piece {
				margin: 64px 0 128px;
				text-align: center;
			}

			h2 {
				color: ${color};
				font-size: 20px;
				margin: 1em auto;
				max-width: 29em;
			}

			p {
				margin: 0.6em auto;
				max-width: 22em;
			}

			a {
				background-color: ${color};
				border-radius: 4px;
				color: #fff;
				display: inline-block;
				margin: 16px 0 32px;
				padding: 8px 16px;
				text-decoration: none;
				transition: background-color 0.3s ease, transform 0.3s ease;
				will-change: transform;
			}

			a:hover {
				background-color: ${color}CC;
				transform: scale(1.06);
				transition: background-color 0.3s ease, transform 0.3s ease-out;
			}

			a:active {
				transform: scale(0.98);
			}

			img {
				display: block;
				margin: 0 auto;
				width: ${imageWidth}px;
				max-width: 100%;
			}

			@media (max-width: 540px) {
				img {
					margin: 0 -32px;
					max-width: calc(100% + 64px);
				}
			}
		`}</style>
	</div>
)

export default ({ availableMonth }) => {
	return (
		<Translated.Consumer>
			{({ language }) => (
				<Page
					fullWidth
					title={Locales[language].title}
					description="Work from Louis-André Labadie"
				>
					<Piece
						color="#FF3829"
						imageURL="/static/images/work/manifeste.jpg"
						imageWidth={1004}
						{...Locales[language].foundations}
					/>
					<Piece
						color="#3232E6"
						imageURL="/static/images/work/little-jekyll.jpg"
						imageWidth={960}
						{...Locales[language].littleJekyll}
					/>
					<Piece
						color="#3F74BE"
						imageURL="/static/images/work/metrics-watch.jpg"
						imageWidth={960}
						{...Locales[language].metricsWatch}
					/>
					<Contact availableMonth={availableMonth} />
				</Page>
			)}
		</Translated.Consumer>
	)
}
