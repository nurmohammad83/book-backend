import httpStatus from 'http-status';
import ApiError from '../../../Errors/ApiError';
import bcrypt from 'bcrypt';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from './user.interface';
import { User } from './user.model';
import { jwtHelpers } from '../../../helper/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (userData: IUser): Promise<IUser | null> => {
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await User.create(userData);
  return result;
};
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isExist = await User.isUserExist(email);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (
    isExist.password &&
    !(await User.isPasswordMatch(password, isExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { email: userEmail, password: pass } = isExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, pass },
    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userEmail, pass },
    config.jwt.secret_refresh_token as Secret,
    config.jwt.secret_refresh_token_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.secret_refresh_token as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userEmail } = verifyToken;
  const isExist = await User.isUserExist(userEmail);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      userEmail: isExist.email,
      pass: isExist.password,
    },

    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
export const UserService = { createUser, loginUser, refreshToken };
