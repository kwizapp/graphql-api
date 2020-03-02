import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { MovieService } from './movie.service'

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query()
  async movies() {
    return this.movieService.getMovies()
  }

  @Query()
  async movie(@Args('index') index: number) {
    return this.movieService.getMovieByIndex(index)
  }

  @Mutation()
  async upVoteMovie(@Args('movieId') movieId: string) {
    return this.movieService.upVoteMovie(movieId)
  }
}
