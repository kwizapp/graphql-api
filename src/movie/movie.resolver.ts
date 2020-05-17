import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Movie } from 'src/graphql'

import { MovieService } from './movie.service'
import { handleError } from './movie.utils'

/**
 * This resolver is responsible for accepting and answering movie related
 * GraphQL queries requesting data about either specific or random movies.
 */
@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  /**
   * Get metadata and the poster URL of either the specified or a random movie.
   *
   * @param imdbId - The IMDb ID of the movie to get metadata and the poster URL from.
   *                 This parameter is optional. If it is not supplied, a random
   *                 movie is chosen.
   */
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

  /**
   * Get `num` random movies that are different from the specified `movie`.
   *
   * @param movie - The parent movie that should not be returned.
   * @param num - The number of random movies to get.
   * @param differentReleaseYear - Whether or not the returned movies should
   *                               be released in a different year than the
   *                               parent `movie`.
   */
  @ResolveField()
  async randomMovies(
    @Parent() movie: Movie,
    @Args('num') num: number = 1,
    @Args('differentReleaseYear') differentReleaseYear: boolean = false,
  ): Promise<Movie[]> {
    return this.movieService.getRandomMovies(
      num,
      movie.imdbId,
      differentReleaseYear ? movie.releaseYear : 0,
    )
  }
}
