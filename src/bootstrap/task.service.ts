import { tmpdir } from 'os';
import { statSync, unlinkSync } from 'fs';

import ms from 'ms';
import debug from 'debug';
import { sync } from 'glob';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';


const print = debug('development:bootstrap.task.service');

@Injectable()
export class TaskService {
   
    @Cron(CronExpression.EVERY_HOUR)
    async aTask() {}
}
