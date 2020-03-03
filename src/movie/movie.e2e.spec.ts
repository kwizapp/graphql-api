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
            name
            votes
          }
        }
        `,
      })
      .expect(200, {
        data: {
          movies: [
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
          ],
        },
      })
  })

  it('should return a specific movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          movie(index: 0) {
            id
            name
            votes
          }
        }
        `,
      })
      .expect(200, {
        data: {
          movie: {
            id: 'm1',
            name: 'Terminator',
            votes: 0,
          },
        },
      })
  })

  it('should upvote a movie', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          upVoteMovie(movieId: "m1") {
            id
            name
            votes
          }
        }
        `,
      })
      .expect(200, {
        data: {
          upVoteMovie: {
            id: 'm1',
            name: 'Terminator',
            votes: 1,
          },
        },
      })
  })
})
