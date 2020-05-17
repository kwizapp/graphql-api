import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000

const MSG_API_PORT = (port: string) => `The API runs on port:\t\t\t${port}`
const MSG_POSTER_URL = (url: string) =>
  `The POSTER SERVICE is located at:\t${url}`
const MSG_METADATA_URL = (url: string) =>
  `The METADATA SERVICE is located at:\t${url}`

/**
 * Main entry point that starts the nest application on the specified port.
 */
async function bootstrap() {
  const server = await NestFactory.create(AppModule)
  server.enableCors()
  await server.listen(PORT)

  console.log()
  console.log(MSG_API_PORT(String(PORT)))
  console.log(MSG_POSTER_URL(process.env.POSTER_SERVICE_URL))
  console.log(MSG_METADATA_URL(process.env.METADATA_SERVICE_URL))
}

bootstrap()
