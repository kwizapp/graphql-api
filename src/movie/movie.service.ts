import { Injectable } from '@nestjs/common'

import { Movie } from '../graphql'

const axios = require('axios')

@Injectable()
export class MovieService {
  METADATA_SERVICE = process.env.METADATA_SERVICE_URL
  POSTER_SERVICE = process.env.POSTER_SERVICE_URL

  async getMovieByImdbId(imdbId: string): Promise<Movie> {
    try {
      // get metadata
      const metadataResponse = await axios.get(
        `${this.METADATA_SERVICE}?id=${imdbId}`,
      )
      const metadata = this.extractDataFromMetadataResponse(metadataResponse)

      // get poster url
      const posterResponse = await axios.get(
        `${this.POSTER_SERVICE}?id=${imdbId}`,
      )
      const poster = this.extractDataFromPosterResponse(posterResponse)

      return {
        imdbId: imdbId,
        title: metadata.title,
        releaseYear: metadata.releaseYear,
        posterPath: poster.posterPath,
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  async getRandomMovie(): Promise<Movie> {
    try {
      // get metadata
      const metadataResponse = await axios.get(`${this.METADATA_SERVICE}`)
      const metadata = this.extractDataFromMetadataResponse(metadataResponse)

      // get poster url
      const posterResponse = await axios.get(
        `${this.POSTER_SERVICE}?id=${metadata.imdbId}`,
      )
      const poster = this.extractDataFromPosterResponse(posterResponse)

      return {
        imdbId: metadata.imdbId,
        title: metadata.title,
        releaseYear: metadata.releaseYear,
        posterPath: poster.posterPath,
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  extractDataFromMetadataResponse(response): Movie {
    return {
      imdbId: response.data.imdb_id,
      title: response.data.title,
      releaseYear: response.data.release_date.substr(0, 4),
      posterPath: '',
    }
  }

  extractDataFromPosterResponse(response): Movie {
    return {
      imdbId: '',
      title: '',
      releaseYear: 0,
      posterPath: response.data.poster,
    }
  }

  handleError = error => {
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
