import { Translated, Translate } from "../helpers/translate"

import Page from "../layout/main"
import Title from "../components/section-title"
import Contact from "../components/contact"

const Locales = {
	fr: {
		title: "À propos",
		intro:
			"Bonjour! J'aide les organisations à construire des sites web et applications qui sont pratiques, élégantes et efficaces.",
		projects: {
			title: "Quelques clients et projets",
			list: [
				{
					name: "Lili Graffiti",
					description:
						"Design et développement de site web e-commerce, propulsé par Shopify."
				},
				{
					name: "Metrics Watch",
					description: "Branding et design de rapports courriel."
				},
				{
					name: "Libéo",
					name2: "Ville de Québec",
					description:
						"Branding, design web et imprimé pour le concours international Rêvons nos Rivières en 2017."
				},
				{
					name: "Meta Numérique",
					description: "Conception pour services de stratégie numérique."
				},
				{
					name: "OMHQ, RSHQ",
					description: "Design de rapports et affiches."
				},
				{
					name: "Réseau Sagesse",
					description: "Design web et production vidéo."
				}
			]
		},
		curriculum: {
			title: "Curriculum",
			list: [
				{
					name: "Ockam",
					years: "2010-2011",
					description: "Designer pour le web, les marques et l'imprimé"
				},
				{
					name: "Mirego",
					years: "2011-2013",
					description: "Designer d'applications web et mobiles"
				},
				{
					name: "Hookt Studios",
					years: "2013-2016",
					description: "Directeur de création"
				},
				{
					name: "Didacte",
					years: "2014-2016",
					description:
						"Designer pour la fondation et le lancement d'une application de e-learning"
				},
				{
					name: "Mirego",
					years: "2017-2019",
					description: "Designer puis directeur design"
				}
			]
		}
	},
	en: {
		title: "About",
		intro:
			"Hello! I help people build apps and websites that are excellent in purpose, taste and execution.",
		projects: {
			title: "Some clients & projets",
			list: [
				{
					name: "Lili Graffiti",
					description:
						"Design and development of an e-commerce site, powered by Shopify."
				},
				{
					name: "Metrics Watch",
					description: "Branding and email report design."
				},
				{
					name: "Libéo",
					name2: "Ville de Québec",
					description:
						"Branding, web design and print design for the international Rêvons Nos Rivières contest in 2017."
				},
				{
					name: "Meta Numérique",
					description: "Design for digital strategy services."
				},
				{
					name: "OMHQ, RSHQ",
					description: "Report and poster design."
				},
				{
					name: "Réseau Sagesse",
					description: "Web design & video production."
				}
			]
		},
		curriculum: {
			title: "Curriculum",
			list: [
				{
					name: "Ockam",
					years: "2010-2011",
					description: "Designer for branding, web and print projects"
				},
				{
					name: "Mirego",
					years: "2011-2013",
					description: "Web & mobile application designer"
				},
				{
					name: "Hookt Studios",
					years: "2013-2016",
					description: "Creative director"
				},
				{
					name: "Didacte",
					years: "2014-2016",
					description: "Founding and design of an e-learning web application"
				},
				{
					name: "Mirego",
					years: "2017-2019",
					description: "Designer, then design lead"
				}
			]
		}
	}
}

const T = Translate(Locales)

const Project = ({ name, name2 = false, description }) => (
	<li className="client">
		<h3>
			{name}{" "}
			{name2 ? (
				<>
					<span>x</span> {name2}
				</>
			) : (
				""
			)}
		</h3>
		<p>{description}</p>
		<style jsx>{`
			h3 {
				font-size: 22px;
				margin-top: 32px;
				margin-bottom: 8px;
			}

			h3 span {
				font-weight: 300;
				color: #d73f00;
			}

			p {
				color: #6a6d76;
				margin: 8px 0;
			}
		`}</style>
	</li>
)

const PlaceOfWork = ({ name, years, description }) => (
	<li>
		<h3>
			{name} <span className="years">{years}</span>
		</h3>
		<p>{description}</p>
		<style jsx>{`
			h3 {
				font-size: 14px;
				font-weight: normal;
				margin-top: 16px;
				margin-bottom: 0;
			}

			.years {
				border: 1px solid #dedede;
				border-radius: 3px;
				color: #d73f00;
				display: inline-block;
				font-size: 12px;
				padding: 1px 3px 0;
				margin-left: 8px;
			}

			p {
				color: #6a6d76;
				font-size: 13px;
				margin: 8px 0;
			}
		`}</style>
	</li>
)

export default ({ availableMonth }) => {
	return (
		<Translated.Consumer>
			{({ language }) => (
				<Page
					isAbout
					title={Locales[language].title}
					intro={Locales[language].intro}
					description="About Louis-André Labadie"
				>
					<div className="columns">
						<div className="projects">
							<Title>{T("projects.title")}</Title>
							<ul>
								{Locales[language].projects.list.map(project => (
									<Project {...project} />
								))}
							</ul>
						</div>
						<div className="curriculum">
							<h2>{T("curriculum.title")}</h2>
							<ul>
								{Locales[language].curriculum.list.map(place => (
									<PlaceOfWork {...place} />
								))}
							</ul>
						</div>
					</div>
					<Contact availableMonth={availableMonth} />
					<style jsx>{`
						.columns {
							display: flex;
							margin-top: -64px;
						}

						.projects {
							margin-right: 32px;
							width: calc(66% - 32px);
						}

						.curriculum {
							max-width: 240px;
							margin-left: auto;
						}

						h2 {
							color: #d73f00;
							font-size: 14px;
							font-weight: 700;
							margin: 128px 0 64px;
							position: relative;
						}

						ul {
							list-style: none;
							padding: 0;
						}

						@media (max-width: 620px) {
							.columns {
								display: block;
							}

							.projects,
							.curriculum {
								width: auto;
								max-width: auto;
								margin-left: 0;
							}
						}
					`}</style>
				</Page>
			)}
		</Translated.Consumer>
	)
}
