import App, { Container } from "next/app"

import "isomorphic-fetch"

import { readCookie } from "../helpers/cookies"
import { Translated, SetLanguage } from "../helpers/translate"
import { AbsoluteUrl } from "../helpers/absoluteUrl"

// Since this is less readable, three things are happening here:
// - One, the app is translated through a React context
// - Two, visual page transitions are all managed here
// - Three, we're providing an absolute URL (for working OpenGraph tags)
// Also, the page says hello to an anonymous analytics project of mine

let availableDate = false
const cushionAPIURL =
	"https://my.cushionapp.com/api/v1/users/745f2179-6958-4664-8549-dce939fb32e6/availability"

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

		const language = readCookie("language", ctx.req) || "en"
		const hostName =
			typeof ctx.req !== "undefined"
				? "https://" + ctx.req.headers.host
				: window.location.origin

		if (!availableDate) {
			const Availability = await fetch(cushionAPIURL)
			let availabilityData = await Availability.json()
			availableDate = new Date(availabilityData.availability.start_on)
			availableDate.setDate(availableDate.getDate() + 7)
		}

		return {
			pageProps: {
				...pageProps,
				availableMonth: availableDate.getMonth()
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
						<Component {...pageProps} key={this.props.router.route} />
					</AbsoluteUrl.Provider>
				</Translated.Provider>
			</Container>
		)
	}
}

export default Localized
