import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import I18nPlugin from "@caiquecamargo/vite-plugin-i18n";
import NetlifyCMS from '@caiquecamargo/vite-plugin-netlify-cms';
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
  site: "https://duspor.caiquedecamargo.dev.br",
  prefetch: true,
  experimental: {
    contentCollectionCache: false,
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        scale: 2,
        customCollections: {
          local: FileSystemIconLoader('./src/assets/icons'),
        },
      }),
      NetlifyCMS({
        iconUrl: "/logo-min.svg",
        title: "Duspor | Admin",
      }),
      I18nPlugin({
        locales: ["pt", "en", "es"],
        defaultLocale: "pt",
        folder: "./src/i18n/locales",
        projectId: "fresh-yen-404517"
      }),
    ],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
  },
});