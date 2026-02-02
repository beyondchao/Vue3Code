import { fileURLToPath, URL } from "node:url";
import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
//引入svg插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";


// https://vite.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {

  //获取当前环境的变量
  let env = loadEnv(mode, process.cwd());
  console.log(`当前环境：${mode}`);
  return {
    plugins: [
      vue(),
      vueDevTools(),
      vueSetupExtend(),
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
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取环境变量中的代理地址
          target: env.VITE_SERVER,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path: string) => {
            const newPath = path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '');
            //console.log(`代理路径重写：${path} => ${newPath}`);
            return newPath;
          }
        }
      }
    }
  };
});
