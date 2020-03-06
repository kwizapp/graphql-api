import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'

/**
 * Define a script that generates the Typescript typings on demand
 * from all schemas present in the project.
 */
const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  watch: !!process.env.WATCH_MODE,
})
