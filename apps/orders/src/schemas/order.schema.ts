import { AbstractDocumentSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'orders' })
export class Order extends AbstractDocumentSchema {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
