import { ArrowLeft, Edit, Share2, Link2, Trophy, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';

interface GameData {
  id: string;
  title: string;
  photoCount: number;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  createdAt: Date;
  photos: string[];
  stats: {
    totalPlays: number;
    uniqueUsers: number;
    completionRate: number;
    averageAttempts: number;
    averageTime: string;
  };
  recentGames: Array<{
    id: string;
    date: string;
    attempts: number;
    completionTime: string;
  }>;
  topPlayers?: Array<{
    rank: number;
    username: string;
    attempts: number;
    completionTime: string;
  }>;
}

interface GameDetailsScreenProps {
  game: GameData;
  onBack: () => void;
  onEdit: () => void;
  onShare: () => void;
  onViewLeaderboard?: () => void;
  onViewAllPlays?: () => void;
}

export function GameDetailsScreen({ game, onBack, onEdit, onShare, onViewLeaderboard, onViewAllPlays }: GameDetailsScreenProps) {
  const copyLink = () => {
    const link = `https://memorygame.app/play/${game.id}`;
    navigator.clipboard.writeText(link);
    toast.success('Enlace copiado al portapapeles');
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const topPlayers = game.topPlayers || [
    { rank: 1, username: 'Ana', attempts: 8, completionTime: '0:41' },
    { rank: 2, username: 'Marcos', attempts: 9, completionTime: '0:52' },
    { rank: 3, username: 'Laura', attempts: 10, completionTime: '1:02' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <Button
              onClick={onEdit}
              variant="outline"
              className="gap-2 text-sm h-9 border-gray-300"
            >
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{game.title}</h1>
          <p className="text-sm text-gray-500 mt-1">Detalles y estadísticas</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-5 max-w-2xl mx-auto pb-8">
        
        {/* Photo Thumbnails Grid */}
        <div className="grid grid-cols-4 gap-2">
          {game.photos.map((photo, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm ring-1 ring-gray-200"
              style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>

        {/* Compact Metrics Grid */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-1">Estadísticas</h2>
          <Card className="p-0 divide-y divide-gray-100 shadow-sm">
            {/* Row 1: Jugadas & Usuarios únicos */}
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div className="p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Jugadas</p>
                <p className="text-2xl font-bold text-gray-900">{game.stats.totalPlays}</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Usuarios únicos</p>
                <p className="text-2xl font-bold text-gray-900">{game.stats.uniqueUsers}</p>
              </div>
            </div>

            {/* Row 2: Tasa de finalización & Intentos promedio */}
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div className="p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Tasa de finalización</p>
                <p className="text-2xl font-bold text-teal-600">{game.stats.completionRate}%</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">Intentos promedio</p>
                <p className="text-2xl font-bold text-gray-900">{game.stats.averageAttempts}</p>
              </div>
            </div>

            {/* Row 3: Tiempo promedio (full width) */}
            <div className="p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Tiempo promedio</p>
              <p className="text-2xl font-bold text-gray-900">{game.stats.averageTime}</p>
            </div>
          </Card>
        </div>

        {/* Leaderboard Top 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Trophy className="h-4 w-4 text-teal-600" />
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Leaderboard</h2>
          </div>
          
          <Card className="p-2.5 divide-y divide-gray-100 shadow-sm">
            {topPlayers.map((player) => {
              const medal = getMedalEmoji(player.rank);
              
              return (
                <div key={player.rank} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
                  <span className="text-2xl flex-shrink-0">{medal}</span>
                  <span className="font-semibold text-gray-900 flex-1 min-w-0 truncate">{player.username}</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600 flex-shrink-0">
                    <span className="bg-gray-100 px-2 py-1 rounded">{player.attempts} intentos</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{player.completionTime}</span>
                  </div>
                </div>
              );
            })}
          </Card>

          {onViewLeaderboard && (
            <button
              onClick={onViewLeaderboard}
              className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-700 py-2.5 flex items-center justify-center gap-1 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Ver leaderboard completo
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Recent Plays */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-1">Últimas partidas</h2>
          
          <Card className="p-0 divide-y divide-gray-100 shadow-sm">
            {game.recentGames.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No hay partidas registradas aún</p>
              </div>
            ) : (
              game.recentGames.slice(0, 3).map((gameSession) => (
                <div key={gameSession.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-900">{gameSession.date}</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded">{gameSession.attempts} intentos</span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{gameSession.completionTime}</span>
                  </div>
                </div>
              ))
            )}
          </Card>

          {game.recentGames.length > 3 && onViewAllPlays && (
            <button
              onClick={onViewAllPlays}
              className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-700 py-2.5 flex items-center justify-center gap-1 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Ver todas
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Share Section */}
        <div className="space-y-2">
          <Button
            onClick={onShare}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 gap-2"
          >
            <Share2 className="h-5 w-5" />
            Compartir juego
          </Button>
          
          <Button
            onClick={copyLink}
            variant="outline"
            className="w-full h-12 gap-2 border-gray-300"
          >
            <Link2 className="h-5 w-5" />
            Copiar enlace
          </Button>
        </div>
      </div>
    </div>
  );
}
