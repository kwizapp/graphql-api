import { Injectable } from '@nestjs/common'

import { Movie } from '../graphql'
import movies from './movies'

@Injectable()
export class MovieService {
  getMovies(): Movie[] {
    return movies
  }

  getMovieByImdbId(imdbId: string) {
    // if there is a move with the provided imdbId, return it
    // if there is no movie with the provided imdbId, return null
    return movies.find(m => m.imdbId === imdbId) || null
  }
}
