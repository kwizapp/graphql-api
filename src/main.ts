import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const server = await NestFactory.create(AppModule)
  server.enableCors()
  await server.listen(PORT)

  console.log(`The API runs on port:\t\t\t${PORT}`)
  console.log(
    `The POSTER SERVICE is located at:\t${process.env.POSTER_SERVICE_URL}`,
  )
  console.log(
    `The METADATA SERVICE is located at:\t${process.env.METADATA_SERVICE_URL}`,
  )
}

bootstrap()
