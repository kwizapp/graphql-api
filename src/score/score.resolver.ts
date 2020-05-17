import { Args, Query, Resolver } from '@nestjs/graphql'
import { Movie } from 'src/graphql'

import { MovieService } from '../movie/movie.service'
import { ScoreService } from './score.service'

/**
 * This resolver is responsible for accepting and answering GraphQL queries
 * requesting to score answers to different types of questions.
 */
@Resolver('Score')
export class ScoreResolver {
  constructor(
    private readonly scoreService: ScoreService,
    private readonly movieService: MovieService,
  ) {}

  /**
   * Get the number of points for guessing the title of a movie shown on a movie poster.
   *
   * @param imdbId - The IMDb ID of the movie show on the movie poster
   * @param selectedTitle - The selected title as an answer to the question
   * @param remainingSeconds - The remaining number of seconds to answer the question
   */
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

  /**
   * Get the number of points for guessing when a specific movie was released in comparison to
   * other movies.
   *
   * @param imdbIds - The IMDb IDs of the movies sorted by their assumed release years
   * @param titleQuestionScores - The number of points scored on the previous question
   *                              where the user guessed the title of a movie on a poster
   */
  @Query()
  async scoreBonusResponse(
    @Args('imdbIds') imdbIds: string[],
    @Args('titleQuestionScores') titleQuestionScores: number,
  ): Promise<number> {
    const movies = await Promise.all(
      imdbIds.map((id) => this.movieService.getMovieByImdbId(id)),
    )
    return this.scoreService.scoreBonusResponse(movies, titleQuestionScores)
  }
}
