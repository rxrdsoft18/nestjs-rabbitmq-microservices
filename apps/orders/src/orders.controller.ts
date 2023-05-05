import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    return this.ordersService.createOrder(
      createOrderDto,
      req.cookies?.Authentication,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
