import { Translate } from "../helpers/translate"

import Title from "../components/section-title"
const T = Translate({
	fr: {
		title: "Contact & disponibilités",
		next: "Prochaines disponibilités:",
		emailPrefix: "Rejoignez-moi à",
		month: [
			"janvier",
			"février",
			"mars",
			"avril",
			"mai",
			"juin",
			"juillet",
			"août",
			"septembre",
			"octobre",
			"novembre",
			"décembre"
		]
	},
	en: {
		title: "Contact & availabilities",
		next: "Available starting around",
		emailPrefix: "Reach me at",
		month: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]
	}
})

export default ({ availableMonth }) => (
	<div className="section">
		<Title>{T("title")}</Title>
		<h3 className="availability">
			{T("next")} <strong>{T("month." + availableMonth)}</strong>
		</h3>
		<h3 className="email">
			{T("emailPrefix")} <br />
			<a href="mailto:monsieur@louis-andre.net">
				<strong>monsieur@louis-andre.net</strong>
			</a>
		</h3>
		<style jsx>{`
			.section {
				margin: 0 auto;
				max-width: 694px; /* Centers it on full-width pages */
			}

			h3 {
				font-size: 22px;
				font-weight: normal;
				max-width: 28em;
			}

			.availability {
				border: 2px solid #2200a1;
				border-radius: 4px;
				color: #2200a1;
				font-size: 16px;
				padding: 8px 16px;
				display: inline-block;
			}

			.email a {
				color: #2200a1;
				text-decoration: none;
			}

			.email a:hover {
				text-decoration: underline;
			}
		`}</style>
	</div>
)
