import { Types } from 'mongoose';

export interface UserInterface {
  _id: Types.ObjectId;
  email: string;
}
