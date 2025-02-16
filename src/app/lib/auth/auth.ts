import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import $apiClient from "./api";
import { type AuthResponse, type CustomJWT, type SessionUser, type UserCredentials } from "./interface";

const secondsInMillisecond = 1000;
const expirationTimeInSeconds = 8 * 60 * 60;
const loginPath = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "/login";

async function login(credentials: UserCredentials): Promise<SessionUser> {
  try {
    const response = await $apiClient.post<AuthResponse, any>("/login", {
      username: credentials.username,
      password: credentials.password,
    });
    const { user, accessToken, refreshToken } = response.data;
    return {
      phone: user.phone,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      officeId: user.officeId,
      id: user.id,
      role: user.role,
      accessToken,
      refreshToken,
      iat: Math.floor(Date.now() / secondsInMillisecond),
      email: user.email,
      emailVerified: null,
    };
  } catch {
    throw new Error("Invalid credentials");
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: loginPath,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }
        return await login(credentials as UserCredentials);
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomJWT;
      const currentTimeInSeconds = Math.floor(Date.now() / secondsInMillisecond);
      if (user) {
        customToken.user = user as SessionUser;
        customToken.iat = currentTimeInSeconds;
        customToken.exp = currentTimeInSeconds + expirationTimeInSeconds;
        return customToken;
      }
      if (currentTimeInSeconds > (customToken.exp || 0)) {
        return {};
      }
      return customToken;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      if (customToken.user) {
        session.user = customToken.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: process.env.NODE_ENV === "development",
};