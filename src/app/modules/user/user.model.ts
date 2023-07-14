import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, IUserModel>('User', userSchema);
