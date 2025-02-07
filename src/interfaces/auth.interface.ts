import { type User } from './users.interface';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId?: number;
}

export interface ILoginResponseSuccessfully {
  message: string;
  data: {
    session: {
      id: string;
      userId: number;
      expiresAt: string;
      userRole?: string;
    };
  };
}

export interface ISession {
  id: string;
  userId: number;
  expiresAt: string;
}

export interface IUserLoggedResponseSuccessfully {
  message: string;
  user: User;
  session: ISession;
}
