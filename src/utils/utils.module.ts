import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MomentService } from './moment/moment.service';
import { ValidationModule } from './validation/validation.module';
import { GoogleModule } from './google/google.module';
import { WinstonModule as OriginalWinstonModule } from 'nest-winston';
import { WinstonConfigService } from './logger/winston-config.service';
import { SlackTransportProvider } from './logger/slack.provider';
import { WinstonModule } from './logger/winston.module';
import { HttpExceptionFilter } from './filters/http/exceptions.filter';

@Module({
  imports: [
    ValidationModule,
    GoogleModule,
    OriginalWinstonModule.forRootAsync({
      imports: [WinstonModule],
      useClass: WinstonConfigService,
      inject: [ConfigService, SlackTransportProvider],
    }),
  ],
  providers: [
    MomentService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class UtilsModule {}
