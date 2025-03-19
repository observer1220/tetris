import React, { useEffect, useRef } from "react";
import { useGame } from "./hooks/useGame";
import Grid from "./components/Grid";
import Score from "./components/Score";
import Level from "./components/Level";
import NextTetrimino from "./components/NextTetrimino";
import GameControls from "./components/GameControls";

const App: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const { gameState, moveLeft, moveRight, drop, rotateTetrimino, plummet } =
    useGame();

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus();
    }
  }, []);

  return (
    <div
      className="app"
      style={{ textAlign: "center" }}
      tabIndex={0}
      ref={gameRef}
      onKeyDown={(e) => {
        // console.log("按下的鍵是:", e.key);
        switch (e.key) {
          case "ArrowLeft":
            moveLeft();
            break;
          case "ArrowRight":
            moveRight();
            break;
          case "ArrowDown":
            drop();
            break;
          case "q":
            rotateTetrimino();
            break;
          case " ":
            plummet();
            break;
        }
      }}
    >
      <h2>俄羅斯方塊</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid
          grid={gameState.grid}
          currentTetrimino={gameState.currentTetrimino}
        />
        <div style={{ marginLeft: "20px" }}>
          <Score score={gameState.score} />
          <Level level={gameState.level} />
          <NextTetrimino next={gameState.nextTetrimino} />
          <GameControls />
        </div>
      </div>
    </div>
  );
};

export default App;
