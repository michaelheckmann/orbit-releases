import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
  schema: ({ image }) =>
    z.object({
      mode: z
        .enum(["replace", "prefix", "suffix", "extend"])
        .default("prefix")
        .optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { changelog };
