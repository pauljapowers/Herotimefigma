import { createBrowserRouter } from 'react-router';
import Root from './components/Root';
import WorldHub from './components/WorldHub';
import RomeHome from './components/rome/RomeHome';
import LearnWiki from './components/rome/LearnWiki';
import Play from './components/rome/Play';
import RomanNumeralLab from './components/rome/games/RomanNumeralLab';
import Arena from './components/rome/Arena';
import ArenaChallenge from './components/rome/ArenaChallenge';
import Quests from './components/rome/Quests';
import Heroes from './components/rome/Heroes';
import Teachers from './components/rome/Teachers';
import NotFound from './components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: WorldHub },
      {
        path: 'rome',
        children: [
          { index: true, Component: RomeHome },
          { path: 'learn', Component: LearnWiki },
          { path: 'learn/:topic', Component: LearnWiki },
          { path: 'play', Component: Play },
          { path: 'play/numeral-lab', Component: RomanNumeralLab },
          { path: 'arena', Component: Arena },
          { path: 'arena/:tier', Component: ArenaChallenge },
          { path: 'quests', Component: Quests },
          { path: 'heroes', Component: Heroes },
          { path: 'teachers', Component: Teachers },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
