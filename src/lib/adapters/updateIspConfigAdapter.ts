import { type TIspConfigSchema } from '@lib/validators/updateISPConfig-validator';
import type {
  IIsp,
  IISPConfig,
} from 'src/app/(dashboard)/admin/settings/actions';

const updateIspConfigAdapter = (
  newData: TIspConfigSchema,
  oldData: IISPConfig,
): Partial<IISPConfig> => {
  const patch: Partial<IISPConfig> = {};

  // Compare basic properties between newData and oldData
  if (newData.api_url !== oldData.api_url) {
    patch.api_url = newData.api_url;
  }
  if (newData.api_key !== oldData.api_key) {
    patch.api_key = newData.api_key;
  }

  // Compare 'isp' object (newData.isp is now an object, not an array)
  if (newData.isp != null) {
    // Find the corresponding old Isp in the array by name or another unique key (e.g., `id`)
    const oldIsp = oldData.isp.find((isp) => isp.name === newData.isp.name); // Or use another unique identifier like `id`

    if (oldIsp != null) {
      const updatedFields: Partial<IIsp> = {};

      // Compare each field in the isp object
      if (newData.isp.name !== oldIsp.name)
        updatedFields.name = newData.isp.name;
      if (newData.isp.email !== oldIsp.email)
        updatedFields.email = newData.isp.email;
      if (newData.isp.rif !== oldIsp.rif) updatedFields.rif = newData.isp.rif;
      if (newData.isp.is_active !== oldIsp.is_active)
        updatedFields.is_active = newData.isp.is_active;

      // If there are any updated fields, push the updated Isp object into the patch
      if (Object.keys(updatedFields).length > 0) {
        patch.isp = [{ ...oldIsp, ...updatedFields }];
      }
    }
  }

  return patch;
};

export default updateIspConfigAdapter;
