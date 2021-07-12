import express from 'express';
import SocketIo from 'socket.io';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { Server } from 'http';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/config';
import * as morgan from './config/morgan';
import { errorHandler } from './middlewares/error';
import { ApiError } from './utils';
import logger from './config/logger';
import { DeviceModelRoute } from './routes/deviceModel.route';
import { DeviceRoute } from './routes/device.route';
import { DssRoute } from './routes/dss.route';

export class App {
  public app: express.Application;
  private static instance: App;
  private server: Server;
  public io: SocketIo;

  public static get(): App {
    if (!this.instance) {
      this.instance = new App();
    }
    return this.instance;
  }

  private constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  /**
   * configuration of the middleware and port
   */
  public config(): void {
    this.app.set('port', config.port);
    if (config.env !== 'test') {
      this.app.use(morgan.successHandler);
      this.app.use(morgan.errorHandler);
    }
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(mongoSanitize());
    this.app.use(compression());
    this.app.use(cors({
      origin: (origin, callback) => {
        callback(null, true);
      },
      credentials: true,
    }));
    this.app.use(passport.initialize());
    this.app.use(errorHandler);
  }

  /**
   * defines the server routes
   */
  public routes(): void {
    // api routes
    this.app.use('/api/device-models', new DeviceModelRoute().router);
    this.app.use('/api/devices', new DeviceRoute().router);
    this.app.use('/api/dss', new DssRoute().router);

    // send back a 404 error for any unknown api request
    this.app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });
  }

  /**
   * connects mongo DB
   */
  public connectMongoDB(): Promise<boolean> {
    return mongoose
      .connect(config.mongoose.url, config.mongoose.options)
      .then(() => {
        logger.info('Connected to MongoDB');
        return true;
      })
      .catch(() => {
        logger.info('Failed to connect to MongoDB');
        return false;
      });
  }

  /**
   * disconnect MongoDB
   */
  public disconnectMongoDB(): Promise<boolean> {
    return mongoose
      .disconnect()
      .then(() => {
        logger.info('MongoDB disconnect successfully.');
        return true;
      })
      .catch(() => {
        logger.info('Failed to disconnect to MongoDB.');
        return false;
      });
  }

  /**
   * starts the server
   */
  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(this.app.get('port'), () => {
        logger.info(`Listening to port ${this.app.get('port')}`);
        resolve();
      })
    });
  }

  /**
   * stops the server
   */
  public async stop(): Promise<Server> {
    logger.error('some setting has failed');
    const server = this.server.close();
    logger.warn('stopped');
    return server;
  }
}
