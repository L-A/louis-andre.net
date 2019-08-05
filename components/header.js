import Link from "next/link"

import Nav from "../components/nav"

const HeroText = (
	<h1 className="hero-text">
		<img alt="Design & Code" src="/static/images/img-design-code.svg" />
		<style jsx>{`
			.hero-text {
				text-align: center;
				margin: 128px auto 128px;
			}

			.hero-text img {
				max-width: 60vw;
			}
		`}</style>
	</h1>
)

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
		<header className={isAbout ? "about" : ""}>
			<Nav onBlue={isAbout} />
			{isAbout ? (
				<img className="about-image" src="/static/images/portrait-small.png" />
			) : (
				false
			)}
			{withHeroText ? HeroText : ""}
			<h2>{overTitle}</h2>
			<h1>{title}</h1>
			{intro ? <h3>{intro}</h3> : false}
			<style jsx>{`
				header {
					background-color: #420b45;
					background-image: url("/static/images/header-bg.jpg");
					background-size: cover;
					color: #fff;
					overflow: hidden;
					position: relative;
				}

				header.about {
					background-color: #31c7ff;
					background-image: none;
				}

				.about-image {
					float: left;
					width: 50%;
					max-width: 480px;
					margin-top: -120px;
					vertical-align: bottom;
				}

				h1 {
					margin: 0 64px 64px;
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

				header.about h1 {
					margin: 216px 64px 16px 0;
				}

				header.about h1,
				header.about h2,
				header.about h3 {
					margin-left: calc(312px + 100% / 5);
				}

				@media (max-width: 950px) {
					header.about h1 {
						margin-top: 128px;
					}
				}

				@media (max-width: 820px) {
					header.about h1,
					header.about h2,
					header.about h3 {
						margin-left: calc(50% + 16px);
						margin-right: 32px;
					}

					header.about h3 {
						font-size: 18px;
					}
				}

				@media (max-width: 726px) {
					h1 {
						font-size: 36px;
						margin: 0 32px 32px;
					}

					header.about h1 {
						margin-top: 64px;
					}

					h2 {
						margin: 0 32px;
					}
				}

				@media (max-width: 450px) {
					header.about {
						background-color: #31c7ff;
						background-image: url("/static/images/portrait-small.png");
						background-position: bottom left;
						background-repeat: no-repeat;
						background-size: 100%;
						padding-bottom: calc(100% * 1.45);
					}

					header.about h1,
					header.about h2,
					header.about h3 {
						margin-left: 32px;
					}

					header.about h1 {
						margin-top: 64px;
					}

					.about-image {
						display: none;
					}
				}
			`}</style>
		</header>
	)
}
