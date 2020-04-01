import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../../src/app.module'

describe.skip('Movie Resolver (e2e)', () => {
  let app: INestApplication

  const MOVIE = {
    imdbId: 'tt2395427',
    title: 'Avengers: Age of Ultron',
    releaseYear: 2015,
    posterPath:
      'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie { imdbId title releaseYear posterPath }
        }
        `,
      })
      .expect(200)
      .then((response) => {
        const movie = response.body.data.movie
        expect(movie.imdbId).not.toBe(undefined)
        expect(movie.title).not.toBe(undefined)
        expect(movie.releaseYear).not.toBe(undefined)
        expect(movie.posterPath).not.toBe(undefined)

        expect(movie.randomMovies).toBe(undefined)
      })
  })

  it('should return a specific movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie(imdbId: "tt2395427") { imdbId title releaseYear posterPath }
        }
        `,
      })
      .expect(200)
      .then((response) => {
        const movie = response.body.data.movie
        expect(movie.imdbId).toBe(MOVIE.imdbId)
        expect(movie.title).toBe(MOVIE.title)
        expect(movie.releaseYear).toBe(MOVIE.releaseYear)
        expect(movie.posterPath).toBe(MOVIE.posterPath)

        expect(movie.randomMovies).toBe(undefined)
      })
  })

  it('should return a specific movie with one random movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie(imdbId: "tt2395427") {
            imdbId title releaseYear posterPath
            randomMovies {
              imdbId title releaseYear posterPath
            }
          }
        }
        `,
      })
      .expect(200)
      .then((response) => {
        const movie = response.body.data.movie
        expect(movie.imdbId).toBe(MOVIE.imdbId)
        expect(movie.title).toBe(MOVIE.title)
        expect(movie.releaseYear).toBe(MOVIE.releaseYear)
        expect(movie.posterPath).toBe(MOVIE.posterPath)

        expect(movie.randomMovies.length).toBe(1)

        const randomMovie = movie.randomMovies[0]
        expect(randomMovie.imdbId).not.toBe(MOVIE.imdbId)
        expect(randomMovie.title).not.toBe(MOVIE.title)
        expect(randomMovie.releaseYear).not.toBe(MOVIE.releaseYear)
        expect(randomMovie.posterPath).not.toBe(MOVIE.posterPath)
      })
  })

  it('should return a specific movie with two random movies', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie(imdbId: "tt2395427") {
            imdbId title releaseYear posterPath
            randomMovies(num: 2) {imdbId title releaseYear posterPath}
          }
        }
        `,
      })
      .expect(200)
      .then((response) => {
        const movie = response.body.data.movie
        expect(movie.imdbId).toBe(MOVIE.imdbId)
        expect(movie.title).toBe(MOVIE.title)
        expect(movie.releaseYear).toBe(MOVIE.releaseYear)
        expect(movie.posterPath).toBe(MOVIE.posterPath)

        expect(movie.randomMovies.length).toBe(2)

        let randomMovie = movie.randomMovies[0]
        expect(randomMovie.imdbId).not.toBe(MOVIE.imdbId)
        expect(randomMovie.title).not.toBe(MOVIE.title)
        expect(randomMovie.releaseYear).not.toBe(MOVIE.releaseYear)
        expect(randomMovie.posterPath).not.toBe(MOVIE.posterPath)

        randomMovie = movie.randomMovies[1]
        expect(randomMovie.imdbId).not.toBe(MOVIE.imdbId)
        expect(randomMovie.title).not.toBe(MOVIE.title)
        expect(randomMovie.releaseYear).not.toBe(MOVIE.releaseYear)
        expect(randomMovie.posterPath).not.toBe(MOVIE.posterPath)
      })
  })
})
