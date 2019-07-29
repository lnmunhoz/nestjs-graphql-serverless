# NestJS GraphQL Serverless

Boilerplate for using NestJS with GraphQL (Code-First) on serverless environment (AWS Lambda)

Follow the discussion: https://github.com/nestjs/docs.nestjs.com/issues/96

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start:dev

# serverless-offline
$ yarn start:sls

# deploy
$ yarn deploy:sls
```

## Notes

### Developmet Workflow

There's two entrypoints for the server.

- `src/serverless` is where the `handler` function is exported for aws lambda
- `src/main` is for local development

You can develop your app using `yarn start:dev` command, which will run the local nodejs server and regenerate your `schema.gql` file
when update the resolvers.

For development with serverless-offline, you can run `yarn start:sls`.

### Deployment

When your function is deployed, you can access `<lambda-url>/dev/graphql` to test with the playground, make sure that your GraphQL Playground
points to `<lambda-url>/dev/graphql` instead of `<lambda-url>/graphql`, otherwise you'll get `403 Forbidden` response.

## License

MIT
