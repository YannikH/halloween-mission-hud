import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hud from './HUD/Hud';
import GameHud from './GameHud/GameHud';
import { gameHudMock } from './GameHud/data';

function App() {
  const [gameHudData, setGameHudData] = useState(gameHudMock);
  return (
    <GameHud gameHudData={gameHudData} setGameHudData={setGameHudData}/>
  );
}

export default App;
