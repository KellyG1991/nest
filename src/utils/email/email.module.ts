import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import email from './config/email';
import { EmailService } from './email.service';

@Module( {
    imports: [ ConfigModule.forFeature( email ) ],
    providers: [ EmailService, ConfigService ],
    exports: [ EmailService ],
} )
export class EmailModule { }
