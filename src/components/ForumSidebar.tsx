import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ActiveUser {
  id: string;
  name: string;
  avatar?: string;
  reputation: number;
  isOnline: boolean;
}

interface ForumStat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ForumSidebarProps {
  stats: ForumStat[];
  activeUsers: ActiveUser[];
  onCreateTopic: () => void;
}

export default function ForumSidebar({ stats, activeUsers, onCreateTopic }: ForumSidebarProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <aside className="space-y-4">
      <Button 
        onClick={onCreateTopic}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        <Icon name="Plus" className="mr-2 h-5 w-5" />
        Создать тему
      </Button>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="BarChart3" className="h-4 w-4 text-primary" />
            Статистика форума
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon name={stat.icon as any} className="h-4 w-4" style={{ color: stat.color }} />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="Users" className="h-4 w-4 text-secondary" />
            Активные пользователи
            <Badge variant="secondary" className="ml-auto">{activeUsers.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Star" className="h-3 w-3 fill-accent text-accent" />
                  {user.reputation}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Модерация</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            У вас есть доступ к панели модератора
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Открыть панель
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
