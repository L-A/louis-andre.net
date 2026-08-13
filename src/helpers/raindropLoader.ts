import type { Loader } from "astro/loaders";
import { z } from "astro/zod";

// Per the API docs
// https://developer.raindrop.io/v1/raindrops

type DropType = "link" | "article" | "image" | "video" | "document" | "audio";
type HighlightColor =
  | "blue"
  | "brown"
  | "cyan"
  | "gray"
  | "green"
  | "indigo"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "yellow";
type RaindropItem = {
  _id: string;
  link: string;
  title: string;
  created: string;
  tags: string[];
  excerpt: string;
  note: string;
  type: DropType;
  cover: string;
  broken: boolean;

  highlights: {
    _id: string;
    text: string;
    color: HighlightColor;
    note: string;
    created: Date;
  }[];

  collection: {
    _id: number;
    title: string;
  };
};

export default function RaindropLoader({
  raindropToken,
  collectionID,
}: {
  raindropToken: string;
  collectionID: string;
}) {
  const getCollection = async (collectionID: string) => {
    try {
      const requestURL = `https://api.raindrop.io/rest/v1/raindrops/${collectionID}?perpage=200`;
      const response = await fetch(requestURL, {
        headers: { Authorization: "Bearer " + raindropToken },
      });
      const { items }: { items: RaindropItem[] } = await response.json();
      return items.map((item) => ({
        ...item,
        created: new Date(item.created),
      }));
    } catch (error) {
      console.log("Failed requesting drops from the Raindrop API:");
      console.error(error);
      return [];
    }
  };

  return {
    name: "raindrop-loader",
    load: async ({ store, parseData, generateDigest }) => {
      store.clear();
      const drops = await getCollection(collectionID);

      for (const drop of drops) {
        const id = drop._id;
        const data = await parseData({ id, data: drop });
        const digest = generateDigest(data);
        store.set({ id, data, digest });
      }
    },
    schema: z.object({
      title: z.string(),
      link: z.string(),
      excerpt: z.string(),
      created: z.date(),
      tags: z.array(z.string()),
    }),
  } satisfies Loader;
}
