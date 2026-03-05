import { ReactNode } from 'react';
import { LayoutDashboard, Users, Gamepad2, Image, Activity, RefreshCw, Building2, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: 'overview' | 'users' | 'games' | 'media' | 'activity';
  onNavigate: (page: 'overview' | 'users' | 'games' | 'media' | 'activity') => void;
  onSync?: () => void;
  onWorkspace?: () => void;
  onLogout?: () => void;
}

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
  { id: 'users' as const, label: 'Users', icon: Users },
  { id: 'games' as const, label: 'Games', icon: Gamepad2 },
  { id: 'media' as const, label: 'Media', icon: Image },
  { id: 'activity' as const, label: 'Activity', icon: Activity },
];

export function AdminLayout({ children, currentPage, onNavigate, onSync, onWorkspace, onLogout }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Superadmin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 capitalize">{currentPage}</h2>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onSync}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Sync
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onWorkspace}
              className="gap-2"
            >
              <Building2 className="h-4 w-4" />
              Workspace
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
