require('dotenv').config()

import * as Utils from '../../src/movie/movie.utils'
import { Movie } from 'src/graphql'

describe('MovieUtils', () => {
  const POSTER_SERVICE = process.env.POSTER_SERVICE_URL
  const METADATA_SERVICE = process.env.METADATA_SERVICE_URL

  it('should build the poster service url given a specific imdb id', async () => {
    expect(Utils.buildPosterServiceURL('tt2395427')).toBe(
      `${POSTER_SERVICE}?id=tt2395427`,
    )
  })

  it('should build the metadata service url that returns data for a random movie (default)', async () => {
    expect(Utils.buildMetadataServiceURL()).toBe(`${METADATA_SERVICE}`)
  })

  it('should build the metadata service url that returns data for three random movies', async () => {
    expect(Utils.buildMetadataServiceURL(null, 2)).toBe(
      `${METADATA_SERVICE}?numMovies=2`,
    )
  })

  it('should build the metadata service url that returns data for three random movies where a specific movie may not be included', async () => {
    expect(Utils.buildMetadataServiceURL(null, 3, 'tt3450958')).toBe(
      `${METADATA_SERVICE}?numMovies=3&differentFrom=tt3450958`,
    )
  })

  it('should build the metadata service url that returns data for a specific movie', async () => {
    expect(Utils.buildMetadataServiceURL('tt2395427')).toBe(
      `${METADATA_SERVICE}?imdbId=tt2395427`,
    )
  })

  it('should build the metadata service url that returns data for a specific movie (even multiple ones are requested)', async () => {
    expect(Utils.buildMetadataServiceURL('tt2395427', 4)).toBe(
      `${METADATA_SERVICE}?imdbId=tt2395427`,
    )
  })

  it('should build the metadata service url that returns data for a specific movie (even multiple ones are requested) but not the specified one', async () => {
    expect(Utils.buildMetadataServiceURL('tt2395427', 4, 'tt3450958')).toBe(
      `${METADATA_SERVICE}?imdbId=tt2395427&differentFrom=tt3450958`,
    )
  })

  it('should extract data from metadata response', async () => {
    const response = {
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-length': '983',
        date: 'Mon, 23 Mar 2020 09:28:08 GMT',
        connection: 'close',
      },
      // ...
      // and a lot of other stuff
      // ...
      data: [
        {
          imdb_id: 'tt2395427',
          budget: '280000000',
          homepage: 'http://marvel.com/movies/movie/193/avengers_age_of_ultron',
          original_language: 'en',
          original_title: 'Avengers: Age of Ultron',
          overview:
            'When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.',
          popularity: 37.37942,
          poster_path: '/t90Y3G8UGQp0f0DrP60wRu9gfrH.jpg',
          release_date: '2015-04-22',
          revenue: 1405403694,
          runtime: 141,
          status: 'Released',
          tagline: 'A New Age Has Come.',
          title: 'Avengers: Age of Ultron',
          video: false,
          vote_average: 7.3,
          vote_count: 6908,
          release_year: '2015',
          date_segment: '2',
          omdb_consistent: true,
        },
      ],
    }

    const expected: Movie = {
      imdbId: 'tt2395427',
      title: 'Avengers: Age of Ultron',
      releaseYear: 2015,
      posterPath: '',
    }
    const actual: Movie = Utils.extractDataFromMetadataResponse(response)[0]

    expect(actual).toStrictEqual(expected)
  })

  it('should extract data from poster response', async () => {
    const response = {
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-length': '148',
        date: 'Mon, 23 Mar 2020 09:28:08 GMT',
        connection: 'close',
      },
      // ...
      // and a lot of other stuff
      // ...
      data: {
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
      },
    }

    const expected: Movie = {
      imdbId: '',
      title: '',
      releaseYear: 0,
      posterPath:
        'https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg',
    }
    const actual: Movie = Utils.extractDataFromPosterResponse(response)

    expect(actual).toStrictEqual(expected)
  })
})
