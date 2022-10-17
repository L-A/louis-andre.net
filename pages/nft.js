import { Palette } from "../config";
import Layout from "../components/layout";
import Link from "../components/styled-link";

const NFT = () => {
	return (
		<Layout pageTitle="About NFTs">
			<h1>About NFTs</h1>
			<h2>Blockchain addresses</h2>
			<p>
				I mint from two addresses belonging to{" "}
				<Link href="https://petiterevolte.com/en">Petite Révolte</Link>, my art
				and design studio. The first one is{" "}
				<Link href="https://etherscan.io/address/0x4013a99b2761aae44031Da0Cc5510CcdEBDFa71e">
					on Ethereum
				</Link>{" "}
				(see the part about carbon), from the address{" "}
				<span
					className="address"
					title="0x4013a99b2761aae44031Da0Cc5510CcdEBDFa71e"
				>
					0x40...a71e
				</span>
				. The second one is{" "}
				<Link href="https://tzkt.io/tz1TXPoPrWjn4PSbXe6L66Kqo9NVCWiEw17Q">
					on Tezos
				</Link>
				, at{" "}
				<span className="address" title="tz1TXPoPrWjn4PSbXe6L66Kqo9NVCWiEw17Q">
					tz1T...Ew17Q
				</span>
				.
			</p>
			<p>
				I have personal addresses which should not see much use in the future,
				namely{" "}
				<span
					className="address"
					title="0x9E7101C7741b919A389Fc9495D85843fEcAfeA50"
				>
					0x9E71...eA50
				</span>{" "}
				and{" "}
				<span className="address" title="tz1ZvTGYH5EBwgmaYngELeUw1qzgQRJLKoDM">
					tz1Z...KoDM
				</span>
				.
			</p>

			<h2>Carbon &amp; energy use</h2>

			<table>
				<tbody>
					<tr>
						<th>Updated</th>
						<th>Emissions estimate</th>
						<th>Offsets puchased</th>
					</tr>
					<tr>
						<td>August 2022</td>
						<td>11.31t</td>
						<td>30t</td>
					</tr>
				</tbody>
			</table>

			<p>
				The Ethereum blockchain has <em>finally, after all</em>, started using
				proof of stake, an energy-efficient confirmation protocol. Its former
				mode of operation was proof of work. Since proof of work rewards using
				as much energy as possible, I kept a running tally of my (overall
				modest) transactions on ETH, and periodically purchased carbon offsets
				to a multiple of their estimated kgCO2 impact. This was not a perfect
				solution, but it was the minimum I was willing to live with.
			</p>

			<p>
				The per-transaction estimate was based on Kyle McDonald's{" "}
				<Link href="https://github.com/kylemcdonald/ethereum-nft-activity">
					ethereum NFT estimates here
				</Link>{" "}
				– which, for example, place Foundation at roughly 84 kgCO<sub>2</sub>{" "}
				per transaction. At the time the proof of stake merge finally happened,
				most of my activity had been through Foundation sales (2021), then a
				single Artblocks release (early 2022).
			</p>
			<p>
				The offsets are by{" "}
				<Link href="https://terrapass.com/projects/sustainable-living-projects">
					Terrapass
				</Link>
				, who contract out independent audits to confirm the efficacy of their
				project portfolio.
			</p>

			<style jsx>{`
				h1 {
					color: ${Palette.art};
				}

				span.address {
					font-size: 0.8em;
					font-family: courier, monospace, sans-serif;
				}

				table {
					margin-top: 2em;
					width: 100%;
					border-collapse: collapse;
				}

				th,
				td {
					color: ${Palette.work};
					font-size: 13px;
					font-family: courier, monospace, sans-serif;
					text-align: left;
					padding-right: 16px;
					vertical-align: top;
				}

				th {
					border-bottom: solid 1px ${Palette.workLink}44;
					vertical-align: bottom;
				}

				td {
					font-size: 15px;
				}
			`}</style>
		</Layout>
	);
};

export default NFT;
