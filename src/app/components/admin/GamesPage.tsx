import { useState } from 'react';
import { Search, MoreHorizontal, ExternalLink, Eye, EyeOff, Trash2 } from 'lucide-react';
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
import { toast } from 'sonner';

interface GameData {
  id: string;
  title: string;
  slug: string;
  owner: string;
  status: 'published' | 'draft';
  players24h: number;
  totalPlays: number;
  scores: number;
  images: number;
  updated: string;
}

// Helper function to format numbers in compact format (1.2k, 3.4k)
function formatCompactNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

const mockGames: GameData[] = [
  { id: '1', title: 'Animal Memory', slug: 'animal-memory', owner: 'user_xyz789', status: 'published', players24h: 342, totalPlays: 5420, scores: 1230, images: 10, updated: '2024-03-04' },
  { id: '2', title: 'Space Adventure', slug: 'space-adventure', owner: 'user_def456', status: 'published', players24h: 187, totalPlays: 3850, scores: 892, images: 8, updated: '2024-03-03' },
  { id: '3', title: 'Ocean Quest', slug: 'ocean-quest', owner: 'user_jkl012', status: 'draft', players24h: 0, totalPlays: 0, scores: 0, images: 6, updated: '2024-03-05' },
  { id: '4', title: 'Forest Friends', slug: 'forest-friends', owner: 'user_ghi789', status: 'published', players24h: 521, totalPlays: 8920, scores: 2340, images: 10, updated: '2024-03-02' },
  { id: '5', title: 'Dino World', slug: 'dino-world', owner: 'user_xyz789', status: 'draft', players24h: 0, totalPlays: 0, scores: 0, images: 4, updated: '2024-03-01' },
];

export function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'publish' | 'unpublish' | 'delete';
    game: GameData | null;
  }>({ open: false, type: 'publish', game: null });

  const filteredGames = mockGames.filter((game) => {
    const matchesSearch = 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOwner = !ownerFilter || game.owner.toLowerCase().includes(ownerFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || game.status === statusFilter;
    return matchesSearch && matchesOwner && matchesStatus;
  });

  const handleAction = (type: 'publish' | 'unpublish' | 'delete', game: GameData) => {
    setConfirmDialog({ open: true, type, game });
  };

  const confirmAction = () => {
    if (confirmDialog.game) {
      const action = confirmDialog.type === 'publish' ? 'Published' : 
                     confirmDialog.type === 'unpublish' ? 'Unpublished' : 'Deleted';
      toast.success(`${action} "${confirmDialog.game.title}"`);
    }
    setConfirmDialog({ open: false, type: 'publish', game: null });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by owner..."
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-teal-600 hover:bg-teal-700' : ''}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'published' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('published')}
            className={statusFilter === 'published' ? 'bg-teal-600 hover:bg-teal-700' : ''}
          >
            Published
          </Button>
          <Button
            variant={statusFilter === 'draft' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('draft')}
            className={statusFilter === 'draft' ? 'bg-teal-600 hover:bg-teal-700' : ''}
          >
            Draft
          </Button>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Game
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Players (24h)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total Plays
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Scores
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGames.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{game.title}</p>
                      <p className="text-xs text-gray-500">/{game.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{game.owner}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        game.status === 'published'
                          ? 'bg-teal-100 text-teal-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {game.status === 'published' ? (
                        <><Eye className="h-3 w-3 mr-1 inline" />Published</>
                      ) : (
                        <><EyeOff className="h-3 w-3 mr-1 inline" />Draft</>
                      )}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{formatCompactNumber(game.players24h)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{formatCompactNumber(game.totalPlays)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{formatCompactNumber(game.scores)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{game.images}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{game.updated}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open Game
                        </DropdownMenuItem>
                        {game.status === 'draft' ? (
                          <DropdownMenuItem onClick={() => handleAction('publish', game)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Publish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleAction('unpublish', game)}>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Unpublish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleAction('delete', game)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Game
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGames.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No games found</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === 'publish' && 'Publish Game'}
              {confirmDialog.type === 'unpublish' && 'Unpublish Game'}
              {confirmDialog.type === 'delete' && 'Delete Game'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === 'publish' && 
                `Are you sure you want to publish "${confirmDialog.game?.title}"?`
              }
              {confirmDialog.type === 'unpublish' && 
                `Are you sure you want to unpublish "${confirmDialog.game?.title}"?`
              }
              {confirmDialog.type === 'delete' && 
                `Are you sure you want to delete "${confirmDialog.game?.title}"? This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={confirmDialog.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
