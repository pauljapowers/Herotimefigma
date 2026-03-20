import { Link } from 'react-router';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const worlds = [
  {
    id: 'rome',
    name: 'Rome',
    active: true,
    description: 'Explore the mighty Roman Empire, learn Roman numerals, and discover ancient history!',
    image: 'https://images.unsplash.com/photo-1662898290891-a6c7f022e851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tZSUyMGNvbG9zc2V1bXxlbnwxfHx8fDE3NzI4MjI0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'egypt',
    name: 'Egypt',
    active: false,
    description: 'Journey to the land of pharaohs, pyramids, and hieroglyphics.',
    image: 'https://images.unsplash.com/photo-1734461255961-6288a28a65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBweXJhbWlkc3xlbnwxfHx8fDE3NzI4MjI0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'china',
    name: 'Ancient China',
    active: false,
    description: 'Discover the Great Wall, dynasties, and ancient Chinese inventions.',
    image: 'https://images.unsplash.com/photo-1558507564-c573429b9ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmElMjBncmVhdCUyMHdhbGx8ZW58MXx8fHwxNzcyODc2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'greece',
    name: 'Greece',
    active: false,
    description: 'Meet the ancient Greek gods, heroes, and philosophers.',
    image: 'https://images.unsplash.com/photo-1689779920523-423a6775c443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZ3JlZWNlJTIwcGFydGhlbm9ufGVufDF8fHx8MTc3Mjg0NzQyMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'mesopotamia',
    name: 'Mesopotamia',
    active: false,
    description: 'Visit the cradle of civilization and learn about the first cities.',
    image: 'https://images.unsplash.com/photo-1709659576051-ba19d58fd0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNvcG90YW1pYSUyMHppZ2d1cmF0fGVufDF8fHx8MTc3Mjg3Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'maya',
    name: 'Maya',
    active: false,
    description: 'Explore the mysterious Maya pyramids and advanced calendar system.',
    image: 'https://images.unsplash.com/photo-1681686586861-19013ef8be90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXlhJTIwcHlyYW1pZCUyMHRlbXBsZXxlbnwxfHx8fDE3NzI4NzY5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'vikings',
    name: 'Vikings',
    active: false,
    description: 'Set sail with the Vikings and explore their epic adventures.',
    image: 'https://images.unsplash.com/photo-1567108077905-f8a10e69a5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWtpbmclMjBzaGlwfGVufDF8fHx8MTc3Mjg3Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'aztecs',
    name: 'Aztecs',
    active: false,
    description: 'Learn about the powerful Aztec Empire and their achievements.',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

export default function WorldHub() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-4">
            Hero Time!
          </h1>
          <p className="text-xl text-slate-700">
            Journey through ancient civilizations and become a history hero!
          </p>
        </header>

        {/* World Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {worlds.map((world) => (
            <Card
              key={world.id}
              className={`overflow-hidden transition-all duration-300 ${
                world.active
                  ? 'border-amber-400 border-2 shadow-2xl hover:shadow-amber-400/50'
                  : 'opacity-75'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={world.image}
                  alt={world.name}
                  className="w-full h-full object-cover"
                />
                {!world.active && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <Lock className="size-16 text-white" />
                  </div>
                )}
                {world.active && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ACTIVE
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{world.name}</CardTitle>
                <CardDescription>{world.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {world.active ? (
                  <Link to={`/${world.id}`}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                      Enter World <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    <Lock className="mr-2 size-4" /> Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-slate-600">
          <p className="text-sm">
            More ancient civilizations coming soon! Start your adventure with Rome today.
          </p>
        </div>
      </div>
    </div>
  );
}