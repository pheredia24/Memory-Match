import { useState } from 'react';
import { Search, MoreHorizontal, ExternalLink, Eye, Trash2, Grid3x3, List, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';

interface MediaData {
  id: string;
  filename: string;
  gameTitle: string;
  gameSlug: string;
  uploader: string;
  uploaded: string;
  color: string; // For mock thumbnails
}

const mockMedia: MediaData[] = [
  { id: '1', filename: 'elephant.jpg', gameTitle: 'Animal Memory', gameSlug: 'animal-memory', uploader: 'user_xyz789', uploaded: '2024-03-04', color: 'bg-purple-400' },
  { id: '2', filename: 'lion.jpg', gameTitle: 'Animal Memory', gameSlug: 'animal-memory', uploader: 'user_xyz789', uploaded: '2024-03-04', color: 'bg-orange-400' },
  { id: '3', filename: 'rocket.jpg', gameTitle: 'Space Adventure', gameSlug: 'space-adventure', uploader: 'user_def456', uploaded: '2024-03-03', color: 'bg-blue-500' },
  { id: '4', filename: 'planet.jpg', gameTitle: 'Space Adventure', gameSlug: 'space-adventure', uploader: 'user_def456', uploaded: '2024-03-03', color: 'bg-indigo-400' },
  { id: '5', filename: 'fish.jpg', gameTitle: 'Ocean Quest', gameSlug: 'ocean-quest', uploader: 'user_jkl012', uploaded: '2024-03-05', color: 'bg-cyan-400' },
  { id: '6', filename: 'coral.jpg', gameTitle: 'Ocean Quest', gameSlug: 'ocean-quest', uploader: 'user_jkl012', uploaded: '2024-03-05', color: 'bg-teal-400' },
  { id: '7', filename: 'tree.jpg', gameTitle: 'Forest Friends', gameSlug: 'forest-friends', uploader: 'user_ghi789', uploaded: '2024-03-02', color: 'bg-green-500' },
  { id: '8', filename: 'bird.jpg', gameTitle: 'Forest Friends', gameSlug: 'forest-friends', uploader: 'user_ghi789', uploaded: '2024-03-02', color: 'bg-emerald-400' },
];

export function MediaPage({ onNavigateToGame }: { onNavigateToGame?: () => void }) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  const [uploaderFilter, setUploaderFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [previewImage, setPreviewImage] = useState<MediaData | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<MediaData | null>(null);

  const filteredMedia = mockMedia.filter((media) => {
    const matchesSearch = 
      media.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.gameSlug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = !gameFilter || media.gameSlug.toLowerCase().includes(gameFilter.toLowerCase());
    const matchesUploader = !uploaderFilter || media.uploader.toLowerCase().includes(uploaderFilter.toLowerCase());
    const matchesDate = !dateFilter || media.uploaded.includes(dateFilter);
    return matchesSearch && matchesGame && matchesUploader && matchesDate;
  });

  const handleDelete = (media: MediaData) => {
    toast.success(`Deleted ${media.filename}`);
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters and View Toggle */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by filename or game slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-teal-600 hover:bg-teal-700' : ''}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-teal-600 hover:bg-teal-700' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by game..."
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by uploader..."
              value={uploaderFilter}
              onChange={(e) => setUploaderFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div
                className={`aspect-square ${media.color} cursor-pointer relative`}
                onClick={() => setPreviewImage(media)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{media.filename}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5">{media.gameTitle}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {media.uploader}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setPreviewImage(media)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Open Image
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onNavigateToGame}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Game
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setConfirmDelete(media)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Image
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-xs text-gray-400 mt-1">{media.uploaded}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Game
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Uploader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedia.map((media) => (
                  <tr key={media.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 ${media.color} rounded cursor-pointer`}
                          onClick={() => setPreviewImage(media)}
                        />
                        <p className="text-sm font-medium text-gray-900">{media.filename}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{media.gameTitle}</p>
                        <p className="text-xs text-gray-500">/{media.gameSlug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {media.uploader}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">{media.uploaded}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setPreviewImage(media)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Open Image
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={onNavigateToGame}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Game
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setConfirmDelete(media)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Image
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMedia.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No images found</p>
            </div>
          )}
        </div>
      )}

      {/* Image Preview Modal */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewImage?.filename}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className={`aspect-video ${previewImage?.color} rounded-lg`} />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Game</p>
                <p className="font-medium text-gray-900">{previewImage?.gameTitle}</p>
              </div>
              <div>
                <p className="text-gray-500">Uploader</p>
                <p className="font-medium text-gray-900">{previewImage?.uploader}</p>
              </div>
              <div>
                <p className="text-gray-500">Uploaded</p>
                <p className="font-medium text-gray-900">{previewImage?.uploaded}</p>
              </div>
              <div>
                <p className="text-gray-500">Slug</p>
                <p className="font-medium text-gray-900">/{previewImage?.gameSlug}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={onNavigateToGame}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Game
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => {
                  if (previewImage) {
                    setConfirmDelete(previewImage);
                    setPreviewImage(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{confirmDelete?.filename}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDelete && handleDelete(confirmDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
