import { Movie } from 'src/graphql'

export const extractDataFromMetadataResponse = (response): Movie => {
  const movie = response.data[0]

  return {
    imdbId: movie.imdb_id,
    title: movie.title,
    releaseYear: parseInt(movie.release_year),
    posterPath: '',
  }
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
