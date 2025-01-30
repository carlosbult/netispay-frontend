import { Loader } from 'lucide-react';

interface LoadingStateProps {
  title?: string;
  className?: string;
}

export const LoadingState = ({
  title = 'Cargando...',
  className,
}: LoadingStateProps) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <Loader className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};
