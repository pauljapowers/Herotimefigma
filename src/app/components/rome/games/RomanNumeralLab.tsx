import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Sparkles, RotateCcw, Lightbulb } from 'lucide-react';
import RomeNav from '../RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { useGame } from '../../../context/GameContext';

const ROMAN_NUMERALS = [
  { symbol: 'I', value: 1 },
  { symbol: 'V', value: 5 },
  { symbol: 'X', value: 10 },
  { symbol: 'L', value: 50 },
  { symbol: 'C', value: 100 },
  { symbol: 'D', value: 500 },
  { symbol: 'M', value: 1000 },
];

const arabicToRoman = (num: number): string => {
  if (num < 1 || num > 3999) return 'Invalid';
  
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ];

  let result = '';
  let remaining = num;

  for (const { value, symbol } of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
};

const romanToArabic = (roman: string): number => {
  const romanMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
};

export default function RomanNumeralLab() {
  const { gameState, completeGame, addXP, earnBadge } = useGame();
  const [arabicInput, setArabicInput] = useState('');
  const [romanInput, setRomanInput] = useState('');
  const [arabicResult, setArabicResult] = useState('');
  const [romanResult, setRomanResult] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [blocksBuilt, setBlocksBuilt] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [conversionsCompleted, setConversionsCompleted] = useState(0);

  useEffect(() => {
    if (conversionsCompleted >= 5 && !gameState.badges.find(b => b.id === 'numeral-novice')?.earned) {
      earnBadge('numeral-novice');
      addXP(100);
    }
  }, [conversionsCompleted]);

  const handleArabicConvert = () => {
    const num = parseInt(arabicInput);
    if (isNaN(num) || num < 1 || num > 3999) {
      setFeedback({ type: 'error', message: 'Please enter a number between 1 and 3999' });
      setArabicResult('');
      return;
    }

    const result = arabicToRoman(num);
    setArabicResult(result);
    setFeedback({ type: 'success', message: `Perfect! ${num} = ${result}` });
    setConversionsCompleted((prev) => prev + 1);
    
    if (!gameState.gamesCompleted.includes('numeral-lab')) {
      completeGame('numeral-lab');
      addXP(50);
    }
  };

  const handleRomanConvert = () => {
    const roman = romanInput.toUpperCase().trim();
    if (!roman || !/^[IVXLCDM]+$/.test(roman)) {
      setFeedback({ type: 'error', message: 'Please enter valid Roman numerals (I, V, X, L, C, D, M)' });
      setRomanResult('');
      return;
    }

    const result = romanToArabic(roman);
    setRomanResult(result.toString());
    setFeedback({ type: 'success', message: `Excellent! ${roman} = ${result}` });
    setConversionsCompleted((prev) => prev + 1);
    
    if (!gameState.gamesCompleted.includes('numeral-lab')) {
      completeGame('numeral-lab');
      addXP(50);
    }
  };

  const addBlock = (symbol: string) => {
    setBlocksBuilt([...blocksBuilt, symbol]);
    const newRoman = [...blocksBuilt, symbol].join('');
    const arabic = romanToArabic(newRoman);
    setFeedback({ type: 'info', message: `Building: ${newRoman} = ${arabic}` });
  };

  const removeLastBlock = () => {
    const newBlocks = blocksBuilt.slice(0, -1);
    setBlocksBuilt(newBlocks);
    if (newBlocks.length > 0) {
      const newRoman = newBlocks.join('');
      const arabic = romanToArabic(newRoman);
      setFeedback({ type: 'info', message: `Building: ${newRoman} = ${arabic}` });
    } else {
      setFeedback({ type: '', message: '' });
    }
  };

  const clearBlocks = () => {
    setBlocksBuilt([]);
    setFeedback({ type: '', message: '' });
  };

  const builtValue = blocksBuilt.length > 0 ? romanToArabic(blocksBuilt.join('')) : 0;

  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <Link to="/rome/play" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6">
          <ArrowLeft className="mr-2 size-4" />
          Back to Games
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <span className="text-5xl">🔢</span>
                  Roman Numeral Lab
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Master the ancient Roman number system through conversion and building
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-amber-600">{conversionsCompleted}</div>
                <div className="text-sm text-slate-600">Conversions</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {feedback.message && (
          <Card
            className={`mb-6 ${
              feedback.type === 'success'
                ? 'bg-green-50 border-green-300'
                : feedback.type === 'error'
                ? 'bg-red-50 border-red-300'
                : 'bg-blue-50 border-blue-300'
            }`}
          >
            <CardContent className="pt-6">
              <p className="font-semibold">{feedback.message}</p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="converter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="builder">Number Builder</TabsTrigger>
            <TabsTrigger value="guide">Quick Guide</TabsTrigger>
          </TabsList>

          {/* Converter Tab */}
          <TabsContent value="converter" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Arabic to Roman */}
              <Card>
                <CardHeader>
                  <CardTitle>Arabic → Roman</CardTitle>
                  <CardDescription>Convert modern numbers to Roman numerals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Enter a number (1-3999)</label>
                    <Input
                      type="number"
                      min="1"
                      max="3999"
                      value={arabicInput}
                      onChange={(e) => setArabicInput(e.target.value)}
                      placeholder="e.g., 42"
                      className="text-lg"
                    />
                  </div>
                  <Button onClick={handleArabicConvert} className="w-full" size="lg">
                    Convert →
                  </Button>
                  {arabicResult && (
                    <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg text-center">
                      <div className="text-4xl font-bold text-amber-900">{arabicResult}</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Roman to Arabic */}
              <Card>
                <CardHeader>
                  <CardTitle>Roman → Arabic</CardTitle>
                  <CardDescription>Convert Roman numerals to modern numbers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Enter Roman numerals</label>
                    <Input
                      type="text"
                      value={romanInput}
                      onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
                      placeholder="e.g., XLII"
                      className="text-lg uppercase"
                    />
                  </div>
                  <Button onClick={handleRomanConvert} className="w-full" size="lg">
                    Convert →
                  </Button>
                  {romanResult && (
                    <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg text-center">
                      <div className="text-4xl font-bold text-amber-900">{romanResult}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Builder Tab */}
          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Roman Numerals</CardTitle>
                <CardDescription>Click numeral blocks to build numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Display Area */}
                <div className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg min-h-[120px] flex flex-col items-center justify-center">
                  {blocksBuilt.length > 0 ? (
                    <>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {blocksBuilt.map((symbol, index) => (
                          <div
                            key={index}
                            className="bg-white px-4 py-2 rounded-lg shadow-md text-3xl font-bold text-purple-700"
                          >
                            {symbol}
                          </div>
                        ))}
                      </div>
                      <div className="text-3xl font-bold text-purple-900">= {builtValue}</div>
                    </>
                  ) : (
                    <div className="text-slate-400 text-lg">Click blocks below to start building</div>
                  )}
                </div>

                {/* Numeral Blocks */}
                <div className="grid grid-cols-7 gap-3">
                  {ROMAN_NUMERALS.map(({ symbol, value }) => (
                    <button
                      key={symbol}
                      onClick={() => addBlock(symbol)}
                      className="bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                      <div className="text-2xl font-bold">{symbol}</div>
                      <div className="text-xs mt-1">{value}</div>
                    </button>
                  ))}
                </div>

                {/* Control Buttons */}
                <div className="flex gap-3">
                  <Button onClick={removeLastBlock} variant="outline" className="flex-1" disabled={blocksBuilt.length === 0}>
                    <RotateCcw className="mr-2 size-4" />
                    Remove Last
                  </Button>
                  <Button onClick={clearBlocks} variant="outline" className="flex-1" disabled={blocksBuilt.length === 0}>
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="size-6 text-amber-500" />
                  Roman Numeral Quick Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Symbols */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Basic Symbols</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {ROMAN_NUMERALS.map(({ symbol, value }) => (
                      <div key={symbol} className="bg-slate-100 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-amber-600">{symbol}</div>
                        <div className="text-sm text-slate-600">= {value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Important Rules</h3>
                  <div className="space-y-3">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-4">
                        <p className="font-semibold mb-1">Addition Rule</p>
                        <p className="text-sm text-slate-700">
                          When a smaller symbol comes AFTER a larger one, ADD them.
                        </p>
                        <p className="text-sm font-mono mt-2">VI = 5 + 1 = 6</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-4">
                        <p className="font-semibold mb-1">Subtraction Rule</p>
                        <p className="text-sm text-slate-700">
                          When a smaller symbol comes BEFORE a larger one, SUBTRACT it.
                        </p>
                        <p className="text-sm font-mono mt-2">IV = 5 - 1 = 4</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="pt-4">
                        <p className="font-semibold mb-1">Repetition Rule</p>
                        <p className="text-sm text-slate-700">
                          You can repeat a symbol up to 3 times in a row.
                        </p>
                        <p className="text-sm font-mono mt-2">III = 1 + 1 + 1 = 3</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Common Examples</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { roman: 'IV', arabic: 4 },
                      { roman: 'IX', arabic: 9 },
                      { roman: 'XIV', arabic: 14 },
                      { roman: 'XIX', arabic: 19 },
                      { roman: 'XL', arabic: 40 },
                      { roman: 'XC', arabic: 90 },
                      { roman: 'CD', arabic: 400 },
                      { roman: 'CM', arabic: 900 },
                      { roman: 'MCMXC', arabic: 1990 },
                      { roman: 'MMXXIV', arabic: 2024 },
                    ].map((example) => (
                      <div
                        key={example.roman}
                        className="bg-slate-100 p-3 rounded-lg flex items-center justify-between"
                      >
                        <span className="text-lg font-bold text-amber-700">{example.roman}</span>
                        <span className="text-slate-600">=</span>
                        <span className="text-lg font-bold text-slate-700">{example.arabic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
