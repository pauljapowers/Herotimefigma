import { Link } from 'react-router';
import { Scroll, Check, Lock, Sparkles, Zap } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useGame } from '../../context/GameContext';

const trackColors = {
  numerals: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', icon: '🔢' },
  history: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', icon: '📜' },
  myths: { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700', icon: '⚡' },
  engineering: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', icon: '🏗️' },
};

const trackNames = {
  numerals: 'Numeral Ninja',
  history: 'History Explorer',
  myths: 'Myth Master',
  engineering: 'Engineer of Rome',
};

export default function Quests() {
  const { gameState, setCurrentQuest } = useGame();

  const handleSetCurrentQuest = (questId: string) => {
    setCurrentQuest(questId);
  };

  const groupedQuests = gameState.quests.reduce((acc, quest) => {
    if (!acc[quest.track]) {
      acc[quest.track] = [];
    }
    acc[quest.track].push(quest);
    return acc;
  }, {} as Record<string, typeof gameState.quests>);

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Scroll className="size-16" />
            <div>
              <h1 className="text-5xl font-bold">Quest Board</h1>
              <p className="text-xl mt-2">Complete quests to earn XP and unlock badges!</p>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">
                {gameState.quests.filter((q) => q.completed).length}
              </div>
              <div className="text-sm">Quests Completed</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">
                {gameState.quests.filter((q) => q.progress > 0 && !q.completed).length}
              </div>
              <div className="text-sm">In Progress</div>
            </div>
          </div>
        </div>

        {/* Quest Tracks */}
        <div className="space-y-8">
          {Object.entries(groupedQuests).map(([track, quests]) => {
            const colors = trackColors[track as keyof typeof trackColors];
            const trackName = trackNames[track as keyof typeof trackNames];

            return (
              <div key={track}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{colors.icon}</span>
                  <h2 className="text-3xl font-bold text-slate-800">{trackName}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {quests.map((quest) => (
                    <Card
                      key={quest.id}
                      className={`${colors.bg} ${colors.border} border-2 ${
                        gameState.currentQuest === quest.id ? 'ring-4 ring-amber-400' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl flex items-center gap-2">
                              {quest.title}
                              {quest.completed && (
                                <Badge className="bg-green-600">
                                  <Check className="size-3 mr-1" />
                                  Complete
                                </Badge>
                              )}
                              {gameState.currentQuest === quest.id && (
                                <Badge className="bg-amber-600">
                                  <Zap className="size-3 mr-1" />
                                  Active
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {quest.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Requirements */}
                        <div>
                          <h4 className="font-semibold mb-2 text-sm text-slate-700">Requirements:</h4>
                          <ul className="space-y-1">
                            {quest.requirements.map((req, index) => (
                              <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="mt-1">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Rewards */}
                        <div className="bg-white/50 rounded-lg p-3">
                          <h4 className="font-semibold mb-2 text-sm text-slate-700">Rewards:</h4>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1 text-amber-600">
                              <Sparkles className="size-4" />
                              <span className="font-bold">{quest.xpReward} XP</span>
                            </div>
                            {quest.badgeReward && (
                              <div className="flex items-center gap-1 text-purple-600">
                                <span>🏆</span>
                                <span className="font-bold text-sm">Badge</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Progress */}
                        {!quest.completed && quest.progress > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-bold">{quest.progress}%</span>
                            </div>
                            <Progress value={quest.progress} className="h-2" />
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          {quest.completed ? (
                            <Button disabled className="w-full bg-green-600">
                              <Check className="mr-2 size-4" />
                              Completed
                            </Button>
                          ) : (
                            <>
                              {gameState.currentQuest === quest.id ? (
                                <Button
                                  onClick={() => handleSetCurrentQuest('')}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  Untrack
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleSetCurrentQuest(quest.id)}
                                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600"
                                >
                                  {quest.progress > 0 ? 'Resume Quest' : 'Start Quest'}
                                </Button>
                              )}
                              <Link to="/rome/play" className="flex-1">
                                <Button variant="outline" className="w-full">
                                  Go to Activities
                                </Button>
                              </Link>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scroll className="size-6 text-amber-600" />
              About Quests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700">
            <p>
              • Quests guide your learning journey through ancient Rome
            </p>
            <p>
              • Complete requirements by playing games, reading articles, and taking challenges
            </p>
            <p>
              • Earn XP and unlock special badges for completing quests
            </p>
            <p>
              • Track one quest at a time to stay focused on your goal
            </p>
            <p>
              • Complete all quests in a track to become a true expert!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
