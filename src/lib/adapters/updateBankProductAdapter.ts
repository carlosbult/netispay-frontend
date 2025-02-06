import { type BankPaymentProduct } from '@interfaces/paymentMethods.interface';
import { type TUpdateBankProduct } from '@lib/validators/updateBankProduct-validator';

const updateBankProductAdapter = (
  newData: TUpdateBankProduct,
  oldData: BankPaymentProduct,
): Partial<BankPaymentProduct> => {
  const patch: Partial<BankPaymentProduct> = {};

  // Compare top-level fields
  if (newData.is_active !== oldData.is_active) {
    patch.is_active = newData.is_active;
  }
  if (newData.api_url !== oldData.api_url) {
    patch.api_url = newData.api_url;
  }
  if (newData.api_key !== oldData.api_key) {
    patch.api_key = newData.api_key;
  }

  // Update configuration values (description, bank_commission_rate, bank_operation_rate)
  // Assume that the update applies to the first configuration in the array.
  if (oldData.configurations != null && oldData.configurations.length > 0) {
    const oldConfig = oldData.configurations[0];

    // Build a patch for the configuration item
    const configPatch: Partial<typeof oldConfig> = {};

    if (newData.description !== oldConfig.description) {
      configPatch.description = newData.description;
    }
    if (newData.bank_commission_rate !== oldConfig.bank_commission_rate) {
      configPatch.bank_commission_rate = newData.bank_commission_rate;
    }
    if (newData.bank_operation_rate !== oldConfig.bank_operation_rate) {
      configPatch.bank_operation_rate = newData.bank_operation_rate;
    }

    // Only update configurations if there's at least one changed field.
    if (Object.keys(configPatch).length > 0) {
      // Here we update the first configuration. If you need to update a specific one,
      // adjust the lookup logic accordingly.
      patch.configurations = [{ ...oldConfig, ...configPatch }];
    }
  }

  return patch;
};

export default updateBankProductAdapter;
