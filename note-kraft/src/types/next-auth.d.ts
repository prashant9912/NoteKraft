// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  export interface Session {
    user: {
      id: string;
      email: string;
      jwtToken: string;
      exp: number;
    };
  }
}
