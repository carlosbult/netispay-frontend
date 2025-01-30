import { z } from 'zod';

export const ClientProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  dni: z.string(),
  phone: z.string(),
  address: z.string(),
  type_of_person: z.enum(['JURIDIC', 'NATURAL']),
});

export const ClientPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    password_confirmation: z
      .string()
      .min(8, 'Password confirmation must be at least 8 characters long.'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'], // Error will be associated with the confirmation field
  });

export type TClientProfile = z.infer<typeof ClientProfileSchema>;
export type TClientPassword = z.infer<typeof ClientPasswordSchema>;
