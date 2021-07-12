import {DeviceModelRepository} from '../repositories/deviceModel.repository';

export class DeviceModelService {
  private deviceModelRepository: DeviceModelRepository;

  constructor(
    deviceModelRepository = new DeviceModelRepository(),
  ) {
    this.deviceModelRepository = deviceModelRepository;
  }

  public getDeviceModels = async () => {
    return await this.deviceModelRepository.getDeviceModels();
  };
}
