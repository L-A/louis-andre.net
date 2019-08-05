import Link from "next/link"
import { Translated, Translate } from "../helpers/translate"

const T = Translate({
	fr: {
		work: "Réalisations",
		about: "À propos",
		journal: "Journal",
		otherLanguage: "English"
	},
	en: {
		work: "Work",
		about: "About",
		journal: "Journal",
		otherLanguage: "Français"
	}
})

export default ({ isFooter, onBlue }) => {
	return (
		<nav>
			<Link href="/" prefetch>
				<a className="logo">
					<img src="/static/images/img-logo.svg" alt="Louis-André Labadie" />
				</a>
			</Link>
			<Link href="/work" prefetch>
				<a>{T("work")}</a>
			</Link>
			<Link href="/about" prefetch>
				<a>{T("about")}</a>
			</Link>
			<Link href="/journal" prefetch>
				<a>{T("journal")}</a>
			</Link>
			<Translated.Consumer>
				{({ switchLanguage }) => (
					<a className="language-switch" onClick={switchLanguage}>
						{T("otherLanguage")}
					</a>
				)}
			</Translated.Consumer>
			<style jsx>{`
				nav {
					display: flex;
					justify-content: ${isFooter ? "flex-start" : "flex-end"};
					align-items: center;
					padding: 0 64px;
					margin: ${isFooter ? "32px auto 8px" : "64px auto"};
					position: relative;
				}

				nav a {
					color: ${onBlue ? "#1E2949" : "#D73F00"};
					font-weight: 700;
					${isFooter ? "margin-right: 32px;" : "margin-left: 32px;"}
					text-decoration: none;
					white-space: nowrap;
				}

				nav a:hover {
					text-decoration: underline;
				}

				nav a.logo {
					margin: 0 auto 0 0;
					color: transparent;
					display: ${isFooter ? "none" : "auto"};
				}

				nav a.language-switch {
					color: ${onBlue ? "#1E2949" : "#f2f5f8"};
					cursor: pointer;
					display: inline-block;
					font-size: 14px;
					font-weight: 500;
					padding-left: 16px;
					margin-left: ${isFooter ? "auto" : "16px"};
					margin-right: 0;
				}

				@media (max-width: 726px) {
					nav {
						padding: 0 32px;
						margin: ${isFooter ? "32px auto 8px" : "32px auto"};
					}
				}

				@media (max-width: 500px) {
					nav {
						flex-wrap: wrap;
						justify-content: flex-start;
					}

					nav a {
						margin-left: ${isFooter ? "0" : "16px"};
					}

					nav a.language-switch {
						text-align: ${isFooter ? "left" : "right"};
						margin-left: auto;
					}
				}

				@media (max-width: 390px) {
					nav a, nav a.language-switch {
						font-size: 13px;
						${isFooter ? "margin-right: 16px;" : ""};
					}
					nav a.language-switch {
						font-size: 11px;
						line-height: 1;
						margin-right: 0;
					}
					nav a.logo img{
						max-width: 32px;
					}
			`}</style>
		</nav>
	)
}
