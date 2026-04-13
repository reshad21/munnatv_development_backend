import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceToolService } from './serviceTool.service';

const createServiceTool = catchAsync(async (req, res) => {
  const response = await ServiceToolService.createServiceToolIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service tool created successfully',
    data: response,
  });
});

const getAllServiceTools = catchAsync(async (req, res) => {
  const response = await ServiceToolService.getAllServiceToolsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service tools retrieved successfully',
    meta: response.meta,
    data: response.data,
  });
});

const getServiceToolById = catchAsync(async (req, res) => {
  const response = await ServiceToolService.getServiceToolByIdFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service tool retrieved successfully',
    data: response,
  });
});

const updateServiceTool = catchAsync(async (req, res) => {
  const response = await ServiceToolService.updateServiceToolInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service tool updated successfully',
    data: response,
  });
});

const deleteServiceTool = catchAsync(async (req, res) => {
  const response = await ServiceToolService.deleteServiceToolInDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service tool deleted successfully',
    data: response,
  });
});

export const ServiceToolController = {
  createServiceTool,
  getAllServiceTools,
  getServiceToolById,
  updateServiceTool,
  deleteServiceTool,
};
