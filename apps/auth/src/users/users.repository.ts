import { BaseAbstractRepository } from '@app/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UsersRepository extends BaseAbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel, null);
  }
}
