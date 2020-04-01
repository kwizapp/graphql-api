import { Args, Parent, ResolveField, Resolver, Query } from '@nestjs/graphql'
import { MovieService } from './movie.service'
import { Movie } from 'src/graphql'
import { handleError } from './movie.utils'

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query()
  async movie(@Args('imdbId') imdbId: string): Promise<Movie> {
    if (imdbId) {
      return this.movieService.getMovieByImdbId(imdbId)
    } else {
      return this.movieService
        .getRandomMovies()
        .then((result) => result[0])
        .catch((error) => handleError(error))
    }
  }

  @ResolveField()
  async randomMovies(
    @Parent() movie: Movie,
    @Args('num') num: number = 1,
  ): Promise<Movie[]> {
    return this.movieService.getRandomMovies(num, movie.imdbId)
  }
}
