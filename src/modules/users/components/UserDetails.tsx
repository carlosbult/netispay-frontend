'use client';
import { LoadingState } from 'src/shared/components/Loader';
import { Card, CardContent, CardTitle } from 'src/shared/components/ui/card';
import { useUser } from '../hooks/useUsers';

export const UserDetails = () => {
  const { data: user, isPending, error } = useUser();

  if (isPending) {
    return <LoadingState title="Cargando información del usuario..." />;
  }

  if (error !== null)
    return (
      <Card className="p-2">
        <CardTitle>¡Lo sentimos, ha ocurrido un error!</CardTitle>
        <CardContent className="p-0 mt-4">
          <p className="text-red-500">{error?.message}</p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Detalle de cliente</h2>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            user.is_active
              ? 'bg-success text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {user.is_active ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">ID en Administrador de red</span>
          <span className="font-medium">
            #{user.client_profile.network_manager_user_id}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="text-gray-600 text-xs">Nombre Completo</span>
          <span className="font-medium text-sm">
            {user.client_profile.name}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="text-gray-600 text-xs">Email</span>
          <span className="font-medium text-sm">{user.email}</span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="text-gray-600 text-xs">Teléfono</span>
          <span className="font-medium text-sm">
            {user.client_profile.phone}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="text-gray-600 text-xs">Dirección</span>
          <span className="font-medium text-sm">
            {user.client_profile.address}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="text-gray-600 text-xs">Tipo de persona</span>
          <span className="font-medium text-sm">
            {user.client_profile.type_of_person}
          </span>
        </div>
      </div>
    </Card>
  );
};
