import { TetriminoType } from "../utils/tetriminos";

export interface Position {
  x: number;
  y: number;
}

export interface TetriminoState {
  type: TetriminoType;
  position: Position;
  rotation: number;
}

export interface GameState {
  grid: number[][];
  currentTetrimino: TetriminoState;
  nextTetrimino: TetriminoType;
  score: number;
  level: number;
  isGameOver: boolean;
  isPaused: boolean;
}
