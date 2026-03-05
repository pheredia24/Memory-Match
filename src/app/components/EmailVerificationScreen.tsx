import { useState, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface EmailVerificationScreenProps {
  email: string;
  onVerified: () => void;
  onChangeEmail: () => void;
}

export function EmailVerificationScreen({ 
  email, 
  onVerified,
  onChangeEmail 
}: EmailVerificationScreenProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Simulate magic link verification (in real app, this would check URL params or listen to auth state)
  useEffect(() => {
    // For demo purposes, auto-verify after 5 seconds
    // In production, this would check for magic link token
    const timer = setTimeout(() => {
      // setIsVerified(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendCountdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [resendCountdown, resendDisabled]);

  const handleResendEmail = () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setResendDisabled(true);
      setResendCountdown(30); // 30 second cooldown
    }, 1000);
  };

  const handleContinue = () => {
    onVerified();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">Verificar email</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {!isVerified ? (
            // State 1: Waiting for verification
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                  <Mail className="h-10 w-10 text-teal-600" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Revisa tu correo
                </h2>
                <p className="text-gray-600">
                  Te hemos enviado un enlace para verificar tu cuenta.
                </p>
              </div>

              {/* Email Display */}
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{email}</p>
              </div>

              {/* Secondary text */}
              <p className="text-sm text-gray-500">
                Abre el enlace desde tu email para continuar.
              </p>

              {/* Primary Button */}
              <Button
                onClick={handleResendEmail}
                disabled={isResending || resendDisabled}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-base font-medium"
              >
                {isResending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : resendDisabled ? (
                  `Reenviar email (${resendCountdown}s)`
                ) : (
                  'Reenviar email'
                )}
              </Button>

              {/* Secondary Button */}
              <button
                onClick={onChangeEmail}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Cambiar dirección de correo
              </button>

              {/* Footer Helper */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p className="text-left">
                    ¿No recibiste el email? Revisa tu carpeta de spam.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // State 2: Email verified
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Email verificado
                </h2>
                <p className="text-gray-600">
                  Tu cuenta ha sido verificada correctamente.
                </p>
              </div>

              {/* Success Message */}
              <div className="bg-green-50 rounded-lg px-4 py-3 border border-green-200">
                <p className="text-sm font-medium text-green-800">
                  ¡Ya puedes empezar a crear juegos!
                </p>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-base font-medium"
              >
                Continuar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
