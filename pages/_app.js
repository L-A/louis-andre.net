import App, { Container } from "next/app"
import { PageTransition } from "next-page-transitions"

import "isomorphic-fetch"

import { readCookie } from "../helpers/cookies"
import { Translated, SetLanguage } from "../helpers/translate"
import { AbsoluteUrl } from "../helpers/absoluteUrl"

// Since this is less readable, three things are happening here:
// - One, the app is translated through a React context
// - Two, visual page transitions are all managed here
// - Three, we're providing an absolute URL (for working OpenGraph tags)
// Also, the page says hello to an anonymous analytics project of mine

class Localized extends App {
	state = { language: this.props.language }

	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}
		const Referrer =
			ctx.req &&
			ctx.req.headers.referer &&
			ctx.req.headers.referer.indexOf(ctx.req.headers.host) == -1
				? ctx.req.headers.referer
				: false

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		await new Promise((resolve, reject) => {
			fetch(
				`https://kind-store.glitch.me/hit?url=${encodeURI(
					ctx.asPath
				)}&date=${new Date().toISOString().split("T")[0] +
					(Referrer ? "&referrer=" + encodeURI(Referrer) : "")}`
			).then(resolve, reject)
			setTimeout(resolve.bind(null, { ok: true, status: 200 }), 100)
		})

		const language = readCookie("language", ctx.req) || "en"
		const hostName =
			typeof ctx.req !== "undefined"
				? "https://" + ctx.req.headers.host
				: window.location.origin

		return {
			pageProps: {
				...pageProps
			},
			hostName: hostName,
			path: ctx.pathname,
			language: language
		}
	}

	switchLanguage = () => {
		const newLanguage = this.state.language == "en" ? "fr" : "en"
		this.setState({ language: newLanguage })
		SetLanguage(newLanguage)
	}

	render() {
		const { Component, pageProps, protocol, hostName, path } = this.props
		return (
			<Container lang={this.state.language}>
				<Translated.Provider
					value={{
						language: this.state.language,
						switchLanguage: this.switchLanguage
					}}
				>
					<AbsoluteUrl.Provider
						value={{
							protocol: protocol,
							hostName: hostName,
							path: path
						}}
					>
						<PageTransition
							timeout={350}
							classNames="page-transition"
							skipInitialTransition
							monkeyPatchScrolling
						>
							<Component {...pageProps} key={this.props.router.route} />
						</PageTransition>
					</AbsoluteUrl.Provider>
				</Translated.Provider>

				<style jsx global>{`
					.page-transition-enter::after,
					.page-transition-enter-active::after,
					.page-transition-exit::after,
					.page-transition-exit-active::after {
						ponter-events: none;
						content: "";
						background: #1e2949;
						position: fixed;
						top: -20vh;
						left: 0;
						right: 0;
						bottom: -20vh;
					}
					.page-transition-exit::after {
						transform: translateY(120vh) skew(0, 0deg) scaleX(1.1);
					}
					.page-transition-enter::after,
					.page-transition-exit-active::after {
						transform: translateY(0) skew(0, 8deg) scaleX(1.1);
						transition: transform 350ms cubic-bezier(0.24, 0, 0.35, 1);
					}
					.page-transition-enter-active::after {
						transform: translateY(-120vh) skew(0, 4deg) scaleX(1.1);
						transition: transform 350ms cubic-bezier(0.24, 0, 0.35, 1),
							background 350ms;
						background: #1e367b;
					}
				`}</style>
			</Container>
		)
	}
}

export default Localized
