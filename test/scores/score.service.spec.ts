import { ScoreService } from '../../src/score/score.service'

describe('ScoreService', () => {
  let scoreService: ScoreService

  const movie1 = {
    imdbId: 'tt1431045',
    title: 'Deadpool',
    releaseYear: 2016,
    posterPath:
      'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  }

  const movie2 = {
    imdbId: 'tt0468569',
    title: 'The Dark Knight',
    releaseYear: 2008,
    posterPath:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
  }

  const movie3 = {
    imdbId: 'tt0145487',
    title: 'Spider-Man',
    releaseYear: 2002,
    posterPath:
      'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
  }

  beforeEach(() => {
    scoreService = new ScoreService()
  })

  /***********************************************************************************************/
  /* scoreTitleResponse                                                                          */
  /***********************************************************************************************/

  it('should return zero points for icorrect answer (lose one life)', async () => {
    const result = await scoreService.scoreTitleResponse(
      'Spider-Man',
      8,
      movie1,
    )
    expect(result).toBe(0)
  })

  it('should return 50 points for correct answer and 0 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 0, movie1)
    expect(result).toBe(50)
  })

  it('should return 150 points for correct answer and 1 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 1, movie1)
    expect(result).toBe(150)
  })

  it('should return 950 points for correct answer and 9 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 9, movie1)
    expect(result).toBe(950)
  })

  it('should return 1300 points for correct answer and 10 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 10, movie1)
    expect(result).toBe(1300)
  })

  /***********************************************************************************************/
  /* scoreBonusResponse                                                                          */
  /***********************************************************************************************/

  it('should return zero points for icorrect answer 1', async () => {
    const result = await scoreService.scoreBonusResponse(
      [movie1, movie2, movie3],
      100,
    )
    expect(result).toBe(0)
  })

  it('should return zero points for icorrect answer 2', async () => {
    const result = await scoreService.scoreBonusResponse(
      [movie3, movie1, movie2],
      100,
    )
    expect(result).toBe(0)
  })

  it('should return doubled points for correct answer', async () => {
    const result = await scoreService.scoreBonusResponse(
      [movie3, movie2, movie1],
      100,
    )
    expect(result).toBe(200)
  })
})
