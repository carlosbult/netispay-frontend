'use client';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@components/ui/alert';
import { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert variant="destructive">
      <AlertTitle>
        Ha ocurrido un error al intentar obtener la informacion del cliente
      </AlertTitle>
      <Button
        onClick={() => {
          reset();
        }}
      >
        Try again
      </Button>
    </Alert>
  );
};

export default Error;
