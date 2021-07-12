import { Document } from "mongoose";
import { TObjectId } from "./common";

export interface IDocument extends Document {
  _id: TObjectId;
  _doc: any;
  createdAt: string;
  updatedAt: string;
}
