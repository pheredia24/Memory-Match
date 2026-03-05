import { useState, useEffect } from 'react';
import { X, RotateCcw, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface Card {
  id: string;
  photoId: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameplayScreenProps {
  title: string;
  photos: Array<{ id: number; color: string }>;
  showTime: boolean;
  showAttempts: boolean;
  onClose: () => void;
}

export function GameplayScreen({ 
  title, 
  photos, 
  showTime, 
  showAttempts, 
  onClose 
}: GameplayScreenProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize cards
  useEffect(() => {
    const gameCards: Card[] = [];
    photos.forEach((photo) => {
      // Create two cards for each photo (a pair)
      gameCards.push({
        id: `${photo.id}-a`,
        photoId: photo.id,
        color: photo.color,
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: `${photo.id}-b`,
        photoId: photo.id,
        color: photo.color,
        isFlipped: false,
        isMatched: false
      });
    });
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [photos]);

  // Timer
  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isComplete]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate grid layout based on number of cards
  const getGridLayout = (numCards: number) => {
    if (numCards <= 8) return { cols: 2, rows: 4 }; // 4 photos (Easy) - vertical layout
    if (numCards <= 12) return { cols: 3, rows: 4 }; // 6 photos (Normal)
    if (numCards <= 16) return { cols: 4, rows: 4 }; // 8 photos (Hard)
    return { cols: 4, rows: 5 }; // 10 photos (Expert)
  };

  const layout = getGridLayout(cards.length);

  // Calculate optimal card size to fit the screen
  // This ensures square cards that maximize space without scrolling
  const calculateCardSize = () => {
    const padding = 16; // 16px padding around the grid
    const gap = 12; // Gap between cards in px
    
    // Get viewport dimensions (approximate for mobile)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // HUD takes approximately 60px
    const hudHeight = 60;
    const availableHeight = viewportHeight - hudHeight - (padding * 2);
    const availableWidth = viewportWidth - (padding * 2);
    
    // Calculate max card size based on width
    const maxCardWidthFromWidth = (availableWidth - (gap * (layout.cols - 1))) / layout.cols;
    
    // Calculate max card size based on height
    const maxCardWidthFromHeight = (availableHeight - (gap * (layout.rows - 1))) / layout.rows;
    
    // Use the smaller value to ensure everything fits
    return Math.floor(Math.min(maxCardWidthFromWidth, maxCardWidthFromHeight));
  };

  const [cardSize, setCardSize] = useState(calculateCardSize());

  // Recalculate on window resize or layout change
  useEffect(() => {
    const handleResize = () => {
      setCardSize(calculateCardSize());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layout.cols, layout.rows]);

  const handleCardClick = (cardId: string) => {
    if (isProcessing) return;
    
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    // Flip the card
    setCards(cards.map((c) => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsProcessing(true);
      setAttempts((a) => a + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.photoId === secondCard.photoId) {
        // Match found!
        setTimeout(() => {
          setCards(cards.map((c) => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches((m) => m + 1);
          setFlippedCards([]);
          setIsProcessing(false);

          // Check if game is complete
          if (matches + 1 === photos.length) {
            setTimeout(() => setIsComplete(true), 500);
          }
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(cards.map((c) => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    // Shuffle cards again
    const shuffled = cards
      .map((c) => ({ ...c, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setAttempts(0);
    setMatches(0);
    setTime(0);
    setIsComplete(false);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
      {/* Compact HUD */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* Centered Stats */}
          <div className="flex items-center gap-6 text-sm font-medium">
            {showTime && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <span>⏱</span>
                <span className="font-mono">{formatTime(time)}</span>
              </div>
            )}
            {showAttempts && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <span>🎯</span>
                <span>{attempts}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-700">
              <span>🧩</span>
              <span>{matches}/{photos.length}</span>
            </div>
          </div>

          {/* Restart button */}
          <button
            onClick={handleRestart}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <RotateCcw className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Board Area - fills remaining space */}
      <div className="flex-1 flex items-center justify-center overflow-hidden" style={{ padding: '16px' }}>
        {/* Card Grid - fixed size with square cards */}
        <div 
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${layout.cols}, ${cardSize}px)`,
            gridTemplateRows: `repeat(${layout.rows}, ${cardSize}px)`,
            gap: '12px'
          }}
        >
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="relative"
              style={{ 
                width: `${cardSize}px`, 
                height: `${cardSize}px` 
              }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              animate={card.isMatched ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                {/* Card container with flip animation */}
                <motion.div
                  className="w-full h-full absolute inset-0"
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Back */}
                  <div 
                    className="absolute inset-0 rounded-xl overflow-hidden shadow-md"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)'
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative">
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)'
                      }} />
                      {/* Icon */}
                      <div className="relative">
                        <svg 
                          className="text-white/90" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          style={{ width: `${Math.max(24, cardSize * 0.25)}px`, height: `${Math.max(24, cardSize * 0.25)}px` }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Front */}
                  <div 
                    className="absolute inset-0 rounded-xl overflow-hidden shadow-lg"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div 
                      className={`w-full h-full ${card.color} ${
                        card.isMatched ? 'ring-4 ring-green-400' : ''
                      }`}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Completado!</h2>
                <p className="text-gray-600 mb-6">{title}</p>
                
                {/* Stats */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-2">
                  {showTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <span>⏱</span> Tiempo
                      </span>
                      <span className="font-bold text-gray-900 font-mono">{formatTime(time)}</span>
                    </div>
                  )}
                  {showAttempts && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <span>🎯</span> Intentos
                      </span>
                      <span className="font-bold text-gray-900">{attempts}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <span>🧩</span> Parejas
                    </span>
                    <span className="font-bold text-gray-900">{photos.length}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
                    onClick={handleRestart}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Jugar otra vez
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
                    onClick={onClose}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}