import { ConfigModule } from '@nestjs/config';
import { Module, HttpModule } from '@nestjs/common';

import app from './config/app';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { DatabaseModule } from './database/database.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';

@Module({
    imports: [
        UserModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [app],
            envFilePath: process.env.NODE_ENV_FILE_PATH || '.env',
            expandVariables: true,
        }),
        UtilsModule,
        HttpModule,
        AuthModule,
        BootstrapModule,
    ],
})
export class AppModule {}
