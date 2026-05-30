import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    tailwindcss(),
    // Entry html lives at src/core/index.html, so Vite emits it to
    // dist/core/index.html. Move it up to dist/index.html so Tauri's
    // frontendDist (../dist) finds it at the server root.
    // Dev: rewrite `/` to /core/index.html so Tauri devUrl (port 1420 root)
    // serves the nested entry.
    {
      name: "serve-core-entry",
      apply: "serve" as const,
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/" || req.url === "/index.html") {
            req.url = "/core/index.html";
          }
          next();
        });
      },
    },
    {
      name: "flatten-core-html",
      apply: "build" as const,
      enforce: "post",
      generateBundle(_options, bundle) {
        const nested = bundle["core/index.html"];
        if (nested && nested.type === "asset") {
          nested.fileName = "index.html";
          bundle["index.html"] = nested;
          delete bundle["core/index.html"];
        }
      },
    },
  ],

  // Vite root is src/; the entry index.html lives in src/core/, while
  // static assets live in src/assets/. Output goes to <project>/dist
  // (consumed by tauri.conf.json frontendDist).
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "src/core/index.html"),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
