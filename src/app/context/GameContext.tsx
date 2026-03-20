import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  track: 'numerals' | 'history' | 'myths' | 'engineering';
  requirements: string[];
  xpReward: number;
  badgeReward?: string;
  progress: number;
  completed: boolean;
}

export interface GameState {
  xp: number;
  level: number;
  badges: Badge[];
  quests: Quest[];
  currentQuest: string | null;
  articlesRead: string[];
  gamesCompleted: string[];
  arenaScores: { [key: string]: number };
  stats: {
    quizzesCompleted: number;
    articlesRead: number;
    timeSpent: number;
  };
}

interface GameContextType {
  gameState: GameState;
  addXP: (amount: number) => void;
  earnBadge: (badgeId: string) => void;
  completeGame: (gameId: string) => void;
  readArticle: (articleId: string) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  setCurrentQuest: (questId: string | null) => void;
  recordArenaScore: (arenaId: string, score: number) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_STATE: GameState = {
  xp: 0,
  level: 1,
  badges: [
    { id: 'numeral-novice', name: 'Numeral Novice', description: 'Complete first Roman numeral game', earned: false },
    { id: 'numeral-knight', name: 'Numeral Knight', description: 'Master 50 numeral conversions', earned: false },
    { id: 'numeral-emperor', name: 'Numeral Emperor', description: 'Complete all numeral challenges', earned: false },
    { id: 'history-scout', name: 'History Scout', description: 'Read 5 wiki articles', earned: false },
    { id: 'history-hero', name: 'History Hero', description: 'Read all wiki articles', earned: false },
    { id: 'arena-champion', name: 'Arena Champion', description: 'Win an Emperor tier challenge', earned: false },
    { id: 'myth-master', name: 'Myth Master', description: 'Complete all mythology games', earned: false },
    { id: 'engineer', name: 'Roman Engineer', description: 'Complete all engineering challenges', earned: false },
  ],
  quests: [
    {
      id: 'numeral-ninja-1',
      title: 'Numeral Ninja I',
      description: 'Complete your first Roman numeral conversion',
      track: 'numerals',
      requirements: ['Complete Roman Numeral Lab'],
      xpReward: 50,
      badgeReward: 'numeral-novice',
      progress: 0,
      completed: false,
    },
    {
      id: 'history-explorer-1',
      title: 'History Explorer I',
      description: 'Learn about life in ancient Rome',
      track: 'history',
      requirements: ['Read "Life in Rome" article', 'Complete quiz'],
      xpReward: 100,
      progress: 0,
      completed: false,
    },
    {
      id: 'myth-master-1',
      title: 'Myth Master I',
      description: 'Discover Roman gods and mythology',
      track: 'myths',
      requirements: ['Read "Myths & Gods" article', 'Complete Myth Match game'],
      xpReward: 100,
      progress: 0,
      completed: false,
    },
    {
      id: 'engineer-1',
      title: 'Engineer of Rome I',
      description: 'Learn how Romans built amazing structures',
      track: 'engineering',
      requirements: ['Read "Engineering" article', 'Complete Engineering Lab'],
      xpReward: 100,
      progress: 0,
      completed: false,
    },
  ],
  currentQuest: null,
  articlesRead: [],
  gamesCompleted: [],
  arenaScores: {},
  stats: {
    quizzesCompleted: 0,
    articlesRead: 0,
    timeSpent: 0,
  },
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('heroTimeRomeState');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('heroTimeRomeState', JSON.stringify(gameState));
  }, [gameState]);

  const addXP = (amount: number) => {
    setGameState((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const earnBadge = (badgeId: string) => {
    setGameState((prev) => ({
      ...prev,
      badges: prev.badges.map((badge) =>
        badge.id === badgeId ? { ...badge, earned: true, earnedDate: new Date() } : badge
      ),
    }));
  };

  const completeGame = (gameId: string) => {
    setGameState((prev) => ({
      ...prev,
      gamesCompleted: [...new Set([...prev.gamesCompleted, gameId])],
    }));
  };

  const readArticle = (articleId: string) => {
    setGameState((prev) => {
      const alreadyRead = prev.articlesRead.includes(articleId);
      if (alreadyRead) return prev;

      const newArticlesRead = [...prev.articlesRead, articleId];
      const newStats = {
        ...prev.stats,
        articlesRead: newArticlesRead.length,
      };

      return {
        ...prev,
        articlesRead: newArticlesRead,
        stats: newStats,
      };
    });
  };

  const updateQuestProgress = (questId: string, progress: number) => {
    setGameState((prev) => ({
      ...prev,
      quests: prev.quests.map((quest) => {
        if (quest.id === questId) {
          const completed = progress >= 100;
          return { ...quest, progress, completed };
        }
        return quest;
      }),
    }));
  };

  const setCurrentQuest = (questId: string | null) => {
    setGameState((prev) => ({ ...prev, currentQuest: questId }));
  };

  const recordArenaScore = (arenaId: string, score: number) => {
    setGameState((prev) => {
      const currentBest = prev.arenaScores[arenaId] || 0;
      const newStats = {
        ...prev.stats,
        quizzesCompleted: prev.stats.quizzesCompleted + 1,
      };
      
      return {
        ...prev,
        arenaScores: {
          ...prev.arenaScores,
          [arenaId]: Math.max(currentBest, score),
        },
        stats: newStats,
      };
    });
  };

  const resetProgress = () => {
    setGameState(INITIAL_STATE);
    localStorage.removeItem('heroTimeRomeState');
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        addXP,
        earnBadge,
        completeGame,
        readArticle,
        updateQuestProgress,
        setCurrentQuest,
        recordArenaScore,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
