import { getSecret } from "astro:env/server";
import { defineCollection } from "astro:content";
import RaindropLoader from "./helpers/raindropLoader";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Environment variables
const raindropToken = getSecret("RAINDROP_TOKEN");
const collectionID = getSecret("RAINDROP_COLLECTION_ID");

const journal = defineCollection({
  loader: glob({ base: "./content/journal", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    inFrench: z.boolean().optional(),
  }),
});

const readingLog = defineCollection({
  loader: RaindropLoader({ raindropToken, collectionID }),
});

export const collections = {
  journal,
  readingLog,
};
