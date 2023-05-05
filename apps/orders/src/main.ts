import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());

  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
