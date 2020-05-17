import { Movie } from 'src/graphql'

/**
 * Given the IMDb ID of a movie, generate the respective URL to get the
 * poster URL from the `PosterService`.
 *
 * @param imdbId - The IMDb ID of the movie to fetch the poster URL for.
 */
export const buildPosterServiceURL = (imdbId: string): string => {
  const posterURL = new URL(`${process.env.POSTER_SERVICE_URL}`)
  posterURL.searchParams.append('id', imdbId)
  return posterURL.href
}

/**
 * Build the URL to get information about a specific or one/multiple random
 * movie(s) from the `MetadataService`.
 *
 * @param imdbId - The IMDb ID of the movie to fetch some metadata for.
 *                 This parameter is optional. If it is not supplied, one or
 *                 more random movies are returned.
 * @param numMovies - The number of random movies to return.
 *                    This parameter is optional and only considered if there
 *                    is no IMDb ID given. If this parameter is not supplied,
 *                    exactly one movie will be returned.
 * @param differentFrom - An optional IMDb ID specifying a movie that should not be
 *                        included in the returned movies. If it is not supplied,
 *                        any movies can be returned.
 * @param differentReleaseYear - An optional parameter specifying a year, in which
 *                               non of the returned movies should be released in.
 */
export const buildMetadataServiceURL = (
  imdbId: string = null,
  numMovies: number = 1,
  differentFrom: string = null,
  differentReleaseYear: number = 0,
): string => {
  const metadataURL = new URL(`${process.env.METADATA_SERVICE_URL}`)

  // get metadata of the specified movie
  imdbId && metadataURL.searchParams.append('imdbId', imdbId)

  // get metadata of `numMovies` random movies
  !imdbId &&
    numMovies > 1 &&
    metadataURL.searchParams.append('numMovies', `${numMovies}`)

  // the returned movie(s) should not include the movie with imdbId `differentFrom`
  differentFrom &&
    metadataURL.searchParams.append('differentFrom', `${differentFrom}`)

  // the returned movie(s) should not be released in the same year as specified with `differentReleaseYear`
  differentFrom &&
    differentReleaseYear &&
    metadataURL.searchParams.append('notReleasedIn', `${differentReleaseYear}`)

  return metadataURL.href
}

/**
 * Extract specific data of movies (e.g. their `title` and `releaseYear`) from the
 * response of the `MetadataService`.
 *
 * @param response - The response from the `MetadataService`.
 */
export const extractDataFromMetadataResponse = (response): Partial<Movie[]> => {
  return response.data.map((movie) => {
    return {
      imdbId: movie.imdb_id,
      title: movie.title,
      releaseYear: parseInt(movie.release_year),
      budget: parseInt(movie.budget),
      revenue: parseInt(movie.revenue),
      popularity: movie.popularity,
    }
  })
}

/**
 * Extract the `posterPath` from the response of the `PosterService`.
 *
 * @param response - The response from the `PosterService`.
 */
export const extractDataFromPosterResponse = (response): Partial<Movie> => {
  return {
    posterPath: response.data.poster,
  }
}

/**
 * Properly handle errors (e.g. thrown by requests to the `PosterService` or the
 * `MetadataService`).
 *
 * @param error - The error that was thrown.
 */
export const handleError = (error) => {
  if (error.response) {
    // request was made and the server responded with a status code that is not 2xx
    throw new Error(
      `Status: ${error.response.status}\nData: ${error.response.data}`,
    )
  } else if (error.req) {
    // request was made but no response was received
    throw new Error(`Request: ${error.response.request}`)
  } else {
    console.error(error)
    // something happened in setting up the request
    throw new Error('Error!!!')
  }
}
