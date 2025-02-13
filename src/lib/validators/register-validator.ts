import { z } from 'zod';

// TO-DO
// enhance the verification to dni

export const SignUpSchemaValidator = z
  .object({
    name: z.string().min(1, {
      message: 'El nombre es obligatorio.',
    }),
    email: z.string().email({
      message: 'Debes ingresar un correo electrónico válido.',
    }),
    password: z.string().min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres.',
    }),
    confirm_password: z.string().min(8, {
      message:
        'La confirmación de la contraseña debe tener al menos 8 caracteres.',
    }),
    type_of_person: z.enum(['JURIDIC', 'NATURAL'], {
      message:
        'Debes seleccionar un tipo de persona válida (JURIDIC o NATURAL).',
    }),
    network_manager_user_id: z.string({
      message:
        'El ID del administrador de red debe ser un número entero positivo.',
    }),
    dni: z.string().min(6, {
      message: 'El DNI debe tener al menos 6 caracteres.',
    }),
    phone: z.string().min(6, {
      message: 'El teléfono debe tener al menos 6 caracteres.',
    }),
    address: z.string().min(5, {
      message: 'La dirección debe tener al menos 5 caracteres.',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirm_password'],
  });

export type TSignUpValidator = z.infer<typeof SignUpSchemaValidator>;
