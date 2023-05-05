import { Prop, Schema } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';

@Schema()
export class AbstractDocumentSchema {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
