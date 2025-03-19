import React from "react";
import { TetriminoState } from "../types";
import { TETRIMINOS } from "../utils/tetriminos";

interface GridProps {
  grid: number[][];
  currentTetrimino: TetriminoState;
}

const Grid: React.FC<GridProps> = ({ grid, currentTetrimino }) => {
  const renderGrid = () => {
    const tetrimino = TETRIMINOS[currentTetrimino.type];
    const shape = tetrimino.shapes[currentTetrimino.rotation];
    const { x, y } = currentTetrimino.position;
    const newGrid = grid.map((row) => [...row]);

    shape.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell) {
          newGrid[y + rowIdx][x + colIdx] = 1;
        }
      });
    });

    return newGrid.map((row, rowIdx) => (
      <div key={rowIdx} style={{ display: "flex" }}>
        {row.map((cell, colIdx) => (
          <div
            key={colIdx}
            style={{
              width: "32px",
              height: "32px",
              background: cell ? tetrimino.steampunkColor : "#2E2E2E", // 暗灰色背景
              border: "2px solid #8B5A2B", // 銅色邊框
              boxShadow: cell
                ? "inset 0 0 5px rgba(255, 215, 0, 0.8)" // 方塊內發光效果
                : "inset 0 0 3px rgba(0, 0, 0, 0.5)", // 背景陰影
              backgroundImage: cell
                ? "radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent)" // 金屬光澤
                : "none",
              borderRadius: "4px", // 輕微圓角增加機械感
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div
      style={{
        background: "#3C2F2F", // 深棕色背景，復古感
        padding: "20px",
        border: "4px solid #A67D3D", // 黃銅色外框
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)", // 溫暖外發光
        display: "inline-block",
      }}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;
