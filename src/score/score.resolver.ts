import { Resolver, Query, Args } from '@nestjs/graphql'
import { Movie } from 'src/graphql'
import { MovieService } from '../movie/movie.service'
import { ScoreService } from './score.service'

@Resolver('Score')
export class ScoreResolver {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly movieService: MovieService,
  ) {}

  @Query()
  async scoreTitleResponse(
    @Args('imdbId') imdbId: string,
    @Args('selectedTitle') selectedTitle: string,
    @Args('remainingSeconds') remainingSeconds: number,
  ): Promise<number> {
    const movie: Movie = await this.movieService.getMovieByImdbId(imdbId)
    return this.scoreService.scoreTitleResponse(
      selectedTitle,
      remainingSeconds,
      movie,
    )
  }
}
