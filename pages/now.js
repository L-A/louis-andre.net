import { Palette } from "../config";
import Layout from "../components/layout";
import Link from "../components/styled-link";

const NFT = () => {
	return (
		<Layout pageTitle="Now">
			<h1>Now</h1>
			<small>
				<p>Last updated June 28th, 2024</p>
				<p>
					This is a <Link href="https://nownownow.com/about">now page</Link>. If
					you have your own website, consider having one as well!
				</p>
			</small>
			<h2>
				Moving my{" "}
				<Link href="https://petiterevolte.com/en">design business</Link> to
				subscription
			</h2>
			<p>
				I want to talk money with my clients as little as possible. Moving my
				work agreements from fixed or hourly to a flat monthly rate will{" "}
				<em>probably</em> work better. I'm currently in the{" "}
				<em>only one way to know</em> part of this.
			</p>
			<h2>Learning to be a parent</h2>
			<p>
				The days are very long but the months fly by. I'm also learning to be
				very forgiving to myself, because I have never felt this depth of
				fatigue in the past.
			</p>
			<h2>Listening to lots of great local music</h2>
			<ul>
				<li>
					<Link href="https://www.youtube.com/watch?v=TYGma4yngdI">
						Lydia Képinski – Maïa
					</Link>
				</li>
				<li>
					<Link href="https://www.youtube.com/watch?v=H-DkwIGgVWo">
						zouz – Vertiges
					</Link>
				</li>
				<li>
					<Link href="https://www.youtube.com/watch?v=NRarEcyBcKE">
						Valence – Depuis Marseille
					</Link>
				</li>
				<li>
					<Link href="https://www.youtube.com/watch?v=4fTFwPYDIF8">
						Daniel Bélanger – Je fais de moi un homme
					</Link>
				</li>
				<li>
					<Link href="https://www.youtube.com/watch?v=Hj-_7E4HIbo">
						Gab Bouchard – Trou d'eau
					</Link>
				</li>
			</ul>

			<style jsx>{`
				h1 {
					color: ${Palette.art};
				}
			`}</style>
		</Layout>
	);
};

export default NFT;
