import { SearchX } from 'lucide-react';
import { EmptyState } from '../EmptyState';

interface NotFoundScreenProps {
  onGoHome: () => void;
  onViewGames: () => void;
}

export function NotFoundScreen({ onGoHome, onViewGames }: NotFoundScreenProps) {
  return (
    <EmptyState
      icon={SearchX}
      iconColor="text-orange-600"
      title="Página no encontrada"
      description="La página que buscas no existe o fue movida."
      primaryAction={{
        label: 'Volver al inicio',
        onClick: onGoHome
      }}
      secondaryAction={{
        label: 'Ver mis juegos',
        onClick: onViewGames
      }}
    />
  );
}
