import Joi from '@hapi/joi';
import { objectId } from './custom.validator'

export class DssValidation {
  public getDss = {
    query: Joi.object().keys({
      device: Joi.required().custom(objectId)
    })
  };

  public createDss = {
    body: Joi.object().keys({
      device: Joi.required().custom(objectId),
      dss_type: Joi.string().required(),
      key: Joi.number().required(),
      label: Joi.string().required(),
      value: Joi.string().required()
    })
  }

  public updateDss = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
      device: Joi.required().custom(objectId),
      dss_type: Joi.string().required(),
      key: Joi.number().required(),
      label: Joi.string().required(),
      value: Joi.string().required()
    })
  }

  public deleteDss = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    })
  }
}
