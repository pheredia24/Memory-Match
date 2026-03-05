import { useState } from 'react';
import { ArrowLeft, Bug, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface BugReportFormProps {
  onBack: () => void;
}

export function BugReportForm({ onBack }: BugReportFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category || !description.trim()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Reporte enviado', {
      description: 'Gracias por tu ayuda. Investigaremos el problema.'
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
          <Bug className="h-5 w-5 text-orange-600" />
          <h1 className="text-xl font-semibold text-gray-900">Reportar problema</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Info Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-sm text-orange-900 leading-relaxed">
                Tu reporte nos ayuda a mejorar la aplicación. Por favor, proporciona la mayor cantidad de detalles posible.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-900">
                Título del problema <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Ej: No puedo subir imágenes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-900">
                Categoría <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upload">Subida de imágenes</SelectItem>
                  <SelectItem value="gameplay">Juego / Gameplay</SelectItem>
                  <SelectItem value="sharing">Compartir juegos</SelectItem>
                  <SelectItem value="leaderboard">Leaderboard</SelectItem>
                  <SelectItem value="performance">Rendimiento</SelectItem>
                  <SelectItem value="ui">Interfaz de usuario</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                Descripción <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe qué sucedió y qué esperabas que sucediera..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] resize-none"
                required
              />
              <p className="text-xs text-gray-500">
                {description.length}/500 caracteres
              </p>
            </div>

            {/* Steps to Reproduce */}
            <div className="space-y-2">
              <Label htmlFor="steps" className="text-sm font-medium text-gray-900">
                Pasos para reproducir (opcional)
              </Label>
              <Textarea
                id="steps"
                placeholder="1. Ir a...&#10;2. Hacer clic en...&#10;3. Ver error..."
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Device Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Información del dispositivo
              </h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Navegador: {navigator.userAgent.split(' ').slice(-2).join(' ')}</p>
                <p>Plataforma: {navigator.platform}</p>
                <p>Idioma: {navigator.language}</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting || !title.trim() || !category || !description.trim()}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar reporte
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
