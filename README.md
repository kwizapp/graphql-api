# nest-api

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

Please consult the [wiki](https://github.com/kwizapp/kwiz/wiki/API-Reference#nest-api) for the API documentation and examples.
