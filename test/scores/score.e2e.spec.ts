import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../../src/app.module'

describe.skip('Score Resolver (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  /***********************************************************************************************/
  /* scoreTitleResponse                                                                          */
  /***********************************************************************************************/

  it('should return 0 points (lose one life)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          scoreTitleResponse(
            imdbId: "tt0110357",
            selectedTitle: "Toy Story",
            remainingSeconds: 4
          )
        }
        `,
      })
      .expect(200, {
        data: {
          scoreTitleResponse: 0,
        },
      })
  })

  it('should return 850 points', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          scoreTitleResponse(
            imdbId: "tt0110357",
            selectedTitle: "The Lion King",
            remainingSeconds: 8
          )
        }
        `,
      })
      .expect(200, {
        data: {
          scoreTitleResponse: 850,
        },
      })
  })

  /***********************************************************************************************/
  /* scoreBonusResponse                                                                          */
  /***********************************************************************************************/
  // tt1431045 - 2016 - Deadpool
  // tt0468569 - 2008 - The Dark Knight
  // tt0145487 - 2002 - Spider-Man

  it('should return zero points', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          scoreBonusResponse(
            imdbIds: ["tt0145487", "tt1431045", "tt0468569"],
            titleQuestionScores: 250
          )
        }
        `,
      })
      .expect(200, {
        data: {
          scoreBonusResponse: 0,
        },
      })
  })

  it('should return doubled points', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          scoreBonusResponse(
            imdbIds: ["tt0145487", "tt0468569", "tt1431045"],
            titleQuestionScores: 350
          )
        }
        `,
      })
      .expect(200, {
        data: {
          scoreBonusResponse: 700,
        },
      })
  })
})
