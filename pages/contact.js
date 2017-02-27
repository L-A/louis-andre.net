import React from 'react'
import Page from '~/layouts/page'
import { Translate } from '~/helpers/lang'

const T = Translate({
	en: {
		title: "Contact & availability",
		i_answer: "I answer quickly at",
		elsewhere: "Elsewhere"
	},
	fr: {
		title: "Contact & disponibilité",
		i_answer: "Je réponds rapidement à",
		elsewhere: "Ailleurs"
	}
})

export default Page( () => {
	return (
			<div className="ph3 mw6-l ph5-m ph0-l center">
				<h2 className="f2 fw3 navy no-underline dim pa0">{T.Key("title")}</h2>
				<p className="availability br2 pv2 ph3 ph4-ns green dib">
					New contracts can start in <strong>March</strong>
				</p>
				<p className="email">
					{T.Key("i_answer")} <a className="link pointer" href="mailto:monsieur@louis-andre.net">monsieur&#64;louis-andre.net</a>
				</p>
				<h3 className="silver bold f6 ttu mt4">Elsewhere</h3>
				<a className="db link dribbble mb2" href="https://dribbble.com/messages/new?recipient_id=l-a">
					<strong>Dribbble</strong> contact form
				</a>
				<a className="db link linkedin mb2" href="https://dribbble.com/messages/new?recipient_id=l-a">
					<strong>Linkedin</strong> message
				</a>
				<a className="db link twitter mb2" href="https://twitter.com/Lalabadie">
					<strong>Twitter</strong>
				</a>

				<style jsx>
					{`
						.availability {
							background-color: #ddf5db;
							color: #08a200;
							font-size: 14px;
							line-height: 1.4;
						}
						.email a {
							color: #08a200;
							display: inline-block;
							border-bottom: solid 1px #08a200;
						}
						.email a:hover {
							opacity: 0.9;
						}
						.dribbble {
							color: #e63076;
						}
						.linkedin {
							color: #2350c3;
						}
						.twitter {
							color: #0298b8;
						}
					`}
				</style>
			</div>
			)}
, {title: T.Key("title")})
