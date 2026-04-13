import { Category } from '@prisma/client';
import prisma from '../../../db/db.config';

const createCategory = async (payload: Category) => {
  const response = await prisma.category.create({
    data: payload,
  });

  return response;
};

const getAllCategories = async () => {
  const response = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response;
};


const getCategoryById = async (id: string) => {
  const response = await prisma.category.findUnique({
    where: { id },
  });

  return response;
};


const updateCategory = async (id: string, payload: Category) => {
  const response = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return response;
};


const deleteCategory = async (id: string) => {
  const response = await prisma.category.delete({
    where: { id },
  });

  

  return response;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
