import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError, catchAsync } from '../utils'
import { DssService } from '../services/dss.service'
import { DssRepository } from '../repositories/dss.repository'

export class DssController {
  private dssService: DssService
  private dssRepository: DssRepository

  constructor(
    dssService = new DssService(),
    dssRepository = new DssRepository()
  ) {
    this.dssService = dssService
    this.dssRepository = dssRepository
  }

  public getDss = catchAsync(async (req: Request, res: Response) => {
    const deviceId = req.query.device
    const result = await this.dssRepository.getDss(deviceId)
    res.status(httpStatus.OK).json(result)
  })

  public createDss = catchAsync(async (req: Request, res: Response) => {
    const result = await this.dssRepository.createDss(req.body)
    res.status(httpStatus.OK).json(result)
  })

  public updateDss = catchAsync(async (req: Request, res: Response) => {
    const result = await this.dssRepository.updateDssById(req.params.id, req.body)
    res.status(httpStatus.OK).json(result)
  })

  public deleteDss = catchAsync(async (req: Request, res: Response) => {
    await this.dssRepository.deleteDssById(req.params.id)
    res.status(httpStatus.OK).send()
  })
}
