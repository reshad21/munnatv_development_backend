import { AdminUser, AdminUserStatus } from '@prisma/client';
import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';

import AppError from '../../errors/AppError';
import configs from '../../configs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import { TLogin } from '../../types/auth.type';
import { generateToken } from '../../utils/generageToken';


const registerIntoDB = async (payload: AdminUser) => {
  const hashedPassword = await bcrypt.hash(payload.password as string, 10);

  const response = await prisma.adminUser.create({
    data: {
      fullName: payload.fullName,
      email: payload.email,
      password: hashedPassword,
      roleId: payload.roleId,
    },
  });

  return response;
};

const loginIntoDB = async (payload: TLogin) => {
  const existingAdmin = await prisma.adminUser.findFirst({
    where: {
      email: payload.email,
    },
    include: {
      role: true,
    },
  });

  if (!existingAdmin) {
    throw new AppError(404, 'Admin user not found with this email');
  }

  if (existingAdmin.status === AdminUserStatus.INACTIVE) {
    throw new AppError(403, 'Admin user is inactive. Please contact support.');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    existingAdmin.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    id: existingAdmin.id,
    email: existingAdmin.email,
    fullName: existingAdmin.fullName,
    role: existingAdmin.role.name,
    status: existingAdmin.status,
  };

  const accessToken = generateToken(
    jwtPayload,
    configs.jwtAccessSecret as string,
    configs.jwtAccessExpiresIn as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    configs.jwtRefreshSecret as string,
    configs.jwtRefreshExpiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const forgetPasswordIntoDB = async (payload: { email: string }) => {
  const userExists = await prisma.adminUser.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
    include: {
      role: true,
    },
  });

  if (!userExists) {
    throw new AppError(404, 'User not found');
  }

  const jwtPayload = {
    id: userExists.id,
    email: userExists.email,
    fullName: userExists.fullName,
    status: userExists.status,
    role: userExists.role.name,
  };

  const accessToken = generateToken(
    jwtPayload,
    configs.jwtAccessSecret as string,
    '1h',
  );

  const resetLink = `${configs.clientUrl}/reset-password/?id=${userExists.id}&accessToken=${accessToken}`;

  sendEmail(resetLink, payload.email);

  return payload.email;
};

const resetPasswordIntoDB = async (
  id: string,
  password: string,
  token: string,
) => {
  const findUser = await prisma.adminUser.findUnique({
    where: {
      id,
    },
  });

  if (!findUser) {
    throw new AppError(404, 'User not found');
  }

  if (!token) {
    throw new AppError(400, 'Token is required');
  }

  const decoded = jwt.verify(
    token,
    configs.jwtAccessSecret as string,
  ) as JwtPayload;

  if (decoded.id !== findUser.id) {
    throw new AppError(401, 'Invalid token');
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  await prisma.adminUser.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return 'Password reset successfully';
};

const refreshAccessTokenIntoDB = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    configs.jwtRefreshSecret as string,
  ) as JwtPayload;

  const jwtPayload = {
    email: decoded.email,
    fullName: decoded.fullName,
    role: decoded.role,
    status: decoded.status,
    id: decoded.id,
  };

  const newAccessToken = generateToken(
    jwtPayload,
    configs.jwtAccessSecret as string,
    configs.jwtAccessExpiresIn as string,
  );

  return newAccessToken;
};

const getLoggedAdminDetailsFromDB = async (user: JwtPayload) => {
  const response = await prisma.adminUser.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      role: {
        include: {
          roleFeature: {
            orderBy: {
              index: 'asc',
            },
          },
        },
      },
    },
  });

  return response;
};

export const AuthServices = {
  registerIntoDB,
  loginIntoDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
  refreshAccessTokenIntoDB,
  getLoggedAdminDetailsFromDB,
};
