import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ChangeEmailScreenProps {
  onBack: () => void;
  currentEmail?: string;
}

export function ChangeEmailScreen({ 
  onBack,
  currentEmail = 'ana@ejemplo.com'
}: ChangeEmailScreenProps) {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!newEmail) {
      toast.error('Ingresa tu nuevo email');
      return;
    }

    if (!validateEmail(newEmail)) {
      toast.error('Ingresa un email válido');
      return;
    }

    if (newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      toast.error('El nuevo email debe ser diferente');
      return;
    }

    if (!password) {
      toast.error('Ingresa tu contraseña para confirmar');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Email actualizado. Revisa tu bandeja de entrada para confirmar.');
      
      // Reset form
      setNewEmail('');
      setPassword('');
      
      // Go back after short delay
      setTimeout(() => onBack(), 2000);
    }, 1000);
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
          <h1 className="text-xl font-semibold text-gray-900">Cambiar email</h1>
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
            {/* Current Email (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="current-email">Email actual</Label>
              <Input
                id="current-email"
                type="email"
                value={currentEmail}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* New Email */}
            <div className="space-y-2">
              <Label htmlFor="new-email">Nuevo email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nuevo@ejemplo.com"
                autoComplete="email"
              />
              
              {/* Email validation indicator */}
              {newEmail && (
                <div className="flex items-center gap-2 text-sm">
                  {validateEmail(newEmail) ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">Email válido</span>
                    </>
                  ) : (
                    <span className="text-red-600">Email inválido</span>
                  )}
                </div>
              )}
            </div>

            {/* Password Confirmation */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña actual</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <p className="text-sm text-gray-500">
                Confirma tu contraseña para cambiar el email
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Importante
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Se enviará un email de confirmación a tu nueva dirección</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Debes confirmar el cambio desde el enlace del email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Tu email actual seguirá activo hasta que confirmes</span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !newEmail || !password || !validateEmail(newEmail)}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl"
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar email'}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
