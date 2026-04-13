import z from 'zod';

const createServiceToolValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    slogan: z.string({ required_error: 'Slogan is required' }),
    icon: z.string().optional(),
  }),
});

const updateServiceToolValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slogan: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const ServiceToolValidation = {
  createServiceToolValidationSchema,
  updateServiceToolValidationSchema,
};
