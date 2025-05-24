// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path'
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'q9c9g16o',
    dataset: 'dev',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  },
  studioHost: 'studio.wbstks.dev',
})
