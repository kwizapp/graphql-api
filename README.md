# nest-api

This API uses the metadata and poster service to provide the ionic client with movie posters and metadata through a GraphQL interface.

## Repository Structure

The source code can be found under `src` and the tests are located at `test`.

The `src/main.ts` file is the entry point to the application and starts Nest with the main module defined at `src/app.module.ts`. Every other module is located in a dedicated folder (`src/movie` and `src/score`). Those modules (`src/*/*.module.ts`) are responsible for accpeting and answering the GraphQl queries (`src/*/*.resolver.ts`). The logic of how the requests are answered (e.g, which data is fetched from the `metadata-servie` or the `poster-service` or how many points have been scored) is implemented by the respective services (`src/*/*.service.ts`).

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
$ npm run start
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
