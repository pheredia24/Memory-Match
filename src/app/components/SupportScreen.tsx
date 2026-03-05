import { ArrowLeft, BookOpen, Bug, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface SupportScreenProps {
  onBack: () => void;
  onHelpArticles: () => void;
  onReportBug: () => void;
  onContactSupport: () => void;
  onPrivacyPolicy: () => void;
  onTermsOfService: () => void;
}

export function SupportScreen({ 
  onBack, 
  onHelpArticles, 
  onReportBug, 
  onContactSupport,
  onPrivacyPolicy,
  onTermsOfService
}: SupportScreenProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const commonQuestions = [
    {
      question: '¿Cómo crear un juego?',
      answer: 'Ve a la pestaña "Crear", sube tus fotos, configura el título e idioma, y presiona "Crear juego". Puedes personalizar opciones avanzadas en el paso 2.'
    },
    {
      question: '¿Cómo compartir un juego?',
      answer: 'Desde "Mis juegos", toca el botón de copiar link junto al juego que quieres compartir. También puedes compartir desde el menú de acciones del juego.'
    },
    {
      question: '¿Cómo ver el leaderboard?',
      answer: 'Abre los detalles de cualquier juego publicado y toca "Ver leaderboard" para ver las mejores puntuaciones.'
    },
    {
      question: '¿Puedo editar un juego después de crearlo?',
      answer: 'Sí, ve a "Mis juegos", abre el menú de acciones del juego y selecciona "Editar" para modificar la configuración.'
    },
    {
      question: '¿Qué significan los diferentes modos de juego?',
      answer: 'El modo se determina automáticamente por el número de fotos: Fácil (4 fotos), Normal (6 fotos), Difícil (8 fotos), Experto (10+ fotos).'
    }
  ];

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
        <h1 className="text-xl font-semibold text-gray-900">Ayuda y soporte</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto space-y-4">
          {/* Help Center Card */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Centro de ayuda
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Encuentra respuestas a las preguntas más comunes.
                  </p>
                </div>
              </div>
              <Button
                onClick={onHelpArticles}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Ver artículos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </section>

          {/* Report a Bug Card */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bug className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Reportar un problema
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    ¿Algo no funciona correctamente? Cuéntanos qué pasó.
                  </p>
                </div>
              </div>
              <Button
                onClick={onReportBug}
                className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg"
              >
                Enviar reporte
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </section>

          {/* Contact Support Card */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Contactar soporte
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nuestro equipo puede ayudarte.
                  </p>
                </div>
              </div>
              <Button
                onClick={onContactSupport}
                className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg mb-3"
              >
                Enviar mensaje
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Respondemos en 24-48 horas
              </p>
            </div>
          </section>

          {/* Common Questions Section */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 px-1">
              Preguntas frecuentes
            </h2>
            <div className="space-y-2">
              {commonQuestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900 pr-3">
                      {item.question}
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                        expandedQuestion === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedQuestion === index && (
                    <div className="px-4 pb-4 pt-1">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer Links */}
          <div className="pt-8 pb-4">
            <div className="flex items-center justify-center gap-4 text-sm">
              <button
                onClick={onPrivacyPolicy}
                className="text-blue-600 hover:underline font-medium"
              >
                Política de privacidad
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={onTermsOfService}
                className="text-blue-600 hover:underline font-medium"
              >
                Términos de servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
