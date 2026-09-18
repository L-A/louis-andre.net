import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET = async (context) => {
  const posts = await getCollection("journal");

  return rss({
    title: "Louis-André Labadie",
    description: "Posts on art, technology, and design",
    site: context.site,
    stylesheet: "/rss-style.xsl",
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link:
          post.data.lang === "fr"
            ? `/fr/journal/${post.id}/`
            : `/journal/${post.id}/`,
      })),
  });
};
