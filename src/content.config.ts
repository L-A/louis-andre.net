import { getSecret } from "astro:env/server";
import { defineCollection } from "astro:content";
import RaindropLoader from "./helpers/raindropLoader";
import { glob, file } from "astro/loaders";
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
    atUri: z.string().optional(),
  }),
});

const readingLog = defineCollection({
  loader: RaindropLoader({ raindropToken, collectionID }),
});

const workExperience = defineCollection({
  loader: glob({ base: "./content/work-experience", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    name: z.string(),
    timePeriod: z.string(),
    responsibilities: z.string(),
  }),
});

const now = defineCollection({
  loader: glob({ base: "./content/now", pattern: "**/*.{md,mdx}" }),
  schema: z.object({}),
});

const artSeries = defineCollection({
  loader: file("./content/art-series.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string(),
      description: z.string(),
      platforms: z.optional(
        z.array(
          z.object({
            platform: z.string(),
            link: z.string(),
          }),
        ),
      ),
      iterations: z.array(
        z.tuple([image(), z.number(), z.optional(z.string())]),
      ),
    }),
});

export const collections = {
  journal,
  readingLog,
  artSeries,
  workExperience,
  now,
};
