import { User } from "./user";

/**
 * Note entity for frontend application
 */
export type Note = {
  _id?: string;
  title?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  creator?: User;
  sharedWith?: User[];
};
