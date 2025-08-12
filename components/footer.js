import Link from "./styled-link";
import { Palette } from "../config";
import { useEffect, useState } from "react";

const Footer = () => {
	const [statCount, setStatCount] = useState(-1);
	const [todayDateString, setTodayDateString] = useState(
		new Date().toISOString().split("T")[0]
	);
	const startDateString = "2021-01-15"; // First day of tracking

	useEffect(() => {
		const pagePath = encodeURIComponent(document.location.pathname);
		setTodayDateString(new Date().toISOString().split("T")[0]);

		const getStats = async () => {
			const pageStatRequest = await fetch(`/api/page-stats?path=${pagePath}`);
			const { count } = await pageStatRequest.json();
			console.log(count);
			setStatCount(count);
		};

		getStats();
	});

	return (
		<footer>
			<div className="footer-content">
				<div className="footer-heading">
					<h1>
						<Link href="/">
							<img src="/images/img-logo.svg" alt="Louis-André Labadie" />
						</Link>
					</h1>
					<p>Hi! You’re on Louis-André Labadie’s personal website.</p>
				</div>
				<ul className="footer-links">
					<li className="here">
						<span style={{ color: Palette.art }}>Here</span>
						<Link color={Palette.art} href="/">
							louis-andre.net
						</Link>
					</li>
					<li className="work">
						<span style={{ color: Palette.art }}>Work</span>
						<Link color={Palette.art} href="https://petiterevolte.com">
							petiterevolte.com
						</Link>
					</li>
					<li className="bluesky">
						<span style={{ color: Palette.journal }}>Bluesky</span>
						<Link
							color={Palette.journal}
							href="https://bsky.app/profile/louis-andre.net"
						>
							@louis-andre.net
						</Link>
					</li>
					<li className="mastodon">
						<span style={{ color: Palette.journal }}>Mastodon</span>
						<Link color={Palette.journal} href="https://social.lol/@lalabadie">
							lalabadie@social.lol
						</Link>
					</li>
					<li className="visits">
						<span style={{ color: Palette.externalLink }}>Visits</span>
						<Link
							color={Palette.externalLink}
							href={`https://lal.goatcounter.com/?period-start=${startDateString}&period-end=${todayDateString}`}
						>
							{statCount == -1
								? "lal.goatcounter.com"
								: `${statCount} on this page`}
						</Link>
					</li>
				</ul>
			</div>

			<style jsx>{`
				footer {
					background-color: ${Palette.readingTagBackground};
					font-size: 14px;
					margin: 64px 0 0;
				}

				.footer-content {
					max-width: 960px;
					padding: 64px 16px 16px 200px;
					margin: 0 auto;

					@media (max-width: 800px) {
						padding-left: 92px;
					}

					@media (max-width: 700px) {
						padding-left: 32px;
					}

					@media (max-width: 500px) {
						padding-left: 16px;
					}
				}

				.footer-links {
					list-style: none;
					padding: 0;

					li {
						margin-bottom: 4px;

						span {
							display: inline-block;
							min-width: 8rem;
						}

						strong {
							color: inherit;
						}
					}
				}
			`}</style>
		</footer>
	);
};

export default Footer;
