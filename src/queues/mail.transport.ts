import { config } from '@notifications/config';
import { emailTemplates } from '@notifications/helpers';
import { IEmailLocals, winstonLogger } from '@vuphuc47edge/jobber-shared';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationServiceMailTransport', 'debug');

export const sendEmail = async (template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> => {
  try {
    // mail tempalte
    emailTemplates(template, receiverEmail, locals);

    log.info('Email sent success.');
  } catch (error) {
    log.log('error', 'NotificationService sendEmail() method error:', error);
  }
};
