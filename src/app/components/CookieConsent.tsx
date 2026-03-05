import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface CookieConsentProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onAcceptNecessary: () => void;
  onMoreInfo: () => void;
}

export function CookieConsent({ 
  isVisible, 
  onAcceptAll, 
  onAcceptNecessary, 
  onMoreInfo 
}: CookieConsentProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom"
          >
            <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 mx-auto max-w-2xl">
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🍪</span>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Usamos cookies
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Usamos cookies para mejorar la experiencia y analizar el uso del producto.
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={onAcceptAll}
                    className="w-full h-12 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md"
                  >
                    Aceptar todas
                  </Button>
                  
                  <Button
                    onClick={onAcceptNecessary}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
                  >
                    Solo necesarias
                  </Button>

                  {/* More info link */}
                  <button
                    onClick={onMoreInfo}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors py-2"
                  >
                    Más información
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
