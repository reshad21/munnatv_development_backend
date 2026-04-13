import z from 'zod';

const subscribeValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
  }),
});

export const SubscribeValidation = {
  subscribeValidation,
};