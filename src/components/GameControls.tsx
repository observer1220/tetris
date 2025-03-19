import React, { useState } from "react";
import { useGame } from "../hooks/useGame";

const GameControls: React.FC = () => {
  const { gameState, togglePause, restartGame, startGame } = useGame();

  return (
    <div>
      <button onClick={startGame}>開始遊戲</button>
      <button onClick={togglePause}>
        {gameState.isPaused ? "繼續" : "暫停"}
      </button>
      <button onClick={restartGame}>重新開始</button>
    </div>
  );
};

export default GameControls;
