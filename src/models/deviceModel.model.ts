import mongoose, { Model, Schema } from 'mongoose'
import { toJSON } from './plugins'
import { IDeviceModel } from '../definitions/interfaces/deviceModel.interface'

const deviceModelSchema = new Schema({
  vendor: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dss: {
    type: Boolean,
    required: true
  },
  device_format: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
})

// add plugin that converts mongoose to json
deviceModelSchema.plugin(toJSON)

/**
 * @typedef DeviceModel
 */
interface IDeviceModelModel extends Model<IDeviceModel> {
}

export const DeviceModel: IDeviceModelModel = mongoose.model('DeviceModel', deviceModelSchema) as any
