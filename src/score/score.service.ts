import { Injectable } from '@nestjs/common'
import { Movie } from 'src/graphql'

/**
 * The `ScoreService` is responsible for scoring answers to the following types of questions:
 * - guessing the title of the movie shown on a movie poster
 * - guessing when a movie was released in comparison to other movies
 */
@Injectable()
export class ScoreService {
  /**
   * Score the answer to the question where the title of a movie poster needs to be guessed.
   *
   * @param selectedTitle - The selected title as an answer to the question
   * @param remainingSeconds - The remaining number of seconds to answer the question
   * @param movie - The movie that was shown on the movie poster
   */
  async scoreTitleResponse(
    selectedTitle: string,
    remainingSeconds: number,
    movie: Movie,
  ): Promise<number> {
    if (selectedTitle !== movie.title) {
      // incorrect answer => lose one life
      return 0
    }

    // always award 50 at minimum and an extra 250 points for 10 remaining seconds
    return 50 + remainingSeconds * 100 + (remainingSeconds === 10 ? 250 : 0)
  }

  /**
   * Score the answer to the question where a movie needs to be placed on a timeline with
   * other movies based on their release years.
   *
   * @param movies - The movies sorted by their assumed release years
   * @param titleQuestionScores - The number of points that have been scored in the previous
   *                              question when guessing the title of a movie poster
   */
  async scoreBonusResponse(
    movies: Movie[],
    titleQuestionScores: number,
  ): Promise<number> {
    const isResponseCorrect = movies
      // get all release years
      .map((movie) => movie.releaseYear)
      // check if they are in increasing order
      // !index returns true for the first releaseYear and false for all others
      .every((value, index, array) => !index || array[index - 1] <= value)

    return isResponseCorrect ? 2 * titleQuestionScores : 0
  }
}
