import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscribeService } from './subscribe.service';

const subscribe = catchAsync(async (req, res) => {
  const response = await SubscribeService.subscribeUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Subscription successful',
    data: response,
  });
});

const getAllSubscribers = catchAsync(async (req, res) => {
  const response = await SubscribeService.getAllSubscribers(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscribers retrieved successfully',
    meta: response.meta,
    data: response.data,
  });
});

const deleteSubscriber = catchAsync(async (req, res) => {
  const response = await SubscribeService.deleteSubscriber(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriber deleted successfully',
    data: response,
  });
});

const exportSubscribers = catchAsync(async (req, res) => {
  const csvData = await SubscribeService.exportSubscribers();

  if (!csvData) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No subscribers found to export',
    });
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
  res.status(200).send(csvData);
});

export const SubscribeController = {
  subscribe,
  getAllSubscribers,
  deleteSubscriber,
  exportSubscribers,
};