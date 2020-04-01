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
})
