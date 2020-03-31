import { ScoreService } from '../../src/score/score.service'

describe('ScoreService', () => {
  let scoreService: ScoreService

  const movie = {
    imdbId: 'tt1431045',
    title: 'Deadpool',
    releaseYear: 2016,
    posterPath:
      'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  }
  beforeEach(() => {
    scoreService = new ScoreService()
  })

  it('should return zero points for icorrect answer (lose one life)', async () => {
    const result = await scoreService.scoreTitleResponse('Spiderman', 8, movie)
    expect(result).toBe(0)
  })

  it('should return 50 points for correct answer and 0 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 0, movie)
    expect(result).toBe(50)
  })

  it('should return 150 points for correct answer and 1 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 1, movie)
    expect(result).toBe(150)
  })

  it('should return 950 points for correct answer and 9 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 9, movie)
    expect(result).toBe(950)
  })

  it('should return 1300 points for correct answer and 10 seconds left', async () => {
    const result = await scoreService.scoreTitleResponse('Deadpool', 10, movie)
    expect(result).toBe(1300)
  })
})
