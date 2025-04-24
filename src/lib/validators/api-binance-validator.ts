import { z } from 'zod';

export const apiBinanceValidator = z.object({
  transaction_date: z.date(),
  reference_number: z.string(),
  amount: z.number(),
});

export type TApiBinanceValidator = z.infer<typeof apiBinanceValidator>;
