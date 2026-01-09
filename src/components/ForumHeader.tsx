import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ForumHeaderProps {
  onSearchChange: (value: string) => void;
  notificationCount: number;
  userReputation: number;
}

export default function ForumHeader({ onSearchChange, notificationCount, userReputation }: ForumHeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Icon name="MessageSquare" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ForumHub
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="Home" className="h-4 w-4" />
              Главная
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="Grid3x3" className="h-4 w-4" />
              Категории
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="MessageCircle" className="h-4 w-4" />
              Обсуждения
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden sm:block">
            <Icon name="Search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по форуму..."
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-9 h-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-start gap-3 p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">АИ</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Новый ответ в теме</p>
                  <p className="text-xs text-muted-foreground">Анна Иванова ответила в "React vs Vue"</p>
                  <p className="text-xs text-muted-foreground">2 мин назад</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 p-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">МП</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Лайк вашего сообщения</p>
                  <p className="text-xs text-muted-foreground">Максим Петров оценил ваш комментарий</p>
                  <p className="text-xs text-muted-foreground">15 мин назад</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    ВП
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium">Вы</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Star" className="h-3 w-3 fill-accent text-accent" />
                    {userReputation}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="User" className="mr-2 h-4 w-4" />
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Настройки
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Shield" className="mr-2 h-4 w-4" />
                Модерация
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Icon name="LogOut" className="mr-2 h-4 w-4" />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
