import { Injectable } from '@nestjs/common'
import { Movie } from 'src/graphql'

@Injectable()
export class ScoreService {
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
