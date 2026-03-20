import { GraduationCap, BookOpen, Target, FileText, Lightbulb, Users } from 'lucide-react';
import RomeNav from './RomeNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const learningOutcomes = [
  {
    category: 'Historical Knowledge',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    outcomes: [
      'Understanding the timeline of Rome (Kingdom, Republic, Empire)',
      'Knowledge of daily life in ancient Rome',
      'Awareness of the Roman Empire\'s extent and influence',
      'Understanding key historical figures and events',
    ],
  },
  {
    category: 'Numeracy',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    outcomes: [
      'Reading and writing Roman numerals I-M',
      'Converting between Roman and Arabic numerals',
      'Understanding additive and subtractive principles',
      'Applying numerals to real-world contexts',
    ],
  },
  {
    category: 'Literacy',
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    outcomes: [
      'Reading comprehension through historical articles',
      'Vocabulary development (historical terms)',
      'Following narrative structures in story-based activities',
      'Critical thinking about historical sources',
    ],
  },
  {
    category: 'Science & Engineering',
    icon: Lightbulb,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    outcomes: [
      'Understanding Roman engineering innovations',
      'Learning about aqueducts and water systems',
      'Exploring materials and construction methods',
      'Problem-solving through engineering challenges',
    ],
  },
];

const lessonSequences = [
  {
    title: 'Introduction to Rome (4 lessons)',
    lessons: [
      { number: 1, title: 'Who Were the Romans?', activities: ['Read Timeline article', 'Complete Bronze Arena'] },
      { number: 2, title: 'Roman Numerals Basics', activities: ['Roman Numeral Lab', 'Numeral Ninja Quest'] },
      { number: 3, title: 'Daily Life in Rome', activities: ['Read Daily Life article', 'Complete quiz'] },
      { number: 4, title: 'Roman Engineering', activities: ['Read Engineering article', 'Engineering Lab'] },
    ],
  },
  {
    title: 'Deep Dive into Roman Culture (6 lessons)',
    lessons: [
      { number: 1, title: 'The Roman Army', activities: ['Read Army article', 'Silver Arena'] },
      { number: 2, title: 'Gods and Mythology', activities: ['Read Myths article', 'Myth Match game'] },
      { number: 3, title: 'Roman Buildings', activities: ['Learn about structures', 'Timeline Builder'] },
      { number: 4, title: 'Advanced Numerals', activities: ['Practice 100-1000 range', 'Gold Arena'] },
      { number: 5, title: 'The Roman Empire', activities: ['Map study', 'Emperor Arena'] },
      { number: 6, title: 'Legacy of Rome', activities: ['Discussion', 'Complete all quests'] },
    ],
  },
];

export default function Teachers() {
  return (
    <div className="min-h-screen">
      <RomeNav />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <GraduationCap className="size-16" />
            <div>
              <h1 className="text-5xl font-bold">Teachers' Guide</h1>
              <p className="text-xl mt-2">Resources and guidance for classroom use</p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">About Hero Time! – Rome</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-700">
            <p>
              Hero Time! – Rome is designed for KS2 pupils (ages 7-11) to explore ancient Rome through
              gamified, interactive learning experiences. The platform combines historical knowledge
              with numeracy, literacy, and critical thinking skills.
            </p>
            <p>
              All activities are designed to work on tablets, laptops, and interactive whiteboards,
              making it perfect for both classroom and independent learning.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <p className="font-semibold text-amber-900">
                <strong>Note:</strong> Hero Time! is not designed for collecting personal identifiable
                information (PII) or securing sensitive data. It's an educational tool for learning
                about ancient civilizations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learningOutcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <Card key={outcome.category} className={`${outcome.bgColor} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className={`size-6 ${outcome.color}`} />
                      {outcome.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {outcome.outcomes.map((item, index) => (
                        <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Lesson Sequences */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Suggested Lesson Sequences</h2>
          <div className="space-y-6">
            {lessonSequences.map((sequence) => (
              <Card key={sequence.title}>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-700">{sequence.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sequence.lessons.map((lesson) => (
                      <div
                        key={lesson.number}
                        className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex-shrink-0">
                          <div className="size-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                            {lesson.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 mb-2">{lesson.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            {lesson.activities.map((activity, index) => (
                              <Badge key={index} variant="secondary">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Using the System */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="size-6 text-blue-600" />
              Using Quest & Arena Systems for Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-700">
            <div>
              <h3 className="font-bold text-lg mb-2">Quest System</h3>
              <p className="mb-2">
                Quests provide structured learning paths that guide pupils through related activities.
                Use them for:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Setting clear learning objectives for individual or group work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Tracking pupil progress through different topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Encouraging independent learning and goal-setting</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Arena System</h3>
              <p className="mb-2">
                The Arena provides formative assessment opportunities through tiered challenges:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>
                    <strong>Bronze:</strong> Check basic understanding and recall
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  <span>
                    <strong>Silver:</strong> Assess deeper knowledge and application
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>
                    <strong>Gold:</strong> Challenge advanced learners with complex questions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>
                    <strong>Emperor:</strong> Ultimate test for mastery demonstration
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="font-semibold text-green-900">
                Progress is saved locally in each pupil's browser, allowing them to continue their
                learning across multiple sessions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Printable Resources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Printable Resources</CardTitle>
            <CardDescription>
              Additional materials to support classroom activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold mb-2">📄 Roman Numeral Reference Sheet</h4>
                <p className="text-sm text-slate-600">
                  Quick reference for I-M with conversion examples
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold mb-2">🗺️ Roman Empire Map</h4>
                <p className="text-sm text-slate-600">
                  Printable map showing extent of Roman territories
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold mb-2">📜 Timeline Poster</h4>
                <p className="text-sm text-slate-600">
                  Visual timeline from founding to fall of Rome
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
                <h4 className="font-bold mb-2">🏆 Achievement Certificates</h4>
                <p className="text-sm text-slate-600">
                  Printable certificates for completed challenges
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Note: Printable resources are placeholder content in this demo version.
            </p>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle>Support & Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">
              We'd love to hear how Hero Time! is working in your classroom. Share your feedback,
              lesson ideas, or suggestions for improvement to help us make this the best learning
              experience possible for your pupils.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
