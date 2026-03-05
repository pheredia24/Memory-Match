import { Trophy } from 'lucide-react';
import { EmptyState } from '../EmptyState';

interface LeaderboardEmptyScreenProps {
  onPlayNow: () => void;
  onShareGame: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function LeaderboardEmptyScreen({ 
  onPlayNow, 
  onShareGame,
  showBackButton = true,
  onBack
}: LeaderboardEmptyScreenProps) {
  return (
    <EmptyState
      showBackButton={showBackButton}
      onBack={onBack}
      icon={Trophy}
      iconColor="text-yellow-600"
      title="Aún no hay puntuaciones"
      description="Nadie ha completado este juego todavía."
      helperText="¡Sé el primero en lograr la mejor puntuación!"
      primaryAction={{
        label: 'Jugar ahora',
        onClick: onPlayNow
      }}
      secondaryAction={{
        label: 'Compartir juego',
        onClick: onShareGame
      }}
    />
  );
}
