import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://louis-andre.net",

  prefetch: {
    defaultStrategy: "viewport",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    fallback: { fr: "en" },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans",
      cssVariable: "--font-plex",
      weights: ["100 700"],
      styles: ["normal", "italic"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans Condensed",
      cssVariable: "--font-plex-condensed",
      weights: ["300", "700"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-mono",
      weights: ["100 700"],
    },
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-CA",
          fr: "fr-CA",
        },
      },
    }),
  ],
});
