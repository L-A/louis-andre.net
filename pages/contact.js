import React from 'react'
import Page from '~/layouts/page'

export default Page( () => {
	return (
			<div className="ph3 mw6-l ph5-m ph0-l center">
				<h2 className="f2 fw3 navy no-underline dim pa0">Contact &amp; availability</h2>
				<p className="availability br2 pv2 ph3 ph4-ns green dib">
					New contracts can start in <strong>February</strong>&nbsp;(limited) and <strong>April</strong>&nbsp;(full&nbsp;time).
				</p><br />
				<p className="email">
					I answer quickly at <a className="link pointer" href="mailto:monsieur@louis-andre.net">monsieur&#64;louis-andre.net</a>
				</p>
				<h3 className="silver bold f6 ttu mt4">Elsewhere</h3>
				<a className="db link dribbble mb2" href="https://dribbble.com/messages/new?recipient_id=l-a">
					<strong>Dribbble</strong> contact form
				</a>
				<a className="db link linkedin mb2" href="https://dribbble.com/messages/new?recipient_id=l-a">
					<strong>Linkedin</strong> message
				</a>
				<a className="db link twitter mb2" href="https://dribbble.com/messages/new?recipient_id=l-a">
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
)
