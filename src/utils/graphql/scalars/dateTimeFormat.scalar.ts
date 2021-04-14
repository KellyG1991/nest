import { Kind } from "graphql";
import moment, { Moment } from "moment-timezone";
import { BadRequestException } from "@nestjs/common";
import { Scalar, CustomScalar } from "@nestjs/graphql";
import { StringValueNode } from "graphql/language/ast";

@Scalar('DateTimeFormat')
export class DateTimeFormatScalar implements CustomScalar<string | Moment, string> {
    private static FORMAT = 'YYYY-MM-DD HH:mm:ss';

    description = `Date time format type i.e. ${DateTimeFormatScalar.FORMAT}`;

    parseLiteral(ast: StringValueNode): string {
        if (ast.kind !== Kind.STRING) {
            throw new BadRequestException('Invalid date time format');
        }

        return this.parseValue(ast.value);
    }

    parseValue(value: string): string {
        if (moment(value, DateTimeFormatScalar.FORMAT, true).isValid()) {
            return value;
        }

        throw new BadRequestException('Invalid date format provided.');
    }

    serialize(value: string | Moment): string {
        return typeof value === 'string' ?
            value :
            value.format(DateTimeFormatScalar.FORMAT);
    }
}
