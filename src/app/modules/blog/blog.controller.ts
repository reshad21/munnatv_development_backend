import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const response = await BlogService.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: response,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const response = await BlogService.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs retrieved successfully',
    meta: response.meta,
    data: response.data,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const response = await BlogService.getBlogByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successfully',
    data: response,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const response = await BlogService.updateBlogInDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: response,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const response = await BlogService.deleteBlogInDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: response,
  });
});

const addBlogComment = catchAsync(async (req, res) => {
  const response = await BlogService.addBlogComment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Comment added successfully',
    data: response,
  });
});

const updateBlogComment = catchAsync(async (req, res) => {
  const response = await BlogService.updateBlogComment(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment updated successfully',
    data: response,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addBlogComment,
  updateBlogComment,
};