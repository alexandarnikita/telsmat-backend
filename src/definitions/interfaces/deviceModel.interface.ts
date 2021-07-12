import { IDocument } from "./document.interface"

export interface IDeviceModel extends IDocument {
  vendor: number
  name: string
  dss: boolean
  device_format: string
}
