import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface DiscussionCardProps {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  category: {
    name: string;
    color: string;
  };
  preview: string;
  replies: number;
  views: number;
  likes: number;
  hasAttachment: boolean;
  isPinned?: boolean;
  isHot?: boolean;
  createdAt: string;
  lastActivity: string;
}

export default function DiscussionCard({
  title,
  author,
  category,
  preview,
  replies,
  views,
  likes,
  hasAttachment,
  isPinned,
  isHot,
  createdAt,
  lastActivity,
}: DiscussionCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
              {getInitials(author.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <div className="flex items-start gap-2 mb-2">
                {isPinned && (
                  <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary">
                    <Icon name="Pin" className="h-3 w-3 mr-1" />
                    Закреплено
                  </Badge>
                )}
                {isHot && (
                  <Badge variant="secondary" className="shrink-0 bg-accent/10 text-accent">
                    <Icon name="Flame" className="h-3 w-3 mr-1" />
                    Популярное
                  </Badge>
                )}
                <Badge 
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    borderColor: category.color
                  }}
                  className="shrink-0"
                  variant="outline"
                >
                  {category.name}
                </Badge>
              </div>
              <h3 className="font-semibold text-base mb-1 line-clamp-1 hover:text-primary transition-colors">
                {title}
                {hasAttachment && (
                  <Icon name="Paperclip" className="inline h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                )}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{preview}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="font-medium">{author.name}</span>
                <span className="flex items-center gap-1">
                  <Icon name="Star" className="h-3 w-3 fill-accent text-accent" />
                  {author.reputation}
                </span>
                <span>{createdAt}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Icon name="MessageCircle" className="h-3.5 w-3.5" />
                  {replies}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" className="h-3.5 w-3.5" />
                  {views}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Heart" className="h-3.5 w-3.5 fill-accent text-accent" />
                  {likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
