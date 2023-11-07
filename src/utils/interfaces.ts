import { Request } from 'express';

export interface request extends Request {
  user: {
    userId: string;
    email: string;
  };
}
