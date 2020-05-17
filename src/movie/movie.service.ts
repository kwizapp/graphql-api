import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { Movie } from '../graphql'
import * as Utils from './movie.utils'

/**
 * The `MovieService` is responsible to query both the `PosterService` and the
 * `MetadataService` to provide information about specific or random movies.
 */
@Injectable()
export class MovieService {
  METADATA_SERVICE = process.env.METADATA_SERVICE_URL
  POSTER_SERVICE = process.env.POSTER_SERVICE_URL

  /**
   * Fetch the URL to the poster of the specified movie and some metadata.
   * 
   * @param imdbId - The IMDb ID of the movie to fetch
   */
  async getMovieByImdbId(imdbId: string): Promise<Movie> {
    try {
      const metadata = (await this.getMetadata(imdbId))[0]
      const poster = await this.getPoster(imdbId)

      return {
        imdbId: imdbId,
        title: metadata.title,
        releaseYear: metadata.releaseYear,
        posterPath: poster.posterPath,
        budget: metadata.budget,
        revenue: metadata.revenue,
        popularity: metadata.popularity,
      }
    } catch (error) {
      Utils.handleError(error)
    }
  }

  /**
   * Fetch information about `numMovies` random movies (i.e. their URL to the
   * movie poster and some metadata like the title, budget or release year.)
   * 
   * @param numMovies - The number of random movies to fetch (default: 1).
   * @param differentFrom - An optional IMDb ID of a movie that should not
   *                        be returned.
   * @param differentReleaseYear - An optional year in which non of the
   *                               returned movies should be released in.
   */
  async getRandomMovies(
    numMovies: number = 1,
    differentFrom: string = null,
    differentReleaseYear: number = 0,
  ): Promise<Movie[]> {
    try {
      const metadata = await this.getMetadata(
        null,
        numMovies,
        differentFrom,
        differentReleaseYear,
      )
      const posters = await Promise.all(
        metadata.map((m) => this.getPoster(m.imdbId)),
      )

      return metadata.map((m, i) => {
        return {
          imdbId: m.imdbId,
          title: m.title,
          releaseYear: m.releaseYear,
          posterPath: posters[i].posterPath,
          budget: m.budget,
          revenue: m.revenue,
          popularity: m.popularity,
        }
      })
    } catch (error) {
      Utils.handleError(error)
    }
  }

  /**
   * Fetch the URL to the movie poster of the specified movie.
   * 
   * @param imdbId - The IMDb ID of the movie to fetch the poster URL for.
   */
  private async getPoster(imdbId: string): Promise<Partial<Movie>> {
    const posterUrl = Utils.buildPosterServiceURL(imdbId)
    const posterResponse = await axios.get(posterUrl)
    return Utils.extractDataFromPosterResponse(posterResponse)
  }

  /**
   * Fetch metadata about a specific or one/multiple random movie(s) from
   * the `MetadataService`.
   * 
   * See `Utils.buildMetadataServiceURL` for the exact description of the
   * URL parameters.
   * 
   * @param imdbId - The IMDb ID of the movie to fetch.
   * @param numMovies - The number of random movies to return.
   * @param differentFrom - The IMDb ID of a movie that should not be returned.
   * @param differentReleaseYear - A year non of the returned movies should
   *                               be released in.
   */
  private async getMetadata(
    imdbId: string = null,
    numMovies: number = 1,
    differentFrom: string = null,
    differentReleaseYear: number = 0,
  ): Promise<Partial<Movie[]>> {
    const metadataUrl = Utils.buildMetadataServiceURL(
      imdbId,
      numMovies,
      differentFrom,
      differentReleaseYear,
    )
    const metadataResponse = await axios.get(metadataUrl)
    return Utils.extractDataFromMetadataResponse(metadataResponse)
  }
}
