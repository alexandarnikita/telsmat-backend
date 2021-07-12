import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError, catchAsync } from '../utils';
import { DeviceModelService } from '../services/deviceModel.service';

export class DeviceModelController {
  private deviceModelService: DeviceModelService;

  constructor(deviceModelService = new DeviceModelService()) {
    this.deviceModelService = deviceModelService;
  }

  public getDeviceModels = catchAsync(async (req: Request, res: Response) => {
    const result = await this.deviceModelService.getDeviceModels();
    res.status(httpStatus.OK).json(result);
  });
}
