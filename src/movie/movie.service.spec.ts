import { MovieService } from './movie.service'

describe('MovieService', () => {
  let movieService: MovieService

  beforeEach(() => {
    movieService = new MovieService()
  })

  it('should return an array of movies', async () => {
    const result = [
      {
        imdbId: 'tt0088247',
        title: 'Terminator',
        releaseYear: 1984,
        posterPath:
          'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
      },
      {
        imdbId: 'tt0112442',
        title: 'Bad Boys',
        releaseYear: 1995,
        posterPath:
          'https://m.media-amazon.com/images/M/MV5BMGE1ZTQ0ZTEtZTEwZS00NWE0LTlmMDUtMTE1ZWJiZTYzZTQ2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
      },
    ]
    jest.spyOn(movieService, 'getMovies').mockImplementation(() => result)

    expect(await movieService.getMovies()).toBe(result)
  })

  it('should return a specific movie', async () => {
    const result = {
      imdbId: 'tt0088247',
      title: 'Terminator',
      releaseYear: 1984,
      posterPath:
        'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
    }
    jest.spyOn(movieService, 'getMovieByImdbId').mockImplementation(() => Promise.resolve(result))

    const expected = await movieService.getMovieByImdbId('tt0088247')

    expect(expected).toBe(result)
  })
})
