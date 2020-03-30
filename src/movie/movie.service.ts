import { Injectable } from '@nestjs/common'

import { Movie } from '../graphql'
import * as Utils from './movie.utils'

import axios from 'axios'

@Injectable()
export class MovieService {
  METADATA_SERVICE = process.env.METADATA_SERVICE_URL
  POSTER_SERVICE = process.env.POSTER_SERVICE_URL

  async getMovieByImdbId(imdbId: string): Promise<Movie> {
    try {
      const metadata = (await this.getMetadata(imdbId))[0]
      const poster = await this.getPoster(imdbId)

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

  async getRandomMovies(
    numMovies: number = 1,
    differentFrom: string = null,
  ): Promise<Movie[]> {
    try {
      const metadata = await this.getMetadata(null, numMovies, differentFrom)
      const posters = await Promise.all(
        metadata.map(async (m) => await this.getPoster(m.imdbId)),
      )

      return metadata.map((m, i) => {
        return {
          imdbId: m.imdbId,
          title: m.title,
          releaseYear: m.releaseYear,
          posterPath: posters[i].posterPath,
        }
      })
    } catch (error) {
      Utils.handleError(error)
    }
  }

  private async getPoster(imdbId: string): Promise<Movie> {
    const posterUrl = Utils.buildPosterServiceURL(imdbId)
    const posterResponse = await axios.get(posterUrl)
    return Utils.extractDataFromPosterResponse(posterResponse)
  }

  private async getMetadata(
    imdbId: string = null,
    numMovies: number = 1,
    differentFrom: string = null,
  ): Promise<Movie[]> {
    const metadataUrl = Utils.buildMetadataServiceURL(imdbId, numMovies, differentFrom);
    const metadataResponse = await axios.get(metadataUrl)
    return Utils.extractDataFromMetadataResponse(metadataResponse)
  }
}
