import { Kind } from 'graphql';
import moment, { Moment } from 'moment-timezone';
import { BadRequestException } from '@nestjs/common';
import { StringValueNode } from 'graphql/language/ast';
import { Scalar, CustomScalar } from '@nestjs/graphql';

@Scalar('FutureDateFormat')
export class DateFormatScalar implements CustomScalar<string, Moment> {
    private static readonly format = 'DD-MM-YYYY';

    description = 'Future/Same Date format i.e. DD-MM-YYYY';

    parseLiteral(ast: StringValueNode): Moment {
        if (ast.kind !== Kind.STRING) {
            throw new BadRequestException('Invalid date format.');
        }

        return this.parseValue(ast.value);
    }

    parseValue(value: string): Moment {
        const date = moment(value, DateFormatScalar.format);

        if (!date.isValid() || date.diff(moment(), 'd') < 0) {
            throw new Error('Invalid date or format.');
        }

        return date;
    }

    serialize(value: Moment | string | Date): string {
        return moment(value).format(DateFormatScalar.format);
    }
}
