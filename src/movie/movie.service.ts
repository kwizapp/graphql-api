import { Injectable } from '@nestjs/common'

import { Movie } from '../graphql'
import movies from './movies'

@Injectable()
export class MovieService {
  getMovies(): Movie[] {
    return movies
  }

  getMovieByIndex(index: number) {
    try {
      return movies[index]
    } catch (e) {
      return null
    }
  }

  upVoteMovie(movieId: string) {
    const movie = movies.find((m) => m.id === movieId)
    movie.votes++
    return movie
  }
}
