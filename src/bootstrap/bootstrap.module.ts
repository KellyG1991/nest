import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { TaskService } from './task.service';
import { MiddlewareModule } from './middlewares/middleware.module';

@Module({
    imports: [ScheduleModule.forRoot(), MiddlewareModule],
    providers: [TaskService],
})
export class BootstrapModule {}
