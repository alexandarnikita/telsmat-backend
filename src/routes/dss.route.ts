import { Router } from 'express'
import validate from '../middlewares/validate'
import { DssController } from '../controllers/dss.controller'
import { DssValidation } from '../validations/dss.validation'

export class DssRoute {
  public router: Router
  private dssValidation: DssValidation
  private dssController: DssController

  constructor() {
    this.router = Router()
    this.dssValidation = new DssValidation()
    this.dssController = new DssController()
    this.routes()
  }

  public routes(): void {
    this.router.route('/').get(validate(this.dssValidation.getDss), this.dssController.getDss)
    this.router.route('/').post(validate(this.dssValidation.createDss), this.dssController.createDss)
    this.router.route('/:id').put(validate(this.dssValidation.updateDss), this.dssController.updateDss)
    this.router.route('/:id').delete(validate(this.dssValidation.deleteDss), this.dssController.deleteDss)
  }
}
