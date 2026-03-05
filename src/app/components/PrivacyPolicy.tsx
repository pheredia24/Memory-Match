import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
        <h1 className="text-xl font-semibold text-gray-900">Política de privacidad</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto space-y-8">
          {/* Introducción */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Introducción</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              En MemoryGame, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política de privacidad 
              explica qué datos recopilamos, cómo los utilizamos y cuáles son tus derechos respecto a tu información personal.
            </p>
          </section>

          {/* Qué datos recopilamos */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Qué datos recopilamos</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Recopilamos la siguiente información cuando utilizas MemoryGame:
            </p>
            <ul className="space-y-2 ml-5">
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Información de cuenta:</strong> Nombre de usuario, dirección de correo electrónico y contraseña (encriptada)
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Contenido generado:</strong> Imágenes y configuraciones de los juegos que creas
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Datos de uso:</strong> Información sobre cómo utilizas la aplicación, incluyendo juegos creados, 
                partidas jugadas y tiempo de uso
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo y datos del dispositivo
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Puntuaciones:</strong> Resultados de partidas y nombres ingresados en los leaderboards
              </li>
            </ul>
          </section>

          {/* Cómo usamos los datos */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Cómo usamos los datos</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Utilizamos tus datos para:
            </p>
            <ul className="space-y-2 ml-5">
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Proporcionar, mantener y mejorar nuestros servicios
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Personalizar tu experiencia en la aplicación
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Comunicarnos contigo sobre actualizaciones, seguridad y soporte
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Analizar el uso de la aplicación para mejorar nuestros servicios
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Detectar, prevenir y resolver problemas técnicos o de seguridad
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Cumplir con obligaciones legales
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Cookies</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, recordar tus preferencias y analizar 
              el uso de nuestra aplicación. Puedes controlar el uso de cookies a través de la configuración de tu navegador. 
              Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de la aplicación.
            </p>
          </section>

          {/* Servicios de terceros */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Servicios de terceros</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Utilizamos servicios de terceros de confianza para ayudarnos a operar nuestra aplicación:
            </p>
            <ul className="space-y-2 ml-5">
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Hosting:</strong> Para alojar y servir la aplicación
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Analytics:</strong> Para comprender cómo los usuarios interactúan con la aplicación
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Almacenamiento:</strong> Para guardar imágenes y datos de usuario de forma segura
              </li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mt-3">
              Estos proveedores tienen acceso limitado a tus datos y están obligados a proteger tu información según 
              sus propias políticas de privacidad.
            </p>
          </section>

          {/* Compartir datos */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Compartir datos</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              No vendemos ni alquilamos tu información personal a terceros. Solo compartimos tus datos en las siguientes 
              circunstancias: con tu consentimiento, cuando sea necesario para proporcionar el servicio (por ejemplo, 
              juegos públicos), para cumplir con la ley, o para proteger nuestros derechos y los de otros usuarios.
            </p>
          </section>

          {/* Derechos del usuario */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Derechos del usuario</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Tienes los siguientes derechos respecto a tu información personal:
            </p>
            <ul className="space-y-2 ml-5">
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Acceso:</strong> Puedes solicitar una copia de tus datos personales
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Corrección:</strong> Puedes actualizar o corregir tu información
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Eliminación:</strong> Puedes solicitar la eliminación de tu cuenta y datos
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Portabilidad:</strong> Puedes solicitar una exportación de tus datos
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                <strong>Oposición:</strong> Puedes oponerte a ciertos procesamientos de tus datos
              </li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed mt-3">
              Para ejercer estos derechos, visita la sección "Privacidad y datos" en la configuración de tu cuenta.
            </p>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Seguridad</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales 
              contra el acceso no autorizado, la pérdida o la alteración. Sin embargo, ningún método de transmisión por 
              Internet o almacenamiento electrónico es 100% seguro.
            </p>
          </section>

          {/* Menores de edad */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Menores de edad</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              MemoryGame no está dirigido a menores de 13 años. No recopilamos intencionalmente información personal de 
              menores de 13 años. Si descubrimos que hemos recopilado datos de un menor sin el consentimiento parental 
              verificable, tomaremos medidas para eliminar esa información.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contacto</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos, puedes contactarnos en{' '}
              <a href="mailto:privacy@memorygame.com" className="text-blue-600 hover:underline">
                privacy@memorygame.com
              </a>
            </p>
          </section>

          {/* Footer */}
          <div className="pt-8 pb-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Última actualización: Marzo 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
