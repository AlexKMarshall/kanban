import { spawn } from 'node:child_process'

type ServerProcess = {
  stop: () => Promise<void>
  port: number
}

export async function startServer({
  databaseUrl,
  port,
}: {
  databaseUrl: string
  port: number
}) {
  const serverProcess = spawn('pnpm', ['start:server'], {
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      PORT: port.toString(),
    },
  })

  return new Promise<ServerProcess>((resolve, reject) => {
    serverProcess.stderr.on('data', (data) => {
      const dataString: string = data.toString()
      console.error(dataString)
      reject(new Error(dataString))
    })

    serverProcess.stdout.on('data', (data) => {
      const dataString: string = data.toString()
      console.log(dataString)
      if (dataString.includes('Express server listening on port')) {
        return resolve({
          async stop() {
            if (serverProcess.killed) {
              return
            }
            serverProcess.kill('SIGINT')
          },
          port,
        })
      }
    })
  })
}
