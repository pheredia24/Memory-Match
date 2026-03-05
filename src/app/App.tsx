import { useState, useEffect } from 'react';
import { Settings, X, Upload, Check, ArrowLeft, Plus, ChevronRight, Play, LogOut, Trophy } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { Checkbox } from './components/ui/checkbox';
import { Switch } from './components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { GameCard } from './components/GameCard';
import { GameplayScreen } from './components/GameplayScreen';
import { GameDetailsScreen } from './components/GameDetailsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AdminLayout } from './components/admin/AdminLayout';
import { OverviewPage } from './components/admin/OverviewPage';
import { UsersPage } from './components/admin/UsersPage';
import { GamesPage } from './components/admin/GamesPage';
import { MediaPage } from './components/admin/MediaPage';
import { ActivityPage } from './components/admin/ActivityPage';
import { AuthPage } from './components/AuthPage';
import { NotFoundScreen } from './components/error-states/NotFoundScreen';
import { ServerErrorScreen } from './components/error-states/ServerErrorScreen';
import { GameNotFoundScreen } from './components/error-states/GameNotFoundScreen';
import { GamePrivateScreen } from './components/error-states/GamePrivateScreen';
import { NoGamesYetScreen } from './components/error-states/NoGamesYetScreen';
import { LeaderboardEmptyScreen } from './components/error-states/LeaderboardEmptyScreen';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type GameMode = 'easy' | 'normal' | 'hard' | 'expert';

interface GameModeConfig {
  name: string;
  photos: number;
  cards: number;
  grid: string;
}

const gameModes: Record<GameMode, GameModeConfig> = {
  easy: { name: 'Fácil', photos: 4, cards: 8, grid: '2×4' },
  normal: { name: 'Normal', photos: 6, cards: 12, grid: '3×4' },
  hard: { name: 'Difícil', photos: 8, cards: 16, grid: '4×4' },
  expert: { name: 'Experto', photos: 10, cards: 20, grid: '4×5' }
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<'user' | 'admin'>('user');
  const [adminPage, setAdminPage] = useState<'overview' | 'users' | 'games' | 'media' | 'activity'>('overview');
  const [activeTab, setActiveTab] = useState('crear');
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('es');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [showAttempts, setShowAttempts] = useState(true);
  const [enableLeaderboard, setEnableLeaderboard] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [creationStep, setCreationStep] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showGameplay, setShowGameplay] = useState(false);
  const [isGameplayPreview, setIsGameplayPreview] = useState(false);
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardSource, setLeaderboardSource] = useState<'direct' | 'gameDetails'>('direct');
  const [showErrorState, setShowErrorState] = useState<'404' | '500' | 'gameNotFound' | 'gamePrivate' | 'noGames' | 'leaderboardEmpty' | null>(null);
  const [photos, setPhotos] = useState([
    { id: 1, color: 'bg-purple-600' },
    { id: 2, color: 'bg-blue-700' },
    { id: 3, color: 'bg-green-600' },
    { id: 4, color: 'bg-yellow-600' }
  ]);

  // Determine game mode automatically based on photo count
  const getActiveMode = (): GameMode | null => {
    const photoCount = photos.length;
    if (photoCount === 4) return 'easy';
    if (photoCount === 6) return 'normal';
    if (photoCount === 8) return 'hard';
    if (photoCount === 10) return 'expert';
    return null;
  };

  const activeMode = getActiveMode();
  const isValidPhotoCount = activeMode !== null;

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

  const addPhotos = () => {
    // Simulate adding a photo
    const maxPhotos = 10;
    const newId = Math.max(...photos.map(p => p.id), 0) + 1;
    const colors = ['bg-pink-600', 'bg-orange-600', 'bg-indigo-600', 'bg-red-600', 'bg-cyan-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (photos.length < maxPhotos) {
      setPhotos([...photos, { id: newId, color: randomColor }]);
    } else {
      toast.error('Máximo 10 fotos');
    }
  };

  // Calculate progress to next mode or completion
  const getNextModeTarget = (): number => {
    const photoCount = photos.length;
    if (photoCount < 4) return 4;
    if (photoCount < 6) return 6;
    if (photoCount < 8) return 8;
    if (photoCount < 10) return 10;
    return 10;
  };

  const nextTarget = getNextModeTarget();
  const photoProgress = (photos.length / nextTarget) * 100;

  const getLanguageDisplay = (lang: string) => {
    const languages = {
      es: { flag: '🇪🇸', name: 'Español' },
      en: { flag: '🇺🇸', name: 'English' },
      fr: { flag: '🇫🇷', name: 'Français' }
    };
    return languages[lang as keyof typeof languages] || languages.es;
  };

  // Generate slug from title
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      // Remove accents and special characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove any remaining special characters except hyphens
      .replace(/[^a-z0-9-]/g, '')
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');
  };

  // Auto-generate slug from title when entering Step 2
  useEffect(() => {
    if (step === 2 && !slugManuallyEdited && title) {
      const generatedSlug = generateSlug(title);
      setSlug(generatedSlug);
    }
  }, [step, title, slugManuallyEdited]);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Scroll to top when changing admin pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [adminPage]);

  // Scroll to top when changing view mode
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  const handleContinueToStep2 = () => {
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handleCreateGame = () => {
    setIsCreating(true);
    setCreationStep('Creando juego...');
    
    setTimeout(() => {
      setCreationStep('Generando tablero...');
    }, 800);
    
    setTimeout(() => {
      setCreationStep('Preparando imágenes...');
    }, 1600);
    
    setTimeout(() => {
      setIsCreating(false);
      setCreationStep('');
      setShowSuccessModal(true);
    }, 2400);
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Toaster />
        <AuthPage onAuthSuccess={() => {
          setIsAuthenticated(true);
          toast.success('Welcome to MemoryGame!');
        }} />
      </>
    );
  }

  // Toggle between user and admin view (for demo purposes)
  if (viewMode === 'admin') {
    return (
      <>
        <Toaster />
        <AdminLayout
          currentPage={adminPage}
          onNavigate={setAdminPage}
          onSync={() => toast.success('Data synced')}
          onWorkspace={() => toast.info('Workspace settings')}
          onLogout={() => {
            setIsAuthenticated(false);
            setViewMode('user');
            toast.success('Logged out successfully');
          }}
        >
          {adminPage === 'overview' && <OverviewPage onNavigate={setAdminPage} />}
          {adminPage === 'users' && <UsersPage />}
          {adminPage === 'games' && <GamesPage />}
          {adminPage === 'media' && (
            <MediaPage 
              onNavigateToGame={() => {
                setAdminPage('games');
                toast.info('Navigated to game');
              }} 
            />
          )}
          {adminPage === 'activity' && (
            <ActivityPage 
              onNavigateToUser={() => {
                setAdminPage('users');
                toast.info('Navigated to user');
              }}
              onNavigateToGame={() => {
                setAdminPage('games');
                toast.info('Navigated to game');
              }}
            />
          )}
        </AdminLayout>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      
      {/* iOS-style Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        {/* Top bar with title and settings */}
        <div className="flex items-center justify-between h-11 px-4 pt-3">
          <div className="w-10"></div>
          <h1 className="font-semibold text-gray-900">
            {activeTab === 'crear' ? 'Crear juego' : 'Mis juegos'}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
              >
                <Settings className="h-5 w-5 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setShowLeaderboard(true)}>
                <Trophy className="h-4 w-4 mr-2" />
                Ver Leaderboard (Demo)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode('admin')}>
                <Settings className="h-4 w-4 mr-2" />
                Admin Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                Error States (Demo)
              </div>
              <DropdownMenuItem onClick={() => setShowErrorState('404')}>
                404 - Página no encontrada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowErrorState('500')}>
                500 - Error del servidor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowErrorState('gameNotFound')}>
                Juego no encontrado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowErrorState('gamePrivate')}>
                Juego privado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowErrorState('noGames')}>
                Sin juegos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowErrorState('leaderboardEmpty')}>
                Leaderboard vacío
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => {
                  setIsAuthenticated(false);
                  toast.success('Logged out successfully');
                }}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* iOS-style Segmented Control */}
        <div className="px-4 py-3">
          <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('crear')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'crear'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Crear
            </button>
            <button
              onClick={() => setActiveTab('mis-juegos')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'mis-juegos'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mis juegos
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-28">
        {activeTab === 'crear' ? (
          <>
            {step === 1 ? (
              <>
                {/* iOS Form Sections */}
                <div className="mt-4 space-y-4">
                  {/* Título Section */}
                  <div className="bg-white border-y border-gray-200">
                    <div className="px-4 py-3">
                      <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                        Título
                      </label>
                      <Input
                        type="text"
                        placeholder="Ej. Navidad 2026"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-0 h-11 px-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  {/* Idioma Section */}
                  <div className="bg-white border-y border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                        Idioma del juego
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        // In real app, this would open a picker
                        toast.info('Selector de idioma');
                      }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getLanguageDisplay(language).flag}</span>
                        <span className="text-base text-gray-900">{getLanguageDisplay(language).name}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Fotos Section - Card Group */}
                  <div className="px-4">
                    <div className="bg-gray-50 rounded-2xl p-5">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-gray-900">
                            Fotos del juego
                          </label>
                          <span className="text-sm text-gray-500 font-medium">
                            {photos.length} / {nextTarget} fotos
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {isValidPhotoCount 
                            ? `Modo ${gameModes[activeMode!].name} activado`
                            : `Añade ${nextTarget - photos.length} foto${nextTarget - photos.length !== 1 ? 's' : ''} más para activar el modo ${gameModes[(Object.keys(gameModes) as GameMode[]).find(m => gameModes[m].photos === nextTarget)!].name}`
                          }
                        </p>
                      </div>

                      {/* Photo Grid with Add Button as First Tile */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Add Photos Tile */}
                        <button
                          onClick={addPhotos}
                          disabled={photos.length >= 10}
                          className="aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center gap-2 hover:border-blue-600 hover:bg-blue-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <Plus className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">Añadir</span>
                        </button>

                        {/* Photo Thumbnails */}
                        {photos.map((photo) => (
                          <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden">
                            <div className={`w-full h-full ${photo.color}`} />
                            <button
                              onClick={() => removePhoto(photo.id)}
                              className="absolute top-2 right-2 w-7 h-7 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform"
                              aria-label="Eliminar foto"
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Game Mode Section - Auto-determined by photo count */}
                  <div className="px-4">
                    <div className="mb-3">
                      <h3 className="text-xs text-gray-500 uppercase tracking-wide px-1">
                        Modo de juego
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        El modo se determina automáticamente según las fotos
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(gameModes) as GameMode[]).map((mode) => {
                        const config = gameModes[mode];
                        const isActive = activeMode === mode;
                        const photoDiff = config.photos - photos.length;
                        const isLocked = photoDiff > 0;
                        const isPassed = photos.length > config.photos;
                        
                        // Determine grid dimensions for mini preview
                        const getGridDimensions = (grid: string): [number, number] => {
                          const [cols, rows] = grid.split('×').map(Number);
                          return [cols, rows];
                        };
                        const [cols, rows] = getGridDimensions(config.grid);
                        
                        return (
                          <div
                            key={mode}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              isActive 
                                ? 'border-green-600 bg-green-50' 
                                : isPassed
                                ? 'border-gray-200 bg-gray-50'
                                : isLocked
                                ? 'border-gray-200 bg-white'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              {/* Title */}
                              <div className={`font-semibold mb-3 ${
                                isActive ? 'text-green-900' : 'text-gray-900'
                              }`}>
                                {config.name}
                              </div>
                              
                              {/* Mini Grid Preview */}
                              <div className="mb-3">
                                <div 
                                  className="inline-grid gap-[5px]"
                                  style={{
                                    gridTemplateColumns: `repeat(${cols}, 11px)`,
                                    gridTemplateRows: `repeat(${rows}, 11px)`
                                  }}
                                >
                                  {Array.from({ length: cols * rows }).map((_, i) => (
                                    <div 
                                      key={i}
                                      className={`w-[11px] h-[11px] rounded-[3px] border ${
                                        isActive 
                                          ? 'bg-green-100 border-green-300' 
                                          : 'bg-gray-100 border-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              {/* Status Text */}
                              {isActive && (
                                <div className="text-xs font-medium text-green-600">
                                  Modo activo
                                </div>
                              )}
                              {isLocked && (
                                <div className="text-xs font-medium text-blue-600">
                                  Añade {photoDiff} foto{photoDiff !== 1 ? 's' : ''} más
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 space-y-4">
                  {/* Game Preview Card */}
                  <div className="px-4">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                      {/* Card Header */}
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {title || 'Sin título'}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className="text-lg">{getLanguageDisplay(language).flag}</span>
                            <span>{getLanguageDisplay(language).name}</span>
                          </span>
                          <span>•</span>
                          <span>{photos.length} foto{photos.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      {/* Photo Grid Preview */}
                      <div className="p-4 bg-gray-50">
                        <div className="grid grid-cols-2 gap-2 max-w-[200px] mx-auto">
                          {photos.slice(0, 4).map((photo, index) => (
                            <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                              <div className={`w-full h-full ${photo.color}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Vista Previa Button */}
                      <button
                        onClick={() => {
                          setShowPreviewModal(false);
                          setIsGameplayPreview(true);
                          setShowGameplay(true);
                        }}
                        className="w-full p-4 flex items-center justify-center gap-2 text-blue-600 font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors border-t border-gray-200"
                      >
                        <Play className="h-5 w-5" />
                        Probar juego
                      </button>
                    </div>
                  </div>

                  {/* Elementos del juego */}
                  <div className="px-4">
                    <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2 px-1">
                      Elementos del juego
                    </h3>
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                      {/* Tiempo */}
                      <div
                        onClick={() => setShowTime(!showTime)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200 cursor-pointer"
                      >
                        <div className="flex-1 text-left">
                          <div className="text-base text-gray-900 font-medium">Tiempo</div>
                          <div className="text-xs text-gray-500 mt-0.5">Muestra el tiempo transcurrido</div>
                        </div>
                        <Switch
                          checked={showTime}
                          onCheckedChange={setShowTime}
                          className="ml-3"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      {/* Intentos */}
                      <div
                        onClick={() => setShowAttempts(!showAttempts)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-200 cursor-pointer"
                      >
                        <div className="flex-1 text-left">
                          <div className="text-base text-gray-900 font-medium">Intentos</div>
                          <div className="text-xs text-gray-500 mt-0.5">Cuenta los intentos del jugador</div>
                        </div>
                        <Switch
                          checked={showAttempts}
                          onCheckedChange={setShowAttempts}
                          className="ml-3"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      {/* Leaderboard */}
                      <div
                        onClick={() => setEnableLeaderboard(!enableLeaderboard)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex-1 text-left">
                          <div className="text-base text-gray-900 font-medium">Leaderboard</div>
                          <div className="text-xs text-gray-500 mt-0.5">Tabla de clasificación pública</div>
                        </div>
                        <Switch
                          checked={enableLeaderboard}
                          onCheckedChange={setEnableLeaderboard}
                          className="ml-3"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {/* My Games Section */}
            <div className="bg-white px-4 py-4 border-b border-gray-200 mt-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {games.length} juego{games.length !== 1 ? 's' : ''} creado{games.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {/* Games List */}
            <div className="p-4 space-y-3">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  status={game.status}
                  url={game.url}
                  onViewDetails={() => setShowGameDetails(true)}
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
            {step === 1 ? (
              <Button 
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg disabled:opacity-70"
                disabled={!isValidPhotoCount || !title.trim()}
                onClick={handleContinueToStep2}
              >
                {!title.trim() ? (
                  'Añade un título para continuar'
                ) : !isValidPhotoCount ? (
                  <span className="flex items-center gap-2">
                    {photos.length < 4 
                      ? `Añade ${4 - photos.length} foto${4 - photos.length !== 1 ? 's' : ''} más para continuar`
                      : (() => {
                          // Find closest mode (either above or below)
                          const validModes = [4, 6, 8, 10];
                          const below = validModes.filter(m => m < photos.length).pop() || 0;
                          const above = validModes.find(m => m > photos.length) || 10;
                          
                          const diffBelow = photos.length - below;
                          const diffAbove = above - photos.length;
                          const minDiff = Math.min(diffBelow, diffAbove);
                          
                          return `Añade o elimina ${minDiff} foto${minDiff !== 1 ? 's' : ''} para activar un modo`;
                        })()
                    }
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Continuar con modo {gameModes[activeMode!].name}
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="h-12 px-6 border-gray-300 hover:bg-gray-50"
                  onClick={handleBackToStep1}
                >
                  Atrás
                </Button>
                <Button 
                  className="flex-1 h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg disabled:opacity-70"
                  onClick={handleCreateGame}
                  disabled={isCreating}
                >
                  {isCreating ? creationStep : 'Crear juego'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom spacing to prevent content being hidden by fixed footer */}
      {activeTab === 'crear' && <div className="h-24" />}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Game Preview Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <h2 className="text-white text-2xl font-bold mb-2">{title || 'Sin título'}</h2>
            <p className="text-white/70 text-sm mb-8">Vista previa del juego</p>
            
            {/* Memory Game Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-[280px] w-full">
              {photos.slice(0, 4).map((photo) => (
                <div key={photo.id} className="aspect-square rounded-xl overflow-hidden">
                  <div className={`w-full h-full ${photo.color}`} />
                </div>
              ))}
            </div>

            {/* Game Stats - if enabled */}
            <div className="mt-8 flex items-center gap-6 text-white/80 text-sm">
              {showTime && <span>⏱️ 0:00</span>}
              {showAttempts && <span>🔄 0 intentos</span>}
            </div>
          </div>

          {/* Exit button */}
          <div className="p-6">
            <Button
              onClick={() => setShowPreviewModal(false)}
              className="w-full h-12 bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-lg"
            >
              Salir
            </Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Juego creado</h2>
              <p className="text-gray-600 mb-8">
                Tu juego está listo para compartir
              </p>
              
              <div className="space-y-3">
                <Button
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setIsGameplayPreview(true);
                    setShowGameplay(true);
                  }}
                >
                  Jugar ahora
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium rounded-lg"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setActiveTab('mis-juegos');
                    setStep(1);
                    toast.success('Link copiado al portapapeles');
                  }}
                >
                  Compartir
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gameplay Screen */}
      {showGameplay && (
        <GameplayScreen
          title={title || 'Sin título'}
          photos={photos}
          showTime={showTime}
          showAttempts={showAttempts}
          isPreviewMode={isGameplayPreview}
          onClose={() => {
            setShowGameplay(false);
            setIsGameplayPreview(false);
          }}
          onCreateGame={() => {
            setShowGameplay(false);
            setIsGameplayPreview(false);
            setIsAuthenticated(false);
          }}
        />
      )}

      {/* Game Details Screen */}
      {showGameDetails && (
        <GameDetailsScreen
          game={{
            id: 'navidad-2026',
            title: 'Navidad 2026',
            photoCount: 6,
            difficulty: 'Medio',
            createdAt: new Date('2026-12-15'),
            photos: [
              'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
              'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400',
              'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400',
              'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=400',
              'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400',
              'https://images.unsplash.com/photo-1514846226882-28b324ef7f28?w=400',
            ],
            stats: {
              totalPlays: 247,
              uniqueUsers: 89,
              completionRate: 73,
              averageAttempts: 18,
              averageTime: '2:34'
            },
            recentGames: [
              {
                id: '1',
                date: '5 mar — 16:32',
                attempts: 16,
                completionTime: '2:15'
              },
              {
                id: '2',
                date: '4 mar — 19:45',
                attempts: 22,
                completionTime: '3:08'
              },
              {
                id: '3',
                date: '4 mar — 16:20',
                attempts: 14,
                completionTime: '1:52'
              },
              {
                id: '4',
                date: '3 mar — 11:15',
                attempts: 20,
                completionTime: '2:45'
              },
              {
                id: '5',
                date: '2 mar — 22:30',
                attempts: 18,
                completionTime: '2:20'
              }
            ],
            topPlayers: [
              { rank: 1, username: 'Ana García', attempts: 8, completionTime: '0:41' },
              { rank: 2, username: 'Marcos López', attempts: 9, completionTime: '0:52' },
              { rank: 3, username: 'Laura Martínez', attempts: 10, completionTime: '1:02' }
            ]
          }}
          onBack={() => setShowGameDetails(false)}
          onEdit={() => {
            setShowGameDetails(false);
            setActiveTab('crear');
            setStep(1);
            toast.info('Editando juego');
          }}
          onShare={() => {
            toast.success('Compartir juego');
          }}
          onViewLeaderboard={() => {
            setLeaderboardSource('gameDetails');
            setShowGameDetails(false);
            setShowLeaderboard(true);
          }}
          onViewAllPlays={() => {
            toast.info('Mostrando todas las partidas');
          }}
        />
      )}

      {/* Leaderboard Screen */}
      {showLeaderboard && (
        <LeaderboardScreen
          gameTitle="Navidad 2026"
          entries={[
            {
              rank: 1,
              userId: '1',
              username: 'Carlos M.',
              avatar: 'https://i.pravatar.cc/150?img=12',
              attempts: 12,
              completionTime: '01:24'
            },
            {
              rank: 2,
              userId: '2',
              username: 'Ana García',
              avatar: 'https://i.pravatar.cc/150?img=5',
              attempts: 14,
              completionTime: '01:45'
            },
            {
              rank: 3,
              userId: '3',
              username: 'Miguel Torres',
              avatar: 'https://i.pravatar.cc/150?img=33',
              attempts: 15,
              completionTime: '01:52'
            },
            {
              rank: 4,
              userId: '4',
              username: 'Laura Sánchez',
              avatar: 'https://i.pravatar.cc/150?img=9',
              attempts: 16,
              completionTime: '02:03'
            },
            {
              rank: 5,
              userId: '5',
              username: 'Pedro López',
              avatar: 'https://i.pravatar.cc/150?img=15',
              attempts: 18,
              completionTime: '02:15'
            },
            {
              rank: 6,
              userId: '6',
              username: 'María Rodríguez',
              avatar: 'https://i.pravatar.cc/150?img=20',
              attempts: 19,
              completionTime: '02:28'
            },
            {
              rank: 7,
              userId: '7',
              username: 'Juan Martínez',
              avatar: 'https://i.pravatar.cc/150?img=13',
              attempts: 20,
              completionTime: '02:34'
            },
            {
              rank: 8,
              userId: '8',
              username: 'Sofia Hernández',
              avatar: 'https://i.pravatar.cc/150?img=10',
              attempts: 22,
              completionTime: '02:47'
            },
            {
              rank: 9,
              userId: '9',
              username: 'Diego Ruiz',
              avatar: 'https://i.pravatar.cc/150?img=14',
              attempts: 23,
              completionTime: '02:55'
            },
            {
              rank: 10,
              userId: '10',
              username: 'Isabella Gómez',
              avatar: 'https://i.pravatar.cc/150?img=16',
              attempts: 24,
              completionTime: '03:02'
            },
            {
              rank: 11,
              userId: '11',
              username: 'Alejandro Cruz',
              avatar: 'https://i.pravatar.cc/150?img=11',
              attempts: 25,
              completionTime: '03:15'
            },
            {
              rank: 12,
              userId: '12',
              username: 'Valentina Díaz',
              avatar: 'https://i.pravatar.cc/150?img=23',
              attempts: 26,
              completionTime: '03:22'
            },
            {
              rank: 13,
              userId: '13',
              username: 'Daniel Moreno',
              avatar: 'https://i.pravatar.cc/150?img=17',
              attempts: 28,
              completionTime: '03:38'
            },
            {
              rank: 14,
              userId: '14',
              username: 'Camila Vargas',
              avatar: 'https://i.pravatar.cc/150?img=24',
              attempts: 29,
              completionTime: '03:45'
            },
            {
              rank: 15,
              userId: '15',
              username: 'Javier Reyes',
              avatar: 'https://i.pravatar.cc/150?img=18',
              attempts: 30,
              completionTime: '03:52'
            }
          ]}
          onBack={() => {
            setShowLeaderboard(false);
            if (leaderboardSource === 'gameDetails') {
              setShowGameDetails(true);
              setLeaderboardSource('direct');
            }
          }}
        />
      )}

      {/* Error State Screens */}
      {showErrorState === '404' && (
        <NotFoundScreen
          onGoHome={() => {
            setShowErrorState(null);
            setActiveTab('crear');
          }}
          onViewGames={() => {
            setShowErrorState(null);
            setActiveTab('mis-juegos');
          }}
        />
      )}

      {showErrorState === '500' && (
        <ServerErrorScreen
          onRetry={() => {
            setShowErrorState(null);
            toast.success('Reintentando...');
          }}
          onGoHome={() => {
            setShowErrorState(null);
            setActiveTab('crear');
          }}
        />
      )}

      {showErrorState === 'gameNotFound' && (
        <GameNotFoundScreen
          showBackButton
          onBack={() => setShowErrorState(null)}
          onExploreGames={() => {
            setShowErrorState(null);
            setActiveTab('mis-juegos');
          }}
          onCreateGame={() => {
            setShowErrorState(null);
            setActiveTab('crear');
          }}
        />
      )}

      {showErrorState === 'gamePrivate' && (
        <GamePrivateScreen
          showBackButton
          onBack={() => setShowErrorState(null)}
          onGoHome={() => {
            setShowErrorState(null);
            setActiveTab('crear');
          }}
          onCreateGame={() => {
            setShowErrorState(null);
            setActiveTab('crear');
          }}
        />
      )}

      {showErrorState === 'noGames' && (
        <NoGamesYetScreen
          onCreateGame={() => {
            setShowErrorState(null);
            setActiveTab('crear');
          }}
          onExploreExamples={() => {
            setShowErrorState(null);
            toast.info('Explorando ejemplos...');
          }}
        />
      )}

      {showErrorState === 'leaderboardEmpty' && (
        <LeaderboardEmptyScreen
          showBackButton
          onBack={() => setShowErrorState(null)}
          onPlayNow={() => {
            setShowErrorState(null);
            setShowGameplay(true);
          }}
          onShareGame={() => {
            setShowErrorState(null);
            toast.success('Compartiendo juego...');
          }}
        />
      )}
    </div>
  );
}