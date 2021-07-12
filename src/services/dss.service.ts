import { DssRepository } from '../repositories/dss.repository'

export class DssService {
  private dssRepository: DssRepository

  constructor(
    dssRepository = new DssRepository(),
  ) {
    this.dssRepository = dssRepository
  }
}
