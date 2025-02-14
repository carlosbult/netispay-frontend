import { z } from 'zod';

export const bankProductSpecificConfigSchema = z.object({
  id: z.number().optional(),
  property_key: z.string(),
  property_value: z.string(),
  title: z.string(),
  description: z.string(),
});

export const updateBankProductSchema = z
  .object({
    is_active: z.boolean(),
    api_url: z.string(),
    api_key: z.string(),
    description: z.string().nullable(),
    bank_commission_rate: z.number(),
    bank_operation_rate: z.number(),
    bank_product_specific_config: z.array(bankProductSpecificConfigSchema),
  })
  .superRefine((data, ctx) => {
    const seenKeys = new Map<string, number[]>(); // Stores duplicate indices

    data.bank_product_specific_config.forEach((item, index) => {
      if (seenKeys.has(item.property_key)) {
        seenKeys.get(item.property_key)?.push(index);
      } else {
        seenKeys.set(item.property_key, [index]);
      }
    });

    // Add an error message to each duplicate field
    seenKeys.forEach((indexes, key) => {
      if (indexes.length > 1) {
        indexes.forEach((idx) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `La Clave [Key] "${key}" esta duplicada.`,
            path: ['bank_product_specific_config', idx, 'property_key'],
          });
        });
      }
    });
  });

export type TUpdateBankProduct = z.infer<typeof updateBankProductSchema>;
export type TBankProductSpecificConfig = z.infer<
  typeof bankProductSpecificConfigSchema
>;
