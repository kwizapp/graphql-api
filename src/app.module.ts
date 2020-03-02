import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { MovieModule } from './movie/movie.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['../graphql/schema.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    // import all other modules for the application
    MovieModule,
  ],
})
export class AppModule {}
