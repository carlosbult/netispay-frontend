import { z } from 'zod';

export const updateBankProductSchema = z.object({
  is_active: z.boolean(),
  api_url: z.string(),
  api_key: z.string(),
  // api_secret: z.string(),
  description: z.string().nullable(),
  bank_commission_rate: z.number(),
  bank_operation_rate: z.number(),
});

export type TUpdateBankProduct = z.infer<typeof updateBankProductSchema>;
