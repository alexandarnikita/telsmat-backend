import { Device } from '../models/device.model'
import { ApiError } from "../utils"
import httpStatus from 'http-status'

export class DeviceRepository {

  constructor() {
  }

  public getCount = async (keyword) => {
    return Device.find({ $or: [
        { description: new RegExp(keyword, 'gi') },
        { mac: new RegExp(keyword, 'gi') }
      ] }).countDocuments();
  };

  public queryDevices = async (pipeline) => {
    return Device.aggregate(pipeline);
  };

  public createDevice = async (device) => {
    return await new Device(device).save()
  }

  public updateDeviceById = async (id, updateBody) => {
    const device = await Device.findById(id)

    if (!device) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Device not found');
    }
    Object.assign(device, updateBody)
    await device.save()
    return device
  }

  public deleteDeviceById = async (id) => {
    const device = await Device.findById(id)

    if (!device) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Device not found');
    }
    return await device.remove()
  }
}
