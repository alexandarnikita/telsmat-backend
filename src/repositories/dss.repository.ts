import httpStatus from 'http-status'
import { Dss } from '../models/dss.model'
import { ApiError } from "../utils"

export class DssRepository {

  constructor() {
  }

  public getDss = async (device) => {
    return Dss.find({ device }, { createdAt: 0, updatedAt: 0 }, { sort: {key: 1} })
  }

  public createDss = async (dss) => {
    return await new Dss(dss).save()
  }

  public updateDssById = async (id, updateBody) => {
    const dss = await Dss.findById(id)

    if (!dss) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Dss not found')
    }
    Object.assign(dss, updateBody)
    await dss.save()
    return dss
  }

  public deleteDssById = async (id) => {
    const dss = await Dss.findById(id)

    if (!dss) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Dss not found')
    }
    return await dss.remove()
  }
}
