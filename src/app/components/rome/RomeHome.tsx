import { Link } from 'react-router';
import { Home, BookOpen, Gamepad2, Swords, Scroll, Trophy, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { useGame } from '../../context/GameContext';
import RomeNav from './RomeNav';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const quickAccessAreas = [
  {
    id: 'numeral-lab',
    title: 'Roman Numeral Lab',
    description: 'Master the ancient Roman number system',
    icon: '🔢',
    link: '/rome/play/numeral-lab',
  },
  {
    id: 'life-in-rome',
    title: 'Life in Rome',
    description: 'Discover how Romans lived and worked',
    icon: '🏛️',
    link: '/rome/learn/daily-life',
  },
  {
    id: 'myths',
    title: 'Roman Myths & Legends',
    description: 'Meet the gods and heroes of Rome',
    icon: '⚡',
    link: '/rome/learn/myths',
  },
  {
    id: 'engineering',
    title: 'Roman Engineering',
    description: 'Learn how Romans built amazing structures',
    icon: '🏗️',
    link: '/rome/learn/engineering',
  },
  {
    id: 'army',
    title: 'The Roman Army',
    description: 'Explore the might of the Roman legions',
    icon: '⚔️',
    link: '/rome/learn/army',
  },
  {
    id: 'empire',
    title: 'The Roman Empire',
    description: 'Journey across the vast Roman world',
    icon: '🗺️',
    link: '/rome/learn/timeline',
  },
];

export default function RomeHome() {
  const { gameState } = useGame();
  const progressPercent = (gameState.xp % 500) / 5;

  return (
    <div className="min-h-screen">
      <RomeNav />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Back to Hub */}
        <Link to="/" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6">
          <ArrowLeft className="mr-2 size-4" />
          Back to World Hub
        </Link>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1662898290891-a6c7f022e851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tZSUyMGNvbG9zc2V1bXxlbnwxfHx8fDE3NzI4MjI0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Rome background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-8 md:p-12 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Hero Time! – Rome
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Welcome, young hero! Journey back to ancient Rome and discover the secrets of one of history's greatest civilizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rome/quests">
                <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-white/90">
                  <Scroll className="mr-2 size-5" />
                  Continue My Quest
                </Button>
              </Link>
              <Link to="/rome/play">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Gamepad2 className="mr-2 size-5" />
                  Jump Into a Game
                </Button>
              </Link>
              <Link to="/rome/arena">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Swords className="mr-2 size-5" />
                  Go to Arena
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Your Progress</CardTitle>
                <CardDescription>
                  Level {gameState.level} • {gameState.xp} XP
                </CardDescription>
              </div>
              <Trophy className="size-12 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="h-4" />
            <p className="text-sm text-slate-600 mt-2">
              {500 - (gameState.xp % 500)} XP until Level {gameState.level + 1}
            </p>
          </CardContent>
        </Card>

        {/* Key Areas Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            Explore Ancient Rome
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccessAreas.map((area) => (
              <Link key={area.id} to={area.link}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-amber-400">
                  <CardHeader>
                    <div className="text-5xl mb-3">{area.icon}</div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Current Quest Widget */}
        {gameState.currentQuest && (
          <Card className="border-green-400 border-2 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scroll className="mr-2 size-5 text-green-600" />
                Current Quest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-3">
                {gameState.quests.find((q) => q.id === gameState.currentQuest)?.title}
              </p>
              <Link to="/rome/quests">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-100">
                  View Quest Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}