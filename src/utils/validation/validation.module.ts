import { Module } from "@nestjs/common";
import { DateFormatValidator } from "./custom";
import { CustomValidationPipe } from "./validation.pipe";
import { MomentService } from "../moment/moment.service";

@Module({
    imports: [CustomValidationPipe],
    providers: [DateFormatValidator, MomentService],
    exports: [CustomValidationPipe, DateFormatValidator],
})
export class ValidationModule {}
