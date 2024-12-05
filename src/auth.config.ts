import NextAuth, { type NextAuthConfig } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import { IUser } from '../nextauth';

import prisma from './lib/prisma';

const authenticatedRoute = ['/checkout', '/checkout/address', '/orders'];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthenticatedRoute = authenticatedRoute.includes(nextUrl.pathname);

      if (isOnAuthenticatedRoute) {
        if (isLoggedIn) return true;

        return false;
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token }) {
      session.user = token.data as AdapterUser & IUser;

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) return null;
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
