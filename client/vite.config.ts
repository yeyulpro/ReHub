import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from 'vite-plugin-mkcert';


// https://vite.dev/config/
export default defineConfig({
  build:{
    outDir:'../API/wwwroot',
    chunkSizeWarningLimit:1500,
    emptyOutDir:true
  },
  server: {
    https: true,
    port: 3002,
  },
  plugins: [react(), mkcert()],
});
