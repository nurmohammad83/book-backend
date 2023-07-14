import { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
