import { Module } from '@nestjs/common'

import { MovieResolver } from './movie.resolver'
import { MovieService } from './movie.service'

/**
 * The movie module using the `MovieResolver` to deal with GraphQL queries and
 * the `MovieService` to query the `PosterService` and `MetadataService` to
 * provide the requested data.
 */
@Module({
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
