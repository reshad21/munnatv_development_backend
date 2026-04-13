import { Team, TeamSocial } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createTeamIntoDB = async (payload: Team) => {
  const response = await prisma.team.create({
    data: payload,
    include: {
      teamSocials: true,
    },
  });

  return response;
};

const getAllTeamsFromDB = async (query: Record<string, unknown>) => {
  const teamsQuery = builderQuery({
    searchFields: ['name', 'position'],
    searchTerm: query.searchTerm as string,
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [teams, total] = await prisma.$transaction([
    prisma.team.findMany({
      where: teamsQuery.where,
      include: {
        teamSocials: true,
      },
      skip: teamsQuery.skip,
      take: teamsQuery.take,
      orderBy: teamsQuery.orderBy,
    }),
    prisma.team.count({ where: teamsQuery.where }),
  ]);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / teamsQuery.take),
    },
    data: teams,
  };
};

const getTeamByIdFromDB = async (id: string) => {
  const team = await prisma.team.findUniqueOrThrow({
    where: { id },
    include: {
      teamSocials: true,
    },
  });

  return team;
};

const updateTeamInDB = async (id: string, payload: Partial<Team>) => {
  const updatedTeam = await prisma.team.update({
    where: { id },
    data: payload,
    include: {
      teamSocials: true,
    },
  });

  return updatedTeam;
};

const deleteTeamInDB = async (id: string) => {
  const deletedTeam = await prisma.team.delete({
    where: { id },
    include: {
      teamSocials: true,
    },
  });

  return deletedTeam;
};

const addTeamSocial = async (payload: TeamSocial) => {
  const response = await prisma.teamSocial.create({
    data: payload,
    include: {
      team: true,
    },
  });

  return response;
};

const updateTeamSocial = async (id: string, payload: Partial<TeamSocial>) => {
  const updatedTeamSocial = await prisma.teamSocial.update({
    where: { id },
    data: payload,
    include: {
      team: true,
    },
  });

  return updatedTeamSocial;
};

const deleteTeamSocial = async (id: string) => {
  const deletedTeamSocial = await prisma.teamSocial.delete({
    where: { id },
  });

  return deletedTeamSocial;
};

export const TeamService = {
  createTeamIntoDB,
  getAllTeamsFromDB,
  getTeamByIdFromDB,
  updateTeamInDB,
  deleteTeamInDB,
  addTeamSocial,
  updateTeamSocial,
  deleteTeamSocial,
};
