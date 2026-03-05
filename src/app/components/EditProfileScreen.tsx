import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Camera, User } from 'lucide-react';
import { toast } from 'sonner';

interface EditProfileScreenProps {
  onBack: () => void;
  userData?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function EditProfileScreen({ 
  onBack,
  userData = {
    name: 'Ana García',
    email: 'ana@ejemplo.com'
  }
}: EditProfileScreenProps) {
  const [name, setName] = useState(userData.name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('El nombre no puede estar vacío');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Perfil actualizado correctamente');
      setTimeout(() => onBack(), 1000);
    }, 1000);
  };

  const handleAvatarClick = () => {
    toast.info('Función de cambiar foto próximamente');
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
          <h1 className="text-xl font-semibold text-gray-900">Editar perfil</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className="max-w-md mx-auto px-4 py-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Avatar */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleAvatarClick}
                className="relative group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={name} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Toca para cambiar tu foto de perfil
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500">
                Para cambiar tu email, usa la opción "Cambiar email" en la configuración de seguridad.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
