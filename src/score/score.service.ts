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
}
