import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeamService } from './team.service';

const createTeam = catchAsync(async (req, res) => {
  const response = await TeamService.createTeamIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Team member created successfully',
    data: response,
  });
});

const getAllTeams = catchAsync(async (req, res) => {
  const response = await TeamService.getAllTeamsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team members retrieved successfully',
    meta: response.meta,
    data: response.data,
  });
});

const getTeamById = catchAsync(async (req, res) => {
  const response = await TeamService.getTeamByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team member retrieved successfully',
    data: response,
  });
});

const updateTeam = catchAsync(async (req, res) => {
  const response = await TeamService.updateTeamInDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team member updated successfully',
    data: response,
  });
});

const deleteTeam = catchAsync(async (req, res) => {
  const response = await TeamService.deleteTeamInDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team member deleted successfully',
    data: response,
  });
});

const addTeamSocial = catchAsync(async (req, res) => {
  const response = await TeamService.addTeamSocial(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Team social added successfully',
    data: response,
  });
});

const updateTeamSocial = catchAsync(async (req, res) => {
  const response = await TeamService.updateTeamSocial(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team social updated successfully',
    data: response,
  });
});

const deleteTeamSocial = catchAsync(async (req, res) => {
  const response = await TeamService.deleteTeamSocial(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team social deleted successfully',
    data: response,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addTeamSocial,
  updateTeamSocial,
  deleteTeamSocial,
};
