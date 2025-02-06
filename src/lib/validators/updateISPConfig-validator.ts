import { z } from 'zod';

export const ispConfigSchema = z.object({
  api_url: z.string().url('Must be a valid URL'),
  api_key: z.string().min(1, 'API Key is required'),
  isp: z.object({
    name: z.string().min(1, 'ISP Name is required'),
    email: z.string().email('Must be a valid email'),
    rif: z.string().min(1, 'RIF is required'),
    is_active: z.boolean(),
  }),
});

export type TIspConfigSchema = z.infer<typeof ispConfigSchema>;
