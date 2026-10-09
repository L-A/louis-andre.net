import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET = async (context) => {
  const posts = await getCollection("notes");

  return rss({
    title: "Louis-André Labadie",
    description: "The source for my syndicated micro posts",
    site: context.site,
    stylesheet: "/rss-style.xsl",
    items: posts
      .filter((e) => import.meta.env.DEV || !e.data.draft)
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        pubDate: post.data.date,
        link:
          post.data.lang === "fr"
            ? `/fr/notes/${post.id}/`
            : `/notes/${post.id}/`,
      })),
  });
};
