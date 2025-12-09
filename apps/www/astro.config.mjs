// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
      resolve: {
          "alias": {
              "@": path.resolve(process.cwd(), 'src'),
              "@repo/ui": path.resolve(process.cwd(), '../../packages/ui/src'),
              "@repo/components": path.resolve(process.cwd(), '../../packages/components/src/components'),
              "@repo/tailwindcss": path.resolve(process.cwd(), '../../packages/tailwindcss/src'),
          }
      }
	},
  integrations: [react()]
});
