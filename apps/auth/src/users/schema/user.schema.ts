import { AbstractDocumentSchema } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'users' })
export class User extends AbstractDocumentSchema {
  @Prop()
  email: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
