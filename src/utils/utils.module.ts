import { Module } from '@nestjs/common';
import { MomentService } from './moment/moment.service';
import { ValidationModule } from './validation/validation.module'

@Module({
    imports: [
        ValidationModule
    ],
    providers: [
        MomentService
    ]
})
export class UtilsModule {}
