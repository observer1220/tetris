export type TetriminoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Tetrimino {
  shapes: number[][][];
  color: string;
  steampunkColor: string;
}

export interface TetriminoState {
  type: string; // 方塊類型（如 'I'）
  position: { x: number; y: number }; // 方塊在網格中的位置
  rotation: number; // 當前旋轉狀態 (0, 1, 2, 3)
}

export const TETRIMINOS: Record<TetriminoType, Tetrimino> = {
  I: {
    shapes: [
      [[1, 1, 1, 1]], // 0°
      [[1], [1], [1], [1]], // 90°
      [[1, 1, 1, 1]], // 180°
      [[1], [1], [1], [1]], // 270°
    ],
    color: "cyan",
    steampunkColor: "#FFD700", // 金色
  },
  O: {
    shapes: [
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: "yellow",
    steampunkColor: "#D4A017", // 暗金色
  },
  T: {
    shapes: [
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
    ],
    color: "purple",
    steampunkColor: "#8B5A2B", // 銅色
  },
  S: {
    shapes: [
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    ],
    color: "green",
    steampunkColor: "#6B4E31", // 深銅色
  },
  Z: {
    shapes: [
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ],
    color: "red",
    steampunkColor: "#A67D3D", // 黃銅色
  },
  J: {
    shapes: [
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
    ],
    color: "blue",
    steampunkColor: "#5C4033", // 暗棕色
  },
  L: {
    shapes: [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
    ],
    color: "orange",
    steampunkColor: "#B8860B", // 暗黃銅色
  },
};
