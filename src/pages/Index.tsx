import { useState } from 'react';
import ForumHeader from '@/components/ForumHeader';
import CategoryCard from '@/components/CategoryCard';
import DiscussionCard from '@/components/DiscussionCard';
import ForumSidebar from '@/components/ForumSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = [
  {
    id: '1',
    name: 'Веб-разработка',
    description: 'React, Vue, Angular и другие фреймворки. Обсуждение лучших практик и новых технологий.',
    icon: 'Code2',
    color: '#8B5CF6',
    topicsCount: 1247,
    postsCount: 8932,
  },
  {
    id: '2',
    name: 'Дизайн',
    description: 'UI/UX дизайн, графика, анимации. Обмен опытом и портфолио.',
    icon: 'Palette',
    color: '#D946EF',
    topicsCount: 856,
    postsCount: 5421,
  },
  {
    id: '3',
    name: 'Backend',
    description: 'Node.js, Python, API, базы данных. Архитектура серверных приложений.',
    icon: 'Database',
    color: '#0EA5E9',
    topicsCount: 2134,
    postsCount: 12456,
  },
  {
    id: '4',
    name: 'DevOps',
    description: 'CI/CD, Docker, Kubernetes, автоматизация. Инфраструктура и развертывание.',
    icon: 'Container',
    color: '#F97316',
    topicsCount: 678,
    postsCount: 3892,
  },
];

const discussions = [
  {
    id: '1',
    title: 'React 19: Что нового и стоит ли переходить?',
    author: {
      name: 'Анна Иванова',
      reputation: 2847,
    },
    category: {
      name: 'Веб-разработка',
      color: '#8B5CF6',
    },
    preview: 'Недавно вышла новая версия React с интересными фичами. Кто уже пробовал? Делитесь впечатлениями и опытом миграции проектов.',
    replies: 47,
    views: 1823,
    likes: 134,
    hasAttachment: false,
    isPinned: true,
    isHot: true,
    createdAt: '2 часа назад',
    lastActivity: '15 мин назад',
  },
  {
    id: '2',
    title: 'Лучшие практики организации компонентов в большом проекте',
    author: {
      name: 'Максим Петров',
      reputation: 1923,
    },
    category: {
      name: 'Веб-разработка',
      color: '#8B5CF6',
    },
    preview: 'Поделитесь своим опытом структурирования компонентов. Как вы организуете папки, какие паттерны используете?',
    replies: 32,
    views: 956,
    likes: 87,
    hasAttachment: true,
    isHot: true,
    createdAt: '5 часов назад',
    lastActivity: '1 час назад',
  },
  {
    id: '3',
    title: 'Figma vs Sketch в 2026: что выбрать?',
    author: {
      name: 'Елена Смирнова',
      reputation: 3421,
    },
    category: {
      name: 'Дизайн',
      color: '#D946EF',
    },
    preview: 'Сравниваю инструменты для дизайна. Figma стала еще мощнее, но Sketch тоже не стоит на месте. Ваше мнение?',
    replies: 64,
    views: 2134,
    likes: 156,
    hasAttachment: false,
    createdAt: 'вчера',
    lastActivity: '30 мин назад',
  },
  {
    id: '4',
    title: 'PostgreSQL vs MongoDB: когда что использовать?',
    author: {
      name: 'Дмитрий Козлов',
      reputation: 4156,
    },
    category: {
      name: 'Backend',
      color: '#0EA5E9',
    },
    preview: 'Обсуждаем выбор базы данных для различных типов проектов. Реляционные vs документо-ориентированные БД.',
    replies: 89,
    views: 3421,
    likes: 203,
    hasAttachment: true,
    isPinned: true,
    createdAt: '2 дня назад',
    lastActivity: '2 часа назад',
  },
  {
    id: '5',
    title: 'Docker Compose для микросервисов: гайд для начинающих',
    author: {
      name: 'Сергей Волков',
      reputation: 2134,
    },
    category: {
      name: 'DevOps',
      color: '#F97316',
    },
    preview: 'Подробное руководство по настройке Docker Compose для работы с микросервисами. Примеры конфигураций и best practices.',
    replies: 28,
    views: 1245,
    likes: 92,
    hasAttachment: true,
    createdAt: '3 дня назад',
    lastActivity: '5 часов назад',
  },
];

const stats = [
  { label: 'Всего тем', value: '4,915', icon: 'MessageSquare', color: '#8B5CF6' },
  { label: 'Сообщений', value: '30,701', icon: 'MessagesSquare', color: '#0EA5E9' },
  { label: 'Пользователей', value: '12,847', icon: 'Users', color: '#D946EF' },
  { label: 'Онлайн', value: '342', icon: 'Activity', color: '#10B981' },
];

const activeUsers = [
  { id: '1', name: 'Анна Иванова', reputation: 2847, isOnline: true },
  { id: '2', name: 'Максим Петров', reputation: 1923, isOnline: true },
  { id: '3', name: 'Елена Смирнова', reputation: 3421, isOnline: true },
  { id: '4', name: 'Дмитрий Козлов', reputation: 4156, isOnline: false },
  { id: '5', name: 'Сергей Волков', reputation: 2134, isOnline: true },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || discussion.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader 
        onSearchChange={setSearchQuery}
        notificationCount={3}
        userReputation={1547}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <main className="space-y-6 animate-fade-in">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="discussions">Обсуждения</TabsTrigger>
                <TabsTrigger value="categories">Категории</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory ? `${selectedCategory}` : 'Все обсуждения'}
                  </h2>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-primary hover:underline"
                    >
                      Сбросить фильтр
                    </button>
                  )}
                </div>
                {filteredDiscussions.map((discussion, index) => (
                  <div 
                    key={discussion.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <DiscussionCard {...discussion} />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Все категории</h2>
                <div className="grid gap-4">
                  {categories.map((category, index) => (
                    <div
                      key={category.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CategoryCard
                        {...category}
                        isActive={selectedCategory === category.name}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          document.querySelector('[value="discussions"]')?.dispatchEvent(
                            new MouseEvent('click', { bubbles: true })
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>

          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <ForumSidebar
              stats={stats}
              activeUsers={activeUsers}
              onCreateTopic={() => console.log('Create topic')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
