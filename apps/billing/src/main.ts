import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get(RmqService);
  app.connectMicroservice(rmqService.getRmqOptions('BILLING'));

  await app.startAllMicroservices();
}
bootstrap();
