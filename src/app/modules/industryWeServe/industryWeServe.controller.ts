import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IndustryWeServeService } from './industryWeServe.service';

const createIndustryWeServe = catchAsync(async (req, res) => {
  const response = await IndustryWeServeService.createIndustryWeServeIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Industry we serve created successfully',
    data: response,
  });
});

const getAllIndustryWeServe = catchAsync(async (req, res) => {
  const response = await IndustryWeServeService.getAllIndustryWeServeFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industries we serve retrieved successfully',
    meta: response.meta,
    data: response.data,
  });
});

const getIndustryWeServeById = catchAsync(async (req, res) => {
  const response = await IndustryWeServeService.getIndustryWeServeByIdFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industry we serve retrieved successfully',
    data: response,
  });
});

const updateIndustryWeServe = catchAsync(async (req, res) => {
  const response = await IndustryWeServeService.updateIndustryWeServeInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industry we serve updated successfully',
    data: response,
  });
});

const deleteIndustryWeServe = catchAsync(async (req, res) => {
  const response = await IndustryWeServeService.deleteIndustryWeServeInDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Industry we serve deleted successfully',
    data: response,
  });
});

export const IndustryWeServeController = {
  createIndustryWeServe,
  getAllIndustryWeServe,
  getIndustryWeServeById,
  updateIndustryWeServe,
  deleteIndustryWeServe,
};
