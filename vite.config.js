import vue from "@vitejs/plugin-vue";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};
