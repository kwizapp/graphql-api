# kwiz nest-api

This API uses the metadata and poster service to provide the ionic client with movie posters and metadata.

## Environment Variables

- create a `.env` file based on `.env.template`
- specify the `METADATA_SERVICE_URL` and `POSTER_SERVICE_URL`

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

The `nest-api` provides the following requests to fetch a poster and metadata about a movie.

All requests should be made to the `/graphql` endpoint (e.g., `http://localhost:3000/graphql`).

### Fetching a specific movie

| Parameter | Type     | Description                                                                                         |
| :-------- | :------- | :-------------------------------------------------------------------------------------------------- |
| `imdbId`  | `string` | IMDb ID, uniquely identifies a movie. The service will return the poster and metadata of the movie. |

**Example**

Request:

```
query {
  movie(imdbId: "tt1431045") {imdbId title releaseYear posterPath}
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
      "posterPath": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    }
  }
}
```

### Fetching a random movie

**Example**

Request:

```
query {
  movie() {imdbId title releaseYear posterPath}
}
```
Response:

```json
{
  "data": {
    "movie": {
      "imdbId": "tt0076759",
      "title": "Star Wars",
      "releaseYear": 1977,
      "posterPath": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
    }
  }
}
```
