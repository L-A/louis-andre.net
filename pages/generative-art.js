import Image from "next/image";
import { Palette } from "../config";
import Layout from "../components/layout";
import Link from "../components/styled-link";
import { useEffect } from "react";
import { getPlaiceholder } from "plaiceholder";
import Series from "../content/art-series.json";

const PositiveCheck = ({ onClick }) => (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		alt="Yes"
		onClick={onClick}
	>
		<rect width="32" height="32" rx="16" fill="#D9FAEE" />
		<path
			d="M8 16.0031L13.5961 21.5992L24.5992 10.5961"
			stroke="#00B674"
			stroke-width="4"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

const NegativeCheck = ({ onClick }) => (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		alt="No"
		onClick={onClick}
	>
		<rect width="32" height="32" rx="16" fill="#F5EEFF" />
		<path
			d="M21.4039 10.5961L10 22"
			stroke="#711BDE"
			stroke-width="4"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M10 10.5961L21.4039 22"
			stroke="#711BDE"
			stroke-width="4"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);

// Image ratio is width/height

const seriesImage = ({ name, ratio, css, ...img }, i) => {
	const width = 300 * ratio;
	// css and img are provided by plaiceholder
	return (
		<li className="series-iteration" key={i}>
			<div className="image-wrapper" style={{ ...css }}>
				<Image {...img} className="image" width={width} height={300} />
			</div>
			<small>{name || "Untitled iteration"}</small>
			<style jsx>{`
				small {
					opacity: 0.6;
					font-family: "Courier New", Courier, monospace;
				}

				.series-iteration {
					transition: transform 0.2s ease-out;
					padding-right: 32px;
					flex: 1 0 ${width}px;
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
					width: ${width}px;
					max-width: 100%;
					position: relative;
					overflow: hidden;
					border-radius: 2px;

					box-shadow: 0px 16px 16px rgba(0, 0, 0, 0.05),
						0px 6px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.1);
					transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
				}
			`}</style>
		</li>
	);
};

const seriesViewer = ({ name, description, platforms, iterations }, index) => {
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
			if (!down) return;
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
			<p className="description">{description}</p>
			{platforms && (
				<small>
					<p className="platforms">
						Find the collection:
						{platforms.map(({ platform, link }) => {
							return (
								<>
									{platform == "Foundation" && (
										<a href={link} className="platform-link" key={"fnd"}>
											<Image
												src="/images/fnd-logo.svg"
												width={42}
												height={14}
												alt={`${name} on Foundation`}
											/>
										</a>
									)}
									{platform == "fxhash" && (
										<a href={link} className="platform-link" key={"fx"}>
											<Image
												src="/images/fx-logo.svg"
												width={20}
												height={18}
												alt={`${name} on fxhash`}
											/>
										</a>
									)}
									{platform == "Artblocks" && (
										<a href={link} className="platform-link" key={"ab"}>
											<Image
												src="/images/ab-logo@3x.png"
												width={23}
												height={20}
												alt={`${name} on Artblocks`}
											/>
										</a>
									)}
									{platform == "OpenSea" && (
										<a href={link} className="platform-link" key={"os"}>
											<Image
												src="/images/os-logo.svg"
												width={22}
												height={22}
												alt={`${name} on OpenSea`}
											/>
										</a>
									)}
								</>
							);
						})}
					</p>
				</small>
			)}
			<ul className={`iterations iterations-${index}`}>
				{iterations.map(seriesImage)}
			</ul>

			<style jsx>{`
				.series-preview {
					margin-top: 64px;
					position: relative;
				}

				h2 {
					margin-bottom: 8px;
					margin-top: 32px;
				}

				p.description {
					margin-top: 8px;
				}

				small {
					color: ${Palette.text}88;
					font-family: "Courier New", Courier, monospace;
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

				.iterations.active :global(.image-wrapper) {
					box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.05),
						0px 8px 16px rgba(0, 0, 0, 0.05), 0px 3px 8px rgba(0, 0, 0, 0.01);
					transform: translateY(-1px);
				}

				.platform-link {
					display: inline-block;
					vertical-align: middle;
					margin-left: 8px;
					opacity: 1;
					transition: opacity 0.15s ease-out;
					margin-bottom: -1px;
				}

				.platform-link:hover {
					opacity: 0.6;
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

const GenerativeArt = ({ series }) => {
	return (
		<Layout pageTitle="Generative Art">
			<h1>Generative Art</h1>
			<p>
				I've been creating{" "}
				<Link
					color={Palette.reading}
					href="https://en.wikipedia.org/wiki/Generative_art"
				>
					generative art
				</Link>{" "}
				for the last few years. Here are some selected&nbsp;series.
			</p>

			<p>
				<strong>A note about NFTs:</strong> You can find my legitimate addresses
				for Tezos and Ethereum{" "}
				<Link internal href="/nft" color={Palette.art}>
					on this page
				</Link>
				, as well as my policy on blockchain energy use.
			</p>

			<p className="notice">
				If you want to stay up to date on my art, I post{" "}
				<Link href="https://www.instagram.com/lalabadie/">
					here on Instagram
				</Link>
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
					margin-right: 32px;
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
};

export const getStaticProps = async () => {
	const setupImage = async ([path, ratio, name]) => {
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

	// Resolve all images to Plaiceholder objects
	const series = await Promise.all(
		Series.map(async ({ iterations, ...info }) => ({
			...info,
			iterations: await Promise.all(
				iterations.map(async (i) => await setupImage(i))
			),
		}))
	);
	return { props: { series } };
};

export default GenerativeArt;
