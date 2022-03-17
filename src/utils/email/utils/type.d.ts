import Mail = require( 'nodemailer/lib/mailer' );
import { HtmlToTextOptions } from 'html-to-text';
import SMTPPool = require( 'nodemailer/lib/smtp-pool' );
import SESTransport = require( 'nodemailer/lib/ses-transport' );
import JSONTransport = require( 'nodemailer/lib/json-transport' );
import SMTPTransport = require( 'nodemailer/lib/smtp-transport' );
import StreamTransport = require( 'nodemailer/lib/stream-transport' );
import SendmailTransport = require( 'nodemailer/lib/sendmail-transport' );

export type NodeMailerTransportOptions =
    | Mail
    | SMTPPool
    | SMTPPool.Options
    | SendmailTransport
    | SendmailTransport.Options
    | StreamTransport
    | StreamTransport.Options
    | JSONTransport
    | JSONTransport.Options
    | SESTransport
    | SESTransport.Options
    | SMTPTransport
    | SMTPTransport.Options
    | string;

// No typedef for https://github.com/niftylettuce/preview-email
export interface PreviewEmailOpts
{
    /**
     * a path to a directory for saving the generated email previews (defaults to os.tmpdir()
     */
    dir?: string;

    /**
     * https://github.com/sindresorhus/open
     */
    open?: any;

    /**
     * a unique ID for the file name created for the preview in dir (defaults to uuid.v4() from uuid)
     */
    id?: string;

    /**
     * a file path to a pug template file (defaults to preview-email's template.pug by default)
     */
    template?: string;
}

export interface ViewOptions
{
    /**
     *  View extansion. defaults to 'pug', and is the default file extension for templates
     */
    extension?: string;

    /**
     * a template file extension mapping, defaults to { hbs: 'handlebars', njk: 'nunjucks' }
     * (this is useful if you use different file extension naming conventions)
     */
    map?: any;

    /**
     *  the default template engine source, defaults to consolidate
     */
    engineSource?: any;
}

export interface View
{
    /**
     * View root. Defaults to the current working directory's "emails" folder via path.resolve('emails')
     */
    root?: string;

    options?: ViewOptions;
}

export interface EmailConfig<T = any>
{
    /**
     * The message <Nodemailer.com/message/>
     */
    message: Mail.Options;
    /**
     * The nodemailer Transport created via nodemailer.createTransport
     */
    transport?: NodeMailerTransportOptions;
    /**
     * The email template directory and engine information
     */
    views?: View;
    /**
     * Do you really want to send, false for test or development
     */
    send?: boolean;
    /**
     * Preview the email
     */
    preview?: boolean | PreviewEmailOpts;
    /**
     * Set to object to configure and Enable <https://github.com/ladjs/il8n>
     */
    i18n?: any;
    /**
     * Pass a custom render function if necessary
     */
    render?: ( view: string, locals?: T ) => Promise<any>;
    /**
     * force text-only rendering of template (disregards template folder)
     */
    textOnly?: boolean;
    /**
     * <Https://github.com/werk85/node-html-to-text>
     *
     * configuration object for html-to-text
     */
    htmlToText?: HtmlToTextOptions | false;
    /**
     * You can pass an option to prefix subject lines with a string
     * env === 'production' ? false : `[${env.toUpperCase()}] `; // <--- HERE
     */
    subjectPrefix?: string | false;
    /**
     * <https://github.com/Automattic/juice>
     */
    juice?: boolean;
    /**
     * <https://github.com/Automattic/juice>
     */
    juiceResources?: any;
}

export interface EmailOptions<T = any>
{
    /**
     * The template name
     */
    template: string;
    /**
     * Nodemailer Message <Nodemailer.com/message/>
     *
     * Overrides what is given for constructor
     */
    message: Mail.Options;
    /**
     * The Template Variables
     */
    locals?: T;
}

interface EmailMessage
{
    subject: string;
    html: string;
    text: string;
}

export type Address = { name: string, address: string };

export type EmailAddresses = string | Address | Array<Address>;
