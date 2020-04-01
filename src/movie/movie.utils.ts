import { Movie } from 'src/graphql'

export const buildPosterServiceURL = (imdbId: string): string => {
  const posterURL = new URL(`${process.env.POSTER_SERVICE_URL}`)
  posterURL.searchParams.append('id', imdbId)
  return posterURL.href
}

export const buildMetadataServiceURL = (
  imdbId: string = null,
  numMovies: number = 1,
  differentFrom: string = null,
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

  return metadataURL.href
}

export const extractDataFromMetadataResponse = (response): Partial<Movie[]> => {
  return response.data.map((movie) => {
    return {
      imdbId: movie.imdb_id,
      title: movie.title,
      releaseYear: parseInt(movie.release_year),
    }
  })
}

export const extractDataFromPosterResponse = (response): Partial<Movie> => {
  return {
    posterPath: response.data.poster,
  }
}

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
