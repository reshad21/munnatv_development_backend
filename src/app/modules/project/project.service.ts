import { Prisma, Project, ProjectFeature, ProjectTechStack } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createProjectIntoDB = async (payload: Project) => {
  const response = await prisma.project.create({
    data: payload,
    include: {
      category: true,
      projectFeatures: true,
      projectTechStacks: true,
    },
  });

  return response;
};

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const projectsQuery = builderQuery({
    searchFields: ['name', 'description', 'author'],
    searchTerm: query.searchTerm as string,
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [projects, total] = await prisma.$transaction([
    prisma.project.findMany({
      where: projectsQuery.where,
      include: {
        category: true,
        projectFeatures: true,
        projectTechStacks: true,
      },
      skip: projectsQuery.skip,
      take: projectsQuery.take,
      orderBy: projectsQuery.orderBy,
    }),
    prisma.project.count({ where: projectsQuery.where }),
  ]);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / projectsQuery.take),
    },
    data: projects,
  };
};

const getProjectByIdFromDB = async (id: string) => {
  const project = await prisma.project.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
      projectFeatures: true,
      projectTechStacks: true,
    },
  });

  return project;
};

const updateProjectInDB = async (
  id: string,
  payload: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  // Explicitly pick fields you want to allow updating
  const data: Prisma.ProjectUpdateInput = {
    name: payload.name,
    description: payload.description,
    liveUrl: payload.liveUrl,
    demoUrl: payload.demoUrl,
    thumbnail: payload.thumbnail,
    startDate: payload.startDate,
    endDate: payload.endDate,
    author: payload.author,

    // handle category relation properly
    category: payload.categoryId
      ? { connect: { id: payload.categoryId } }
      : undefined,
  };

  const updatedProject = await prisma.project.update({
    where: { id },
    data,
    include: {
      category: true,
      projectFeatures: true,
      projectTechStacks: true,
    },
  });

  return updatedProject;
};



const deleteProjectInDB = async (id: string) => {
  const deletedProject = await prisma.project.delete({
    where: { id },
    include: {
      category: true,
      projectFeatures: true,
      projectTechStacks: true,
    },
  });

  return deletedProject;
};

const addProjectFeature = async (payload: ProjectFeature) => {
  const response = await prisma.projectFeature.create({
    data: payload,
    include: {
      project: true,
    },
  });

  return response;
};

const updateProjectFeature = async (
  id: string,
  payload: Partial<ProjectFeature>,
) => {
  const updatedFeature = await prisma.projectFeature.update({
    where: { id },
    data: payload,
    include: {
      project: true,
    },
  });

  return updatedFeature;
};

const deleteProjectFeature = async (id: string) => {
  const deletedFeature = await prisma.projectFeature.delete({
    where: { id },
  });

  return deletedFeature;
};

const addProjectTechStack = async (payload: ProjectTechStack) => {
  const response = await prisma.projectTechStack.create({
    data: payload,
    include: {
      project: true,
    },
  });

  return response;
};

const updateProjectTechStack = async (
  id: string,
  payload: Partial<ProjectTechStack>,
) => {
  const updatedTechStack = await prisma.projectTechStack.update({
    where: { id },
    data: payload,
    include: {
      project: true,
    },
  });

  return updatedTechStack;
};

const deleteProjectTechStack = async (id: string) => {
  const deletedTechStack = await prisma.projectTechStack.delete({
    where: { id },
  });

  return deletedTechStack;
};

export const ProjectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectInDB,
  deleteProjectInDB,
  addProjectFeature,
  updateProjectFeature,
  deleteProjectFeature,
  addProjectTechStack,
  updateProjectTechStack,
  deleteProjectTechStack,
};
