import { useState } from 'react';
import { Search, UserPlus, FileEdit, CheckCircle, Upload, Calendar, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type EventType = 'USER_CREATED' | 'GAME_CREATED' | 'GAME_UPDATED' | 'GAME_PUBLISHED' | 'IMAGE_UPLOADED' | 'ALL';

interface ActivityEvent {
  id: string;
  type: Exclude<EventType, 'ALL'>;
  user: string;
  description: string;
  game?: string;
  gameSlug?: string;
  timestamp: string;
  date: string;
  time: string;
}

const mockEvents: ActivityEvent[] = [
  {
    id: '1',
    type: 'USER_CREATED',
    user: 'user_abc123',
    description: 'created an account',
    timestamp: '2 hours ago',
    date: 'Today',
    time: '14:32'
  },
  {
    id: '2',
    type: 'IMAGE_UPLOADED',
    user: 'user_xyz789',
    description: 'uploaded 3 images to',
    game: 'Animal Memory',
    gameSlug: 'animal-memory',
    timestamp: '3 hours ago',
    date: 'Today',
    time: '13:15'
  },
  {
    id: '3',
    type: 'GAME_CREATED',
    user: 'user_xyz789',
    description: 'created a new game',
    game: 'Animal Memory',
    gameSlug: 'animal-memory',
    timestamp: '3 hours ago',
    date: 'Today',
    time: '13:10'
  },
  {
    id: '4',
    type: 'GAME_PUBLISHED',
    user: 'user_def456',
    description: 'published',
    game: 'Space Adventure',
    gameSlug: 'space-adventure',
    timestamp: '5 hours ago',
    date: 'Today',
    time: '11:45'
  },
  {
    id: '5',
    type: 'GAME_UPDATED',
    user: 'user_def456',
    description: 'updated game settings for',
    game: 'Space Adventure',
    gameSlug: 'space-adventure',
    timestamp: '6 hours ago',
    date: 'Today',
    time: '10:22'
  },
  {
    id: '6',
    type: 'USER_CREATED',
    user: 'user_ghi789',
    description: 'created an account',
    timestamp: '1 day ago',
    date: 'Yesterday',
    time: '16:20'
  },
  {
    id: '7',
    type: 'GAME_CREATED',
    user: 'user_jkl012',
    description: 'created a new game',
    game: 'Ocean Quest',
    gameSlug: 'ocean-quest',
    timestamp: '1 day ago',
    date: 'Yesterday',
    time: '15:30'
  },
  {
    id: '8',
    type: 'IMAGE_UPLOADED',
    user: 'user_ghi789',
    description: 'uploaded 5 images to',
    game: 'Forest Friends',
    gameSlug: 'forest-friends',
    timestamp: '2 days ago',
    date: 'Earlier',
    time: '09:12'
  },
  {
    id: '9',
    type: 'GAME_PUBLISHED',
    user: 'user_ghi789',
    description: 'published',
    game: 'Forest Friends',
    gameSlug: 'forest-friends',
    timestamp: '2 days ago',
    date: 'Earlier',
    time: '09:15'
  },
];

function EventIcon({ type }: { type: Exclude<EventType, 'ALL'> }) {
  switch (type) {
    case 'USER_CREATED':
      return (
        <div className="p-2 bg-blue-50 rounded-lg">
          <UserPlus className="h-4 w-4 text-blue-600" />
        </div>
      );
    case 'GAME_CREATED':
    case 'GAME_UPDATED':
      return (
        <div className="p-2 bg-purple-50 rounded-lg">
          <FileEdit className="h-4 w-4 text-purple-600" />
        </div>
      );
    case 'GAME_PUBLISHED':
      return (
        <div className="p-2 bg-teal-50 rounded-lg">
          <CheckCircle className="h-4 w-4 text-teal-600" />
        </div>
      );
    case 'IMAGE_UPLOADED':
      return (
        <div className="p-2 bg-orange-50 rounded-lg">
          <Upload className="h-4 w-4 text-orange-600" />
        </div>
      );
  }
}

function EventBadge({ type }: { type: Exclude<EventType, 'ALL'> }) {
  const configs = {
    USER_CREATED: { label: 'User', className: 'bg-blue-100 text-blue-700' },
    GAME_CREATED: { label: 'Game', className: 'bg-purple-100 text-purple-700' },
    GAME_UPDATED: { label: 'Update', className: 'bg-purple-100 text-purple-700' },
    GAME_PUBLISHED: { label: 'Publish', className: 'bg-teal-100 text-teal-700' },
    IMAGE_UPLOADED: { label: 'Media', className: 'bg-orange-100 text-orange-700' },
  };

  const config = configs[type];
  return (
    <Badge variant="secondary" className={`text-xs ${config.className}`}>
      {config.label}
    </Badge>
  );
}

export function ActivityPage({ onNavigateToUser, onNavigateToGame }: { 
  onNavigateToUser?: () => void; 
  onNavigateToGame?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType>('ALL');
  const [userFilter, setUserFilter] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = 
      event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.game && event.game.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.gameSlug && event.gameSlug.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEventType = eventTypeFilter === 'ALL' || event.type === eventTypeFilter;
    const matchesUser = !userFilter || event.user.toLowerCase().includes(userFilter.toLowerCase());
    const matchesGame = !gameFilter || (event.game && event.game.toLowerCase().includes(gameFilter.toLowerCase()));
    // Simple date filtering (in real app would use proper date parsing)
    const matchesDate = true;
    
    return matchesSearch && matchesEventType && matchesUser && matchesGame && matchesDate;
  });

  // Group events by date
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, ActivityEvent[]>);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user tag or game slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Event Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <Select value={eventTypeFilter} onValueChange={(value) => setEventTypeFilter(value as EventType)}>
              <SelectTrigger>
                <SelectValue placeholder="All events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All events</SelectItem>
                <SelectItem value="USER_CREATED">User Created</SelectItem>
                <SelectItem value="GAME_CREATED">Game Created</SelectItem>
                <SelectItem value="GAME_UPDATED">Game Updated</SelectItem>
                <SelectItem value="GAME_PUBLISHED">Game Published</SelectItem>
                <SelectItem value="IMAGE_UPLOADED">Image Uploaded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by user..."
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Game Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Game</label>
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
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(searchQuery || eventTypeFilter !== 'ALL' || userFilter || gameFilter || dateFromFilter || dateToFilter) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setEventTypeFilter('ALL');
                setUserFilter('');
                setGameFilter('');
                setDateFromFilter('');
                setDateToFilter('');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Log</h3>
        
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No activity found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{date}</p>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <EventIcon type={event.type} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          <EventBadge type={event.type} />
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                        <p className="text-sm text-gray-900">
                          <button
                            onClick={onNavigateToUser}
                            className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
                          >
                            {event.user}
                          </button>{' '}
                          {event.description}
                          {event.game && (
                            <>
                              {' '}
                              <button
                                onClick={onNavigateToGame}
                                className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
                              >
                                "{event.game}"
                              </button>
                            </>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <span className="text-sm text-gray-600">Page 1 of 10</span>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
