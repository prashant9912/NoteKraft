import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "notekraft/services/auth-service";
import { getServerSession } from "next-auth";

/**
 * Next auth options
 */
export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email/Password", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.email && credentials?.password) {
            const userResponse = await loginUser(
              credentials.email,
              credentials.password
            );

            if (userResponse.error) {
              throw new Error(userResponse.error);
            }

            const user: any = {
              email: userResponse.user.email,
              jwtToken: userResponse.token,
              id: userResponse.user._id,
            };

            return user;
          }
        } catch (e) {
          console.error(e);
          throw e;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = token as any;
      return session;
    },
  },
};

/**
 * Gets server session
 */
export const serverSession = async () =>
  await getServerSession(nextAuthOptions);
