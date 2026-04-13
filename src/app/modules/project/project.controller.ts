import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const response = await ProjectService.createProjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project created successfully',
    data: response,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const response = await ProjectService.getAllProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Projects retrieved successfully',
    meta: response.meta,
    data: response.data,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const response = await ProjectService.getProjectByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project retrieved successfully',
    data: response,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const response = await ProjectService.updateProjectInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project updated successfully',
    data: response,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const response = await ProjectService.deleteProjectInDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project deleted successfully',
    data: response,
  });
});

const addProjectFeature = catchAsync(async (req, res) => {
  const response = await ProjectService.addProjectFeature(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project feature added successfully',
    data: response,
  });
});

const updateProjectFeature = catchAsync(async (req, res) => {
  const response = await ProjectService.updateProjectFeature(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project feature updated successfully',
    data: response,
  });
});

const deleteProjectFeature = catchAsync(async (req, res) => {
  const response = await ProjectService.deleteProjectFeature(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project feature deleted successfully',
    data: response,
  });
});

const addProjectTechStack = catchAsync(async (req, res) => {
  const response = await ProjectService.addProjectTechStack(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project tech stack added successfully',
    data: response,
  });
});

const updateProjectTechStack = catchAsync(async (req, res) => {
  const response = await ProjectService.updateProjectTechStack(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project tech stack updated successfully',
    data: response,
  });
});

const deleteProjectTechStack = catchAsync(async (req, res) => {
  const response = await ProjectService.deleteProjectTechStack(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project tech stack deleted successfully',
    data: response,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectFeature,
  updateProjectFeature,
  deleteProjectFeature,
  addProjectTechStack,
  updateProjectTechStack,
  deleteProjectTechStack,
};
