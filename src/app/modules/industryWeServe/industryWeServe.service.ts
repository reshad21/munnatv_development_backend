import { IndustryWeServe } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createIndustryWeServeIntoDB = async (payload: IndustryWeServe) => {
  const response = await prisma.industryWeServe.create({
    data: payload,
  });

  return response;
};

const getAllIndustryWeServeFromDB = async (query: Record<string, unknown>) => {
  const industryWeServeQuery = builderQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm as string,
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [industryWeServe, total] = await prisma.$transaction([
    prisma.industryWeServe.findMany({
      where: industryWeServeQuery.where,
      skip: industryWeServeQuery.skip,
      take: industryWeServeQuery.take,
      orderBy: industryWeServeQuery.orderBy,
    }),
    prisma.industryWeServe.count({ where: industryWeServeQuery.where }),
  ]);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / industryWeServeQuery.take),
    },
    data: industryWeServe,
  };
};

const getIndustryWeServeByIdFromDB = async (id: string) => {
  const industryWeServe = await prisma.industryWeServe.findUniqueOrThrow({
    where: { id },
  });

  return industryWeServe;
};

const updateIndustryWeServeInDB = async (
  id: string,
  payload: Partial<IndustryWeServe>,
) => {
  const updatedIndustryWeServe = await prisma.industryWeServe.update({
    where: { id },
    data: payload,
  });

  return updatedIndustryWeServe;
};

const deleteIndustryWeServeInDB = async (id: string) => {
  const deletedIndustryWeServe = await prisma.industryWeServe.delete({
    where: { id },
  });

  return deletedIndustryWeServe;
};

export const IndustryWeServeService = {
  createIndustryWeServeIntoDB,
  getAllIndustryWeServeFromDB,
  getIndustryWeServeByIdFromDB,
  updateIndustryWeServeInDB,
  deleteIndustryWeServeInDB,
};
