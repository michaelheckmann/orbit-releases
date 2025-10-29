// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://reachorbit.app",
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),
  vite: { plugins: [tailwindcss()] },
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Geist",
        cssVariable: "--font-geist",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/geist-latin-400-normal.woff2"],
          },
          {
            weight: 500,
            style: "normal",
            src: ["./src/assets/fonts/geist-latin-500-normal.woff2"],
          },
        ],
      },
      {
        provider: "local",
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/geist-mono-latin-400-normal.woff2"],
          },
        ],
      },
    ],
  },
  build: {
    assetsPrefix: "https://reachorbit-app.b-cdn.net",
  },
});
