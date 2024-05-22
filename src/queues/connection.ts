import { config } from '@notifications/config';
import { winstonLogger } from '@vuphuc47edge/jobber-shared';
import client, { Channel, Connection } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationQueuesConnection', 'debug');

export const createConnection = async (): Promise<Channel | undefined> => {
  try {
    const connection: Connection = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();

    log.info('NotificationService connected to queue success.');

    // close connection
    closeConnection(channel, connection);

    return channel;
  } catch (error) {
    log.log('error', 'NotificationService createConnection() method error:', error);
    return undefined;
  }
};

const closeConnection = (channel: Channel, connection: Connection): void => {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
};
