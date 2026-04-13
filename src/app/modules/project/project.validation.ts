import z from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string().optional(),
    liveUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    thumbnail: z.string().optional(),
    startDate: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    endDate: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    author: z.string({ required_error: 'Author is required' }),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    liveUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    thumbnail: z.string().optional(),
    startDate: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    endDate: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    author: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

const addProjectFeatureValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Feature name is required' }),
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
});

const updateProjectFeatureValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Feature name is required' }),
  }),
});

const addProjectTechStackValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Tech stack name is required' }),
    icon: z.string().optional(),
    slogan: z.string({ required_error: 'Slogan is required' }),
    projectId: z.string({ required_error: 'Project ID is required' }),
  }),
});

const updateProjectTechStackValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    slogan: z.string().optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
  addProjectFeatureValidationSchema,
  updateProjectFeatureValidationSchema,
  addProjectTechStackValidationSchema,
  updateProjectTechStackValidationSchema,
};
