import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { Session, mysqlDataSource } from './schemas';
import 'dotenv/config';
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from 'http-proxy-middleware';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.setGlobalPrefix('api');
  // app.use(
  //   'api',
  //   createProxyMiddleware({
  //     target: 'http://www.example.org',
  //     changeOrigin: true,
  //   }),
  // );
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 3600000 * 24,
      },
      store: new TypeormStore({}).connect(
        mysqlDataSource.getRepository(Session),
      ),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Uncomment these lines to use the Redis adapter:
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  try {
    await app.listen(PORT, () => console.log(`listening on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
