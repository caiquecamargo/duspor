import { defineConfig } from "@caiquecamargo/vite-plugin-netlify-cms";

export default defineConfig({
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  locale: 'pt-BR',
  media_folder: 'src/assets/images',
  public_folder: '../../assets/images',
  collections: [
  ],
})