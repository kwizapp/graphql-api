import { Injectable } from '@nestjs/common'

import { Movie } from '../graphql'
import movies from './movies'

const axios = require('axios')

@Injectable()
export class MovieService {
  POSTER_SERVICE = process.env.POSTER_SERVICE_URL
  METADATA_SERVICE = process.env.METADATA_SERVICE_URL

  getMovies(): Movie[] {
    return movies
  }

  async getMovieByImdbId(imdbId: string): Promise<Movie> {
    try {
      // get poster url
      const posterResponse = await axios.get(
        `${this.POSTER_SERVICE}?id=${imdbId}`,
      )

      // get metadata
      const metadataResponse = await axios.get(
        `${this.METADATA_SERVICE}?id=${imdbId}`,
      )

      return {
        id: '0',
        imdbId: imdbId,
        title: metadataResponse.data.title,
        releaseYear: metadataResponse.data.release_date.substr(0, 4),
        posterPath: posterResponse.data.poster,
      }
    } catch (error) {
      if (error.response) {
        // request was made and the server responded with a status code that is not 2xx
        throw new Error(
          `Status: ${error.response.status}\nData: ${error.response.data}`,
        )
      } else if (error.req) {
        // request was made but no response was received
        throw new Error(`Request: ${error.response.request}`)
      } else {
        // something happened in setting up the request
        throw new Error('Error!!!')
      }
    }
  }
}
