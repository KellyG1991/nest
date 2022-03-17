import Email from "email-templates";
import { ObjectType } from "../types";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailOptions, EmailMessage, EmailConfig } from "./utils/type";

import { Logger } from "winston";

@Injectable()
export class EmailService
{
    private email: Email;

    constructor (
        private readonly configService: ConfigService,
        @Inject( "winston" )
        private readonly logger: Logger
    )
    {
        this.email = new Email( this.configService.get( 'email.config' ) as EmailConfig );
    }

    async send ( provider: EmailOptions ): Promise<any>
    {
        return await this.email.send( provider );
    }

    async render ( view: string, locals?: ObjectType ): Promise<string>
    {
        return await this.email.render( view, locals );
    }

    async renderAll ( view: string, locals?: ObjectType ): Promise<Partial<EmailMessage>>
    {
        return await this.email.renderAll( view, locals );
    }

    async juiceResouce ( html: string ): Promise<string>
    {
        return await this.email.juiceResources( html );
    }
}
