import Image from "next/image";
import { Palette } from "../config";
import Layout from "../components/layout";
import Link from "../components/styled-link";
import { useEffect, useState } from "react";
import { getPlaiceholder } from "plaiceholder";

// Image ratio is width/height

const seriesViewer = ({ name, description, iterations }, index) => {
	const [down, setDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [startScroll, setStartScroll] = useState(0);
	const [xDelta, setXDelta] = useState(0);

	useEffect(() => {
		// Using JS variables prevents flickering in the animation
		// useState would introduce jitter
		let startX,
			startScroll,
			xDelta,
			down = false;
		const parent = document.querySelector(`.iterations-${index}`);
		const onMouseDown = (e) => {
			e.preventDefault();
			down = true;
			startScroll = parent.scrollLeft;
			startX = e.pageX - parent.offsetLeft;
			xDelta = 0;
			parent.classList.add("active");
		};
		const onMouseMove = (e) => {
			if (!down) return;
			e.preventDefault();
			// Slightly faster than the cursor
			xDelta = (e.pageX - startX - parent.offsetLeft) * 1.5;
			parent.scrollLeft = startScroll - xDelta;
		};
		const onMouseUp = (e) => {
			down = false;
			parent.classList.remove("active");
			parent.scrollTo(startScroll - xDelta, 0);
		};

		parent.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			parent.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	});

	return (
		<li className="series-preview" key={name}>
			<h2>{name}</h2>
			<p>{description}</p>
			<ul className={`iterations iterations-${index}`}>
				{iterations.map(({ name, ratio, css, ...img }, i) => {
					// css and img are provided by plaiceholder
					return (
						<li className="series-iteration" key={i}>
							<div className="image-wrapper" style={{ ...css }}>
								<Image
									{...img}
									className="image"
									width={300 * ratio}
									height={300}
								/>
							</div>
							<small>{name || "Untitled iteration"}</small>
						</li>
					);
				})}
			</ul>

			<style jsx>{`
				.series-preview {
					margin-top: 64px;
					position: relative;
				}

				.iterations {
					cursor: grab;
					list-style: none;
					padding: 8px 0 32px;
					display: flex;
					flex-flow: row nowrap;
					overflow-x: scroll;
					overflow-scrolling: touch;
					margin-left: calc((100vw - 820px) * -0.5 - 134px);
					margin-right: calc((100vw - 820px) * -0.5);
					width: 100vw;
					scroll-padding-left: calc((100vw - 820px) * 0.5 + 134px);
					padding-left: calc((100vw - 820px) * 0.5 + 134px);
					padding-right: calc((100vw - 820px) * 0.5);
					scrollbar-width: none;
					scroll-behavior: smooth;
				}

				.iterations::-webkit-scrollbar {
					display: none;
				}

				.iterations.active {
					cursor: grabbing;
					scroll-behavior: auto;
				}

				.series-iteration {
					transition: transform 0.2s ease-out;
					min-width: 332px;
					padding-right: 32px;
					flex: 1 0 332px;
				}

				.series-iteration::after {
					flex: 0 0 20px;
					content: "";
				}

				.series-iteration:last-child {
					margin-right: 0;
				}

				.series-iteration .image-wrapper {
					background-color: #555;
					display: block;
					height: 300px;
					min-width: 300px;
					max-height: 450px;
					transition: transform 0.2s ease-out;
					transform-origin: center bottom;
					display: block;
					width: 0;
					max-width: 100%;
					position: relative;
					overflow: hidden;
					border-radius: 2px;

					box-shadow: 0px 16px 16px rgba(0, 0, 0, 0.05),
						0px 6px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1);
					transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
				}

				.iterations.active .image-wrapper {
					box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.05),
						0px 8px 16px rgba(0, 0, 0, 0.05), 0px 3px 8px rgba(0, 0, 0, 0.01);
					transform: translateY(-1px);
				}

				small {
					opacity: 0.6;
					font-family: "Courier New", Courier, monospace;
				}

				@media (max-width: 960px) {
					.iterations {
						margin-left: -204px;
						padding-left: 204px;
						scroll-padding-left: 204px;
						padding-right: 32px;
					}
				}

				@media (max-width: 800px) {
					.iterations {
						margin-left: -92px;
						padding-left: 92px;
						scroll-padding-left: 92px;
						padding-right: 32px;
					}
				}

				@media (max-width: 700px) {
					.iterations {
						margin-left: -32px;
						scroll-padding-left: 32px;
						padding-left: 32px;
						padding-right: 32px;
					}
				}

				@media (max-width: 500px) {
					.iterations {
						margin-left: -16px;
						padding-left: 16px;
						padding-right: 16px;
						scroll-padding: 16px;
					}
				}
			`}</style>
		</li>
	);
};

const GenerativeArt = ({ series }) => (
	<Layout pageTitle="Generative Art">
		<h1>Generative Art</h1>
		<p>
			What do you do when you enjoy coding, but want an expressive outlet where
			the computer is a playful tool?{" "}
			<Link
				color={Palette.reading}
				href="https://en.wikipedia.org/wiki/Generative_art"
			>
				Generative art
			</Link>{" "}
			is where it’s at! Here are some of my pieces.
		</p>

		<p>
			<strong>A note about NFTs:</strong> You can find my legitimate addresses
			on Tezos and Ethereum{" "}
			<Link internal href="/nft" color={Palette.art}>
				on this page
			</Link>
			, as well as my simple policy on blockchain energy use.
		</p>

		<p className="notice">
			If you want to stay up to date on my art, I post{" "}
			<Link href="https://www.instagram.com/lalabadie/">here on Instagram</Link>
			.
		</p>

		<ul className="series">{series.map(seriesViewer)}</ul>

		<style jsx>{`
			h1 {
				color: ${Palette.art};
			}

			.notice {
				background-color: ${Palette.instagramBackground};
				border-radius: 3px;
				padding: 16px 32px;
				margin-top: 32px;
				max-width: 50em;
			}

			span.address {
				font-size: 0.8em;
				font-family: courier, monospace, sans-serif;
			}

			.series {
				padding-left: 0;
				list-style: none;
			}
		`}</style>
	</Layout>
);

export const getStaticProps = async () => {
	const setupImage = async (path, ratio, name) => {
		const { css, img } = await getPlaiceholder("/images/art/" + path, {
			size: 8,
		});
		return {
			...img,
			css,
			ratio,
			name: name || null,
		};
	};

	let series = [
		{
			name: "Convergence",
			description: "A series of generated movements, organic and blooming.",
			iterations: [
				await setupImage("convergence/convergence-1.png", 300 / 300),
				await setupImage("convergence/convergence-2.png", 300 / 300),
				await setupImage("convergence/convergence-3.png", 300 / 300),
			],
		},
		{
			name: "Boroughs",
			description:
				"Regions that build up and erode. The emptiest areas try to link with each other.",
			iterations: [
				await setupImage("boroughs/boroughs-39382.png", 300 / 300, "#39382"),
				await setupImage("boroughs/boroughs-245129.png", 300 / 300, "#245129"),
				await setupImage("boroughs/boroughs-696874.png", 300 / 300, "#696874"),
				await setupImage("boroughs/boroughs-24440.png", 300 / 300, "#24440"),
				await setupImage("boroughs/boroughs-777254.png", 300 / 300, "#777254"),
				await setupImage("boroughs/boroughs-809517.png", 300 / 300, "#809517"),
				await setupImage("boroughs/boroughs-910161.png", 300 / 300, "#910161"),
			],
		},
	];
	return { props: { series } };
};

export default GenerativeArt;
