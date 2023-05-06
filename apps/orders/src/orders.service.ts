import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto, authentication: string) {
    const session = await this.orderRepository.startTransaction();
    try {
      const orderCreated = await this.orderRepository.create(createOrderDto);

      this.billingClient.emit('order_created', {
        orderCreated,
        Authentication: authentication,
      });

      await session.commitTransaction();
      return orderCreated;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    }
  }

  getOrders() {
    return this.orderRepository.find({});
  }
}
