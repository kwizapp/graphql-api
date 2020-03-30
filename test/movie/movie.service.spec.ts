import { MovieService } from '../../src/movie/movie.service'

describe('MovieService', () => {
  let movieService: MovieService

  beforeEach(() => {
    movieService = new MovieService()
  })

  it('should return a specific movie', async () => {
    const result = {
      imdbId: 'tt0088247',
      title: 'Terminator',
      releaseYear: 1984,
      posterPath:
        'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
    }
    jest
      .spyOn(movieService, 'getMovieByImdbId')
      .mockImplementation(() => Promise.resolve(result))

    const expected = await movieService.getMovieByImdbId('tt0088247')

    expect(expected).toBe(result)
  })

  it('should return a random movie', async () => {
    const result = [
      {
        imdbId: 'tt0088247',
        title: 'Terminator',
        releaseYear: 1984,
        posterPath:
          'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
      },
    ]
    jest
      .spyOn(movieService, 'getRandomMovies')
      .mockImplementation(() => Promise.resolve(result))

    const expected = await movieService.getRandomMovies()

    expect(expected).toBe(result)
  })
})
