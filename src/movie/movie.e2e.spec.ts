import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../app.module'

describe('Movie Resolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should return movies', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movies {
            id
            imdbId
            title
            releaseYear
            posterPath
          }
        }
        `,
      })
      .expect(200, {
        data: {
          movies: [
            {
              id: 'm1',
              imdbId: 'tt0088247',
              title: 'Terminator',
              releaseYear: 1984,
              posterPath:
                'https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
            },
            {
              id: 'm2',
              imdbId: 'tt0112442',
              title: 'Bad Boys',
              releaseYear: 1995,
              posterPath:
                'https://m.media-amazon.com/images/M/MV5BMGE1ZTQ0ZTEtZTEwZS00NWE0LTlmMDUtMTE1ZWJiZTYzZTQ2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
            },
          ],
        },
      })
  })

  // TODO: how to properly test this?
  it('should return a specific movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie(imdbId: "tt0112442") {
            id
            imdbId
            title
            releaseYear
            posterPath
          }
        }
        `,
      })
      .expect(200, {
        data: {
          movie: {
            id: 'm2',
            imdbId: 'tt0112442',
            title: 'Bad Boys',
            releaseYear: 1995,
            posterPath:
              'https://m.media-amazon.com/images/M/MV5BMGE1ZTQ0ZTEtZTEwZS00NWE0LTlmMDUtMTE1ZWJiZTYzZTQ2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
          },
        },
      })
  })
})
