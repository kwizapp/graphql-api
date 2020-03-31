import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieResolver } from './movie.resolver'

@Module({
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
