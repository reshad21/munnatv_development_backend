import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const response = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: response,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const response = await categoryService.getAllCategories();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories retrieved successfully',
    data: response,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const response = await categoryService.getCategoryById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully',
    data: response,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const response = await categoryService.updateCategory(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully',
    data: response,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const response = await categoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
    data: response,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};