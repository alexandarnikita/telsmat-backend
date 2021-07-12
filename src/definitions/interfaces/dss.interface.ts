import { IDocument } from "./document.interface";

export interface IDss extends IDocument {
  device: string
  dss_type: string
  key: number
  label: string
  value: string
}
