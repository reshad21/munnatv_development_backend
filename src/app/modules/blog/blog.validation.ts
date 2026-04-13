import z from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    thumbnail: z.string({ required_error: 'Thumbnail is required' }),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

const addBlogCommentValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    content: z.string({ required_error: 'Content is required' }),
    blogId: z.string({ required_error: 'Blog ID is required' }),
  }),
});

const updateBlogCommentValidationSchema = z.object({
  body: z.object({
    content: z.string({ required_error: 'Content is required' }),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
  addBlogCommentValidationSchema,
  updateBlogCommentValidationSchema,
};
