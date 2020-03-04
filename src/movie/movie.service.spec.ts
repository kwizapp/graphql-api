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
        votes: 0,
      },
      {
        id: 'm2',
        name: 'Bad Boys',
        votes: 0,
      },
    ]
    jest.spyOn(movieService, 'getMovies').mockImplementation(() => result)

    expect(await movieService.getMovies()).toBe(result)
  })

  it('should return a specific movie', async () => {
    const result = {
      id: 'm2',
      name: 'Bad Boys',
      votes: 0,
    }
    jest.spyOn(movieService, 'getMovieByIndex').mockImplementation(() => result)

    const expected = await movieService.getMovieByIndex(0)

    expect(expected).toBe(result)
  })

  it('should add one vote to movie with id m1', async () => {
    const movieID = 'm1'
    const result = {
      id: 'm1',
      name: 'Terminator',
      votes: 1,
    }
    jest.spyOn(movieService, 'upVoteMovie').mockImplementation(() => result)

    const expected = await movieService.upVoteMovie(movieID)

    expect(expected).toBe(result)
  })
})
