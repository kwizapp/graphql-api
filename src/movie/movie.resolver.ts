import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { MovieService } from './movie.service'

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query()
  async movie(@Args('imdbId') imdbId: string) {
    return this.movieService.getMovieByImdbId(imdbId)
  }
}
