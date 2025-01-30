import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    network_manager_user_id: z
      .number()
      .min(2, { message: 'Se necesita el ID del servicio' }),
    email: z.string().email({ message: 'Dirección de correo invalida.' }),
    type_of_person: z.enum(['NATURAL', 'JURIDIC']),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe ser tener minimo 8 caracteres.' }),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['passwordConfirm'],
    },
  );

export const loginSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export const OtpSchema = z.object({
  otp: z.string().min(6, {
    message: 'El código OTP debe tener 6 caracteres.',
  }),
});
