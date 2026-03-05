import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

type DemoCard = {
  id: number;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
  color: string;
};

export function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
  const [demoCards, setDemoCards] = useState<DemoCard[]>([
    { id: 1, pairId: 1, isFlipped: false, isMatched: false, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 2, pairId: 2, isFlipped: false, isMatched: false, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 3, pairId: 1, isFlipped: false, isMatched: false, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 4, pairId: 2, isFlipped: false, isMatched: false, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
  ]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [instructionText, setInstructionText] = useState('Pulsa una carta para empezar.');
  const [canInteract, setCanInteract] = useState(true);
  const [highlightCards, setHighlightCards] = useState(true);

  const handleCardClick = (cardId: number) => {
    if (!canInteract) return;
    
    const card = demoCards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Flip the card
    setDemoCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 1) {
      setInstructionText('Ahora pulsa otra carta.');
      setHighlightCards(false);
    } else if (newFlippedCards.length === 2) {
      setCanInteract(false);
      
      // Check if they match
      const [firstId, secondId] = newFlippedCards;
      const firstCard = demoCards.find(c => c.id === firstId);
      const secondCard = demoCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match!
        setTimeout(() => {
          setDemoCards(prev => prev.map(c => 
            newFlippedCards.includes(c.id) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setInstructionText('');
          setShowSuccess(true);
        }, 600);
      } else {
        // No match - flip back
        setTimeout(() => {
          setDemoCards(prev => prev.map(c => 
            newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setCanInteract(true);
          setInstructionText('Intenta de nuevo.');
        }, 1200);
      }
    }
  };

  useEffect(() => {
    const allMatched = demoCards.every(card => card.isMatched);
    if (allMatched && demoCards.length > 0) {
      setTimeout(() => {
        setShowSuccess(true);
      }, 300);
    }
  }, [demoCards]);

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onComplete();
  };

  const handleSkipClick = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onSkip();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 z-50 flex flex-col overflow-hidden">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 safe-area-inset-top z-10">
        <button
          onClick={handleSkipClick}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors"
        >
          Omitir
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 pt-16">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-purple-600 rounded-[32px] flex items-center justify-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            <Sparkles className="h-12 w-12 text-white relative z-10" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 rounded-[32px] blur-xl opacity-40 -z-10"
          ></motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-900 text-center mb-3 px-4"
        >
          Crea tus propios juegos de memoria
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base text-gray-600 text-center mb-12 px-4"
        >
          Usa tus fotos y compártelos con amigos.
        </motion.p>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Demo Board */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {demoCards.map((card) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={!canInteract && !card.isFlipped}
                  className="relative w-28 h-28 sm:w-32 sm:h-32"
                  whileTap={{ scale: 0.95 }}
                  animate={highlightCards && !card.isFlipped ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: card.id * 0.1
                  }}
                >
                  <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                      className="absolute inset-0 rounded-2xl shadow-lg"
                      animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                    >
                      {/* Back of card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-purple-500 rounded-xl opacity-30"></div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 rounded-2xl shadow-lg"
                      animate={{ rotateY: card.isFlipped ? 0 : -180 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      {/* Front of card */}
                      <div className={`absolute inset-0 ${card.color} rounded-2xl border-2 border-white shadow-xl flex items-center justify-center`}>
                        <div className="text-4xl">
                          {card.pairId === 1 ? '🎨' : '🎮'}
                        </div>
                      </div>
                    </motion.div>

                    {/* Match animation */}
                    <AnimatePresence>
                      {card.isMatched && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl">✓</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Instruction Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={instructionText}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-sm font-medium text-gray-700 text-center min-h-[20px]"
              >
                {instructionText}
              </motion.p>
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 whitespace-nowrap z-10"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span className="font-semibold">¡Así funciona!</span>
                  </motion.div>
                  
                  {/* Confetti effect */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
                      animate={{ 
                        opacity: 0, 
                        y: -100 + Math.random() * 50,
                        x: (Math.random() - 0.5) * 200,
                        scale: 1.5,
                        rotate: Math.random() * 360
                      }}
                      transition={{ duration: 1.5, delay: i * 0.05 }}
                      className="absolute top-1/2 left-1/2 text-2xl pointer-events-none"
                    >
                      {['🎉', '✨', '🎊', '⭐'][i % 4]}
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-sm space-y-4 mt-16"
        >
          <Button
            onClick={handleComplete}
            className="w-full h-14 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white font-semibold text-base rounded-2xl shadow-lg"
          >
            Crear mi primer juego
          </Button>
          
          <button
            onClick={handleSkipClick}
            className="w-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-2"
          >
            Omitir
          </button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
    </div>
  );
}
