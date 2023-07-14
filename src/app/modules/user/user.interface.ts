import { Model } from 'mongoose';

type IUser = {
  email: string;
  password: string | number;
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
