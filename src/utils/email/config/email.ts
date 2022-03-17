import { join } from 'path';

import { registerAs } from '@nestjs/config';
import { BullModuleOptions } from '@nestjs/bull';

import { EmailConfig } from '../utils/type';

export default registerAs( 'email', () => ( {
    config: {
        message: {
            from: process.env.EMAIL_FROM || 'test@example.org',
        },
        views: {
            root: join( process.cwd(), 'emails' ),
        },
        send: !!~[ 'false', false ].indexOf( process.env.EMAIL_DRY_RUN ),
        preview: !!~[ 'true', true ].indexOf( process.env.EMAIL_PREVIEW ),
        transport: {
            host: process.env.EMAIL_HOST,
            port: +process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASS,
            },
        },
        juice: true,
        juiceResources: {
            preserveImportant: true,
            webResources: {
                relativeTo: join( process.cwd(), 'email' ),
                images: true,
                svgs: true,
            },
        },
    } as EmailConfig,
    queue: {
        redis: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_GUEST_PORT || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
            db: +( process.env.REDIS_DB || 0 ),
        },
        processors: [],
    } as BullModuleOptions,
} ) );
