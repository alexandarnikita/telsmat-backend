import { DeviceModel } from '../models/deviceModel.model';

export class DeviceModelRepository {

  constructor() {
  }

  public getDeviceModels = async () => {
    return DeviceModel.find({}, { createdAt: 0, updatedAt: 0, id: 0 })
  }
}
