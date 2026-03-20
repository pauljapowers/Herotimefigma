import { Trophy, Sparkles, BookOpen, Gamepad2, Clock, Award } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useGame } from '../../context/GameContext';

const levelTitles = [
  'Novice',
  'Initiate',
  'Apprentice',
  'Young Legionary',
  'Soldier',
  'Veteran',
  'Centurion',
  'Tribune',
  'Praetor',
  'Consul',
  'Emperor',
];

export default function Heroes() {
  const { gameState, resetProgress } = useGame();

  const currentLevelTitle = levelTitles[Math.min(gameState.level - 1, levelTitles.length - 1)];
  const nextLevelTitle = levelTitles[Math.min(gameState.level, levelTitles.length - 1)];
  const progressToNextLevel = (gameState.xp % 500) / 5;
  const xpUntilNextLevel = 500 - (gameState.xp % 500);

  const earnedBadges = gameState.badges.filter((b) => b.earned);
  const totalBadges = gameState.badges.length;

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="size-16" />
            <div>
              <h1 className="text-5xl font-bold">Your Hero Profile</h1>
              <p className="text-xl mt-2">Track your progress and achievements</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar & Level */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 size-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-6xl shadow-lg">
                  🏛️
                </div>
                <CardTitle className="text-2xl">Roman Hero</CardTitle>
                <CardDescription className="text-lg font-semibold text-purple-700">
                  Level {gameState.level} • {currentLevelTitle}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-amber-500" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Current</span>
                      <span className="text-sm font-bold text-amber-600">{currentLevelTitle}</span>
                    </div>
                    <Progress value={progressToNextLevel} className="h-3" />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium">Next</span>
                      <span className="text-sm font-bold text-slate-600">{nextLevelTitle}</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600">{gameState.xp}</div>
                    <div className="text-sm text-slate-600">Total XP</div>
                    <div className="text-xs text-slate-500 mt-2">
                      {xpUntilNextLevel} XP until next level
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="size-5 text-blue-500" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="size-5 text-green-600" />
                    <span className="text-sm">Quizzes Completed</span>
                  </div>
                  <span className="text-lg font-bold">{gameState.stats.quizzesCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-5 text-purple-600" />
                    <span className="text-sm">Articles Read</span>
                  </div>
                  <span className="text-lg font-bold">{gameState.stats.articlesRead}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="size-5 text-amber-600" />
                    <span className="text-sm">Badges Earned</span>
                  </div>
                  <span className="text-lg font-bold">
                    {earnedBadges.length}/{totalBadges}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Badges */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="size-6 text-amber-500" />
                  Badge Collection
                </CardTitle>
                <CardDescription>
                  Earn badges by completing challenges and quests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {gameState.badges.map((badge) => (
                    <Card
                      key={badge.id}
                      className={`transition-all duration-300 ${
                        badge.earned
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 shadow-lg'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div
                            className={`text-4xl ${
                              badge.earned ? 'scale-110 animate-bounce' : 'grayscale opacity-40'
                            }`}
                          >
                            🏆
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {badge.name}
                              {badge.earned && (
                                <Badge className="bg-green-600 text-xs">
                                  Earned ✓
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {badge.description}
                            </CardDescription>
                            {badge.earned && badge.earnedDate && (
                              <p className="text-xs text-amber-600 mt-2">
                                Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                {/* Progress Summary */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Collection Progress</h3>
                    <span className="text-2xl font-bold text-purple-700">
                      {Math.round((earnedBadges.length / totalBadges) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(earnedBadges.length / totalBadges) * 100}
                    className="h-3 mb-2"
                  />
                  <p className="text-sm text-slate-700">
                    {earnedBadges.length} of {totalBadges} badges earned
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Arena Scores */}
            {Object.keys(gameState.arenaScores).length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    ⚔️ Arena Best Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(gameState.arenaScores).map(([arena, score]) => (
                      <div
                        key={arena}
                        className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg p-4 border-2 border-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold capitalize">{arena} Arena</span>
                          <span className="text-2xl font-bold text-amber-600">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reset Progress */}
            <Card className="mt-6 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Reset Progress</CardTitle>
                <CardDescription>
                  This will erase all your progress, badges, and scores. This cannot be undone!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to reset all progress? This cannot be undone!'
                      )
                    ) {
                      resetProgress();
                    }
                  }}
                >
                  Reset All Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
