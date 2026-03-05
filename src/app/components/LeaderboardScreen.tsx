import { ArrowLeft, Trophy, Clock, Target, Medal } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  attempts: number;
  completionTime: string;
}

interface LeaderboardScreenProps {
  gameTitle: string;
  entries: LeaderboardEntry[];
  onBack: () => void;
}

export function LeaderboardScreen({ gameTitle, entries, onBack }: LeaderboardScreenProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'alltime' | 'friends'>('alltime');
  const [showMore, setShowMore] = useState(false);

  // Get entries based on active tab (in real app, this would filter from API)
  const getFilteredEntries = () => {
    if (activeTab === 'today') {
      return entries.slice(0, 5); // Mock: show fewer for "today"
    }
    if (activeTab === 'friends') {
      return entries.slice(0, 3); // Mock: show fewer for "friends"
    }
    return showMore ? entries : entries.slice(0, 10);
  };

  const filteredEntries = getFilteredEntries();
  const topThree = filteredEntries.slice(0, 3);
  const restOfEntries = filteredEntries.slice(3);
  const hasMore = entries.length > filteredEntries.length;

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-50 via-yellow-100 to-yellow-50 border-yellow-300';
    if (rank === 2) return 'from-gray-50 via-gray-100 to-gray-50 border-gray-300';
    if (rank === 3) return 'from-orange-50 via-orange-100 to-orange-50 border-orange-300';
    return '';
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-700 bg-yellow-100';
    if (rank === 2) return 'text-gray-700 bg-gray-100';
    if (rank === 3) return 'text-orange-700 bg-orange-100';
    return 'text-gray-500 bg-gray-50';
  };

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-teal-50 to-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{gameTitle}</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5" />
                Tabla de clasificación
              </p>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="bg-gray-100 rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'today'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hoy
            </button>
            <button
              onClick={() => setActiveTab('alltime')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'alltime'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Todo el tiempo
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'friends'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Amigos
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-5 max-w-2xl mx-auto pb-8">
        {filteredEntries.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Trophy className="h-12 w-12 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aún no hay puntuaciones
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Sé el primero en completar este juego y aparecer en el leaderboard.
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium Cards */}
            {topThree.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <Medal className="h-4 w-4 text-yellow-600" />
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Top 3
                  </h3>
                </div>
                {topThree.map((entry) => {
                  const medal = getMedalEmoji(entry.rank);
                  const colorClass = getMedalColor(entry.rank);
                  const rankColor = getRankColor(entry.rank);
                  
                  return (
                    <Card
                      key={entry.userId}
                      className={`p-4 bg-gradient-to-r ${colorClass} border-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02]`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Medal and Rank */}
                        <div className="flex flex-col items-center justify-center min-w-[52px]">
                          <span className="text-4xl mb-1 drop-shadow-sm">{medal}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rankColor}`}>
                            #{entry.rank}
                          </span>
                        </div>

                        {/* Avatar */}
                        <Avatar className="h-14 w-14 ring-2 ring-white shadow-md flex-shrink-0">
                          <AvatarImage src={entry.avatar} alt={entry.username} />
                          <AvatarFallback className="bg-gradient-to-br from-teal-600 to-purple-600 text-white font-semibold text-lg">
                            {getInitials(entry.username)}
                          </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate text-lg">
                            {entry.username}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs font-medium text-gray-700 flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md">
                              <Target className="h-3 w-3" />
                              {entry.attempts}
                            </span>
                            <span className="text-xs font-medium text-gray-700 flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md">
                              <Clock className="h-3 w-3" />
                              {entry.completionTime}
                            </span>
                          </div>
                        </div>

                        {/* Trophy Icon for first place */}
                        {entry.rank === 1 && (
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                              <Trophy className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Rest of Leaderboard */}
            {restOfEntries.length > 0 && (
              <div className="space-y-3 pt-2">
                {topThree.length > 0 && (
                  <div className="flex items-center gap-2 px-2">
                    <div className="h-px bg-gray-300 flex-1" />
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Otros jugadores
                    </h3>
                    <div className="h-px bg-gray-300 flex-1" />
                  </div>
                )}
                
                <Card className="divide-y divide-gray-100 shadow-sm">
                  {restOfEntries.map((entry) => (
                    <div
                      key={entry.userId}
                      className="px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      {/* Rank */}
                      <div className="w-12 flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                          {entry.rank}
                        </span>
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-11 w-11 flex-shrink-0 ring-1 ring-gray-200">
                        <AvatarImage src={entry.avatar} alt={entry.username} />
                        <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 font-semibold text-sm">
                          {getInitials(entry.username)}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {entry.username}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {entry.attempts}
                        </span>
                        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {entry.completionTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && activeTab === 'alltime' && (
              <div className="pt-2">
                <Button
                  onClick={() => setShowMore(true)}
                  variant="outline"
                  className="w-full h-12 font-semibold border-2 border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300"
                >
                  Cargar más jugadores ({entries.length - filteredEntries.length} restantes)
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
