require('dotenv').config()

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { MovieModule } from './movie/movie.module'
import { ScoreModule } from './score/score.module'

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
    ScoreModule
  ],
})
export class AppModule {}
