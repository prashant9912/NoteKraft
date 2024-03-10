import { Document } from "mongoose";

/**
 * User type
 */
export type User = Document & {
  email: string;
  password: string;
  comparePassword: Function;
};
