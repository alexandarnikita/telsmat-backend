import { Router } from 'express'
import validate from '../middlewares/validate'
import { DeviceModelController } from '../controllers/deviceModel.controller'
import { DeviceModelValidation } from '../validations/deviceModel.validation'

export class DeviceModelRoute {
  public router: Router
  private deviceModelValidation: DeviceModelValidation
  private deviceModelController: DeviceModelController

  constructor() {
    this.router = Router()
    this.deviceModelValidation = new DeviceModelValidation()
    this.deviceModelController = new DeviceModelController()
    this.routes()
  }

  public routes(): void {
    this.router.route('/').get(validate(this.deviceModelValidation.getDeviceModels), this.deviceModelController.getDeviceModels)
  }
}
