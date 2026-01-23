import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
//引入svg插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[dir]-[name]",
      customDomId: "__svg__icons__dom__",
      svgoOptions: {
        full: true,
        plugins: [
          {
            name: "removeAttrs",
            params: {
              attrs: "fill",
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
