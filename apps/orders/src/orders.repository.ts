import { Injectable, Logger } from '@nestjs/common';
import { BaseAbstractRepository } from '@app/common';
import { Order } from './schemas/order.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends BaseAbstractRepository<Order> {
  protected readonly logger = new Logger(OrdersRepository.name);

  constructor(
    @InjectModel(Order.name) private readonly repository: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    super(repository, connection);
  }
}
