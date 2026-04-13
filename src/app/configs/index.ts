import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  PORT: process.env.PORT,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  serverUrl: process.env.SERVER_URL,
  clientUrl: process.env.CLIENT_URL,
  password: process.env.PASSWORD,
  adminFullName: process.env.ADMIN_FULL_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
};
