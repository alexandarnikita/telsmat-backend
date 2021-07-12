import { App } from './app';
import logger from './config/logger';

const server = App.get();

const startServer = function (server: App): void {
  server.connectMongoDB().then(async (res) => {
    if (res) {
      await server.start();
    }
  })
};

const exitHandler = async () => {
  if (server) {
    await server.stop();
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = async (error) => {
  logger.error(error);
  await exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received');
  if (server) {
    await server.stop();
  }
});

startServer(server);
