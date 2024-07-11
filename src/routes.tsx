// routes.js
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Game from './pages/game';

const rootLoader = async () => {
  // You can fetch data needed for the root route here
  return {};
};

const gameLoader = async () => {
  // You can fetch data needed for the game route here
  return {};
};

const routes = [
  {
    path: '/',
    element: <Home />,
    loader: rootLoader,
  },
  {
    path: '/game',
    element: <Game />,
    loader: gameLoader,
  },
];

const router = createBrowserRouter(routes);

export default router;
