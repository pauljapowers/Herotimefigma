import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Lightbulb, BookOpen, Sparkles } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useGame } from '../../context/GameContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const wikiArticles = {
  timeline: {
    title: 'Timeline of Rome',
    icon: '📜',
    content: [
      {
        heading: 'The Kingdom (753 - 509 BC)',
        text: 'Rome was founded in 753 BC by Romulus, according to legend. The city was ruled by seven kings during this period.',
      },
      {
        heading: 'The Republic (509 - 27 BC)',
        text: 'Romans overthrew their last king and created a republic where citizens could vote. This period saw Rome expand across Italy and the Mediterranean.',
      },
      {
        heading: 'The Empire (27 BC - 476 AD)',
        text: 'Augustus became the first emperor. Rome reached its greatest size under Emperor Trajan, controlling lands from Britain to Egypt.',
      },
      {
        heading: 'The Fall (476 AD)',
        text: 'The Western Roman Empire fell when Germanic tribes conquered Rome. However, the Eastern Roman Empire (Byzantine Empire) continued for another thousand years.',
      },
    ],
    didYouKnow: 'Rome was so powerful that "all roads lead to Rome" became a famous saying. The Romans built over 250,000 miles of roads!',
    vocabulary: {
      Republic: 'A government where people vote for their leaders',
      Emperor: 'The supreme ruler of an empire',
      Legion: 'A Roman army unit of about 5,000 soldiers',
    },
  },
  'daily-life': {
    title: 'Daily Life in Rome',
    icon: '🏛️',
    content: [
      {
        heading: 'Roman Homes',
        text: 'Rich Romans lived in large houses called "domus" with beautiful gardens and mosaics. Poor Romans lived in apartment buildings called "insulae" which were often crowded and could be dangerous.',
      },
      {
        heading: 'Food and Meals',
        text: 'Romans ate bread, olives, cheese, and vegetables. Rich Romans enjoyed elaborate dinner parties called "banquets" that could last for hours with many courses.',
      },
      {
        heading: 'Entertainment',
        text: 'Romans loved watching gladiator fights and chariot races. They also enjoyed going to public baths where they would exercise, relax, and meet friends.',
      },
      {
        heading: 'School and Education',
        text: 'Roman children from wealthy families learned reading, writing, and mathematics. They wrote on wax tablets with a stylus. Education was important for boys who might become senators or officials.',
      },
    ],
    didYouKnow: 'Romans invented an early form of concrete and used it to build amazing structures like the Pantheon, which still stands today!',
    vocabulary: {
      Domus: 'A private house for wealthy Romans',
      Forum: 'The town center and marketplace',
      Toga: 'A long robe worn by Roman citizens',
    },
  },
  myths: {
    title: 'Myths & Gods',
    icon: '⚡',
    content: [
      {
        heading: 'Jupiter - King of the Gods',
        text: 'Jupiter was the most powerful Roman god, ruler of the sky and thunder. He was like the Greek god Zeus. Romans built temples to honor him and asked for his protection.',
      },
      {
        heading: 'Mars - God of War',
        text: 'Mars was the god of war and one of the most important Roman gods. Roman soldiers prayed to Mars before battle. The month of March is named after him.',
      },
      {
        heading: 'The Founding Myth',
        text: 'Legend says Rome was founded by twin brothers Romulus and Remus, who were raised by a wolf. Romulus became the first king of Rome after an argument with his brother.',
      },
      {
        heading: 'More Roman Gods',
        text: 'Venus (goddess of love), Neptune (god of the sea), Minerva (goddess of wisdom), and many more gods watched over different parts of Roman life.',
      },
    ],
    didYouKnow: 'Many of our planets are named after Roman gods: Mercury, Venus, Mars, Jupiter, Saturn, Neptune!',
    vocabulary: {
      Myth: 'A traditional story about gods and heroes',
      Temple: 'A building for worshipping gods',
      Sacrifice: 'An offering to the gods',
    },
  },
  army: {
    title: 'The Roman Army & Empire',
    icon: '⚔️',
    content: [
      {
        heading: 'The Mighty Legions',
        text: 'Roman soldiers were organized into legions of about 5,000 men. They were highly trained and disciplined, making the Roman army almost unbeatable.',
      },
      {
        heading: 'Soldier Equipment',
        text: 'Roman soldiers wore metal armor, carried a large shield (scutum), a short sword (gladius), and a throwing spear (pilum). They also wore a distinctive helmet with cheek guards.',
      },
      {
        heading: 'Military Tactics',
        text: 'Romans used clever battle formations like the "testudo" (tortoise) where soldiers locked their shields together to protect from arrows. They also built forts and roads to move armies quickly.',
      },
      {
        heading: 'Expanding the Empire',
        text: 'At its peak, the Roman Empire stretched from Britain to Egypt, from Spain to Syria. The army conquered new lands and protected the empire\'s borders.',
      },
    ],
    didYouKnow: 'Roman soldiers built their own camps each night when on campaign, complete with walls and towers. They could construct a whole fort in just a few hours!',
    vocabulary: {
      Legion: 'A unit of 5,000 Roman soldiers',
      Centurion: 'An officer who commanded 80-100 soldiers',
      Testudo: 'A defensive shield formation meaning "tortoise"',
    },
  },
  engineering: {
    title: 'Buildings & Engineering',
    icon: '🏗️',
    content: [
      {
        heading: 'Aqueducts - Water for Everyone',
        text: 'Romans built amazing aqueducts to bring fresh water from mountains into cities. Some aqueducts were over 50 miles long! They used gravity to make water flow downhill.',
      },
      {
        heading: 'Roman Roads',
        text: 'Romans built straight, strong roads across their empire. These roads had layers of rocks and gravel, with large flat stones on top. Many Roman roads are still used today, over 2000 years later!',
      },
      {
        heading: 'Amazing Buildings',
        text: 'The Colosseum could hold 50,000 people and had elevators to bring gladiators and animals up from below. The Pantheon has a huge dome with a hole in the top that lets in light.',
      },
      {
        heading: 'Roman Concrete',
        text: 'Romans invented concrete by mixing volcanic ash with lime and water. This amazing material let them build strong buildings and huge domes that still stand today.',
      },
    ],
    didYouKnow: 'The saying "all roads lead to Rome" is true! The Romans built over 250,000 miles of roads connecting the entire empire to the capital city.',
    vocabulary: {
      Aqueduct: 'A structure that carries water across long distances',
      Arch: 'A curved structure that supports weight',
      Amphitheatre: 'A round building for entertainment',
    },
  },
  numerals: {
    title: 'Numbers & Language',
    icon: '🔢',
    content: [
      {
        heading: 'Roman Numerals',
        text: 'Romans used letters to represent numbers: I (1), V (5), X (10), L (50), C (100), D (500), M (1000). They would combine these letters to make any number.',
      },
      {
        heading: 'How Roman Numerals Work',
        text: 'When a smaller numeral is before a larger one, you subtract. IV = 4 (5-1). When it\'s after, you add. VI = 6 (5+1). This clever system was used for over 2000 years!',
      },
      {
        heading: 'Latin Language',
        text: 'Romans spoke Latin, which became the basis for many modern languages like Spanish, French, Italian, and Portuguese. Many English words also come from Latin.',
      },
      {
        heading: 'Roman Writing',
        text: 'Romans carved important messages in stone using capital letters. They also wrote on papyrus (early paper) and wax tablets that could be erased and reused.',
      },
    ],
    didYouKnow: 'We still use Roman numerals today on clocks, in book chapters, for movie copyright dates, and to number Super Bowls!',
    vocabulary: {
      Latin: 'The language spoken by ancient Romans',
      Numeral: 'A symbol used to represent a number',
      Inscription: 'Words carved in stone or metal',
    },
  },
};

export default function LearnWiki() {
  const { topic } = useParams();
  const { gameState, readArticle, addXP } = useGame();
  const [currentTopic, setCurrentTopic] = useState(topic || 'timeline');

  const article = wikiArticles[currentTopic as keyof typeof wikiArticles] || wikiArticles.timeline;

  const handleReadComplete = () => {
    if (!gameState.articlesRead.includes(currentTopic)) {
      readArticle(currentTopic);
      addXP(50);
    }
  };

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-800">Learn About Rome</h1>
          <p className="text-lg text-slate-600">
            Discover the history, culture, and achievements of Ancient Rome
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(wikiArticles).map(([key, value]) => (
                  <Link key={key} to={`/rome/learn/${key}`}>
                    <Button
                      variant={currentTopic === key ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setCurrentTopic(key)}
                    >
                      <span className="mr-2">{value.icon}</span>
                      {value.title}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl">{article.icon}</span>
                  <div>
                    <CardTitle className="text-3xl">{article.title}</CardTitle>
                    {gameState.articlesRead.includes(currentTopic) && (
                      <div className="flex items-center gap-1 text-green-600 mt-2">
                        <Sparkles className="size-4" />
                        <span className="text-sm font-semibold">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Article Content */}
                {article.content.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{section.heading}</h3>
                    <p className="text-slate-700 leading-relaxed">{section.text}</p>
                  </div>
                ))}

                {/* Did You Know Box */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <Lightbulb className="mr-2 size-5" />
                      Did You Know?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{article.didYouKnow}</p>
                  </CardContent>
                </Card>

                {/* Vocabulary Box */}
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-700">
                      <BookOpen className="mr-2 size-5" />
                      Vocabulary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(article.vocabulary).map(([term, definition]) => (
                      <div key={term}>
                        <span className="font-bold text-purple-900">{term}:</span>{' '}
                        <span className="text-slate-700">{definition}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t">
                  {!gameState.articlesRead.includes(currentTopic) && (
                    <Button onClick={handleReadComplete} className="bg-green-600 hover:bg-green-700">
                      <Sparkles className="mr-2 size-4" />
                      Mark as Complete (+50 XP)
                    </Button>
                  )}
                  <Link to="/rome/play">
                    <Button variant="outline">
                      Play a game about this!
                    </Button>
                  </Link>
                  <Link to="/rome/arena">
                    <Button variant="outline">
                      Test yourself in the Arena!
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
