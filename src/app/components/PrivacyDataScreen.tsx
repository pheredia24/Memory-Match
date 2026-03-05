import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, Download, FileText, Shield, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface PrivacyDataScreenProps {
  onBack: () => void;
  onPrivacyPolicy: () => void;
  onTermsOfService: () => void;
}

export function PrivacyDataScreen({ 
  onBack,
  onPrivacyPolicy,
  onTermsOfService
}: PrivacyDataScreenProps) {
  const handleDownloadData = () => {
    toast.success('Preparando descarga de tus datos...');
    // Simulate download
    setTimeout(() => {
      toast.info('Se enviará un archivo con tus datos a tu email');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Privacidad y datos</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Data Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Descargar mis datos
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Obtén una copia de toda la información asociada a tu cuenta, incluyendo juegos creados, fotos y estadísticas.
                </p>
                <Button
                  onClick={handleDownloadData}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Solicitar descarga
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Privacy Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              Configuración de privacidad
            </h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {/* Privacy Policy */}
              <button
                onClick={onPrivacyPolicy}
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Política de privacidad</div>
                  <div className="text-sm text-gray-600">Cómo protegemos tus datos</div>
                </div>
              </button>

              {/* Terms of Service */}
              <button
                onClick={onTermsOfService}
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Términos de servicio</div>
                  <div className="text-sm text-gray-600">Nuestras reglas y condiciones</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Data Usage Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <Eye className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Qué datos recopilamos
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Información de cuenta:</strong> nombre, email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Contenido creado:</strong> juegos, fotos subidas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Estadísticas:</strong> puntuaciones, tiempos de juego</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Información técnica:</strong> tipo de dispositivo, navegador</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Tu privacidad es importante.</strong> No vendemos ni compartimos tus datos personales con terceros. Solo usamos tu información para mejorar tu experiencia en la app.
              </p>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center pt-4"
          >
            <p className="text-sm text-gray-600 mb-2">
              ¿Tienes preguntas sobre tus datos?
            </p>
            <button
              onClick={() => toast.info('Abriendo soporte...')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 underline"
            >
              Contacta con soporte
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
