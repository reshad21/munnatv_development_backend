import z from 'zod';

const createIndustryWeServeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    icon: z.string().optional(),
  }),
});

const updateIndustryWeServeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const IndustryWeServeValidation = {
  createIndustryWeServeValidationSchema,
  updateIndustryWeServeValidationSchema,
};
