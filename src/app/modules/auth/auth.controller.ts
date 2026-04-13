import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const login = catchAsync(async (req, res) => {
  const response = await AuthServices.loginIntoDB(req.body);

  res.cookie('refreshToken', response.refreshToken, {
    httpOnly: true,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login Successful',
    data: response,
  });
});

const register = catchAsync(async (req, res) => {
  const response = await AuthServices.registerIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Registration Successful',
    data: response,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPasswordIntoDB(req.body);

  sendResponse(res, {
    statusCode: 202,
    success: true,
    message: 'Reset link sent to your email',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { id, password, token } = req.body;
  const result = await AuthServices.resetPasswordIntoDB(id, password, token);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: result,
  });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const result = await AuthServices.refreshAccessTokenIntoDB(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token refreshed successfully',
    data: result,
  });
});

const getLoggedAdminDetails = catchAsync(async (req, res) => {
  const response = await AuthServices.getLoggedAdminDetailsFromDB(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User details fetched successfully',
    data: response,
  });
});

export const AuthController = {
  login,
  register,
  forgetPassword,
  resetPassword,
  refreshAccessToken,
  getLoggedAdminDetails,
};
