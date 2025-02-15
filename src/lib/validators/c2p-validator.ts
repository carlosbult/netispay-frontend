import { z } from 'zod';

export const c2PValidator = z.object({
  bank_code: z.string().min(1).max(4),
  phone_number: z.string().min(10).max(10),
  document_id: z.string().min(7).max(8),
  otp: z.string().min(1).max(10),
});

export type TC2PValidator = z.infer<typeof c2PValidator>;
