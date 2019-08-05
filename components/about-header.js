import Link from "next/link"

import Nav from "../components/nav"

export default ({
	title,
	overTitle,
	overTitleLink,
	withHeroText,
	isAbout,
	intro
}) => {
	overTitle = overTitleLink ? (
		<Link href={overTitleLink}>
			<a>
				{overTitle}
				<style jsx>{`
					a {
						text-decoration: none;
					}
					a:hover {
						text-decoration: underline;
					}
				`}</style>
			</a>
		</Link>
	) : (
		overTitle
	)

	return (
		<header>
			<Nav onBlue={isAbout} />
			<div className="columns">
				<img className="about-image" src="/static/images/portrait-small.png" />
				<div className="about-text">
					{withHeroText ? HeroText : ""}
					<h2>{overTitle}</h2>
					<h1>{title}</h1>
					{intro ? <h3>{intro}</h3> : false}
				</div>
			</div>
			<style jsx>{`
				header {
					background-color: #31c7ff;
					color: #fff;
					overflow: hidden;
					position: relative;
				}

				.columns {
					display: flex;
				}

				.about-image {
					max-width: 50%;
					max-height: 700px;
					align-self: flex-end;
					margin-right: -16px;
					margin-top: -128px;
				}

				.about-text {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}

				h1 {
					margin: 0 64px 32px;
					font-size: 46px;
					line-height: 1.1;
					max-width: 15em;
				}

				h2 {
					color: #d73f00;
					font-size: 16px;
					font-weight: 500;
					margin: 0 64px;
					max-width: 18em;
				}

				h3 {
					color: #1e2949;
					font-weight: normal;
					font-size: 22px;
					max-width: 20em;
					margin: 32px 64px;
				}

				@media (max-width: 726px) {
					.about-image {
						max-width: 40%;
						margin-top: -16px;
					}

					h1 {
						font-size: 36px;
						margin: 0 32px 32px;
					}

					h2,
					h3 {
						font-size: 16px;
						margin: 0 32px;
					}
				}

				@media (max-width: 450px) {
					.columns {
						flex-direction: column-reverse;
					}

					.about-image {
						align-self: flex-start;
						max-width: 90%;
						margin-top: -20px;
					}
			`}</style>
		</header>
	)
}
