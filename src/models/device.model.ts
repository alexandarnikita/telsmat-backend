import mongoose, { Model, Schema } from 'mongoose';
import { toJSON } from './plugins';
import { IDevice } from '../definitions/interfaces/device.interface';

const deviceSchema = new Schema({
  customer: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  mac: {
    type: String,
    required: true
  },
  device_model: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'DeviceModel',
    required: true,
  }
},
{
  timestamps: true,
});

// add plugin that converts mongoose to json
deviceSchema.plugin(toJSON);

/**
 * @typedef Device
 */
interface IDeviceModel extends Model<IDevice> {
}

export const Device: IDeviceModel = mongoose.model('Device', deviceSchema) as any;
