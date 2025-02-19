import { z } from 'zod';

export const CommissionType = z.enum(['ISP_ASSUMES', 'CLIENT_ASSUMES']); // Agrega más valores si es necesario

export const CommissionSchema = z.object({
  igtf_rate: z.number(),
  iva_rate: z.number(),
  add_iva_ves: z.boolean(),
  add_iva_usd: z.boolean(),
  add_igtf: z.boolean(),
  commission_type: CommissionType,
  allow_partial_payment: z.boolean(),
});

export type TCommissionSchema = z.infer<typeof CommissionSchema>;
