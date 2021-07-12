import mongoose, { Model, Schema } from 'mongoose';
import { toJSON } from './plugins';
import { IDss } from '../definitions/interfaces/dss.interface';

const dssSchema = new Schema({
  device: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Device',
    required: true,
  },
  dss_type: {
    type: String,
    required: true
  },
  key: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
});

// add plugin that converts mongoose to json
dssSchema.plugin(toJSON);

/**
 * @typedef Dss
 */
interface IDssModel extends Model<IDss> {
}

export const Dss: IDssModel = mongoose.model('Dss', dssSchema) as any;
