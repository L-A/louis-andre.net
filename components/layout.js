import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import { Palette } from "../config"

const Layout = ({ pageTitle, children }) => {
	// Trigger anonymous analytics here:
	const triggerGoSquared = () => {
		!(function (g, s, q, r, d) {
			r = g[r] =
				g[r] ||
				function () {
					;(r.q = r.q || []).push(arguments)
				}
			d = s.createElement(q)
			q = s.getElementsByTagName(q)[0]
			d.src = "//d1l6p2sc9645hc.cloudfront.net/tracker.js"
			q.parentNode.insertBefore(d, q)
		})(window, document, "script", "_gs")
		_gs("GSN-103088-W")
		_gs("set", "anonymizeIP", true)
	}
	useEffect(triggerGoSquared, [])

	// Layout
	return (
		<div className="layout">
			<nav>
				<ul className="pages">
					<li className="home">
						<Link href="/">
							<a>
								<img src="/images/img-logo.svg" alt="Louis-André Labadie" />
							</a>
						</Link>
					</li>
					<li className="art">
						<Link href="/generative-art">
							<a>Art</a>
						</Link>
					</li>
					<li className="journal">
						<Link href="/journal">
							<a>Journal</a>
						</Link>
					</li>
					<li className="reading-log">
						<Link href="/reading-log">
							<a>Reading Log</a>
						</Link>
					</li>
					<li className="work-button">
						<a href="http://tinyrevolt.com/en">Hire me</a>
					</li>
				</ul>
			</nav>
			<main>{children}</main>

			<Head>
				<meta charSet="utf-8" />
				<link preload="true" rel="stylesheet" href="/styles/work-sans.css" />
				<link rel="stylesheet" href="/styles/global.css" />
				<title>{pageTitle ? pageTitle + " -" : ""} Louis-André Labadie</title>
			</Head>

			<style jsx>{`
				.layout {
					max-width: 960px;
					margin: 64px auto;
					display: flex;
					flex-direction: row;
					justify-content: stretch;
				}

				nav {
					color: ${Palette.text};
					font-weight: 500;
					flex: 0 0 140px;
					margin: 0 auto 0 32px;
				}

				.pages {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding: 0;
					list-style: none;
				}

				.pages li {
					margin-bottom: 8px;

					transform-origin: center left;
					transition: transform 0.3s cubic-bezier(0.44, 1.65, 0.29, 0.97),
						opacity 0.1s linear;
				}

				.pages li:hover {
					opacity: 0.7;
					transform: scale(1.05);
				}

				.pages li:active {
					opacity: 0.9;
					transform: scale(1.01);
				}

				.pages .home {
					margin-top: 20px;
				}

				.pages .art {
					color: ${Palette.art};
				}

				.pages .journal {
					color: ${Palette.journal};
				}

				.pages .reading-log {
					color: ${Palette.reading};
				}

				.pages .work-button {
					background-color: ${Palette.workBackground};
					border-radius: 3px;
					color: ${Palette.workLink};
					font-size: 14px;
					font-weight: 400;
					padding: 0 8px;

					transform-origin: center;
				}

				.pages li a {
					color: inherit;
					display: inline-block;
					padding: 4px 0;
					text-decoration: none;
				}

				main {
					flex: 1 1 680px;
					margin: 0 32px 0;
				}

				@media (max-width: 800px) {
					.layout {
						flex-direction: column;
						margin: 16px 0;
					}

					main {
						margin-left: 92px;
					}

					nav {
						flex-basis: auto;
						margin-bottom: 32px;
					}

					.pages {
						flex-direction: row;
						align-items: center;
						flex-wrap: wrap;
					}

					.pages li {
						margin-right: 32px;
						transform-origin: center;
					}

					.pages .home {
						margin-top: 10px;
					}
				}

				@media (max-width: 700px) {
					nav {
						margin: 0 32px 16px;
					}

					main {
						margin: 0 32px;
					}
				}

				@media (max-width: 500px) {
					nav {
						font-size: 14px;
						margin: 0 16px 16px;
					}

					.pages li {
						margin-right: 16px;
					}

					main {
						margin: 0 16px;
					}
				}
			`}</style>
		</div>
	)
}

export default Layout
