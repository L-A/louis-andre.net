import { Palette } from "../config";
import Link from "next/link";

const transition = "cubic-bezier(0.415, 1.400, 0.380, 0.975)";

const StyledLink = ({
	children,
	color = Palette.link,
	href,
	title = "",
	internal = false,
	node,
}) => {
	const id = node?.properties?.id || null;
	return (
		<Link href={href}>
			<>
				<a href={href} title={title} id={id}>
					{children}
				</a>
				<style jsx>{`
					a {
						color: ${color};
						text-decoration: underline;
						position: relative;
						vertical-align: baseline;
						text-decoration-color: ${color}55;
						text-decoration-thickness: 0.0625em;
						text-underline-offset: 1.5px;
						transition: text-decoration-thickness 0.1s ease-out,
							background-color 0.1s linear;
						padding: 2px 4px;
						margin: -2px -4px;
					}

					a:hover {
						border-radius: 4px;
						background-color: ${color}11;
						text-decoration-thickness: 0.125em;
						text-decoration-color: ${color};
					}
				`}</style>
			</>
		</Link>
	);
};

export default StyledLink;
