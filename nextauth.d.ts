import { DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
  /**
   * Adding extrafields to the user interface
   */
  role?: string;
  isActive?: boolean;
}

declare module 'next-auth' {
  type User = IUser;

  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  type JWT = IUser;
}
