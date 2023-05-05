import { Controller, Get, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() payload: any, @Ctx() ctx: RmqContext) {
    this.billingService.bill(payload);
    this.rmqService.acknowledgeMessage(ctx);
  }
}
