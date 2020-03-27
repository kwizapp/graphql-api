import { Module } from '@nestjs/common'
import { MovieModule } from '../movie/movie.module'
import { ScoreService } from './score.service'
import { ScoreResolver } from './score.resolver'

@Module({
  imports: [MovieModule],
  providers: [ScoreService, ScoreResolver],
})
export class ScoreModule {}
