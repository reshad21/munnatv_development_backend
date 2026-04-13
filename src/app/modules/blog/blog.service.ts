import { Blog, BlogComment } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createBlogIntoDB = async (payload: Blog) => {
  const response = await prisma.blog.create({ data: payload });

  return response;
};

const getAllBlogsFromDB = async (query: Record<string, any>) => {
  const blogsQuery = builderQuery({
    searchFields: ['title', 'content'],
    searchTerm: query.searchTerm,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    filter: query.filter ? JSON.parse(query.filter) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [blogs, total] = await prisma.$transaction([
    prisma.blog.findMany({
      where: blogsQuery.where,
      include: { blogComments: true, category: true },
    }),
    prisma.blog.count({ where: blogsQuery.where }),
  ]);

  return {
    meta: {
      totalItems: total,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(total / blogsQuery.take),
    },
    data: blogs,
  };
};

const getBlogByIdFromDB = async (id: string) => {
  const blog = await prisma.blog.findUniqueOrThrow({
    where: { id },
    include: { blogComments: true },
  });

  return blog;
};

const updateBlogInDB = async (id: string, payload: Partial<Blog>) => {
  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return updatedBlog;
};

const deleteBlogInDB = async (id: string) => {
  const deletedBlog = await prisma.blog.delete({ where: { id } });

  return deletedBlog;
};

const addBlogComment = async (payload: BlogComment) => {
  const response = await prisma.blogComment.create({ data: payload });

  return response;
};

const updateBlogComment = async (id: string, payload: Partial<BlogComment>) => {
  const updatedComment = await prisma.blogComment.update({
    where: { id },
    data: payload,
  });

  return updatedComment;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogInDB,
  deleteBlogInDB,
  addBlogComment,
  updateBlogComment,
};
