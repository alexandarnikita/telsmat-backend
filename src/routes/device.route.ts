import { Router } from 'express'
import validate from '../middlewares/validate'
import { DeviceController } from '../controllers/device.controller'
import { DeviceValidation } from '../validations/device.validation'

export class DeviceRoute {
  public router: Router
  private deviceValidation: DeviceValidation
  private deviceController: DeviceController

  constructor() {
    this.router = Router()
    this.deviceValidation = new DeviceValidation()
    this.deviceController = new DeviceController()
    this.routes()
  }

  public routes(): void {
    this.router.route('/').get(validate(this.deviceValidation.getDevices), this.deviceController.getDevices)
    this.router.route('/').post(validate(this.deviceValidation.createDevice), this.deviceController.createDevice)
    this.router.route('/:id').put(validate(this.deviceValidation.updateDevice), this.deviceController.updateDevice)
    this.router.route('/:id').delete(validate(this.deviceValidation.deleteDevice), this.deviceController.deleteDevice)
  }
}
