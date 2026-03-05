import { useState } from 'react';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface ContactSupportFormProps {
  onBack: () => void;
}

export function ContactSupportForm({ onBack }: ContactSupportFormProps) {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !category || !email.trim() || !message.trim()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Mensaje enviado', {
      description: 'Te responderemos en las próximas 24-48 horas.'
    });

    setIsSubmitting(false);
    
    // Clear form and go back
    setTimeout(() => {
      onBack();
    }, 500);
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
        <div className="flex items-center gap-2 flex-1">
          <MessageCircle className="h-5 w-5 text-teal-600" />
          <h1 className="text-xl font-semibold text-gray-900">Contactar soporte</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Info Box */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p className="text-sm text-teal-900 leading-relaxed mb-2">
                <strong>Nuestro equipo está aquí para ayudarte.</strong>
              </p>
              <p className="text-sm text-teal-800 leading-relaxed">
                Respondemos todos los mensajes en 24-48 horas. Para problemas técnicos urgentes, considera usar el formulario de reporte de errores.
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email de contacto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-900">
                Motivo de contacto <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecciona un motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Consulta general</SelectItem>
                  <SelectItem value="account">Cuenta y configuración</SelectItem>
                  <SelectItem value="billing">Facturación y pagos</SelectItem>
                  <SelectItem value="feature">Solicitud de función</SelectItem>
                  <SelectItem value="feedback">Comentarios y sugerencias</SelectItem>
                  <SelectItem value="partnership">Asociaciones y colaboraciones</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-gray-900">
                Asunto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="¿En qué podemos ayudarte?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-gray-900">
                Mensaje <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos más sobre tu consulta..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] resize-none"
                required
              />
              <p className="text-xs text-gray-500">
                {message.length}/1000 caracteres
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Al enviar este formulario, aceptas que procesemos tu información de contacto para responder a tu consulta. 
                Lee nuestra{' '}
                <button type="button" className="text-blue-600 hover:underline font-medium">
                  Política de privacidad
                </button>
                {' '}para más información.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting || !subject.trim() || !category || !email.trim() || !message.trim()}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar mensaje
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="w-full h-11 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
