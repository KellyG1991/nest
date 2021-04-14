import logger from './config/logger';
import { Module, HttpModule } from '@nestjs/common';
import { SlackTransportProvider } from './slack.provider';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(logger),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('logger.slack.baseUrl'),
    }),
  ],
  providers: [
    SlackTransportProvider,
    {
      provide: 'SLACK_CONFIG',
      useFactory: (configService: ConfigService) =>
        configService.get('logger.slack'),
      inject: [ConfigService],
    },
  ],
  exports: [SlackTransportProvider],
})
export class WinstonModule {}
