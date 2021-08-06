import { Palette } from "../config"
import Layout from "../components/layout"
import Link from "../components/styled-link"

const NFT = () => {
	return (
		<Layout pageTitle="About NFTs">
			<h1>About NFTs</h1>
			<p>
				I mint NFTs from two addresses. The first one is{" "}
				<Link href="https://foundation.app/@lalabadie">on Foundation</Link>,
				from the address{" "}
				<span
					className="address"
					title="0x9E7101C7741b919A389Fc9495D85843fEcAfeA50"
				>
					0x9E71...eA50
				</span>
				. The second one is{" "}
				<Link href="https://www.hicetnunc.xyz/tz/tz1ZvTGYH5EBwgmaYngELeUw1qzgQRJLKoDM">
					on Hic et Nunc
				</Link>
				, at{" "}
				<span className="address" title="tz1ZvTGYH5EBwgmaYngELeUw1qzgQRJLKoDM">
					tz1Zv...LKoDM
				</span>{" "}
				on the Tezos blockchain.
			</p>

			<h2>Carbon &amp; energy use</h2>

			<p>
				At the time of writing this, the Ethereum blockchain is still using
				proof of work to confirm transaction blocks. Since proof of work rewards
				using as much energy as possible, I'll keep a running tally of
				transactions done with my pieces, and periodically purchase carbon
				offsets to a multiple of their estimated kgCO2 impact. This is not a
				perfect solution, but I see it as the minimum I'm willing to live with.
			</p>

			<p>
				The per-transaction estimate is based on Kyle McDonald's{" "}
				<Link href="https://github.com/kylemcdonald/ethereum-nft-activity">
					ethereum NFT estimates here
				</Link>{" "}
				– which place Foundation at roughly 84 kgCO<sub>2</sub> per transaction.
				The offsets are by{" "}
				<Link href="https://terrapass.com/projects/sustainable-living-projects">
					Terrapass
				</Link>
				.
			</p>

			<style jsx>{`
				h1 {
					color: ${Palette.art};
				}

				span.address {
					font-size: 0.8em;
					font-family: courier, monospace, sans-serif;
				}
			`}</style>
		</Layout>
	)
}

export default NFT
