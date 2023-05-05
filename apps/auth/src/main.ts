import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import { RmqOptions } from '@nestjs/microservices';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const error = validationErrors.map((item) => {
          return {
            [item.property]: Object.values(item.constraints),
          };
        });

        return new BadRequestException(error);
      },
    }),
  );

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getRmqOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
