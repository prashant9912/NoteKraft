import NextAuth from "next-auth";
import { nextAuthOptions } from "notekraft/utils/nextAuth-utils";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
