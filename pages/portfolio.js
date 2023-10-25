import { Palette } from "../config"
import Layout from "../components/layout"
import { useEffect, useState } from "react"

const secretTagItems = ["Confidential!", "Secret!", "Verboten!", "Hidden!"]
const switchDuration = 2 // In seconds

const Piece = ({ name, description, date, content }) => (
	<li className="piece">
		<h3 className="date">{date}</h3>
		<h2>{name}</h2>
		{description && <p>{description}</p>}
		<div className="content">{content}</div>
		<style jsx>{`
			.piece {
				margin: 0 0 128px;
				transition: opacity 0.25s ease-out;
			}

			.date {
				color: ${Palette.journal};
				font-size: 13px;
				font-weight: normal;
				margin: 0;
			}

			.piece h2 {
				font-size: 22px;
				margin: 0;
			}

			.piece p {
				color: ${Palette.quoteText};
				font-size: 14px;
				margin: 8px 0;
			}

			.content {
				margin: 16px 0;
			}
		`}</style>
	</li>
)

export default () => {
	const [tagPosition, setTagPosition] = useState(0)
	const tagOffset = Math.random() * 130 - 30
	const tagVerticalOffset = Math.random() * 20
	const tagRotation = (Math.random() * 15 + 5) * (Math.random() < 0.5 ? -1 : 1)

	const cycle = () => {
		const newPosition =
			tagPosition + 1 < secretTagItems.length ? tagPosition + 1 : 0
		setTagPosition(newPosition)
	}

	useEffect(() => {
		const interval = setInterval(cycle, switchDuration * 1000)
		return () => clearInterval(interval)
	})

	const secretTagContent = secretTagItems[tagPosition]
	return (
		<Layout pageTitle="Portfolio">
			<h1>
				<span className="secret">{secretTagContent}</span>Portfolio
			</h1>
			<p>
				<strong>
					I’m lucky enough that word-of-mouth and happy clients keep me working
					well and in good company.
				</strong>{" "}
				This means I don’t keep much of a portfolio, but if you're here, it
				means you'd like to see a few pieces!
			</p>
			<p>
				<small>
					Also, note that much of my work in the past years has been done under
					NDA or expectations of privacy, which I’ll continue to respect.
				</small>
			</p>

			<ul className="pieces">
				{pieces.map((piece) => (
					<Piece {...piece} key={piece.name} />
				))}
			</ul>

			<style jsx>{`
				h1 {
					color: ${Palette.art};
					position: relative;
				}

				.secret {
					position: absolute;
					display: block;
					color: ${Palette.reading};
					font-size: 20px;
					font-weight: normal;

					top: ${tagVerticalOffset}px;
					left: ${tagOffset - 9}px;
					animation: ${switchDuration}s ease-in-out forwards pulse;
				}

				.pieces {
					list-style: none;
					padding: 0;
					margin-top: 64px;
				}

				small {
					opacity: 0.7;
				}

				@keyframes pulse {
					0% {
						transform: rotate(${tagRotation}deg);
					}
					50% {
					transform: rotate(${tagRotation}deg) translateY(2px);
					}
					100% {
						transform: rotate(${tagRotation}deg);
					}
				}
			`}</style>
			<style jsx global>{`
				video,
				img {
					border-radius: 4px;
					display: block;
					max-width: 100%;
				}
			`}</style>
		</Layout>
	)
}

const pieces = [
	{
		date: "2019",
		name: "Les Pros de la Photo - Prototype",
		description:
			"Prototype delivered as part of a UX project for photo printing kiosks available in pharmacies across the province. Created for Atelier Made in Québec City.",
		content: <video loop autoPlay src="/images/portfolio/pdlp.mp4" />,
	},
	{
		date: "2019",
		name: "Vélodash",
		description:
			"Vélodash is a friendly cockpit computer for cyclists who don't want competition in their tracking. It displays your own run's data, and nothing else.",
		content: <img src="/images/portfolio/velodash.jpg" />,
	},
	{
		date: "2018",
		name: "Waves - Web radio desktop application",
		description:
			"Hello you tiny app! Waves is a web radio client that's currently in development. Here is a short demo of its look and animations.",
		content: <video loop autoPlay src="/images/portfolio/waves.mp4" />,
	},
	{
		date: "2018",
		name: "Mirego - Manifesto",
		description:
			"I laid out a Manifesto on Mirego's way of designing and building digital products. The booklet is centered around raw materials and features many details, including a screen-print signature ink on the end. The booklet is also a contract of sorts, and clients were required to sign the Manifesto to work with the company. These are excerpts from the research and final design.",
		content: <img src="/images/portfolio/manifesto.jpg" />,
	},
	{
		date: "2018",
		name: "Robotiq - Insights app animations",
		description:
			"Explainer animations for Insights' promotional page. I also designed and developed the complete site.",
		content: <video loop autoPlay src="/images/portfolio/robotiq.mp4" />,
	},
	{
		date: "2016",
		name: "Little Jekyll",
		description:
			"A visual interface on top of Jekyll, the static website builder.",
		content: <img src="/images/portfolio/littlejekyll.jpg" />,
	},
	{
		date: "2015",
		name: "Fitsteady",
		description: "Attendance-taking mobile app for Fitsteady's trainers.",
		content: <img src="/images/portfolio/fitsteady.jpg" />,
	},
	{
		date: "2014",
		name: "Octobot",
		description: "Reliability monitoring app dedicated to Github's status.",
		content: <img src="/images/portfolio/octobot.jpg" />,
	},
	{
		date: "2013",
		name: "Financial Calculators - Kronos",
		description:
			"Mobile version of Kronos' free tools for working out common personal finance scenarios",
		content: <img src="/images/portfolio/calcs.jpg" />,
	},
]
