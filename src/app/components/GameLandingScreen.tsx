import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Play, Trophy, Plus, User, Image as ImageIcon, X, Share2, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GameLandingScreenProps {
  gameTitle: string;
  creatorName: string;
  photoCount: number;
  photos: string[];
  onPlay: () => void;
  onViewLeaderboard: () => void;
  onCreateGame?: () => void;
  onClose?: () => void;
  totalPlays?: number;
  bestTime?: string;
}

export function GameLandingScreen({
  gameTitle,
  creatorName,
  photoCount,
  photos,
  onPlay,
  onViewLeaderboard,
  onCreateGame,
  onClose,
  totalPlays,
  bestTime
}: GameLandingScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/game/${gameTitle.toLowerCase().replace(/\s+/g, '-')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: gameTitle,
          text: `¡Juega "${gameTitle}" conmigo!`,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col overflow-hidden">
      {/* Top Actions */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 safe-area-inset-top">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all"
          aria-label="Compartir"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : (
            <Share2 className="h-5 w-5 text-gray-700" />
          )}
        </button>
        
        {/* Close Button (optional - for demo) */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pt-16 pb-8 max-w-2xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {gameTitle}
            </h1>

            {/* Metadata */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4" />
                <span>{photoCount} {photoCount === 1 ? 'foto' : 'fotos'}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>Creado por {creatorName}</span>
              </div>
            </div>
          </motion.div>

          {/* Photo Preview Grid - Show limited preview to create curiosity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="grid grid-cols-3 gap-3">
              {/* Show only first 2-3 photos */}
              {photos.slice(0, 2).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                >
                  {photo.startsWith('http') ? (
                    <ImageWithFallback
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${photo}`}></div>
                  )}
                </motion.div>
              ))}
              
              {/* Hidden photos indicator - creates mystery */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + 2 * 0.05 }}
                className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-md flex items-center justify-center relative"
              >
                {/* Blurred background suggestion */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-xl"></div>
                <div className="text-center text-white relative z-10">
                  <div className="text-2xl font-bold">+{photoCount - 2}</div>
                  <div className="text-xs opacity-90">más</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Game Stats (if available) */}
          {(totalPlays !== undefined || bestTime) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="grid grid-cols-2 gap-4">
                  {totalPlays !== undefined && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{totalPlays}</div>
                      <div className="text-xs text-gray-600 mt-1">Partidas jugadas</div>
                    </div>
                  )}
                  {bestTime && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{bestTime}</div>
                      <div className="text-xs text-gray-600 mt-1">Mejor tiempo</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: totalPlays !== undefined || bestTime ? 0.5 : 0.4 }}
            className="space-y-3"
          >
            {/* Primary Action - Play */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button
                onClick={onPlay}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer"></div>
                <Play className="h-6 w-6 mr-2 fill-white relative z-10" />
                <span className="relative z-10">Jugar</span>
              </Button>
            </motion.div>

            {/* Secondary Action - Leaderboard */}
            <Button
              onClick={onViewLeaderboard}
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold rounded-xl"
            >
              <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
              Ver leaderboard
            </Button>

            {/* Optional Action - Create Game */}
            {onCreateGame && (
              <Button
                onClick={onCreateGame}
                variant="ghost"
                className="w-full h-11 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium rounded-xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                Crear tu propio juego
              </Button>
            )}
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                <strong className="font-semibold">¿Cómo jugar?</strong>
                <br />
                Encuentra las parejas de fotos idénticas. Haz clic en dos cartas para voltearlas y memoriza su posición.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-5 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-20 right-5 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
    </div>
  );
}
