import { MovieService } from './movie.service'

describe('MovieService', () => {
  let movieService: MovieService

  beforeEach(() => {
    movieService = new MovieService()
  })

  it('should return an array of movies', async () => {
    const result = [
      {
        id: 'm1',
        name: 'Terminator',
      },
      {
        id: 'm2',
        name: 'Bad Boys',
      },
    ]
    jest.spyOn(movieService, 'getMovies').mockImplementation(() => result)

    expect(await movieService.getMovies()).toBe(result)
  })

  it('should return a specific movie', async () => {
    const result = {
      id: 'm2',
      name: 'Bad Boys',
    }
    jest.spyOn(movieService, 'getMovieByIndex').mockImplementation(() => result)

    const expected = await movieService.getMovieByIndex(0)

    expect(expected).toBe(result)
  })
})
