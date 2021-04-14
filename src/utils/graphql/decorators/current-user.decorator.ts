import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (_: unknown, [,,ctx,]) => {
        return ctx.request.user;
    }
);
