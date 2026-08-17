import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://louis-andre.net",
  prefetch: {
    defaultStrategy: "viewport",
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
      weights: ["700"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-mono",
      weights: ["100 700"],
    },
  ],
});
