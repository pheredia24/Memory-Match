import { useState } from 'react';
import { Search, MoreHorizontal, Shield, User, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
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

interface UserData {
  id: string;
  user_tag: string;
  email: string;
  role: 'user' | 'superadmin';
  games: number;
  created: string;
}

const mockUsers: UserData[] = [
  { id: '1', user_tag: 'user_abc123', email: 'john@example.com', role: 'superadmin', games: 23, created: '2024-01-15' },
  { id: '2', user_tag: 'user_xyz789', email: 'sarah@example.com', role: 'user', games: 15, created: '2024-02-20' },
  { id: '3', user_tag: 'user_def456', email: 'mike@example.com', role: 'user', games: 8, created: '2024-03-01' },
  { id: '4', user_tag: 'user_ghi789', email: 'emma@example.com', role: 'user', games: 42, created: '2024-01-28' },
  { id: '5', user_tag: 'user_jkl012', email: 'alex@example.com', role: 'user', games: 5, created: '2024-03-05' },
];

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'superadmin'>('all');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'promote' | 'demote' | 'delete';
    user: UserData | null;
  }>({ open: false, type: 'promote', user: null });

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user_tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAction = (type: 'promote' | 'demote' | 'delete', user: UserData) => {
    setConfirmDialog({ open: true, type, user });
  };

  const confirmAction = () => {
    if (confirmDialog.user) {
      const action = confirmDialog.type === 'promote' ? 'Promoted' : 
                     confirmDialog.type === 'demote' ? 'Demoted' : 'Deleted';
      toast.success(`${action} ${confirmDialog.user.user_tag}`);
    }
    setConfirmDialog({ open: false, type: 'promote', user: null });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email or user tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={roleFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('all')}
            className={roleFilter === 'all' ? 'bg-teal-600 hover:bg-teal-700' : ''}
          >
            All
          </Button>
          <Button
            variant={roleFilter === 'user' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('user')}
            className={roleFilter === 'user' ? 'bg-teal-600 hover:bg-teal-700' : ''}
          >
            User
          </Button>
          <Button
            variant={roleFilter === 'superadmin' ? 'default' : 'outline'}
            onClick={() => setRoleFilter('superadmin')}
            className={roleFilter === 'superadmin' ? 'bg-teal-600 hover:bg-teal-700' : ''}
          >
            Superadmin
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Games
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.user_tag}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        user.role === 'superadmin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.role === 'superadmin' ? (
                        <><Shield className="h-3 w-3 mr-1 inline" />Superadmin</>
                      ) : (
                        <><User className="h-3 w-3 mr-1 inline" />User</>
                      )}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{user.games}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{user.created}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.role === 'user' ? (
                          <DropdownMenuItem onClick={() => handleAction('promote', user)}>
                            <ArrowUp className="h-4 w-4 mr-2" />
                            Promote to Superadmin
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleAction('demote', user)}>
                            <ArrowDown className="h-4 w-4 mr-2" />
                            Demote to User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleAction('delete', user)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === 'promote' && 'Promote User'}
              {confirmDialog.type === 'demote' && 'Demote User'}
              {confirmDialog.type === 'delete' && 'Delete User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === 'promote' && 
                `Are you sure you want to promote ${confirmDialog.user?.user_tag} to Superadmin?`
              }
              {confirmDialog.type === 'demote' && 
                `Are you sure you want to demote ${confirmDialog.user?.user_tag} to User?`
              }
              {confirmDialog.type === 'delete' && 
                `Are you sure you want to delete ${confirmDialog.user?.user_tag}? This action cannot be undone.`
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
