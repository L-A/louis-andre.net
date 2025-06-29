import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import { getMarkdownFiles } from "../../helpers/getMarkdownFiles";

const generateRSSItem = async (post) => {
	const processedContent = await remark()
		.use(remarkGfm) // Use the same GitHub Flavored Markdown as your main site
		.use(remarkHtml)
		.process(post.body || "");

	return `
    <item>
      <guid>https://louis-andre.net/journal/${post.slug}</guid>
      <title><![CDATA[${post.title}]]></title>
      <link>https://louis-andre.net/journal/${post.slug}</link>
      <description><![CDATA[${post.description || ""}]]></description>
      <content:encoded><![CDATA[${processedContent.toString()}]]></content:encoded>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
  `;
};

const generateRSS = async (posts) => {
	const items = await Promise.all(posts.map(generateRSSItem));

	return `<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="/rss-style.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>Louis-André Labadie</title>
      <link>https://louis-andre.net</link>
      <description>Posts on art, technology, and design</description>
      <language>en-US</language>
      <managingEditor>louis-andre@louis-andre.net (Louis-André Labadie)</managingEditor>
      <webMaster>louis-andre@louis-andre.net (Louis-André Labadie)</webMaster>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="https://louis-andre.net/journal/rss.xml" rel="self" type="application/rss+xml"/>

      ${items.join("")}
    </channel>
  </rss>
`;
};

export default function RSS() {
	// This should never be called since we're using getServerSideProps
	return null;
}

export async function getServerSideProps({ res }) {
	const journalDir = path.join(process.cwd(), "content", "journal");
	const posts = getMarkdownFiles(journalDir)
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, 20); // Limit to most recent 20 posts

	const rss = await generateRSS(posts);

	res.setHeader("Content-Type", "text/xml");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=1200, stale-while-revalidate=600",
	);
	res.write(rss);
	res.end();

	return {
		props: {},
	};
}
