import { Args, Parent, ResolveField, Resolver, Query } from '@nestjs/graphql'
import { MovieService } from './movie.service'
import { Movie } from 'src/graphql'

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query()
  async movie(@Args('imdbId') imdbId: string): Promise<Movie> {
    if (imdbId) {
      return await this.movieService.getMovieByImdbId(imdbId)
    } else {
      return (await this.movieService.getRandomMovies())[0]
    }
  }

  @ResolveField()
  async randomMovies(
    @Parent() movie: Movie,
    @Args('num') num: number = 1,
  ): Promise<Movie[]> {
    return await this.movieService.getRandomMovies(num, movie.imdbId)
  }
}
