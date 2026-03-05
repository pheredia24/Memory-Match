import { AlertCircle } from 'lucide-react';
import { EmptyState } from '../EmptyState';

interface ServerErrorScreenProps {
  onRetry: () => void;
  onGoHome: () => void;
}

export function ServerErrorScreen({ onRetry, onGoHome }: ServerErrorScreenProps) {
  return (
    <EmptyState
      icon={AlertCircle}
      iconColor="text-red-600"
      title="Algo salió mal"
      description="No pudimos cargar esta página. Inténtalo de nuevo."
      primaryAction={{
        label: 'Reintentar',
        onClick: onRetry
      }}
      secondaryAction={{
        label: 'Volver al inicio',
        onClick: onGoHome
      }}
    />
  );
}
