import { useState } from 'react';
import { ArrowLeft, Download, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface DataPrivacyProps {
  onBack: () => void;
  onPrivacyClick?: () => void;
}

export function DataPrivacy({ onBack, onPrivacyClick }: DataPrivacyProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Solicitud enviada', {
      description: 'Recibirás un correo con tus datos en las próximas 24 horas.'
    });
    
    setIsExporting(false);
  };

  const handleDeleteAccount = () => {
    // In real app, this would call an API
    toast.success('Cuenta eliminada', {
      description: 'Tu cuenta y todos tus datos han sido eliminados.'
    });
    setShowDeleteConfirm(false);
    
    // Navigate back or logout
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 safe-area-inset-top">
        <button
          onClick={onBack}
          className="w-10 h-10 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-gray-900" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Privacidad y datos</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
          {/* Export Data Section */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Download className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Exportar datos
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Descarga una copia de tus datos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Recibirás un archivo con toda tu información: juegos creados, configuraciones, 
                puntuaciones y datos de perfil. El proceso puede tardar hasta 24 horas.
              </p>
              <Button
                onClick={handleExportData}
                disabled={isExporting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Solicitar exportación
                  </>
                )}
              </Button>
            </div>
          </section>

          {/* Delete Account Section */}
          <section className="bg-white rounded-2xl border border-red-200 overflow-hidden">
            <div className="p-5 border-b border-red-200 bg-red-50">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Eliminar cuenta
                  </h2>
                  <p className="text-sm text-red-700 leading-relaxed">
                    Eliminar tu cuenta borrará todos tus juegos y datos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">
                    Esta acción es irreversible
                  </p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Una vez eliminada tu cuenta, no podrás recuperar ningún dato. 
                    Todos tus juegos serán eliminados permanentemente.
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="outline"
                className="w-full h-11 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-medium rounded-lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar cuenta
              </Button>
            </div>
          </section>

          {/* Info Section */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-600 leading-relaxed">
              Para más información sobre cómo manejamos tus datos, consulta nuestra{' '}
              <button 
                onClick={onPrivacyClick}
                className="text-blue-600 hover:underline font-medium"
              >
                Política de privacidad
              </button>
              {' '}o contacta con nuestro equipo de soporte.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowDeleteConfirm(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ¿Eliminar cuenta?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Esta acción eliminará permanentemente tu cuenta y todos tus juegos. 
                    No podrás deshacer esta acción.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleDeleteAccount}
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
                  >
                    Sí, eliminar mi cuenta
                  </Button>
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
