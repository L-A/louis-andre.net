import { Palette } from "../config"
import Link from "next/link"

const transition = "cubic-bezier(0.415, 1.400, 0.380, 0.975)"

const StyledLink = ({
	children,
	color = Palette.link,
	href,
	internal = false,
}) => {
	const naturalElement = (
		<a href={href}>
			{children}
			<span className="underline" aria-hidden="true" />
			<style jsx>{`
				a {
					color: ${color};
					display: inline-block;
					position: relative;
					vertical-align: baseline;
				}

				.underline {
					display: block;
					border-radius: 2px;
					background-color: ${color};
					opacity: 0.3;
					position: absolute;
					left: -2px;
					right: -2px;
					top: calc(100% - 3px);
					bottom: 2px;

					pointer-events: none;
					mix-blend-mode: multiply;
					z-index: 1;

					transition: bottom 0.2s ease-out, top 0.2s ease-out,
						opacity 0.2s ease-out;
				}

				a:hover {
				}

				a:hover .underline {
					transition: bottom 0.2s ${transition}, top 0.2s ${transition},
						opacity 0.1s ease-out;

					top: 0;
					bottom: 0;
					opacity: 0.05;
				}
			`}</style>
		</a>
	)

	if (internal) return <Link href={href}>{naturalElement}</Link>
	return naturalElement
}

export default StyledLink
