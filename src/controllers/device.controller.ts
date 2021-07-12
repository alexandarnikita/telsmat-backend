import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError, catchAsync } from '../utils'
import { DeviceService } from '../services/device.service'
import { DeviceRepository } from '../repositories/device.repository'

export class DeviceController {
  private deviceService: DeviceService
  private deviceRepository: DeviceRepository

  constructor(
    deviceService = new DeviceService(),
    deviceRepository = new DeviceRepository()
  ) {
    this.deviceService = deviceService
    this.deviceRepository = deviceRepository
  }

  public getDevices = catchAsync(async (req: Request, res: Response) => {
    const { pageSize, pageIndex, keyword } = req.query;
    const result = await this.deviceService.getDevices(parseInt(pageSize as string), parseInt(pageIndex as string), keyword as string)
    res.status(httpStatus.OK).json(result)
  })

  public createDevice = catchAsync(async (req: Request, res: Response) => {
    const result = await this.deviceService.createDevice(req.body)
    res.status(httpStatus.OK).json(result)
  })

  public updateDevice = catchAsync(async (req: Request, res: Response) => {
    const result = await this.deviceService.updateDeviceById(req.params.id, req.body)
    res.status(httpStatus.OK).json(result)
  })

  public deleteDevice = catchAsync(async (req: Request, res: Response) => {
    await this.deviceRepository.deleteDeviceById(req.params.id)
    res.status(httpStatus.OK).send()
  })
}
