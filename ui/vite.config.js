const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        film: "./film.html",
      },
    },
  },
});
