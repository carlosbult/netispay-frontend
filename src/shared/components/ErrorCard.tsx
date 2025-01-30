import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface CardErrorProps {
  title?: string;
  error: Error;
  className?: string;
}

export const ErrorCard = ({
  title = '¡Lo sentimos, no hemos podido obtener los datos requeridos!',
  error,
}: CardErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{error?.message}</AlertDescription>
    </Alert>
  );
};
