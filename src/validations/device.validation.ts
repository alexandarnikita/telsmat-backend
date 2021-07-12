import Joi from '@hapi/joi';
import { objectId } from './custom.validator'

export class DeviceValidation {
  public getDevices = {
    query: Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
      keyword: Joi.string().default(''),
    }),
  };

  public createDevice = {
    body: Joi.object().keys({
      customer: Joi.number().required(),
      description: Joi.string().required(),
      mac: Joi.string().required(),
      device_model: Joi.required().custom(objectId),
    })
  }

  public updateDevice = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
      customer: Joi.number().required(),
      description: Joi.string().required(),
      mac: Joi.string().required(),
      device_model: Joi.required().custom(objectId),
    })
  }

  public deleteDevice = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    })
  }
}
