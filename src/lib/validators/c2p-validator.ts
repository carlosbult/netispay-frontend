import { z } from 'zod';

export const c2PValidator = z.object({
  phoneNumber: z.string().min(10).max(10),
  document: z.string().min(7).max(8),
  refNumber: z.string().min(1).max(20),
});

export type TC2PValidator = z.infer<typeof c2PValidator>;
