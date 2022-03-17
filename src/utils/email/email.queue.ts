import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';

import { EmailOptions } from './utils/type';
import { EmailService } from './email.service';
import { EMAIL_QUEUE_NAME } from './email.contant';

@Processor(EMAIL_QUEUE_NAME)
export class EmailQueue {
    constructor(private readonly emailService: EmailService) {}

    @Process()
    async sendEmail(job: Job<EmailOptions>) {
        await this.emailService.send(job.data);
    }
}
