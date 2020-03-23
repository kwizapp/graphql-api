require('dotenv').config()

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { MovieModule } from './movie/movie.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.graphql'],
      // creates definitions on every start
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    // import all other modules for the application
    MovieModule,
  ],
})
export class AppModule {}
