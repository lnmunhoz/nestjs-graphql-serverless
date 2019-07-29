import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppResolver, AppService } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const schemaModuleOptions: Partial<GqlModuleOptions> = {};

        // If we are in development, we want to generate the schema.graphql
        if (process.env.NODE_ENV !== 'production' || process.env.IS_OFFLINE) {
          schemaModuleOptions.autoSchemaFile = 'src/schema.gql';
        } else {
          // For production, the file should be generated
          schemaModuleOptions.typePaths = ['dist/*.gql'];
        }

        return {
          context: ({ req }) => ({ req }),
          transformSchema: schema => {
            if (
              process.env.NODE_ENV === 'production' &&
              !process.env.IS_OFFLINE
            ) {
              const traceResolvers = require('@lifeomic/graphql-resolvers-xray-tracing');
              traceResolvers(schema);
            }

            return schema;
          },
          playground: true, // Allow playground in production
          introspection: true, // Allow introspection in production
          ...schemaModuleOptions,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
