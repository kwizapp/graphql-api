import { Module } from '@nestjs/common'

import { MovieModule } from '../movie/movie.module'
import { ScoreResolver } from './score.resolver'
import { ScoreService } from './score.service'

/**
 * The score module uses the `ScoreResolver` to deal with GraphQL queries and
 * the `ScoreService` to score answers to questions. Moreover, the `MovieModule`
 * is used to get information about specific movies.
 */
@Module({
  imports: [MovieModule],
  providers: [ScoreService, ScoreResolver],
})
export class ScoreModule {}
