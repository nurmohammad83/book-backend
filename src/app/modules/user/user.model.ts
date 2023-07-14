import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import bcrypt from 'bcrypt';
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
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1 });
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
});
export const User = model<IUser, IUserModel>('User', userSchema);
