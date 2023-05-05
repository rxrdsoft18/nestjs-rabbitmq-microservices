import { Injectable } from '@nestjs/common';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getRmqOptions(queue: string, noAck = false): RmqOptions {
    const RABBITMQ_URI = this.configService.get('RABBITMQ_URI');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URI],
        noAck,
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
