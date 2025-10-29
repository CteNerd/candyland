import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import GameScreen from './screens/GameScreen';

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/setup" element={<SetupScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
