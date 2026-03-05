import { FileQuestion } from 'lucide-react';
import { EmptyState } from '../EmptyState';

interface GameNotFoundScreenProps {
  onExploreGames: () => void;
  onCreateGame: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function GameNotFoundScreen({ 
  onExploreGames, 
  onCreateGame,
  showBackButton = false,
  onBack
}: GameNotFoundScreenProps) {
  return (
    <EmptyState
      showBackButton={showBackButton}
      onBack={onBack}
      icon={FileQuestion}
      iconColor="text-purple-600"
      title="Juego no encontrado"
      description="Este juego no existe o fue eliminado."
      primaryAction={{
        label: 'Explorar juegos',
        onClick: onExploreGames
      }}
      secondaryAction={{
        label: 'Crear un juego',
        onClick: onCreateGame
      }}
    />
  );
}
