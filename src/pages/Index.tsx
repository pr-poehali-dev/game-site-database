import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

interface Game {
  id: number
  title: string
  genre: string
  platform: string[]
  rating: number
  price: number
  image: string
  description: string
  releaseDate: string
  reviews: number
  isNew: boolean
}

const gamesData: Game[] = [
  {
    id: 1,
    title: "Cyber Night 2077",
    genre: "RPG",
    platform: ["PC", "PlayStation", "Xbox"],
    rating: 4.8,
    price: 59.99,
    image: "/img/b6086dbe-761e-4a1c-8347-e7614ad6bdeb.jpg",
    description: "Погружайтесь в мир киберпанка с невероятной графикой",
    releaseDate: "2024-03-15",
    reviews: 1250,
    isNew: true
  },
  {
    id: 2,
    title: "Mystic Forest",
    genre: "Adventure",
    platform: ["PC", "Nintendo"],
    rating: 4.6,
    price: 39.99,
    image: "/img/1678c015-adcd-4f4d-9c20-b9621fe16e12.jpg",
    description: "Магическое приключение в зачарованном лесу",
    releaseDate: "2024-01-20",
    reviews: 890,
    isNew: false
  },
  {
    id: 3,
    title: "Speed Legends",
    genre: "Racing",
    platform: ["PC", "PlayStation", "Xbox"],
    rating: 4.4,
    price: 49.99,
    image: "/img/ce71f468-e5f2-4a7b-b88c-2770e7ffc842.jpg",
    description: "Экстремальные гонки на футуристических трассах",
    releaseDate: "2023-11-10",
    reviews: 2100,
    isNew: false
  },
  {
    id: 4,
    title: "Galaxy Wars",
    genre: "Action",
    platform: ["PC", "PlayStation"],
    rating: 4.7,
    price: 44.99,
    image: "/img/b6086dbe-761e-4a1c-8347-e7614ad6bdeb.jpg",
    description: "Космические сражения в далекой галактике",
    releaseDate: "2024-02-08",
    reviews: 1580,
    isNew: true
  },
  {
    id: 5,
    title: "Medieval Quest",
    genre: "RPG",
    platform: ["PC", "Xbox"],
    rating: 4.3,
    price: 34.99,
    image: "/img/1678c015-adcd-4f4d-9c20-b9621fe16e12.jpg",
    description: "Эпическое средневековое приключение",
    releaseDate: "2023-09-22",
    reviews: 760,
    isNew: false
  },
  {
    id: 6,
    title: "Neon Runner",
    genre: "Action",
    platform: ["PC", "Nintendo"],
    rating: 4.5,
    price: 29.99,
    image: "/img/ce71f468-e5f2-4a7b-b88c-2770e7ffc842.jpg",
    description: "Динамичный неоновый паркур",
    releaseDate: "2024-04-01",
    reviews: 920,
    isNew: true
  }
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name={star <= rating ? "Star" : "Star"}
          size={16}
          className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
    </div>
  )
}

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="relative">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {game.isNew && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Новинка
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {game.platform.map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <span className="text-xl font-bold text-primary">${game.price}</span>
        </div>
        <Badge variant="outline" className="w-fit">
          {game.genre}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
        <div className="flex justify-between items-center mb-2">
          <StarRating rating={game.rating} />
          <span className="text-xs text-muted-foreground">{game.reviews} отзывов</span>
        </div>
        <Button className="w-full" size="sm">
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          В корзину
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  const filteredAndSortedGames = useMemo(() => {
    let filtered = gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPlatform = selectedPlatform === 'all' || game.platform.includes(selectedPlatform)
      const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre
      
      return matchesSearch && matchesPlatform && matchesGenre
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        default:
          return 0
      }
    })
  }, [searchQuery, selectedPlatform, selectedGenre, sortBy])

  const newGames = gamesData.filter(game => game.isNew).slice(0, 3)
  const topRated = gamesData.sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Gamepad2" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  GameHub
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#catalog" className="text-gray-600 hover:text-primary transition-colors">Каталог</a>
              <a href="#rating" className="text-gray-600 hover:text-primary transition-colors">Рейтинг</a>
              <a href="#reviews" className="text-gray-600 hover:text-primary transition-colors">Отзывы</a>
              <a href="#new" className="text-gray-600 hover:text-primary transition-colors">Новинки</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
            Откройте мир
            <span className="block text-primary">игр</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Каталог лучших игр для всех платформ. Рейтинги, отзывы, новинки - всё в одном месте.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-scale-in">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Платформа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все платформы</SelectItem>
                <SelectItem value="PC">PC</SelectItem>
                <SelectItem value="PlayStation">PlayStation</SelectItem>
                <SelectItem value="Xbox">Xbox</SelectItem>
                <SelectItem value="Nintendo">Nintendo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                <SelectItem value="RPG">RPG</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Racing">Racing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-high">Цена: по убыванию</SelectItem>
                <SelectItem value="newest">Новинки</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="new">Новинки</TabsTrigger>
            <TabsTrigger value="rating">Топ рейтинг</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            {filteredAndSortedGames.length === 0 && (
              <div className="text-center py-16">
                <Icon name="GamepadIcon" size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Игры не найдены</h3>
                <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rating">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRated.map((game, index) => (
                <div key={game.id} className="relative">
                  <Badge className="absolute -top-2 -left-2 z-10 bg-yellow-500 text-white">
                    #{index + 1}
                  </Badge>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="bg-white rounded-lg p-8 text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Система отзывов</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Раздел отзывов игроков находится в разработке. Скоро здесь появятся подробные 
                обзоры и мнения сообщества о каждой игре.
              </p>
              <Button>
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомить о запуске
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-gray-600">Игр в каталоге</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-gray-600">Поддерживаемые платформы</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">4.6</div>
            <div className="text-gray-600">Средний рейтинг</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">7.5K</div>
            <div className="text-gray-600">Отзывов игроков</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Gamepad2" size={24} className="text-primary" />
                <span className="text-xl font-bold">GameHub</span>
              </div>
              <p className="text-gray-400">
                Ваш путеводитель в мире игр. Открывайте новые миры каждый день.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Каталог</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Новинки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Популярные</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Скидки</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Платформы</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">PC</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PlayStation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Xbox</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nintendo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GameHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}