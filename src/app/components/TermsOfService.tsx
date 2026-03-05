import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
        <h1 className="text-xl font-semibold text-gray-900">Términos de servicio</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto space-y-8">
          {/* Introducción */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Introducción</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Bienvenido a MemoryGame. Al acceder y utilizar esta aplicación, aceptas cumplir con estos términos de servicio. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestra aplicación.
            </p>
          </section>

          {/* Uso del servicio */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Uso del servicio</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              MemoryGame te permite crear y compartir juegos de memoria personalizados. Al utilizar el servicio, te comprometes a:
            </p>
            <ul className="space-y-2 ml-5">
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                Utilizar el servicio únicamente con fines legales y de acuerdo con estos términos
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                No cargar contenido que infrinja derechos de autor, marcas comerciales u otros derechos de propiedad intelectual
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                No publicar contenido ofensivo, difamatorio, obsceno o ilegal
              </li>
              <li className="text-base text-gray-700 leading-relaxed list-disc">
                No intentar interferir con el funcionamiento del servicio o acceder a sistemas de forma no autorizada
              </li>
            </ul>
          </section>

          {/* Responsabilidad del usuario */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Responsabilidad del usuario</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Eres el único responsable del contenido que publicas en la aplicación. Debes asegurarte de tener los derechos 
              necesarios para utilizar cualquier imagen u otro contenido que cargues. MemoryGame no se hace responsable del 
              contenido generado por los usuarios.
            </p>
          </section>

          {/* Propiedad del contenido */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Propiedad del contenido</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Mantienes la propiedad de todo el contenido que cargues a MemoryGame. Al publicar contenido en nuestra plataforma, 
              nos otorgas una licencia mundial, no exclusiva y libre de regalías para alojar, almacenar y mostrar tu contenido 
              según sea necesario para proporcionar el servicio.
            </p>
          </section>

          {/* Limitación de responsabilidad */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Limitación de responsabilidad</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              MemoryGame se proporciona "tal cual" sin garantías de ningún tipo. No garantizamos que el servicio sea ininterrumpido, 
              seguro o libre de errores. En ningún caso seremos responsables de daños indirectos, incidentales, especiales o 
              consecuentes derivados del uso o la imposibilidad de uso del servicio.
            </p>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Modificaciones del servicio</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento 
              sin previo aviso. También podemos actualizar estos términos periódicamente. El uso continuado del servicio después de 
              cualquier cambio constituye la aceptación de los nuevos términos.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contacto</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Si tienes preguntas sobre estos términos de servicio, puedes contactarnos en{' '}
              <a href="mailto:legal@memorygame.com" className="text-blue-600 hover:underline">
                legal@memorygame.com
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
