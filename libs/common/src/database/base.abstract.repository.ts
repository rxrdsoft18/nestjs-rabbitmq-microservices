import { Logger } from '@nestjs/common';
import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocumentSchema } from './abstract.document.schema';

export abstract class BaseAbstractRepository<T extends AbstractDocumentSchema> {
  protected abstract readonly logger: Logger;

  protected constructor(
    protected readonly model: Model<T>,
    private readonly connection: Connection,
  ) {}

  async create(document: Omit<T, '_id'>, options?: SaveOptions): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save(options)).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filterQuery, {}, { lean: true });
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
  }

  async upsert(filterQuery: FilterQuery<T>, document: Partial<T>) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<T>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
