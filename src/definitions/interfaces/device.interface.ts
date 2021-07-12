import { IDocument } from "./document.interface";

export interface IDevice extends IDocument {
  customer: number
  description: string
  mac: string
  device_model: string
}
