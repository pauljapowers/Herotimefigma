import { Link } from 'react-router';
import { Swords, Trophy, Medal, Crown, Lock } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useGame } from '../../context/GameContext';

const arenaTiers = [
  {
    id: 'bronze',
    name: 'Bronze Arena',
    description: 'Perfect for beginners! Test your basic knowledge of Rome.',
    difficulty: 'Easy',
    icon: Medal,
    color: 'from-amber-700 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    questions: 10,
    timeLimit: '5 min',
    unlocked: true,
  },
  {
    id: 'silver',
    name: 'Silver Arena',
    description: 'Intermediate challenges for aspiring Roman scholars.',
    difficulty: 'Medium',
    icon: Medal,
    color: 'from-slate-400 to-slate-500',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-300',
    questions: 15,
    timeLimit: '8 min',
    unlocked: true,
  },
  {
    id: 'gold',
    name: 'Gold Arena',
    description: 'Advanced challenges! Only for true history heroes.',
    difficulty: 'Hard',
    icon: Trophy,
    color: 'from-yellow-400 to-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    questions: 20,
    timeLimit: '10 min',
    unlocked: true,
  },
  {
    id: 'emperor',
    name: 'Emperor Arena',
    description: 'The ultimate test! Face the hardest challenges and become a champion.',
    difficulty: 'Expert',
    icon: Crown,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    questions: 25,
    timeLimit: '15 min',
    unlocked: true,
  },
];

export default function Arena() {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Swords className="size-16" />
            <div>
              <h1 className="text-5xl font-bold">The Arena</h1>
              <p className="text-xl mt-2">Test your knowledge and prove your worth!</p>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">{gameState.stats.quizzesCompleted}</div>
              <div className="text-sm">Challenges Completed</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">{Object.keys(gameState.arenaScores).length}</div>
              <div className="text-sm">Arenas Conquered</div>
            </div>
          </div>
        </div>

        {/* Arena Tiers */}
        <div className="space-y-6">
          {arenaTiers.map((tier) => {
            const Icon = tier.icon;
            const bestScore = gameState.arenaScores[tier.id] || 0;
            
            return (
              <Card
                key={tier.id}
                className={`${tier.bgColor} ${tier.borderColor} border-2 overflow-hidden hover:shadow-xl transition-all duration-300`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-br ${tier.color} p-4 rounded-xl`}>
                        <Icon className="size-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-3">
                          {tier.name}
                          <Badge variant={tier.unlocked ? "default" : "secondary"}>
                            {tier.difficulty}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          {tier.description}
                        </CardDescription>
                      </div>
                    </div>
                    {bestScore > 0 && (
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Best Score</div>
                        <div className="text-3xl font-bold text-amber-600">{bestScore}%</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6 text-sm text-slate-600">
                      <div>
                        <span className="font-semibold">Questions:</span> {tier.questions}
                      </div>
                      <div>
                        <span className="font-semibold">Time:</span> {tier.timeLimit}
                      </div>
                    </div>
                    {tier.unlocked ? (
                      <Link to={`/rome/arena/${tier.id}`}>
                        <Button
                          size="lg"
                          className={`bg-gradient-to-r ${tier.color} text-white hover:scale-105 transition-transform`}
                        >
                          <Swords className="mr-2 size-4" />
                          Enter Arena
                        </Button>
                      </Link>
                    ) : (
                      <Button size="lg" disabled>
                        <Lock className="mr-2 size-4" />
                        Locked
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-6 text-blue-600" />
              How the Arena Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700">
            <p>
              • Answer questions about Roman history, myths, daily life, and more
            </p>
            <p>
              • Each tier gets progressively harder with more questions
            </p>
            <p>
              • Race against the clock to complete each challenge
            </p>
            <p>
              • Earn XP and badges for completing challenges
            </p>
            <p>
              • Beat your best scores and become an Arena Champion!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
