import { prop, DocumentType } from '@typegoose/typegoose';
import { BaseSchema } from '../../../utils/mongoose/base.schema';

export class UserSchema extends BaseSchema {
  @prop({ type: String, required: true })
  first_name: string;

  @prop({ type: String, required: true })
  last_name: string;

  @prop({ type: String, required: true, unique: true })
  email: string;

  @prop({ type: String, required: true })
  avatar: string;

  @prop({ type: String, required: true, unique: true })
  accessToken: string;

  static get modelName() {
    return 'User';
  }
}

export type UserModel = DocumentType<UserSchema>;
