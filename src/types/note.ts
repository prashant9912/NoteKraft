import { Document, Schema } from "mongoose";

/**
 * Note type
 */
export type Note = Document & {
  title: string;
  content: string;
  user: Schema.Types.ObjectId;
};
