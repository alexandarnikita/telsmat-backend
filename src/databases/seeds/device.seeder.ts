import mongoose, { Types } from 'mongoose';
import config from '../../config/config'
import logger from '../../config/logger'
import { Device } from '../../models/device.model'

const ObjectId = mongoose.Types.ObjectId

mongoose.connect(config.mongoose.url, config.mongoose.options).then(async () => {
  logger.info('Connected to MongoDB, Initializing database start!')
  try {
    for (let i = 1; i <= 10; i++) {
      await new Device({
        customer: i,
        description: 'Description',
        mac: '00:aa:bb:cc:dd:11',
        device_model: i % 2 === 0 ? new ObjectId('60ea62b2af72570d9cc6b13a') : new ObjectId('60ea62b2af72570d9cc6b13b')
      }).save()
    }
    await mongoose.disconnect()
    logger.info('Disconnected to MongoDB, Initializing database has finished!')
  } catch (err) {
    logger.info('Error is occur', err)
  }
});
