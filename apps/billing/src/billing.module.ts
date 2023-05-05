import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { AUTH_SERVICE, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env',
      validationSchema: Joi.object({
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
    RmqModule,
    RmqModule.register({ name: AUTH_SERVICE }),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
