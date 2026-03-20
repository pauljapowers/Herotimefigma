import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Timer, Trophy, X, Check } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useGame } from '../../context/GameContext';

interface Question {
  question: string;
  answers: string[];
  correct: number;
  category: string;
}

const questionBank: { [key: string]: Question[] } = {
  bronze: [
    {
      question: 'What was the capital city of the Roman Empire?',
      answers: ['Rome', 'Athens', 'Alexandria', 'Carthage'],
      correct: 0,
      category: 'History',
    },
    {
      question: 'What does the Roman numeral "V" represent?',
      answers: ['1', '5', '10', '50'],
      correct: 1,
      category: 'Numerals',
    },
    {
      question: 'Who was the king of the Roman gods?',
      answers: ['Mars', 'Jupiter', 'Neptune', 'Mercury'],
      correct: 1,
      category: 'Mythology',
    },
    {
      question: 'What language did the Romans speak?',
      answers: ['Greek', 'Latin', 'Hebrew', 'Aramaic'],
      correct: 1,
      category: 'Culture',
    },
    {
      question: 'What was a Roman soldier called?',
      answers: ['Legionary', 'Gladiator', 'Senator', 'Centurion'],
      correct: 0,
      category: 'Army',
    },
    {
      question: 'What structure carried water to Roman cities?',
      answers: ['Bridge', 'Aqueduct', 'Road', 'Wall'],
      correct: 1,
      category: 'Engineering',
    },
    {
      question: 'What is the Roman numeral for 10?',
      answers: ['V', 'X', 'L', 'C'],
      correct: 1,
      category: 'Numerals',
    },
    {
      question: 'What was the famous arena in Rome called?',
      answers: ['Pantheon', 'Colosseum', 'Forum', 'Circus'],
      correct: 1,
      category: 'Buildings',
    },
    {
      question: 'Who founded Rome according to legend?',
      answers: ['Julius Caesar', 'Augustus', 'Romulus', 'Nero'],
      correct: 2,
      category: 'Mythology',
    },
    {
      question: 'What was a Roman public bath called?',
      answers: ['Thermae', 'Villa', 'Domus', 'Insulae'],
      correct: 0,
      category: 'Daily Life',
    },
  ],
  silver: [
    {
      question: 'In what year was Rome traditionally founded?',
      answers: ['753 BC', '509 BC', '27 BC', '476 AD'],
      correct: 0,
      category: 'History',
    },
    {
      question: 'What does "XLII" equal in Arabic numerals?',
      answers: ['32', '42', '52', '62'],
      correct: 1,
      category: 'Numerals',
    },
    {
      question: 'Who was the first Roman Emperor?',
      answers: ['Julius Caesar', 'Augustus', 'Nero', 'Trajan'],
      correct: 1,
      category: 'History',
    },
    {
      question: 'What was the Roman god Mars associated with?',
      answers: ['Love', 'War', 'Sea', 'Sun'],
      correct: 1,
      category: 'Mythology',
    },
    {
      question: 'How many soldiers were in a Roman legion?',
      answers: ['1,000', '3,000', '5,000', '10,000'],
      correct: 2,
      category: 'Army',
    },
  ],
  gold: [
    {
      question: 'What was the name of the shield wall formation used by Romans?',
      answers: ['Phalanx', 'Testudo', 'Wedge', 'Line'],
      correct: 1,
      category: 'Army',
    },
    {
      question: 'Convert MCMXC to Arabic numerals:',
      answers: ['1990', '1890', '1900', '1990'],
      correct: 0,
      category: 'Numerals',
    },
    {
      question: 'Which emperor split the Roman Empire into East and West?',
      answers: ['Constantine', 'Diocletian', 'Hadrian', 'Marcus Aurelius'],
      correct: 1,
      category: 'History',
    },
  ],
  emperor: [
    {
      question: 'What material did Romans mix with lime to create their famous concrete?',
      answers: ['Sand', 'Volcanic ash', 'Clay', 'Gravel'],
      correct: 1,
      category: 'Engineering',
    },
    {
      question: 'In Roman numerals, what is the maximum number of times you can repeat a symbol?',
      answers: ['2', '3', '4', '5'],
      correct: 1,
      category: 'Numerals',
    },
  ],
};

export default function ArenaChallenge() {
  const { tier } = useParams();
  const navigate = useNavigate();
  const { addXP, recordArenaScore, earnBadge } = useGame();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const questions = questionBank[tier as keyof typeof questionBank] || questionBank.bronze;
  const question = questions[currentQuestion];

  useEffect(() => {
    if (isComplete || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete, timeLeft]);

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === question.correct;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        handleComplete();
      }
    }, 1500);
  };

  const handleComplete = () => {
    setIsComplete(true);
    const percentage = Math.round((score / questions.length) * 100);
    recordArenaScore(tier || 'bronze', percentage);
    
    const xpEarned = score * 20;
    addXP(xpEarned);

    // Check for badges
    if (tier === 'emperor' && percentage >= 80) {
      earnBadge('arena-champion');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen">
        <RomeNav />
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <Card className="text-center bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className="size-24 text-amber-500" />
              </div>
              <CardTitle className="text-4xl mb-4">Challenge Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-amber-600">{percentage}%</div>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-slate-800">{score}</div>
                  <div className="text-sm text-slate-600">Correct</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-slate-800">{questions.length - score}</div>
                  <div className="text-sm text-slate-600">Wrong</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-slate-800">{score * 20}</div>
                  <div className="text-sm text-slate-600">XP Earned</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
                <p className="font-semibold mb-3">
                  {percentage >= 90
                    ? '🎉 Outstanding! You\'re a true Roman scholar!'
                    : percentage >= 70
                    ? '👏 Great work! You know your Roman history!'
                    : percentage >= 50
                    ? '👍 Good effort! Keep learning!'
                    : '📚 Keep studying! Try reading the Learn section.'}
                </p>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link to={`/rome/arena/${tier}`}>
                  <Button size="lg" variant="outline">
                    Try Again
                  </Button>
                </Link>
                <Link to="/rome/arena">
                  <Button size="lg" variant="outline">
                    Back to Arena
                  </Button>
                </Link>
                <Link to="/rome/learn">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <Link to="/rome/arena" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6">
          <ArrowLeft className="mr-2 size-4" />
          Back to Arena
        </Link>

        {/* Status Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Timer className="size-5 text-red-600" />
                <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="size-5 text-amber-500" />
                <span className="text-xl font-bold">Score: {score}/{questions.length}</span>
              </div>
              {streak > 1 && (
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  🔥 Streak: {streak}
                </div>
              )}
            </div>
          </div>
          <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
          <p className="text-sm text-slate-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <Card className="shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                {question.category}
              </span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {question.answers.map((answer, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showResult = showFeedback && isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`p-6 rounded-lg text-left text-lg font-medium transition-all duration-200 ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-100 border-2 border-green-500 text-green-900'
                          : 'bg-red-100 border-2 border-red-500 text-red-900'
                        : 'bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-amber-400'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{answer}</span>
                      {showResult && (
                        <span>
                          {isCorrect ? (
                            <Check className="size-6 text-green-600" />
                          ) : (
                            <X className="size-6 text-red-600" />
                          )}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  selectedAnswer === question.correct
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <p className="font-semibold">
                  {selectedAnswer === question.correct
                    ? '✓ Correct! Well done!'
                    : `✗ Not quite. The correct answer was: ${question.answers[question.correct]}`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
