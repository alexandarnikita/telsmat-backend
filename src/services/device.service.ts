import { DeviceRepository } from '../repositories/device.repository'

export class DeviceService {
  private deviceRepository: DeviceRepository

  constructor(
    deviceRepository = new DeviceRepository(),
  ) {
    this.deviceRepository = deviceRepository
  }

  public getDevices = async (pageSize: number, pageIndex: number, keyword: string) => {
    const pipeline = [
      {
        $match: {
          $or: [
            { description: { $regex: new RegExp(keyword, 'i') } },
            { mac: { $regex: new RegExp(keyword, 'i') } },
          ]
        }
      },
      {
        $unset: ['createdAt', 'updatedAt', '__v']
      },
      {
        $skip: pageSize * pageIndex
      },
      {
        $limit: pageSize
      },
      {
        $sort: { _id: 1 }
      }
    ];

    const totalCount = await this.deviceRepository.getCount(keyword);
    const devices = await this.deviceRepository.queryDevices(pipeline);

    return {
      totalCount,
      devices
    };
  };

  public createDevice = async (device) => {
    return await this.deviceRepository.createDevice(device)
  }

  public updateDeviceById = async (id, device) => {
    return await this.deviceRepository.updateDeviceById(id, device)
  }
}
