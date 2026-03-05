import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  ChevronRight, 
  User, 
  Mail, 
  Bell, 
  Lock, 
  Globe, 
  Shield, 
  Trash2, 
  LogOut 
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface AccountSettingsProps {
  onBack: () => void;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onChangeEmail: () => void;
  onPrivacyData: () => void;
  onLogout: () => void;
  userData?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AccountSettings({
  onBack,
  onEditProfile,
  onChangePassword,
  onChangeEmail,
  onPrivacyData,
  onLogout,
  userData = {
    name: 'Ana García',
    email: 'ana@ejemplo.com'
  }
}: AccountSettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [language, setLanguage] = useState('Español');

  const handleDeleteAccount = () => {
    // Handle account deletion
    setShowDeleteDialog(false);
    // Show confirmation and logout
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
          <h1 className="text-xl font-semibold text-gray-900">Cuenta</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white mt-4 mx-4 rounded-2xl shadow-sm overflow-hidden"
          >
            <button
              onClick={onEditProfile}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                {userData.avatar ? (
                  <img src={userData.avatar} alt={userData.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  userData.name.charAt(0).toUpperCase()
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">{userData.name}</div>
                <div className="text-sm text-gray-600">{userData.email}</div>
                <div className="text-sm text-blue-600 font-medium mt-1">Editar perfil</div>
              </div>

              <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
            </button>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-4"
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              Preferencias
            </h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {/* Language */}
              <button
                onClick={() => {
                  // Open language selector
                }}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Idioma</div>
                  <div className="text-sm text-gray-600">{language}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
              </button>

              {/* Notifications */}
              <div className="px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Notificaciones</div>
                  <div className="text-sm text-gray-600">Recibir alertas y actualizaciones</div>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </div>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 mx-4"
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              Seguridad
            </h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {/* Change Password */}
              <button
                onClick={onChangePassword}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Lock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Cambiar contraseña</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
              </button>

              {/* Change Email */}
              <button
                onClick={onChangeEmail}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Cambiar email</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
              </button>
            </div>
          </motion.div>

          {/* Data & Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 mx-4"
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              Datos y privacidad
            </h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {/* Privacy & Data */}
              <button
                onClick={onPrivacyData}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">Privacidad y datos</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-red-50 active:bg-red-100 transition-colors"
              >
                <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-red-600">Eliminar cuenta</div>
                </div>
                <ChevronRight className="h-5 w-5 text-red-400 shrink-0" />
              </button>
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 mx-4 mb-8"
          >
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold rounded-xl"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar sesión
            </Button>
          </motion.div>

          {/* App Version */}
          <div className="text-center text-sm text-gray-400 pb-6">
            Versión 1.0.0
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cuenta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos, juegos y progreso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Eliminar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
