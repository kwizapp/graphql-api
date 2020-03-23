import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../../src/app.module'

describe('Movie Resolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // TODO: how to properly test this?
  it('should return a specific movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie(imdbId: "tt2395427") {imdbId title releaseYear posterPath}
        }
        `,
      })
      .expect(200, {
        data: {
          movie: {
            imdbId: 'tt2395427',
            title: 'Avengers: Age of Ultron',
            releaseYear: 2015,
            posterPath:
              'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
          },
        },
      })
  })
})
