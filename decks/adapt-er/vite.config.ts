import { fileURLToPath } from 'node:url'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, join } from 'node:path'

const notesFile = fileURLToPath(new URL('./slides.md', import.meta.url))
const backupDir = fileURLToPath(new URL('./.slidev/note-backups/', import.meta.url))

export default {
  cacheDir: fileURLToPath(new URL('../../node_modules/.vite/adapt-er/', import.meta.url)),
  plugins: [{
    name: 'adapt-er-speaker-notes-history',
    configureServer(server) {
      let previousHash = ''
      const snapshot = () => {
        try {
          const contents = readFileSync(notesFile)
          const hash = createHash('sha256').update(contents).digest('hex')
          if (hash === previousHash) return
          mkdirSync(backupDir, { recursive: true })
          const timestamp = new Date().toISOString().replaceAll(':', '-')
          writeFileSync(join(backupDir, `${timestamp}-${hash.slice(0, 12)}.md`), contents, { flag: 'wx' })
          previousHash = hash
        } catch (error) {
          server.config.logger.warn(`Could not back up Adapt-ER speaker notes: ${error.message}`)
        }
      }
      snapshot()
      const onChange = (file) => { if (resolve(file) === notesFile) snapshot() }
      server.watcher.on('change', onChange)
      server.httpServer?.once('close', () => server.watcher.off('change', onChange))
    },
  }],
  server: {
    ws: process.env.VIS_PRESENTATIONS_PROXY_PORT
      ? { clientPort: Number(process.env.VIS_PRESENTATIONS_PROXY_PORT) }
      : undefined,
  },
}
