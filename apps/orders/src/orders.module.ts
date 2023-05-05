import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OrdersRepository } from './orders.repository';
import { Order, OrderSchema } from './schemas/order.schema';
import { AUTH_SERVICE, BILLING_SERVICE } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/orders/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    RmqModule.register({ name: BILLING_SERVICE }),
    RmqModule.register({ name: AUTH_SERVICE }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
