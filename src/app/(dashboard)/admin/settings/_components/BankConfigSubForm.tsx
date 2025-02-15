/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useFieldArray, type Control } from 'react-hook-form';

interface IBankConfigSubFormProps {
  // fields: TBankProductSpecificConfig[];
  control: Control<any>;
}

const BankConfigSubForm = (props: IBankConfigSubFormProps) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bank_product_specific_config',
  });
  return (
    <fieldset className="border rounded-md p-4 space-y-4">
      <legend className="font-semibold px-2">
        Campos personales de producto
      </legend>
      <p>
        Estos son campos requeridos por algunos productos requeridos para
        asociarlo al servicio
      </p>
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-2 bg-card p-4 rounded-md">
          <div className="w-full inline-flex justify-between items-center">
            <h3 className="font-bold">
              Campo de la configuración #{index + 1}
            </h3>
            <Button
              type="button"
              onClick={() => {
                remove(index);
              }}
              variant={'destructive'}
            >
              ❌ Eliminar
            </Button>
          </div>
          {/* <label className="font-semibold">Clave:</label>
        <input
          {...control.register(
            `bank_product_specific_config.${index}.property_key`,
          )}
          className="border p-2 w-full"
        /> */}

          <FormField
            control={control}
            name={`bank_product_specific_config.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`bank_product_specific_config.${index}.title`}
                >
                  Título:
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`bank_product_specific_config.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`bank_product_specific_config.${index}.description`}
                >
                  Descripción:
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`bank_product_specific_config.${index}.property_key`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`bank_product_specific_config.${index}.property_key`}
                >
                  Clave [Key]:
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`bank_product_specific_config.${index}.property_value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`bank_product_specific_config.${index}.property_value`}
                >
                  Valor [Value]:
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <label className="font-semibold">Valor:</label>
        <input
          {...control.register(
            `bank_product_specific_config.${index}.property_value`,
          )}
          className="border p-2 w-full"
        /> */}

          {/* <label className="font-semibold">Título:</label>
        <input
          {...control.register(`bank_product_specific_config.${index}.title`)}
          className="border p-2 w-full"
        /> */}

          {/* <label className="font-semibold">Descripción:</label>
        <input
          {...control.register(
            `bank_product_specific_config.${index}.description`,
          )}
          className="border p-2 w-full"
        /> */}
        </div>
      ))}

      <Button
        type="button"
        onClick={() => {
          append({
            id: Date.now(),
            property_key: '',
            property_value: '',
            title: '',
            description: '',
          });
        }}
        variant={'outline'}
      >
        ➕ Agregar Configuración
      </Button>
    </fieldset>
  );
};

export default BankConfigSubForm;
