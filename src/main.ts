import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

require('dotenv').config()

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(PORT)
}
bootstrap()

console.log(`The API runs on port:\t\t\t${PORT}`)
console.log(
  `The POSTER SERVICE is located at:\t${process.env.POSTER_SERVICE_URL}`,
)
console.log(
  `The METADATA SERVICE is located at:\t${process.env.METADATA_SERVICE_URL}`,
)
