import { Module } from '@nestjs/common';
import { UserSchema } from './schema/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchema.modelName,
        schema: UserSchema.buildSchema,
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class ModelModule {}
