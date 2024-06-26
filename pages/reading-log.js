import { useState } from "react";

import { Palette } from "../config";
import Layout from "../components/layout";
import Link from "../components/styled-link";
import GetReadLog from "../helpers/getReadLog";

const visibleIncrements = 20;

const dateDifference = (now, date) => {
	const msDifference = new Date(now) - new Date(date);
	const daysDifference = msDifference / (1000 * 60 * 60 * 24);

	if (daysDifference < 0.5) return "today";
	if (daysDifference < 2) return "yesterday";
	if (daysDifference < 7) return Math.floor(daysDifference) + " days ago";
	if (daysDifference < 14) return "last week";
	if (daysDifference < 30.5)
		return Math.floor(daysDifference / 7) + " weeks ago";
	if (daysDifference < 61) return "a month ago";
	if (daysDifference < 365)
		return Math.floor(daysDifference / 30.5) + " months ago";
	if (daysDifference < 365 * 2) return "a year ago";
	return Math.floor(daysDifference / 365) + " years ago";
};

const ReadingList = ({ links, dateGenerated }) => {
	const [visibleLinks, setVisibleLinks] = useState(visibleIncrements);
	const unreadImage = <img src="/images/icn-unread.svg" />;

	return (
		<Layout pageTitle="Reading Log">
			<h1>Reading Log</h1>
			<p>
				I like to read on the web, and bookmark most of it on my{" "}
				<Link color={Palette.journal} href="https://omnivore.app">
					Omnivore
				</Link>{" "}
				account . Fellow Internet person, this list is as close as you can get
				to my personal stream of thoughts.
			</p>

			<ul className="links-list">
				{!links
					? ""
					: links.slice(0, visibleLinks).map((link) => (
							<li key={link.slug} className="link-item">
								<a href={link.url}>
									<h2 className={link.isArchived && "read"}>{link.title}</h2>
									<p>{link.description}</p>
									<small className="url">{link.url}</small>
									<ul className="meta">
										<li className="posted-and-read">
											{link.isArchived ? (
												""
											) : (
												<>
													{unreadImage} <strong>unread</strong> –{" "}
												</>
											)}
											{dateDifference(dateGenerated, link.createdAt)}
										</li>
										{link.labels.map(({ name, color }) => (
											<li
												className="tag"
												key={name}
												style={{ color, backgroundColor: color + "11" }}
											>
												{name}
											</li>
										))}
									</ul>
								</a>
							</li>
					  ))}

				{visibleLinks >= links.length ? (
					<li className="end">
						<p>That's all for these recent bookmarks!</p>
					</li>
				) : (
					<button
						className="show-more"
						onClick={() => setVisibleLinks(visibleLinks + visibleIncrements)}
					>
						Show a few more
					</button>
				)}
			</ul>

			<style jsx>{`
				h1 {
					color: ${Palette.reading};
				}

				.links-list {
					padding: 0;
					list-style: none;
					margin: 64px 0;
				}

				.link-item {
					margin: 40px 0;
				}

				.link-item a {
					display: block;
					transition: opacity 0.25s ease-out;
				}

				.link-item a:hover {
					opacity: 0.7;
					transition: opacity 0.1s ease-out;
				}

				.link-item h2 {
					color: ${Palette.text};
					margin: 8px 0 4px;
					font-size: 18px;
					line-height: 1.4;
				}

				.link-item p {
					font-size: 14px;
					margin: 0;
				}

				.link-item .url {
					color: ${Palette.readingLink};
					display: block;
					font-size: 12px;
					margin: 4px 0;
					max-width: 560px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.link-item .meta {
					font-weight: lighter;
					font-size: 13px;
					list-style: none;
					padding: 0;
					margin: 8px 0;
				}

				.link-item .meta li {
					display: inline-block;
					margin-right: 8px;
				}

				.link-item .meta .tag {
					background-color: ${Palette.readingTagBackground};
					border-radius: 3px;
					color: ${Palette.readingTag};
					padding: 0 4px;
				}

				.link-item .meta .posted-and-read {
					color: ${Palette.readingMetaData};
				}

				.link-item .meta .posted-and-read strong {
					color: ${Palette.readingMetaData};
					font-weight: bold;
				}

				.show-more {
					background-color: ${Palette.softButtonBackground};
					border: none;
					border-radius: 4px;
					color: ${Palette.softButtonText};
					font-size: 13px;
					padding: 4px 8px;

					transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out;
				}

				.show-more:hover {
					background: #fff;
					box-shadow: 0 2px 2px ${Palette.softButtonBackground};
				}
			`}</style>
		</Layout>
	);
};

export const getStaticProps = async () => {
	const { links } = await GetReadLog();
	return { props: { links, dateGenerated: Date.now() }, revalidate: 3600 * 12 }; // Revalidate once per 12 hours
};

export default ReadingList;
