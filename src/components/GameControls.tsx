import React from "react";
import { useGame } from "../hooks/useGame";
import MusicPlayer from "./MusicPlayer";

const GameControls: React.FC = () => {
  const { startGame } = useGame();

  return (
    <div
      style={{
        gap: "5px",
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <button onClick={startGame}>開始遊戲</button>
      <MusicPlayer />
    </div>
  );
};

export default GameControls;
