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

if (process.env.NODE_ENV === 'production') {
  const xray = require('aws-xray-sdk-core');
  // Allow X-Ray to track execution through API API calls
  xray.captureAWS(require('aws-sdk'));
  // Allow X-Ray to track execution through external API calls
  xray.captureHTTPsGlobal(require('http'));
  // Allow X-Ray to track execution when Promises are used
  xray.capturePromise();
}

export const handler: Handler = (event: any, context: Context) => {
  if (!cachedServer) {
    bootstrap().then(server => {
      cachedServer = server;
      return serverless.proxy(server, event, context);
    });
  } else {
    return serverless.proxy(cachedServer, event, context);
  }
};
