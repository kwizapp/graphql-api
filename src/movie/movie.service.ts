import { Injectable } from '@nestjs/common'

import { Movie } from '../graphql'
import * as Utils from './movie.utils'

const axios = require('axios')

@Injectable()
export class MovieService {
  METADATA_SERVICE = process.env.METADATA_SERVICE_URL
  POSTER_SERVICE = process.env.POSTER_SERVICE_URL

  async getMovieByImdbId(imdbId: string): Promise<Movie> {
    try {
      // get metadata
      const metadataUrl = `${this.METADATA_SERVICE}?id=${imdbId}`
      const metadataResponse = await axios.get(metadataUrl)
      const metadata = Utils.extractDataFromMetadataResponse(metadataResponse)

      // get poster url
      const posterUrl = `${this.POSTER_SERVICE}?id=${imdbId}`
      const posterResponse = await axios.get(posterUrl)
      const poster = Utils.extractDataFromPosterResponse(posterResponse)

      return {
        imdbId: imdbId,
        title: metadata.title,
        releaseYear: metadata.releaseYear,
        posterPath: poster.posterPath,
      }
    } catch (error) {
      Utils.handleError(error)
    }
  }

  async getRandomMovie(): Promise<Movie> {
    try {
      // get metadata
      const metadataUrl = `${this.METADATA_SERVICE}`
      const metadataResponse = await axios.get(metadataUrl)
      const metadata = Utils.extractDataFromMetadataResponse(metadataResponse)

      // get poster url
      const posterUrl = `${this.POSTER_SERVICE}?id=${metadata.imdbId}`
      const posterResponse = await axios.get(posterUrl)
      const poster = Utils.extractDataFromPosterResponse(posterResponse)

      return {
        imdbId: metadata.imdbId,
        title: metadata.title,
        releaseYear: metadata.releaseYear,
        posterPath: poster.posterPath,
      }
    } catch (error) {
      Utils.handleError(error)
    }
  }
}
