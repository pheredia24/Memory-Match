import { useState } from 'react';
import { Settings, X, Upload, Check } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { GameCard } from './components/GameCard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('crear');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('es');
  const [photos, setPhotos] = useState([
    { id: 1, color: 'bg-purple-600' },
    { id: 2, color: 'bg-blue-700' },
    { id: 3, color: 'bg-green-600' },
    { id: 4, color: 'bg-yellow-600' }
  ]);

  const games = [
    { id: 1, title: 'Test', status: 'publicado' as const, url: '/@pablo/test' },
    { id: 2, title: 'Navidad 2026', status: 'publicado' as const, url: '/@pablo/navidad-2026' },
    { id: 3, title: 'Cumpleaños María', status: 'borrador' as const, url: '/@pablo/cumpleanos-maria' },
    { id: 4, title: 'Boda Ana y Carlos', status: 'publicado' as const, url: '/@pablo/boda-ana-carlos' },
    { id: 5, title: 'Fiesta Verano', status: 'publicado' as const, url: '/@pablo/fiesta-verano' },
    { id: 6, title: 'Aniversario', status: 'borrador' as const, url: '/@pablo/aniversario' },
    { id: 7, title: 'Halloween 2026', status: 'publicado' as const, url: '/@pablo/halloween-2026' },
    { id: 8, title: 'Baby Shower', status: 'publicado' as const, url: '/@pablo/baby-shower' },
    { id: 9, title: 'Graduación', status: 'borrador' as const, url: '/@pablo/graduacion' },
    { id: 10, title: 'Viaje a París', status: 'publicado' as const, url: '/@pablo/viaje-paris' },
    { id: 11, title: 'Año Nuevo 2027', status: 'publicado' as const, url: '/@pablo/ano-nuevo-2027' },
    { id: 12, title: 'Reunión Familia', status: 'borrador' as const, url: '/@pablo/reunion-familia' }
  ];

  const removePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const photoProgress = (photos.length / 10) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-sm font-medium text-gray-600 tracking-wide uppercase">Dashboard</h1>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-11">
              <TabsTrigger value="crear" className="text-sm font-medium">
                Crear
              </TabsTrigger>
              <TabsTrigger value="mis-juegos" className="text-sm font-medium">
                Mis juegos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {activeTab === 'crear' ? (
          <>
            {/* Title Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Crear juego</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-medium">
                    1
                  </div>
                  <p className="text-sm text-gray-600">Información básica</p>
                </div>
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-400">Paso 1 de 2</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Título
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Ej. Navidad 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Language Select */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium text-gray-700">
                  Idioma del juego
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-12">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇪🇸</span>
                        <span>Español</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇪🇸</span>
                        <span>Español</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="en">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇺🇸</span>
                        <span>English</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="fr">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇫🇷</span>
                        <span>Français</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Fotos del juego</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG/PNG · máx 10 archivos · mínimo 2 para continuar
                  </p>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white hover:border-teal-500 hover:bg-teal-50/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                      <Upload className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Añade hasta 10 fotos</h3>
                    <p className="text-sm text-gray-500">Arrastra o selecciona</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{photos.length} de 10 fotos añadidas</span>
                    <span className="text-teal-600 font-medium">{photos.length}0%</span>
                  </div>
                  <Progress value={photoProgress} className="h-2" />
                </div>

                {/* Photo Grid */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden">
                        <div className={`w-full h-full ${photo.color}`} />
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-gray-100 active:scale-95"
                          aria-label="Eliminar foto"
                        >
                          <X className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* My Games Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {games.length} juego{games.length !== 1 ? 's' : ''} creado{games.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {/* Games List */}
            <div className="space-y-4">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  status={game.status}
                  url={game.url}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer with CTA - Only show on crear tab */}
      {activeTab === 'crear' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 safe-area-inset-bottom">
          <div className="max-w-2xl mx-auto">
            <Button 
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
              disabled={photos.length < 2}
            >
              {photos.length < 2 ? (
                <span className="flex items-center gap-2">
                  Añade al menos 2 fotos para continuar
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Continuar
                  <Check className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Bottom spacing to prevent content being hidden by fixed footer */}
      {activeTab === 'crear' && <div className="h-24" />}
    </div>
  );
}