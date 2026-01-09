import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topicsCount: number;
  postsCount: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  name,
  description,
  icon,
  color,
  topicsCount,
  postsCount,
  isActive,
  onClick,
}: CategoryCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        isActive ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div 
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            <Icon name={icon as any} className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="MessageSquare" className="h-3.5 w-3.5" />
                <span>{topicsCount} тем</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="MessagesSquare" className="h-3.5 w-3.5" />
                <span>{postsCount} сообщений</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
