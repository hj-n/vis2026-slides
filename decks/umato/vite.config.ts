import { fileURLToPath } from 'node:url'
export default {
  cacheDir: fileURLToPath(new URL('../../node_modules/.vite/umato/', import.meta.url)),
  server: {
    ws: process.env.VIS_PRESENTATIONS_PROXY_PORT
      ? { clientPort: Number(process.env.VIS_PRESENTATIONS_PROXY_PORT) }
      : undefined,
  },
}
