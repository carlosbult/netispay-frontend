import { type ICommissionISPConfig } from '@interfaces/isp';
import { type TCommissionSchema } from '@lib/validators/commissionsUpdate-validator';

const updateISPCommissionAdapter = (
  newData: TCommissionSchema,
  oldData: ICommissionISPConfig,
): Partial<ICommissionISPConfig> => {
  const patch: Partial<ICommissionISPConfig> = {};

  if (newData.igtf_rate !== oldData.igtf_rate) {
    patch.igtf_rate = newData.igtf_rate;
  }

  if (newData.iva_rate !== oldData.iva_rate) {
    patch.iva_rate = newData.iva_rate;
  }

  if (newData.add_iva_ves !== oldData.add_iva_ves) {
    patch.add_iva_ves = newData.add_iva_ves;
  }

  if (newData.add_iva_usd !== oldData.add_iva_usd) {
    patch.add_iva_usd = newData.add_iva_usd;
  }

  if (newData.add_igtf !== oldData.add_igtf) {
    patch.add_igtf = newData.add_igtf;
  }

  if (newData.commission_type !== oldData.commission_type) {
    patch.commission_type = newData.commission_type;
  }

  if (newData.allow_partial_payment !== oldData.allow_partial_payment) {
    patch.allow_partial_payment = newData.allow_partial_payment;
  }

  return patch;
};

export default updateISPCommissionAdapter;
