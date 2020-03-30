import { Movie } from 'src/graphql'

export const buildPosterServiceURL = (imdbId: string): string => {
  return `${process.env.POSTER_SERVICE_URL}?id=${imdbId}`
}

export const buildMetadataServiceURL = (
  imdbId: string = null,
  numMovies: number = 1,
  differentFrom: string = null,
): string => {
  let metadataUrl = `${process.env.METADATA_SERVICE_URL}`
  if (imdbId) {
    // get metadata of the specified movie
    metadataUrl += `?imdbId=${imdbId}`
  } else if (numMovies > 1) {
    // get metadata of `numMovies` random movies
    metadataUrl += `?numMovies=${numMovies}`
  }

  // the returned movie(s) should not include the movie with imdbId `differentFrom`
  if (differentFrom) {
    metadataUrl += metadataUrl.indexOf('?') === -1 ? '?' : '&'
    metadataUrl += `differentFrom=${differentFrom}`
  }

  return metadataUrl
}

export const extractDataFromMetadataResponse = (response): Movie[] => {
  return response.data.map((movie) => {
    return {
      imdbId: movie.imdb_id,
      title: movie.title,
      releaseYear: parseInt(movie.release_year),
      posterPath: '',
    }
  })
}

export const extractDataFromPosterResponse = (response): Movie => {
  return {
    imdbId: '',
    title: '',
    releaseYear: 0,
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
