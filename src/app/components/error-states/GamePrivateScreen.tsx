import { Lock } from 'lucide-react';
import { EmptyState } from '../EmptyState';

interface GamePrivateScreenProps {
  onGoHome: () => void;
  onCreateGame: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function GamePrivateScreen({ 
  onGoHome, 
  onCreateGame,
  showBackButton = false,
  onBack
}: GamePrivateScreenProps) {
  return (
    <EmptyState
      showBackButton={showBackButton}
      onBack={onBack}
      icon={Lock}
      iconColor="text-gray-600"
      title="Juego privado"
      description="Este juego solo puede ser visto por su creador."
      primaryAction={{
        label: 'Volver al inicio',
        onClick: onGoHome
      }}
      secondaryAction={{
        label: 'Crear tu propio juego',
        onClick: onCreateGame
      }}
    />
  );
}
