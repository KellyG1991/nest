import { Module } from '@nestjs/common';
import { ModelModule } from './model/model.module';
import { GoogleModule } from '../utils/google/google.module';
import { UserController } from './user.controller';
// import { UserService } from './model/user.service';

@Module({
  imports: [ModelModule, GoogleModule],
  controllers: [UserController],
})
export class UserModule {}
