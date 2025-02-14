import {
  type BankPaymentProduct,
  type IBankPaymentProductAdapter,
  type IBankProductSpecificConfig,
} from '@interfaces/paymentMethods.interface';
import { type TUpdateBankProduct } from '@lib/validators/updateBankProduct-validator';

const updateBankProductAdapter = (
  newData: TUpdateBankProduct,
  oldData: BankPaymentProduct,
): Partial<IBankPaymentProductAdapter> => {
  const patch: Partial<IBankPaymentProductAdapter> = {};

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
  if (oldData.configurations?.length > 0) {
    const oldConfig = oldData.configurations[0];
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

    if (Object.keys(configPatch).length > 0) {
      patch.configurations = [{ ...oldConfig, ...configPatch }];
    }
  }

  // 🔹 Handle `bank_product_specific_config`
  if (
    Array.isArray(newData.bank_product_specific_config) &&
    newData.bank_product_specific_config.length > 0
  ) {
    const updatedConfigs: Array<Omit<IBankProductSpecificConfig, 'id'>> = [];

    newData.bank_product_specific_config.forEach((newConfig) => {
      // Create a new object WITHOUT `id`
      const newConfigWithoutId: Omit<IBankProductSpecificConfig, 'id'> = {
        property_key: newConfig.property_key,
        property_value: newConfig.property_value,
        title: newConfig.title,
        description: newConfig.description,
      };

      const oldConfig = oldData.bank_product_specific_config?.find(
        (c) => c.id === newConfig.id,
      );

      if (
        oldConfig == null ||
        hasConfigChanged(newConfigWithoutId, oldConfig)
      ) {
        updatedConfigs.push(newConfigWithoutId);
      }
    });

    if (updatedConfigs.length > 0) {
      patch.properties = updatedConfigs;
    }
  }

  return patch;
};

/**
 * 🔍 Function to check if there are changes in a specific configuration.
 */
const hasConfigChanged = (
  newConfig: IBankProductSpecificConfig,
  oldConfig: IBankProductSpecificConfig,
): boolean => {
  return (
    newConfig.property_key !== oldConfig.property_key ||
    newConfig.property_value !== oldConfig.property_value ||
    newConfig.title !== oldConfig.title ||
    newConfig.description !== oldConfig.description
  );
};

export default updateBankProductAdapter;
