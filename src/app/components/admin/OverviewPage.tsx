import { Users, Gamepad2, CheckCircle, Image, Activity, Plus, UserPlus, FileEdit } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  onClick?: () => void;
}

function KPICard({ title, value, icon: Icon, trend, onClick }: KPICardProps) {
  return (
    <Card
      className={`p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && <p className="text-sm text-teal-600 mt-1">{trend}</p>}
        </div>
        <div className="p-3 bg-teal-50 rounded-lg">
          <Icon className="h-6 w-6 text-teal-600" />
        </div>
      </div>
    </Card>
  );
}

interface ActivityItem {
  id: string;
  type: 'user' | 'game' | 'publish';
  user: string;
  action: string;
  target?: string;
  timestamp: string;
  date: string;
}

const mockActivities: ActivityItem[] = [
  { id: '1', type: 'user', user: 'user_abc123', action: 'created account', timestamp: '2 hours ago', date: 'Today' },
  { id: '2', type: 'game', user: 'user_xyz789', action: 'created game', target: 'Animal Memory', timestamp: '3 hours ago', date: 'Today' },
  { id: '3', type: 'publish', user: 'user_def456', action: 'published', target: 'Space Adventure', timestamp: '5 hours ago', date: 'Today' },
  { id: '4', type: 'user', user: 'user_ghi789', action: 'created account', timestamp: '1 day ago', date: 'Yesterday' },
  { id: '5', type: 'game', user: 'user_jkl012', action: 'updated game', target: 'Ocean Quest', timestamp: '1 day ago', date: 'Yesterday' },
];

function ActivityIcon({ type }: { type: 'user' | 'game' | 'publish' }) {
  switch (type) {
    case 'user':
      return <UserPlus className="h-4 w-4 text-blue-600" />;
    case 'game':
      return <FileEdit className="h-4 w-4 text-purple-600" />;
    case 'publish':
      return <CheckCircle className="h-4 w-4 text-teal-600" />;
  }
}

export function OverviewPage({ onNavigate }: { onNavigate: (page: 'users' | 'games') => void }) {
  const groupedActivities = mockActivities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, ActivityItem[]>);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Total Users"
          value="1,247"
          icon={Users}
          trend="+12% this month"
          onClick={() => onNavigate('users')}
        />
        <KPICard
          title="Total Games"
          value="856"
          icon={Gamepad2}
          trend="+8% this month"
          onClick={() => onNavigate('games')}
        />
        <KPICard
          title="Published"
          value="67%"
          icon={CheckCircle}
        />
        <KPICard
          title="Total Images"
          value="8,432"
          icon={Image}
        />
        <KPICard
          title="Events (24h)"
          value="342"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {Object.entries(groupedActivities).map(([date, activities]) => (
              <div key={date}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{date}</p>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <ActivityIcon type={activity.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          {activity.target && <span className="font-medium">"{activity.target}"</span>}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Insights & Actions */}
        <div className="space-y-6">
          {/* Quick Insights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Top Creator</p>
                  <Badge variant="secondary" className="text-xs">23 games</Badge>
                </div>
                <p className="text-sm font-medium text-gray-900">user_champion</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Draft Games</p>
                  <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">285</Badge>
                </div>
                <p className="text-xs text-gray-500">33% of total games</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Avg Images/Game</p>
                  <Badge variant="secondary" className="text-xs">9.8</Badge>
                </div>
                <p className="text-xs text-gray-500">Within healthy range</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Create Test User
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileEdit className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Activity className="h-4 w-4" />
                View Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
