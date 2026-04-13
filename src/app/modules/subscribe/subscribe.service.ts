import { Subscribe } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { json2csv } from 'json-2-csv';

const subscribeUser = async (payload: Subscribe) => {
  const response = await prisma.subscribe.create({ data: payload });
  return response;
};

const getAllSubscribers = async (query: Record<string, any>) => {
  const subscribersQuery = builderQuery({
    searchFields: ['email'],
    searchTerm: query.searchTerm,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    filter: query.filter ? JSON.parse(query.filter) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const subscribers = await prisma.subscribe.findMany(subscribersQuery.where);
  const total = await prisma.subscribe.count(subscribersQuery.where);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / (query.limit ? Number(query.limit) : 10)),
    },
    data: subscribers,
  };
};

const deleteSubscriber = async (id: string) => {
  const deletedSubscriber = await prisma.subscribe.delete({ where: { id } });
  return deletedSubscriber;
};

const exportSubscribers = async () => {
  const response = await prisma.subscribe.findMany();

  const csvData = await json2csv(response, {
    emptyFieldValue: '',
    prependHeader: true,
    keys: ['id', 'email', 'createdAt'],
  });

  return csvData;
}

export const SubscribeService = {
  subscribeUser,
  getAllSubscribers,
  deleteSubscriber,
  exportSubscribers,
};
