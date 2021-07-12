import mongoose, { Types } from 'mongoose';
import config from '../../config/config'
import logger from '../../config/logger'
import { DeviceModel } from '../../models/deviceModel.model'

const ObjectId = mongoose.Types.ObjectId

mongoose.connect(config.mongoose.url, config.mongoose.options).then(async () => {
  logger.info('Connected to MongoDB, Initializing database start!')
  try {
    const deviceModels = [
      {
        _id: new ObjectId('60ea62b2af72570d9cc6b13a'),
        vendor: 1,
        name: 'T46',
        dss: true,
        device_format: 'DESK_PHONE'
      },
      {
        _id: new ObjectId('60ea62b2af72570d9cc6b13b'),
        vendor: 1,
        name: 'T41',
        dss: true,
        device_format: 'DESK_PHONE'
      }
    ]

    for (const deviceModel of deviceModels) {
      await new DeviceModel({...deviceModel}).save()
    }
    await mongoose.disconnect()
    logger.info('Disconnected to MongoDB, Initializing database has finished!')
  } catch (err) {
    logger.info('Error is occur', err)
  }
});
