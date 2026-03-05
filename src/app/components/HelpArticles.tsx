import { ArrowLeft, BookOpen, Search, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';

interface HelpArticlesProps {
  onBack: () => void;
  onArticleClick: (articleId: string) => void;
}

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  icon: string;
}

export function HelpArticles({ onBack, onArticleClick }: HelpArticlesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const articles: Article[] = [
    {
      id: 'create-game',
      title: 'Cómo crear tu primer juego',
      category: 'Comenzar',
      summary: 'Aprende a crear un juego de memoria paso a paso.',
      icon: '🎮'
    },
    {
      id: 'upload-photos',
      title: 'Subir y organizar fotos',
      category: 'Creación',
      summary: 'Consejos para elegir y subir las mejores imágenes.',
      icon: '📸'
    },
    {
      id: 'share-game',
      title: 'Compartir tu juego',
      category: 'Compartir',
      summary: 'Diferentes formas de compartir tus juegos con otros.',
      icon: '🔗'
    },
    {
      id: 'game-settings',
      title: 'Configuración del juego',
      category: 'Configuración',
      summary: 'Personaliza la dificultad y opciones de tu juego.',
      icon: '⚙️'
    },
    {
      id: 'leaderboard',
      title: 'Entender el leaderboard',
      category: 'Puntuaciones',
      summary: 'Cómo funcionan las puntuaciones y clasificaciones.',
      icon: '🏆'
    },
    {
      id: 'publish-unpublish',
      title: 'Publicar y despublicar juegos',
      category: 'Gestión',
      summary: 'Controla quién puede ver y jugar tus juegos.',
      icon: '👁️'
    },
    {
      id: 'duplicate-game',
      title: 'Duplicar un juego existente',
      category: 'Gestión',
      summary: 'Crea variaciones de tus juegos favoritos.',
      icon: '📋'
    },
    {
      id: 'delete-game',
      title: 'Eliminar juegos',
      category: 'Gestión',
      summary: 'Cómo borrar juegos que ya no necesitas.',
      icon: '🗑️'
    },
    {
      id: 'game-modes',
      title: 'Modos de juego',
      category: 'Gameplay',
      summary: 'Diferencias entre Fácil, Normal, Difícil y Experto.',
      icon: '🎯'
    },
    {
      id: 'account-settings',
      title: 'Configuración de cuenta',
      category: 'Cuenta',
      summary: 'Administra tu perfil y preferencias.',
      icon: '👤'
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 flex items-center justify-center active:bg-gray-100 rounded-full transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="h-5 w-5 text-gray-900" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Centro de ayuda</h1>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar artículos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 pl-10"
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 max-w-2xl mx-auto">
          {searchQuery ? (
            // Search Results
            <div>
              <p className="text-sm text-gray-600 mb-4">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
              </p>
              <div className="space-y-2">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onArticleClick(article.id)}
                    className="w-full bg-white rounded-xl border border-gray-200 p-4 hover:bg-gray-50 hover:shadow-sm transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{article.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {article.summary}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-gray-600 mb-2">No se encontraron artículos</p>
                  <p className="text-sm text-gray-500">Intenta con otros términos de búsqueda</p>
                </div>
              )}
            </div>
          ) : (
            // Browse by Category
            <div className="space-y-8">
              {categories.map((category) => {
                const categoryArticles = articles.filter(a => a.category === category);
                return (
                  <section key={category}>
                    <h2 className="text-base font-semibold text-gray-900 mb-3 px-1">
                      {category}
                    </h2>
                    <div className="space-y-2">
                      {categoryArticles.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => onArticleClick(article.id)}
                          className="w-full bg-white rounded-xl border border-gray-200 p-4 hover:bg-gray-50 hover:shadow-sm transition-all text-left"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">{article.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                {article.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {article.summary}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
