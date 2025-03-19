import React from "react";
import { TetriminoType } from "../utils/tetriminos";

interface NextTetriminoProps {
  next: TetriminoType;
}

const NextTetrimino: React.FC<NextTetriminoProps> = ({ next }) => (
  <div>Next: {next}</div>
);

export default NextTetrimino;
