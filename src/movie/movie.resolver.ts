import { Resolver, Query, Args } from '@nestjs/graphql'
import { MovieService } from './movie.service'

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query()
  async movie(@Args('imdbId') imdbId: string) {
    if (imdbId) {
      return this.movieService.getMovieByImdbId(imdbId)
    } else {
      return this.movieService.getRandomMovie()
    }
  }
}
