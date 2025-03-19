import { useState, useEffect, useCallback } from "react";
import { GameState, Position, TetriminoState } from "../types";
import { TETRIMINOS, TetriminoType } from "../utils/tetriminos";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

const initialState: GameState = {
  grid: Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0)),
  currentTetrimino: { type: "I", position: { x: 3, y: 0 }, rotation: 0 },
  nextTetrimino: "O",
  score: 0,
  level: 1,
  isGameOver: false,
  isPaused: false,
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const moveLeft = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      const newPos = {
        ...prev.currentTetrimino.position,
        x: prev.currentTetrimino.position.x - 1,
      };
      if (newPos.x >= 0) {
        return {
          ...prev,
          currentTetrimino: { ...prev.currentTetrimino, position: newPos },
        };
      }
      return prev;
    });
  }, []);

  const moveRight = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      const newPos = {
        ...prev.currentTetrimino.position,
        x: prev.currentTetrimino.position.x + 1,
      };
      if (
        newPos.x +
          TETRIMINOS[prev.currentTetrimino.type].shapes[
            prev.currentTetrimino.rotation
          ][0].length <=
          GRID_WIDTH &&
        !willCollide(prev.grid, prev.currentTetrimino, newPos)
      ) {
        return {
          ...prev,
          currentTetrimino: { ...prev.currentTetrimino, position: newPos },
        };
      }
      return prev;
    });
  }, []);

  const drop = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      const newPos = {
        ...prev.currentTetrimino.position,
        y: prev.currentTetrimino.position.y + 1,
      };
      if (!willCollide(prev.grid, prev.currentTetrimino, newPos)) {
        // console.log("沒有碰撞，繼續下落");
        return {
          ...prev,
          currentTetrimino: { ...prev.currentTetrimino, position: newPos },
        };
      } else {
        // console.log("碰撞發生，固定方塊並生成新方塊");
        const newGrid = fixTetriminoToGrid(prev.grid, prev.currentTetrimino);
        const newTetrimino = generateNewTetrimino();
        const newScore = prev.score + 10;
        return {
          ...prev,
          grid: newGrid,
          currentTetrimino: newTetrimino,
          score: newScore,
          nextTetrimino: newTetrimino.type,
        };
      }
    });

    // 檢查是否有滿行
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      const newGrid = prev.grid.filter((row) => row.some((cell) => !cell));
      const emptyRows = GRID_HEIGHT - newGrid.length;
      if (emptyRows > 0) {
        const filledRows = Array.from({ length: emptyRows }, () =>
          Array(GRID_WIDTH).fill(0)
        );
        return {
          ...prev,
          grid: [...filledRows, ...newGrid],
          score: prev.score + emptyRows * GRID_WIDTH * (prev.level + 1),
        };
      }
      return prev;
    });

    // 檢查遊戲是否結束
    setGameState((prev) => {
      if (prev.isPaused) return prev; // 如果遊戲暫停，不執行操作

      if (
        willCollide(
          prev.grid,
          prev.currentTetrimino,
          prev.currentTetrimino.position
        )
      ) {
        // alert("遊戲結束");
        return { ...prev, isGameOver: true };
      }

      return prev;
    });

    // 更新等級
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      // 每 100 分升級一次
      const newLevel = Math.floor(prev.score / 100) + 1;
      if (newLevel !== prev.level) {
        return { ...prev, level: newLevel };
      }
      return prev;
    });
  }, []);

  const willCollide = (
    grid: number[][],
    tetrimino: TetriminoState,
    newPos: Position
  ) => {
    const shape = TETRIMINOS[tetrimino.type].shapes[tetrimino.rotation]; // 獲取當前旋轉的形狀
    return shape.some((row, rowIdx) => {
      return row.some((cell, colIdx) => {
        if (cell) {
          const newX = newPos.x + colIdx;
          const newY = newPos.y + rowIdx;
          return (
            newX < 0 || // 超出左邊界
            newX >= GRID_WIDTH || // 超出右邊界
            newY >= GRID_HEIGHT || // 超出底部
            (newY >= 0 && grid[newY][newX] !== 0) // 與固定方塊重疊
          );
        }
        return false;
      });
    });
  };

  const fixTetriminoToGrid = (grid: number[][], tetrimino: TetriminoState) => {
    const newGrid = grid.map((row) => [...row]);
    const shape = TETRIMINOS[tetrimino.type].shapes[tetrimino.rotation];

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          newGrid[y + tetrimino.position.y][x + tetrimino.position.x] = 1;
        }
      }
    }

    return newGrid;
  };

  const generateNewTetrimino = (): TetriminoState => {
    const types: TetriminoType[] = ["I", "O", "T", "S", "Z", "J", "L"]; // 所有可能的方塊類型
    const randomType = types[Math.floor(Math.random() * types.length)];
    return {
      type: randomType,
      position: { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 }, // 初始位置
      rotation: 0, // 初始旋轉狀態
    };
  };

  const rotateTetrimino = () => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      const current = prev.currentTetrimino;
      const newRotation = (current.rotation + 1) % 4; // 順時針旋轉
      const tempTetrimino = { ...current, rotation: newRotation };

      // 檢查碰撞（假設已有 willCollide 函數）
      if (!willCollide(prev.grid, tempTetrimino, current.position)) {
        return {
          ...prev,
          currentTetrimino: tempTetrimino,
        };
      }
      return prev; // 如果碰撞，不旋轉
    });
  };

  // 方塊快速落下至底部並固定
  const plummet = () => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev; // 如果遊戲已結束或暫停，不執行操作

      let newPos = { ...prev.currentTetrimino.position };
      while (!willCollide(prev.grid, prev.currentTetrimino, newPos)) {
        newPos = { ...newPos, y: newPos.y + 1 };
      }
      newPos = { ...newPos, y: newPos.y - 1 }; // 回退一格
      return {
        ...prev,
        currentTetrimino: { ...prev.currentTetrimino, position: newPos },
      };
    });
  };

  // 修復 togglePause
  const togglePause = () => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
    console.log("狀態", gameState.isPaused);
  };

  // 修復 restartGame
  const restartGame = useCallback(() => {
    console.log("重新開始遊戲");
    const newTetrimino = generateNewTetrimino();
    setGameState((prev) => ({
      grid: Array.from({ length: GRID_HEIGHT }, () =>
        Array(GRID_WIDTH).fill(0)
      ),
      currentTetrimino: newTetrimino,
      nextTetrimino: generateNewTetrimino().type,
      score: 0,
      level: 1,
      isGameOver: false,
      isPaused: false,
    }));
  }, []);

  const startGame = useCallback(() => {
    // console.log("開始遊戲");
    // restartGame();
  }, []);

  useEffect(() => {
    if (gameState.isPaused || gameState.isGameOver) return;

    const timer = setInterval(() => {
      console.log("狀態", gameState.isPaused);

      drop();
    }, 1000 / gameState.level);

    return () => {
      clearInterval(timer);
    };
  }, [
    gameState.level,
    gameState.isGameOver,
    gameState.isPaused,
    drop,
    gameState.nextTetrimino,
  ]);

  return {
    gameState,
    moveLeft,
    moveRight,
    drop,
    rotateTetrimino,
    plummet,
    togglePause,
    restartGame,
    startGame,
  };
};
