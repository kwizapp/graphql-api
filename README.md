# kwiz nest-api

This API uses the metadata and poster service to provide the ionic client with movie posters and metadata.

## Environment Variables

- create a `.env` file based on `.env.template`
- specify the `METADATA_SERVICE_URL` and `POSTER_SERVICE_URL` (do not add a trailing `/` if you want the tests to pass)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API

The `nest-api` provides the following requests to:

- Fetch metadata and the poster of a random movie
- Fetch metadata and the poster of a specific movie
- Optionally, get n random movies different from the random/specific movie
- Score a "poster guessing" question
- Score a "bonus" question

All requests should be made to the `/graphql` endpoint (e.g., `http://localhost:3000/graphql`).

### Fetching a specific or random movie

| Parameter              | Type      | Default | Description                                                                                                  |
| :--------------------- | :-------- | :------ | :----------------------------------------------------------------------------------------------------------- |
| `imdbId`               | `string`  | `-`     | Optional. IMDb ID, uniquely identifies a movie.                                                              |
| `randomMovies`         | `field`   | `-`     | Optional. Specifies that one or multiple additional random movie(s) should be returned.                      |
| `num`                  | `int`     | `1`     | Optional. Specifies how many additional random movies should be returned.                                    |
| `differentReleaseYear` | `boolean` | `false` | Optional. Specifies whether the random movie(s) should have a different release year than the specified one. |

_Note:_

- _If `imdbId` is used, a specific movie is returned. If the parameter is not added, a random movie is returned._
- _If `randomMovies` is added but no `num` is specified, one additional random movie is returned. `randomMovies` can completely be omitted, so that no additional random moves are returned._
- _If `differentReleaseYear` is added but no `imdbId` is specified, `differentReleaseYear` will not be considered._

**Example**

Request:

```
query {
  movie(imdbId: "tt1431045") {
    imdbId title releaseYear posterPath
    randomMovies(num: 3, differentReleaseYear: true) { imdbId title releaseYear posterPath }
  }
}
```

Response:

```json
{
  "data": {
    "movie": {
      "imdbId": "tt1431045",
      "title": "Deadpool",
      "releaseYear": 2016,
      "posterPath": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      "randomMovies": [
        {
          "imdbId": "tt1318514",
          "title": "Rise of the Planet of the Apes",
          "releaseYear": 2011,
          "posterPath": "https://m.media-amazon.com/images/M/MV5BYzE3ZmNlZTctMDdmNy00MjMzLWFmZmYtN2M5N2YyYTQ1ZDJjXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
          "imdbId": "tt0076759",
          "title": "Star Wars",
          "releaseYear": 1977,
          "posterPath": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        },
        {
          "imdbId": "tt3896198",
          "title": "Guardians of the Galaxy Vol. 2",
          "releaseYear": 2017,
          "posterPath": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
        }
      ]
    }
  }
}
```

### Get scores for a "poster guessing" question

| Parameter          | Type     | Description                                                                                 |
| :----------------- | :------- | :------------------------------------------------------------------------------------------ |
| `imdbId`           | `string` | IMDb ID, uniquely identifies a movie. This is the id of the blurred poster that was shown.  |
| `selectedTitle`    | `string` | The title that was selected as the answer.                                                  |
| `remainingSeconds` | `int`    | The number of remaining seconds when the player tapped the screen to guess the movie title. |

**Example**

Request:

```
query {
  scoreTitleResponse(
    imdbId: "tt1431045",
    selectedTitle: "Deadpool",
    remainingSeconds: 5
  )
}
```

Response:

If the player scores zero points, the answer is incorrect and therefore one life is deducted.

```json
{
  "data": {
    "scoreTitleResponse": 500
  }
}
```

### Get scores for a "bonus" question

| Parameter             | Type       | Description                                                                           |
| :-------------------- | :--------- | :------------------------------------------------------------------------------------ |
| `imdbIds`             | `[string]` | IMDb IDs, uniquely identifying movies. Ordered by release year in increasing order.\* |
| `titleQuestionScores` | `int`      | The points scored in the "poster guessing" question.                                   |

\* This means that the player choses the order of the movie releases. The `imdbId`s are then sent to the API in this order. The API then checks whether they are sorted by their release years in increasing order.

**Example**

Request:

```
query {
  scoreBonusResponse(
    imdbIds: ["tt0145487", "tt0468569", "tt1431045"],
    titleQuestionScores: 350
  )
}
```

Response:

If the answer is correct, the points are doubled. If the answer is incorrect, no points are awarded.

```json
{
  "data": {
    "scoreBonusResponse": 700
  }
}
```
