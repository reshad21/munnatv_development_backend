import z from 'zod';

const createTeamValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    position: z.string({ required_error: 'Position is required' }),
    photo: z.string().optional(),
  }),
});

const updateTeamValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    position: z.string().optional(),
    photo: z.string().optional(),
  }),
});

const addTeamSocialValidationSchema = z.object({
  body: z.object({
    link: z
      .string({ required_error: 'Link is required' })
      .url('Invalid URL format'),
    name: z.string({ required_error: 'Social media name is required' }),
    icon: z.string().optional(),
    teamId: z.string({ required_error: 'Team ID is required' }),
  }),
});

const updateTeamSocialValidationSchema = z.object({
  body: z.object({
    link: z.string().url('Invalid URL format').optional(),
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const TeamValidation = {
  createTeamValidationSchema,
  updateTeamValidationSchema,
  addTeamSocialValidationSchema,
  updateTeamSocialValidationSchema,
};
