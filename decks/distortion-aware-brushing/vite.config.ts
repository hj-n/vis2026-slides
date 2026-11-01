import { fileURLToPath } from 'node:url'
import { transform } from 'esbuild'
export default {
  cacheDir: fileURLToPath(new URL('../../node_modules/.vite/dab/', import.meta.url)),
  server: {
    ws: process.env.VIS_PRESENTATIONS_PROXY_PORT
      ? { clientPort: Number(process.env.VIS_PRESENTATIONS_PROXY_PORT) }
      : undefined,
  },
  plugins: [{
    name: 'brushing-react-slides',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.tsx')) return
      return transform(code, { loader: 'tsx', jsx: 'automatic', jsxImportSource: 'react', sourcemap: true, sourcefile: id })
    },
  }],
}
