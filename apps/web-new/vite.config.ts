// import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
// import istanbul from 'vite-plugin-istanbul'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    build: {
      sourcemap: true,
    },
    define: {
      'process.env': process.env,
    },
    plugins: [
      react(),
      // istanbul({
      //   forceBuildInstrument: true,
      //   requireEnv: true,
      //   include: ['app/**/*'],
      //   exclude: ['node_modules', 'app/test/**/*', '**/*.stories.ts'],
      // }),
    ],
  }
})
