import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HealthModule } from './health/health.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggingMiddleware } from './logging.middleware';
import { ApolloServer } from 'apollo-server-express';

const BASIC_LOGGING = {
  requestDidStart(requestContext) {
    console.log('request started');
    console.log(requestContext.request.query);
    console.log(requestContext.request.variables);
    return {
      didEncounterErrors(requestContext) {
        console.log(
          'an error happened in response to query ' +
            requestContext.request.query,
        );
        console.log(requestContext.errors);
      },
    };
  },

  willSendResponse(requestContext) {
    console.log('response sent', requestContext.response);
  },
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [BASIC_LOGGING],
    }),
    HealthModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly apolloServer: ApolloServer) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  async onModuleDestroy() {
    console.log('Shutting down...');
    await this.apolloServer.stop();
    console.log('Apollo Server stopped.');
  }
}
