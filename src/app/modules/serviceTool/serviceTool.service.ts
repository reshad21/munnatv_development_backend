import { ServiceTool } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createServiceToolIntoDB = async (payload: ServiceTool) => {
  const response = await prisma.serviceTool.create({
    data: payload,
  });

  return response;
};

const getAllServiceToolsFromDB = async (query: Record<string, unknown>) => {
  const serviceToolsQuery = builderQuery({
    searchFields: ['name', 'slogan'],
    searchTerm: query.searchTerm as string,
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [serviceTools, total] = await prisma.$transaction([
    prisma.serviceTool.findMany({
      where: serviceToolsQuery.where,
      skip: serviceToolsQuery.skip,
      take: serviceToolsQuery.take,
      orderBy: serviceToolsQuery.orderBy,
    }),
    prisma.serviceTool.count({ where: serviceToolsQuery.where }),
  ]);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / serviceToolsQuery.take),
    },
    data: serviceTools,
  };
};

const getServiceToolByIdFromDB = async (id: string) => {
  const serviceTool = await prisma.serviceTool.findUniqueOrThrow({
    where: { id },
  });

  return serviceTool;
};

const updateServiceToolInDB = async (
  id: string,
  payload: Partial<ServiceTool>,
) => {
  const updatedServiceTool = await prisma.serviceTool.update({
    where: { id },
    data: payload,
  });

  return updatedServiceTool;
};

const deleteServiceToolInDB = async (id: string) => {
  const deletedServiceTool = await prisma.serviceTool.delete({
    where: { id },
  });

  return deletedServiceTool;
};

export const ServiceToolService = {
  createServiceToolIntoDB,
  getAllServiceToolsFromDB,
  getServiceToolByIdFromDB,
  updateServiceToolInDB,
  deleteServiceToolInDB,
};
