import React from 'react'
import Page from '~/layouts/page'
import { Translate } from '~/helpers/lang'

const T = Translate({
	en: {
		title: "Contact & availability",
		contracts_start: "New contracts can start in",
		no_contracts: "Currently unavailable for new contracts",
		i_answer: "I answer quickly at",
		elsewhere: "Elsewhere",
		contacts: {
			dribbble: "<strong>Dribbble</strong> contact form",
			linkedin: "<strong>Linkedin</strong> message",
			twitter: "<strong>Twitter</strong>",
		},
		month: [
			"January", "February", "March", "April",
			"May", "June", "July", "August", "September",
			"October", "November", "December"
		]
	},
	fr: {
		title: "Contact & disponibilité",
		contracts_start: "Disponible à partir de",
		no_contracts: "Je ne prends pas de nouveaux contrats présentement",
		i_answer: "Je réponds rapidement à",
		elsewhere: "Ailleurs",
		contacts: {
			dribbble: "Demande de travail <strong>Dribbble</strong>",
			linkedin: "Messagerie <strong>LinkedIn</strong>",
			twitter: "<strong>Twitter</strong>",
		},
		month: [
			"janvier", "février", "mars", "avril",
			"mai", "juin", "juillet", "août", "septembre",
			"octobre", "novembre", "décembre"
		]
	}
})

export default Page( (props) => {
	return (
			<div className="mw6-l ph3 ph5-m ph0-l mb5 center">
				<h2 className="f2 fw3 navy no-underline pa0">{T.Key("title")}</h2>
				<CushionScript availableMonth={props.availableMonth} unavailable={true}/>
				<p className="email">
					{T.Key("i_answer")} <a className="link pointer" href="mailto:monsieur@louis-andre.net">monsieur&#64;louis-andre.net</a>
				</p>
				<h3 className="silver bold f6 ttu mt4">{T.Key("elsewhere")}</h3>
				<a className="db link dribbble mb2" href="https://dribbble.com/l-a"
					dangerouslySetInnerHTML={{__html: T.Key("contacts.dribbble")}} />
				<a className="db link linkedin mb2" href="https://www.linkedin.com/in/lalabadie/"
					dangerouslySetInnerHTML={{__html: T.Key("contacts.linkedin")}} />
				<a className="db link twitter mb2" href="https://twitter.com/Lalabadie"
					dangerouslySetInnerHTML={{__html: T.Key("contacts.twitter")}} />
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

const CushionScript = (props) => (
	<p className={"availability br2 pv2 ph3 ph4-ns green dib" + (props.unavailable ? " unavailable" : "")}>
		{props.unavailable ? T.Key("no_contracts") : T.Key("contracts_start") + " "}
		<strong>
			{props.unavailable ? "" : T.Key("month." + (props.availableMonth))}
		</strong>

		<style jsx>
			{`
				.availability {
					background-color: #ddf5db;
					color: #08a200;
					font-size: 14px;
					line-height: 1.4;
				}
				.availability.unavailable {
					background-color: #efffef;
					color: #87a184;
					font-size: 14px;
					line-height: 1.4;
				}
			`}
		</style>
	</p>
)
