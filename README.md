# NestJS GraphQL Serverless

Boilerplate for using NestJS with GraphQL (Code-First) on serverless environment (AWS Lambda)
Follow the discussion: https://github.com/nestjs/docs.nestjs.com/issues/96

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# serverless-offline
$ npm run start:sls

# deploy
$ npm run deploy:sls
```

## Note GraphQL Playground

When your function is deployed, you can access `<lambda-url>/dev/graphql` to test with the playground, make sure that your GraphQL Playground
points to `<lambda-url>/dev/graphql` instead of `<lambda-url>/graphql`, otherwise you'll get `403 Forbidden` response.

## License

MIT
