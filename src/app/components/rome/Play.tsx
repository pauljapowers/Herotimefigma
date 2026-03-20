import { Link } from 'react-router';
import { Star, Clock } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useGame } from '../../context/GameContext';

const games = [
  {
    id: 'numeral-lab',
    title: 'Roman Numeral Lab',
    description: 'Convert between Roman and Arabic numbers. Build numerals with interactive blocks!',
    difficulty: 1,
    estimatedTime: '10 min',
    tags: ['Math', 'Numerals', 'Interactive'],
    icon: '🔢',
    link: '/rome/play/numeral-lab',
    available: true,
  },
  {
    id: 'timeline-builder',
    title: 'Timeline Builder',
    description: 'Arrange historical events in the correct order and learn about Rome\'s history.',
    difficulty: 2,
    estimatedTime: '15 min',
    tags: ['History', 'Timeline', 'Drag & Drop'],
    icon: '📜',
    link: '/rome/play/timeline-builder',
    available: false,
  },
  {
    id: 'day-in-rome',
    title: 'A Day in Rome',
    description: 'Choose your own adventure through ancient Rome. Make decisions and see what happens!',
    difficulty: 2,
    estimatedTime: '20 min',
    tags: ['Reading', 'Story', 'Choices'],
    icon: '🏛️',
    link: '/rome/play/day-in-rome',
    available: false,
  },
  {
    id: 'engineering-lab',
    title: 'Engineering Lab',
    description: 'Build Roman aqueducts and roads. Learn how Romans engineered amazing structures!',
    difficulty: 3,
    estimatedTime: '15 min',
    tags: ['Science', 'Engineering', 'Simulation'],
    icon: '🏗️',
    link: '/rome/play/engineering-lab',
    available: false,
  },
  {
    id: 'myth-match',
    title: 'Myth Match',
    description: 'Match Roman gods with their symbols and powers. Test your mythology knowledge!',
    difficulty: 1,
    estimatedTime: '10 min',
    tags: ['Mythology', 'Memory', 'Matching'],
    icon: '⚡',
    link: '/rome/play/myth-match',
    available: false,
  },
  {
    id: 'legion-commander',
    title: 'Legion Commander',
    description: 'Command a Roman legion in strategic challenges. Learn about military tactics!',
    difficulty: 3,
    estimatedTime: '20 min',
    tags: ['Strategy', 'Army', 'Challenge'],
    icon: '⚔️',
    link: '/rome/play/legion-commander',
    available: false,
  },
];

const difficultyStars = (level: number) => {
  return Array.from({ length: 3 }, (_, i) => (
    <Star
      key={i}
      className={`size-4 ${i < level ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
    />
  ));
};

export default function Play() {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-800">Play & Learn</h1>
          <p className="text-lg text-slate-600">
            Interactive games and tools to explore ancient Rome
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const isCompleted = gameState.gamesCompleted.includes(game.id);

            return (
              <Card
                key={game.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  !game.available ? 'opacity-60' : 'hover:scale-105'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                    ✓ DONE
                  </div>
                )}
                
                <CardHeader>
                  <div className="text-6xl mb-3">{game.icon}</div>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                  <CardDescription className="min-h-[60px]">{game.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Difficulty & Time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {difficultyStars(game.difficulty)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="size-4" />
                      {game.estimatedTime}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Play Button */}
                  {game.available ? (
                    <Link to={game.link}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                        Play Now
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
