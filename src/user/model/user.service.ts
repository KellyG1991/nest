import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../../utils/mongoose/base.service';
import { UserSchema } from './schema/user.repository';
import { OnModuleInit } from '@nestjs/common';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { FawnTaskOptions } from '../../utils/transaction/types/task.type';
import { pick } from 'lodash';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class UserService
  extends BaseService<UserSchema>
  implements OnModuleInit {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(UserSchema.modelName)
    private readonly userModel: ReturnModelType<typeof UserSchema>,
  ) {
    super(userModel);
  }

  async onModuleInit() {
    // const caseCollection = this.connection.db.collection('users');
  }

  async createOne(
    userModel: UserSchema,
    options: { transaction?: FawnTaskOptions<UserSchema> },
  ): Promise<FawnTaskOptions<UserSchema>>;
  async createOne(userModel: UserSchema): Promise<DocumentType<UserSchema>>;
  async createOne(
    userModel: UserSchema,
    options?: { transaction?: FawnTaskOptions<UserSchema> },
  ): Promise<DocumentType<UserSchema> | FawnTaskOptions<UserSchema>> {
    const unique = pick(userModel, ['email']);

    userModel = Object.assign(userModel) as UserSchema;

    const caseObj = (await super.updateOne(
      unique,
      { $setOnInsert: userModel },
      { ...options, upsert: true, new: true },
    )) as any;

    return caseObj;
  }
}
