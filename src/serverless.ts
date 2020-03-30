import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import serverless from 'aws-serverless-express';
import express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';

export async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  await app.init();
  return serverless.createServer(expressApp);
}

let cachedServer: Server;

export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
    return serverless.proxy(server, event, context);
  } else {
    return serverless.proxy(cachedServer, event, context);
  }
};
