import { User } from "./user";

/**
 * Note entity for frontend application
 */
export type Note = {
  id: string;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt?: Date;
  creator?: User;
  sharedWith?: User[];
};
