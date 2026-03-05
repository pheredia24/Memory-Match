import { PackagePlus } from 'lucide-react';
import { EmptyState } from '../EmptyState';

interface NoGamesYetScreenProps {
  onCreateGame: () => void;
  onExploreExamples: () => void;
}

export function NoGamesYetScreen({ onCreateGame, onExploreExamples }: NoGamesYetScreenProps) {
  return (
    <EmptyState
      headerTitle="MemoryGame"
      icon={PackagePlus}
      iconColor="text-teal-600"
      title="Aún no tienes juegos"
      description="Crea tu primer memory game en menos de un minuto."
      primaryAction={{
        label: 'Crear juego',
        onClick: onCreateGame
      }}
      secondaryAction={{
        label: 'Explorar ejemplos',
        onClick: onExploreExamples
      }}
    />
  );
}
